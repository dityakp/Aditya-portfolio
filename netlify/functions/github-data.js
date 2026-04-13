/* =============================================
   Netlify Serverless Function — github-data.js
   Securely proxies GitHub GraphQL + REST API
   using the GITHUB_PAT environment variable.
   ============================================= */

const GH_USER = 'dityakp';

exports.handler = async function (event) {
  const token = process.env.GITHUB_PAT;

  if (!token) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'GITHUB_PAT not configured' }),
    };
  }

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    'User-Agent': 'netlify-function',
    'X-GitHub-Api-Version': '2022-11-28',
  };

  try {
    // 1. GraphQL — contribution calendar + repo stats
    const graphqlQuery = `{
      user(login: "${GH_USER}") {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                color
              }
            }
          }
          commitContributionsByRepository(maxRepositories: 5) {
            repository { nameWithOwner url }
            contributions { totalCount }
          }
        }
        repositories(first: 100, privacy: PUBLIC, isFork: false) {
          nodes { stargazerCount primaryLanguage { name } }
        }
      }
    }`;

    const graphqlRes = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers,
      body: JSON.stringify({ query: graphqlQuery }),
    });

    if (!graphqlRes.ok) {
      throw new Error(`GraphQL API returned ${graphqlRes.status}`);
    }

    const graphqlJson = await graphqlRes.json();
    if (graphqlJson.errors) {
      throw new Error(graphqlJson.errors[0].message);
    }

    // 2. REST — recent public events
    const eventsRes = await fetch(
      `https://api.github.com/users/${GH_USER}/events/public?per_page=60`,
      { headers }
    );

    if (!eventsRes.ok) {
      throw new Error(`Events API returned ${eventsRes.status}`);
    }

    const events = await eventsRes.json();

    // 3. Return combined payload
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=300', // cache 5 min at CDN level
      },
      body: JSON.stringify({
        userData: graphqlJson.data.user,
        events,
      }),
    };
  } catch (err) {
    return {
      statusCode: 502,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
