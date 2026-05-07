import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages project sites live at https://<user>.github.io/<repo>/
// Local dev uses '/' (command === 'serve').
// Build writes to /docs so you can use Pages "Deploy from branch" → main → /docs (no Actions).
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/prostems/' : '/',
  build: {
    outDir: 'docs',
    emptyOutDir: true
  }
}))
