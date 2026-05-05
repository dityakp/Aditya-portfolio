/* =============================================
   Netlify Serverless Function — admin-api.js
   Secure proxy for GitHub file operations.
   
   Environment variables required in Netlify:
   - GITHUB_ADMIN_PAT: Fine-grained token with Contents read/write
   - ADMIN_PASSWORD: Your admin panel password
   ============================================= */

const REPO_OWNER = 'dityakp';
const REPO_NAME = 'Aditya-portfolio';

exports.handler = async function (event) {
  // CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders(),
      body: '',
    };
  }

  // Only accept POST
  if (event.httpMethod !== 'POST') {
    return respond(405, { error: 'Method not allowed' });
  }

  const token = process.env.GITHUB_ADMIN_PAT;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!token || !adminPassword) {
    return respond(500, { error: 'Server configuration missing' });
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return respond(400, { error: 'Invalid JSON body' });
  }

  // Authenticate
  if (body.password !== adminPassword) {
    return respond(401, { error: 'Invalid password' });
  }

  const ghHeaders = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    'User-Agent': 'portfolio-admin',
    'X-GitHub-Api-Version': '2022-11-28',
  };

  try {
    switch (body.action) {
      case 'list': {
        // List files in a directory
        const path = body.path || 'public/documents';
        const res = await fetch(
          `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`,
          { headers: ghHeaders }
        );
        if (res.status === 404) {
          return respond(200, { files: [] });
        }
        if (!res.ok) throw new Error(`GitHub API returned ${res.status}`);
        const files = await res.json();
        return respond(200, {
          files: Array.isArray(files)
            ? files.map((f) => ({
                name: f.name,
                path: f.path,
                sha: f.sha,
                size: f.size,
                type: f.type,
                download_url: f.download_url,
              }))
            : [{ name: files.name, path: files.path, sha: files.sha, size: files.size, type: files.type, download_url: files.download_url }],
        });
      }

      case 'upload': {
        // Upload or overwrite a file
        if (!body.path || !body.content) {
          return respond(400, { error: 'path and content (base64) required' });
        }

        // Check if file already exists (to get SHA for overwrite)
        let existingSha = null;
        const checkRes = await fetch(
          `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${body.path}`,
          { headers: ghHeaders }
        );
        if (checkRes.ok) {
          const existing = await checkRes.json();
          existingSha = existing.sha;
        }

        const uploadBody = {
          message: body.commitMessage || `Upload ${body.path.split('/').pop()} via Admin Panel`,
          content: body.content, // base64 encoded
        };
        if (existingSha) {
          uploadBody.sha = existingSha;
        }

        const uploadRes = await fetch(
          `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${body.path}`,
          {
            method: 'PUT',
            headers: ghHeaders,
            body: JSON.stringify(uploadBody),
          }
        );

        if (!uploadRes.ok) {
          const errData = await uploadRes.json();
          throw new Error(errData.message || `Upload failed with status ${uploadRes.status}`);
        }

        const result = await uploadRes.json();
        return respond(200, {
          success: true,
          file: {
            name: result.content.name,
            path: result.content.path,
            sha: result.content.sha,
            download_url: result.content.download_url,
          },
        });
      }

      case 'delete': {
        // Delete a file
        if (!body.path || !body.sha) {
          return respond(400, { error: 'path and sha required' });
        }

        const deleteRes = await fetch(
          `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${body.path}`,
          {
            method: 'DELETE',
            headers: ghHeaders,
            body: JSON.stringify({
              message: `Delete ${body.path.split('/').pop()} via Admin Panel`,
              sha: body.sha,
            }),
          }
        );

        if (!deleteRes.ok) {
          const errData = await deleteRes.json();
          throw new Error(errData.message || `Delete failed with status ${deleteRes.status}`);
        }

        return respond(200, { success: true });
      }

      default:
        return respond(400, { error: `Unknown action: ${body.action}` });
    }
  } catch (err) {
    return respond(502, { error: err.message });
  }
};

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };
}

function respond(statusCode, data) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders(),
    },
    body: JSON.stringify(data),
  };
}
