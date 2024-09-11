import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import svgLoader from 'vite-svg-loader'
import viteCompression from 'vite-plugin-compression'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), svgLoader(), viteCompression({
    threshold: 1024000 // 对大于 1mb 的文件进行压缩
  })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
    manifest: true,
    sourcemap: false,
    reportCompressedSize: true,
  },
  esbuild: {
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
  }
})
