import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/cbf-english-9/',
  build: {
    outDir: 'dist',
    minify: false,
  },
})
