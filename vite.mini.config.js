import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'
import { resolve } from 'path'
import requirePlugin from 'vite-plugin-require';
import commonjs from 'vite-plugin-commonjs';
import removeConsole from "vite-plugin-remove-console";

const isDev = process.env.NODE_ENV !== 'production'

export default defineConfig({
  esbuild: {
    // 移除所有注释（包括/*!开头的）
    legalComments: 'none',
  },
  plugins: [
    removeConsole(),
    commonjs(),
    vue(),
    requirePlugin(),
    // 处理 iconfont.js 文件，将其转换为空模块以避免构建错误
    {
      name: 'handle-iconfont',
      resolveId(id) {
        if (id.includes('iconfont.js') || id.endsWith('iconfont')) {
          return id;
        }
      },
      load(id) {
        if (id.includes('iconfont.js') || id.endsWith('iconfont')) {
          // 返回空模块，因为 iconfont.js 是一个浏览器端脚本，会在运行时执行
          return '// iconfont.js is loaded at runtime';
        }
      }
    }
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
    },
    postcss: {
      plugins: [
        // 自定义移除IE hack的插件
        {
          postcssPlugin: 'remove-ie-hacks',
          Declaration(decl) {
            // 移除包含 \9、*、_ 等IE hack的属性
            if (decl.value.match(/\\9|\\0|\\\\9/) || decl.prop.match(/^\*|^_/)) {
              decl.remove();
            }
          },
          Rule(rule) {
            // 移除针对IE的选择器（如 *html、*body）
            if (rule.selector.match(/^\*html|^\*body/)) {
              rule.remove();
            }
          }
        }
      ]
    }
  },
  build: {
    // 禁用 CSS 代码分割，将所有 CSS 提取到一个文件中
    cssCodeSplit: false,
    lib: {
      entry: resolve(__dirname, 'packages/mini.js'), // 你的入口文件
      name: 'hy-form-design-mini',     // 库的全局变量名（UMD/IIFE格式需要）
      fileName: (format) => `${format}/hy-form-design-mini.js`, // 可选：自定义输出文件名
      formats: ['es', 'cjs']  // 可选：指定输出格式，默认是 ['es', 'umd']
    },
    outDir: 'lib-mini', // 你的输出目录
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖，例如 'vue'
      external: ['vue', 'ant-design-vue', 'moment'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
          'ant-design-vue': 'antd',
          moment: 'moment'
        },
        // 将 useComponents 单独分出来，其他的打包成一个文件
        manualChunks: (id) => {
          // 其他所有代码都打包到主文件（返回 undefined 表示不创建单独的 chunk）
          return 'hy-form-design-mini';
        },
        // 自定义 chunk 文件命名
        chunkFileNames: (chunkInfo) => {
          return '[format]/[name].js';
        },
        // 自定义 CSS 文件命名
        assetFileNames: () => {
          return 'hy-form-design-mini.css';
        },
      }
    }
  },
  server: {
    port: 8080,
    open: true
  }
})

