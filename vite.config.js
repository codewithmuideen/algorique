import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { seoPlugin } from './seo-plugin.js'

// Runs the Vercel-style handlers in /api during `npm run dev`, so the forms
// work locally without the Vercel CLI. Production uses Vercel Functions.
function apiDevServer() {
  return {
    name: 'algorique-api-dev',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/api/')) return next()
        const name = req.url.slice(5).split('?')[0]
        if (!/^[a-z-]+$/.test(name)) return next()

        let raw = ''
        for await (const chunk of req) raw += chunk
        try {
          req.body = raw ? JSON.parse(raw) : {}
        } catch {
          req.body = {}
        }
        res.status = (code) => {
          res.statusCode = code
          return res
        }
        res.json = (payload) => {
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(payload))
        }

        try {
          const mod = await server.ssrLoadModule(`/api/${name}.js`)
          await mod.default(req, res)
        } catch (err) {
          server.config.logger.error(err?.stack || String(err))
          if (!res.writableEnded) res.status(500).json({ error: 'Local API error.' })
        }
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  // Server-only secrets for the local API. Nothing here is exposed to the
  // browser: only VITE_-prefixed variables reach client code, and none are used.
  const env = loadEnv(mode, process.cwd(), '')
  for (const key of ['RESEND_API_KEY', 'BUSINESS_EMAIL', 'VERIFIED_FROM_EMAIL', 'PUBLIC_SITE_URL', 'SITE_URL']) {
    if (env[key] && !process.env[key]) process.env[key] = env[key]
  }
  // The public site address is not a secret: share it with client code so
  // the browser and the build use the same canonical domain.
  if (process.env.SITE_URL && !process.env.VITE_SITE_URL) process.env.VITE_SITE_URL = process.env.SITE_URL

  return {
    plugins: [react(), tailwindcss(), apiDevServer(), seoPlugin()],
    build: {
      rollupOptions: {
        output: {
          // Long-lived vendor chunks cache separately from site code.
          manualChunks: {
            react: ['react', 'react-dom', 'react-router-dom'],
            motion: ['framer-motion'],
            forms: ['react-hook-form', '@hookform/resolvers', 'zod'],
          },
        },
      },
    },
  }
})
