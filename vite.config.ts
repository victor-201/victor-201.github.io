import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      // During local dev, proxy /api/* to wrangler pages dev (port 8788)
      // Run: `npx wrangler pages dev --port 8788 -- npm run dev`
      // OR just set GEMINI_API_KEY in a local .dev.vars file for wrangler
      '/api': {
        target: 'http://localhost:8788',
        changeOrigin: true,
      },
    },
  },
})

