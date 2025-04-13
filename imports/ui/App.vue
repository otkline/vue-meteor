<template>
    <div id="app">
      <nav>
          <router-link to="/">ホーム</router-link> |
          <router-link to="/dashboard">ダッシュボード</router-link>
      </nav>
      <hr />
      <router-view />
    </div>
</template>

<script setup>
</script>

<style scoped>
nav {
  padding: 10px;
  background: #f5f5f5;
}
</style>
