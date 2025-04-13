<template>
  <div>
    <h2>ダッシュボード</h2>
    <p v-if="user">こんにちは、{{ user.emails[0].address }} さん！</p>
    <button @click="logout">ログアウト</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { Meteor } from 'meteor/meteor'
import { VueMeteor } from 'vue-meteor-tracker'

const router = useRouter()

// リアクティブに現在のユーザー情報を取得
const user = VueMeteor(() => Meteor.user(), [])

// ログアウト処理
const logout = () => {
    Meteor.logout(() => {
        router.push('/login')
    });
};
</script>
