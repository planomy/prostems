import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages project URL is /<repo-name>/; without this, assets 404 and the app is blank.
// Local dev uses '/' (command === 'serve').
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/prostems/' : '/',
}))
