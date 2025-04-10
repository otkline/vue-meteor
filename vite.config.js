import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { meteor } from 'meteor-vite/plugin';

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
    exclude: ['vue-meteor-tracker', 'mysql2'], // サーバー側でしか使わないものは除外
  },
  esbuild: {
    worker: true, // 並列処理を有効化
  },
  server: {
    watch: {
      ignored: ['**/node_modules/**', '**/.git/**', '**/dist/**'],
    },
  },
  cacheDir: "/tmp/vite-cache", // キャッシュディレクトリを指定
});
