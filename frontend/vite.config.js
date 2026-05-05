// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'
// import { fileURLToPath, URL } from 'node:url'

// export default defineConfig({
//   plugins: [
//     react(),
//     tailwindcss(),
//   ],
// // server: {
// //     proxy: {
// //       "/api": {
// //         target: "http://localhost:3000",
// //         changeOrigin: true,
// //         secure: false,
// //       },
// //     },
// //   },
  
//   resolve: {
//     alias: {
//       "@": fileURLToPath(new URL("./src", import.meta.url)),
//     },
//   },

// })















import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      "/api": {
        target: "https://dazzling-spontaneity-production-04e3.up.railway.app/api/posts",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
})