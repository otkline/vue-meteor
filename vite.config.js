import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { meteor } from 'meteor-vite/plugin';
import path from 'path'

export default defineConfig({
  plugins: [
    vue(),
    meteor({
      clientEntry: 'imports/ui/main.js',
      serverEntry: 'server/main.js',
      enableExperimentalFeatures: true,
      stubValidation: {
        warnOnly: true,
      },
    }),
  ],
  optimizeDeps: {
    include: ["vue", "vue-router"], // 使用するパッケージを事前バンドル
    exclude: ['vue-meteor-tracker', 'mysql2', 'argon2'], // サーバー側でしか使わないものは除外
  },
  esbuild: {
    worker: true, // 並列処理を有効化
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './imports/ui'),
    },
  },
  server: {
    watch: {
      ignored: ['**/node_modules/**', '**/.git/**', '**/dist/**'],
    },
    fs: {
      strict: false
    },
    port: 3000, // 任意でViteの開発ポート指定
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 3000, // WebSocketポートも同じに
      clientPort: 3000,
    },
  },
  build: {
    target: 'esnext', // 新しめの環境前提に最適化（開発効率アップ）
    sourcemap: true, // デバッグ時のマップ出力（optional）
    minify: false, // devビルドを高速化したい場合
  },
  cacheDir: "/tmp/vite-cache", // キャッシュディレクトリを指定
});
