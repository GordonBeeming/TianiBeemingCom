import path from "path"
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const isDev = command === 'serve'
  
  return {
    base: '/',
    plugins: [
      tailwindcss(),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        buffer: 'buffer',
      }
    },
    define: {
      global: "globalThis",
      'process.env': {}
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom', 'gray-matter', 'buffer'],
      esbuildOptions: {
        define: {
          global: 'globalThis'
        }
      }
    },
  }
});
