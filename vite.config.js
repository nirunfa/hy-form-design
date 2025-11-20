import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'
import { resolve } from 'path'
import requirePlugin from 'vite-plugin-require';
import commonjs from 'vite-plugin-commonjs';

const isDev = process.env.NODE_ENV !== 'production'

export default defineConfig({
  plugins: [
    commonjs(
      {
        // 覆盖范围：包括项目代码和 node_modules 中的依赖
        include: [/node_modules/, /src\/.*\.(js|vue)$/],
        // 处理混合模块（既有 import 又有 require 的文件）
        transformMixedEsModules: true,
        // 支持 require.resolve() 语法
        resolveRequireExtensions: true,
        // 针对 Vue2 依赖的特殊配置（如 vuex、vue-router 等）
        namedExports: {
          // 为常见 Vue2 依赖配置命名导出映射
          'vue': ['Vue', 'default'],
          'vuex': ['Store', 'default'],
          'vue-router': ['Router', 'default'],
          // 针对你的 vc-slick 依赖配置
          'node_modules/vc-slick/src/index.js': ['default', 'Slick']
        }
      }
    ),vue(),requirePlugin()
  ],
  root: '.',
  publicDir: 'public',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    },
    extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json', '.vue']
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          'primary-color': '#13c2c2',
          // "primary-color": "#9867f7",
          'layout-color': '#9867f7'
          // "layout-color": "#ee88aa"
        },
        javascriptEnabled: true
      }
    }
  },
  build: {
    commonjsOptions: {
      // 强制转换所有 CommonJS 模块
      transformMixedEsModules: true,
      include: /node_modules/
    },
    // 禁用 CSS 代码分割，将所有 CSS 提取到一个文件中
    cssCodeSplit: false,
    lib: {
      entry: resolve(__dirname, 'packages/index.js'), // 你的入口文件
      name: 'hy-form-design-mini',     // 库的全局变量名（UMD/IIFE格式需要）
      fileName: (format) => `${format}/hy-form-design.js`, // 可选：自定义输出文件名
      formats: ['es', 'cjs']  // 可选：指定输出格式，默认是 ['es', 'umd']
    },
    outDir: 'lib', // 你的输出目录
    rollupOptions: {
      // 打包阶段再次强化 CommonJS 转换
      plugins: [commonjs()],
      // 确保外部化处理那些你不想打包进库的依赖，例如 'vue'
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue'
        },
        // 将 useComponents 单独分出来，其他的打包成一个文件
        manualChunks: (id) => {
          // 其他所有代码都打包到主文件（返回 undefined 表示不创建单独的 chunk）
          return 'hy-form-design';
        },
        // 自定义 chunk 文件命名
        chunkFileNames: (chunkInfo) => {
          return '[format]/[name].js';
        },
        // 自定义 CSS 文件命名
        assetFileNames: () => {
          return 'hy-form-design.css';
        },
      }
    }
  },
  server: {
    port: 8080,
    open: true
  }
})

