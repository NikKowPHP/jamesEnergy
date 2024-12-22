import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@context': path.resolve(__dirname, './src/context'),
      '@services': path.resolve(__dirname, './src/services'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@types': path.resolve(__dirname, './src/types'),
      '@utils': path.resolve(__dirname, './src/utils'),
    },
  },
  server: {
    host: true,
    watch: {
      usePolling: true,
      followSymlinks: true,
      ignored: ['!**/node_modules/**'],
    },
    hmr: {
      overlay: true,
      timeout: 5000,
    },
    fs: {
      strict: false,
      allow: [
        'node_modules',
        '..'
      ]
    }
  },
  optimizeDeps: {
    force: true,
    entries: [
      './src/**/*.{ts,tsx}',
      './node_modules/**/*.{js,mjs}'
    ]
  }
})
