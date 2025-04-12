# Meteor + Vue3 + Vite

## How to use

1. Clone this repo
2. `docker compose build`
  （初回のみ）
3. `docker compose up`
4. 必要に応じてマイグレーション実行 `npx db-migrate up --config database.js`
   `.env_sample` をコピーし `.env` を作成する。
   DBの接続情報を記述する。`.env` はgit管理外
5. `http://localhost:3000`

## Libraries used

- [Vue3](https://v3.vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Vue Router](https://next.router.vuejs.org/)
- [Meteor](https://www.meteor.com/)
- [Vue Meteor Tracker](https://github.com/meteor-vue/vue-meteor-tracker)
- [Tailwind CSS](https://tailwindcss.com/)
