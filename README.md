# Mobile App Download Page

A modern, customizable download page for mobile applications built with Vue 3, TypeScript, and Tailwind CSS. Features automatic platform detection and smart redirects to the appropriate app store.

## Features

-  **Smart Platform Detection** - Automatically detects Android/iOS devices
-  **Dark Mode** - System-based dark/light theme switching
-  **Responsive Design** - Mobile-first, works on all screen sizes
-  **Fast & Lightweight** - Built with Vite for optimal performance
-  **Fully Customizable** - Configure everything via environment variables
-  **Auto Redirect** - Redirects users to recommended platform with animated progress bar
-  **SEO Optimized** - Meta tags for social media previews

##  Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe development
- **Vite** - Next generation frontend tooling
- **Tailwind CSS** - Utility-first CSS framework
- **Vue Router** - Official router for Vue.js

##  Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/gdyn.co.git
cd gdyn.co
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Edit `.env` file with your app information:
```env
VITE_APP_NAME="Your App Name"
VITE_APP_DESCRIPTION="Your app description"
VITE_GOOGLE_PLAY_URL="https://play.google.com/store/apps/details?id=your.app.id"
VITE_APP_STORE_URL="https://apps.apple.com/app/your-app/id123456"
# ... see .env.example for all options
```

## Development

Start the development server:
```bash
npm run dev
```

Visit `http://localhost:5173/indir` to see your download page.

## Build

Build for production:
```bash
npm run build
```

The built files will be in the `dist/` directory.

## Project Structure

```
├── src/
│   ├── views/
│   │   ├── Download.vue    # Main download page with platform detection
│   │   └── NotFound.vue    # 404 redirect page
│   ├── App.vue             # Root component with dark mode logic
│   └── main.ts             # Application entry point
├── public/
│   ├── images/             # Static images
│   └── favicon files       # App icons for all platforms
├── .env.example            # Environment variables template
└── .github/
    └── workflows/
        └── deploy.yml      # Automated deployment workflow
```

## Customization

### Environment Variables

All customization is done through environment variables in `.env`:

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_APP_NAME` | Your application name | "My App" |
| `VITE_APP_DESCRIPTION` | App description for meta tags | "Download our amazing app" |
| `VITE_APP_URL` | Your domain | "https://example.com" |
| `VITE_GOOGLE_PLAY_URL` | Google Play Store link | Full Play Store URL |
| `VITE_APP_STORE_URL` | Apple App Store link | Full App Store URL |
| `VITE_WEBSITE_URL` | Your main website | "https://www.example.com" |
| `VITE_PRIMARY_COLOR` | Brand primary color | "#2773ce" |
| `VITE_LOGO_LIGHT` | Logo for light mode | URL to logo image |
| `VITE_LOGO_DARK` | Logo for dark mode | URL to logo image |

See `.env.example` for the complete list.

### Routes

- `/indir` - Download page with platform detection
- All other routes - Redirect to `VITE_REDIRECT_URL`

## Deployment

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Upload the `dist/` folder to your web server.

3. Configure your web server to serve the SPA correctly:

**Nginx:**
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

**Apache (.htaccess):**
```apache
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

### Automated Deployment with GitHub Actions

This project includes a GitHub Actions workflow for automated deployment.

1. Add the following secrets to your GitHub repository:
   - `SERVER_HOST` - Your server IP/domain
   - `SERVER_USER` - SSH username
   - `SERVER_PASSWORD` - SSH password
   - `PROJECT_PATH` - Project directory on server
   - `WEBHOOK_URL` - Your git webhook URL (optional)

2. Push to the `main` branch to trigger automatic deployment.

## License

MIT License - feel free to use this project for your own applications.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

If you have any questions or need help, please open an issue on GitHub.
