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
            return html.replace('</head>', `${gaScript}\n  </head>`)
          }
          return html
        }
      }
    ],
    publicDir: 'public',
  }
})
