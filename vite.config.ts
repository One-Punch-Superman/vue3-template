import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import legacy from '@vitejs/plugin-legacy';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path';

const PROXY = {
  target: 'http://127.0.0.1:8088/',
  secure: false,
  ws: true,
  changeOrigin: true
};

export default defineConfig({
  base: './',
  plugins: [
    vue(),
    legacy({
      additionalModernPolyfills: ['regenerator-runtime/runtime']
    }),
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia'],
      eslintrc: {
        enabled: false,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true
      }
    }),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      symbolId: 'icon-[dir]-[name]'
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    // sourcemap: true
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].[hash].js`, // 为入口文件添加哈希
        chunkFileNames: `assets/[name].[hash].js`, // 为分块添加哈希
        assetFileNames: `assets/[name].[hash].[ext]` // 为静态资源添加哈希
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        javascriptEnabled: true,
        additionalData: '@import "./src/style/variable.scss";'
      }
    }
  },
  server: {
    host: '0.0.0.0',
    port: 8080,
    open: true,
    proxy: {
      '/rest': PROXY,
      '/user': PROXY
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    }
  }
});
