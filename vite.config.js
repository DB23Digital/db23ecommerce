import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [
    react(),
    tailwindcss(),
  ],
  ssr: {
    // Output ESM so prerender.mjs (type:module) can import it with top-level await
    format: 'esm',
  },
  build: {
    // Don't wipe dist/ during the SSR pass — the client build's index.html must stay
    emptyOutDir: !isSsrBuild,
    rollupOptions: {
      output: {
        // manualChunks only applies to the client build — SSR externals can't be chunked
        manualChunks: isSsrBuild ? undefined : {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-motion': ['framer-motion'],
          'vendor-icons': ['lucide-react'],
        },
      },
    },
    chunkSizeWarningLimit: 300,
  },
}))
