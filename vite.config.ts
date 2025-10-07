import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      vue(),
      {
        name: 'html-transform',
        transformIndexHtml(html) {
          // Replace all env placeholders
          let result = html
            .replace(/%VITE_APP_TITLE%/g, env.VITE_APP_TITLE || '')
            .replace(/%VITE_APP_DESCRIPTION%/g, env.VITE_APP_DESCRIPTION || '')
            .replace(/%VITE_APP_URL%/g, env.VITE_APP_URL || '')
            .replace(/%VITE_OG_IMAGE%/g, env.VITE_OG_IMAGE || '')
            .replace(/%VITE_THEME_COLOR%/g, env.VITE_THEME_COLOR || '#2773ce')

          // Add Google Analytics if GA ID exists
          const gaId = env.VITE_GA_ID
          if (gaId) {
            const gaScript = `
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=${gaId}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${gaId}');
    </script>`
            result = result.replace('</head>', `${gaScript}\n  </head>`)
          }
          return result
        }
      }
    ],
    publicDir: 'public',
  }
})
