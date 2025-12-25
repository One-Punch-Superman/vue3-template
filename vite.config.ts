import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { visualizer } from 'rollup-plugin-visualizer';
import viteCompression from 'vite-plugin-compression';
// import viteImagemin from "vite-plugin-imagemin";
import path from 'path';

const PROXY = {
  target: 'http://127.0.0.1:8088/',
  secure: false,
  ws: true,
  changeOrigin: true
};

export default defineConfig({
  plugins: [
    vue(),
    visualizer({
      open: true,
      filename: 'dist/stats.html',
      gzipSize: true,
      brotliSize: true
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
    }),
    viteCompression({
      // 生成Gzip压缩包
      algorithm: 'gzip',
      test: /\.(js|css|html|svg)$/i, // 匹配要压缩的文件格式
      threshold: 10240, // 仅压缩大于10KB的文件（单位：字节）
      minRatio: 0.8, // 压缩率小于0.8才生成压缩包（体积减少20%以上）
      deleteOriginFile: false, // 不删除原文件
      filename: '[path][base].gz' // 压缩包命名格式
    }),
    // 生成Brotli压缩包（比Gzip压缩率更高）
    viteCompression({
      algorithm: 'brotliCompress', // Brotli压缩算法
      test: /\.(js|css|html|svg)$/i,
      threshold: 10240,
      minRatio: 0.8,
      deleteOriginFile: false,
      filename: '[path][base].br' // 压缩包命名格式
    })
    // viteImagemin({
    //   webp: { quality: 80 },
    //   include: /src\/assets\/images\/.+\.(png|jpg)$/i, // 仅处理指定目录的图
    // }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  build: {
    minify: 'esbuild', // 可选'terser'（压缩更彻底，需安装terser）
    esbuild: {
      compress: {
        drop_console: true, // 生产环境移除console
        drop_debugger: true // 生产环境移除debugger
      }
    },
    rollupOptions: {
      output: {
        entryFileNames: `js/[name].[hash].js`, // 为入口文件添加哈希
        chunkFileNames: `js/[name].[hash].js`, // 为分块添加哈希
        assetFileNames: `assets/[name].[hash].[ext]`, // 为静态资源添加哈希
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // 拆分ECharts为独立Chunk
            if (id.includes('echarts')) {
              return 'vendor-echarts';
            }
            // 拆分Element Plus为独立Chunk
            else if (id.includes('element-plus')) {
              return 'vendor-element-plus';
            }
            // 其他依赖合并为vendor
            else {
              return 'vendor';
            }
          }
        }
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        javascriptEnabled: true,
        additionalData: '@import "@/styles/variable.scss";'
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
