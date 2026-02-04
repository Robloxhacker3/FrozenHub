# 🧊 Frozen Hub - AI App Platform

A modern, AI-themed Progressive Web App (PWA) for managing and installing iOS applications with a stunning frozen/ice aesthetic.

## ✨ Features

- 🎨 **Beautiful AI-Themed Design** - Frozen ice aesthetic with smooth animations
- 📱 **PWA Support** - Install to home screen with custom icon
- 🎯 **Custom Lucide Icons** - Modern, clean iconography throughout
- 🌈 **Multiple Themes** - Frozen AI, Dark Mode, and Light Mode
- ⚡ **Fast & Responsive** - Optimized for all devices
- 🔧 **TypeScript** - Type-safe code for better development
- 🚀 **Vercel Ready** - Easy deployment to Vercel

## 🚀 Quick Start

### Local Development

1. Clone the repository
2. Open `index.html` in your browser, or
3. Use a local server:
```bash
npx http-server -p 3000
```

### Deploy to Vercel

#### Option 1: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

#### Option 2: GitHub Integration
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Deploy!

#### Option 3: Drag & Drop
1. Go to [vercel.com](https://vercel.com)
2. Drag and drop your project folder
3. Done!

## 📱 PWA Installation

When users visit your site on iOS:
1. Tap the Share button in Safari
2. Tap "Add to Home Screen"
3. The app will appear with your custom icon!

## 🎨 Customization

### Adding Apps

Edit the `appsConfig` array in `app.js`:

```javascript
{
    name: "Your App Name",
    imageUrl: "https://your-image-url.png",
    link: "itms-services://...",
    installLink: "itms-services://...",
    description: "Your app description",
    icon: ""
}
```

### Changing Themes

Themes can be customized in `styles.css` under the `:root` and theme sections.

### Custom Icons

The app uses inline SVG icons (Lucide style). You can replace any icon in `index.html`.

## 🛠️ Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS variables
- **TypeScript/JavaScript** - Type-safe logic
- **PWA** - Service Worker & Manifest
- **Lucide Icons** - Beautiful, consistent icons

## 📂 Project Structure

```
frozen-hub/
├── index.html          # Main HTML file
├── styles.css          # All styles
├── app.js              # TypeScript/JavaScript logic
├── manifest.json       # PWA manifest
├── sw.js               # Service worker
├── vercel.json         # Vercel configuration
├── package.json        # NPM configuration
├── tsconfig.json       # TypeScript configuration
└── README.md           # This file
```

## 🎯 Creating Custom App Icons

To create custom 192x192 and 512x512 PNG icons:

1. Use a tool like [Figma](https://figma.com) or [Canva](https://canva.com)
2. Create a design with the frozen/ice theme
3. Export as PNG at 192x192 and 512x512
4. Save as `icon-192.png` and `icon-512.png`
5. Place in the root directory

## 🌐 Browser Support

- ✅ Safari (iOS)
- ✅ Chrome
- ✅ Firefox
- ✅ Edge
- ✅ Opera

## 📄 License

MIT License - feel free to use for any project!

## 🤝 Contributing

Feel free to submit issues and pull requests!

## 💡 Tips

- The app works best when deployed on HTTPS (required for PWA features)
- Vercel provides HTTPS automatically
- Service worker caches assets for offline use
- The frozen theme is the default for that AI aesthetic!

---

Made with ❄️ by Frozen Hub Team
