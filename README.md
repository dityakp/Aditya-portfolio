# 🚀 Aditya Kumar Prasad - Portfolio Website

> **Built through live coding with AI** - This portfolio website was created collaboratively using AI-assisted development, showcasing the power of modern AI tools in web development.

[![Production Validation](https://github.com/dityakp/Aditya-portfolio/workflows/Production%20Validation%20Checks/badge.svg)](https://github.com/dityakp/Aditya-portfolio/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A stunning, modern portfolio website featuring an animated cosmic theme, dynamic GitHub integration, and smooth user experience. Built with cutting-edge web technologies and best practices.

---

## ✨ Features

- **🌌 Cosmic Animated Background** - Starry sky with Three.js particle system
- **🎨 Premium Design** - Glassmorphism effects, smooth gradients, and modern aesthetics
- **📱 Fully Responsive** - Optimized for all devices and screen sizes
- **⚡ Smooth Animations** - GSAP-powered animations with ScrollTrigger
- **🔗 GitHub Integration** - Dynamically fetches and displays pinned repositories
- **📧 Contact Form** - Integrated with FormSpree for seamless communication
- **🎯 Custom Cursor** - Interactive cursor following effect
- **♿ Accessible** - Semantic HTML and ARIA labels
- **🚀 Performance Optimized** - Fast loading times and smooth interactions
- **✅ CI/CD Pipeline** - Automated validation and deployment workflows

---

## 🛠️ Tech Stack

### Frontend Core
- **HTML5** - Modern semantic markup
- **CSS3** - Custom properties, Flexbox, Grid, animations
- **JavaScript (ES6+)** - Modern vanilla JavaScript

### Libraries & Frameworks
- **[GSAP 3.12.2](https://greensock.com/gsap/)** - Professional-grade animation library
- **[ScrollTrigger](https://greensock.com/scrolltrigger/)** - Scroll-based animation plugin
- **[Three.js r128](https://threejs.org/)** - 3D graphics and particle systems

### Fonts & Typography
- **[Inter](https://fonts.google.com/specimen/Inter)** - Primary sans-serif font (weights: 100-900)
- **[JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono)** - Monospace font for code blocks (weights: 100-800)

### External Services
- **[GitHub REST API v3](https://docs.github.com/en/rest)** - Repository data fetching
- **[FormSpree](https://formspree.io/)** - Contact form handling

### CI/CD & Automation
- **GitHub Actions** - Automated validation workflows
- **HTMLHint** - HTML validation
- **stylelint** - CSS linting
- **ESLint** - JavaScript linting

---

## 📂 Project Structure

```
Aditya_Portfolio_Website/
├── .github/
│   └── workflows/
│       └── auto-pr.yml          # CI/CD validation workflow
├── assets/
│   └── Resume.pdf               # Downloadable resume
├── css/
│   └── style.css                # Main stylesheet with custom properties
├── js/
│   ├── github-api.js            # GitHub API integration
│   └── main.js                  # Core functionality & animations
├── index.html                   # Main HTML file
├── LICENSE                      # MIT License
└── README.md                    # You are here!
```

---

## 🎨 Design Principles

### Visual Excellence
- **Modern Color Palette** - Vibrant gradients using HSL colors
- **Glassmorphism** - Frosted glass effects with backdrop-filter
- **Dark Mode First** - Optimized for low-light viewing
- **Smooth Transitions** - All interactions feature smooth animations
- **Micro-animations** - Hover effects and interactive elements

### Performance
- **Optimized Assets** - Minified and compressed resources
- **Lazy Loading** - Deferred JavaScript execution
- **CSS Custom Properties** - Efficient theming system
- **Hardware Acceleration** - GPU-accelerated animations

### Accessibility
- **Semantic HTML5** - Proper heading hierarchy and landmarks
- **ARIA Labels** - Screen reader friendly
- **Keyboard Navigation** - Full keyboard support
- **Color Contrast** - WCAG AA compliant

---

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Optional: Local web server for development

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/dityakp/Aditya-portfolio.git
   cd Aditya-portfolio
   ```

2. **Open the project**
   - Simply open `index.html` in your browser, or
   - Use a local development server:
   
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve
   
   # Using PHP
   php -S localhost:8000
   ```

3. **Visit the website**
   - Navigate to `http://localhost:8000` in your browser

---

## 🔧 Configuration

### GitHub API Integration
To display your own pinned repositories, update the username in `js/github-api.js`:

```javascript
const GITHUB_USERNAME = 'dityakp';  // Replace with your GitHub username
```

### Contact Form
The contact form uses FormSpree. To use your own endpoint, update the form action in `index.html`:

```html
<form id="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

### Personal Information
Update the following in `index.html`:
- Name and title
- Profile description
- Education details
- Experience section
- Skills and certifications
- Social media links

---

## 📦 Deployment

This website is static and can be deployed to any hosting platform:

### GitHub Pages
1. Push your code to GitHub
2. Go to Settings → Pages
3. Select branch and save

### Netlify
```bash
netlify deploy --prod --dir .
```

### Vercel
```bash
vercel --prod
```

---

## 🧪 Validation & Testing

The project includes automated validation workflows:

```bash
# HTML validation
htmlhint "**/*.html"

# CSS validation
npx stylelint "**/*.css"

# JavaScript validation
npx eslint "**/*.js" --env browser,es2021
```

---

## 🎯 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) - feel free to use it as a template for your own portfolio!

---

## 🤝 Contributing

While this is a personal portfolio, suggestions and improvements are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📬 Contact

**Aditya Kumar Prasad**
- 🌐 Portfolio: [Live Demo](https://dityakp.github.io/Aditya-portfolio/)
- 💼 LinkedIn: [@dityakp](https://www.linkedin.com/in/dityakp/)
- 🐙 GitHub: [@dityakp](https://github.com/dityakp)
- 📧 Email: aditya22may2004@gmail.com

---

## 🙏 Acknowledgments

- **GSAP** - For the amazing animation library
- **Three.js** - For 3D graphics capabilities
- **Google Fonts** - For beautiful typography
- **FormSpree** - For contact form handling
- **AI Tools** - For assisting in the development process

---

<div align="center">
  <p>Made with ❤️ and AI assistance</p>
  <p>© 2026 Aditya Kumar Prasad. All rights reserved.</p>
</div>
