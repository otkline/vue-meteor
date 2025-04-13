<template>
  <div class="login-container">
    <div class="login-card">
      <h2>ログイン</h2>
      <form @submit.prevent="handleLogin">
        <label for="email">メールアドレス</label>
        <input type="email" v-model="email" id="email" required />

        <label for="password">パスワード</label>
        <input type="password" v-model="password" id="password" required />

        <button type="submit">ログイン</button>

        <p class="error" v-if="error">{{ error }}</p>

        <router-link to="/signup" class="signup-link">新規登録はこちら</router-link>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Meteor } from 'meteor/meteor'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const error = ref(null)
const router = useRouter()

const handleLogin = async () => {
  try {
    const result = await Meteor.callPromise('verifyLogin', email.value, password.value)
    if (result) {
      console.log('ログイン成功:', result)
      // ログイン状態を管理
      localStorage.setItem('userId', result.userId)
      router.push('/dashboard')
    }
  } catch (err) {
    error.value = err.reason || 'ログインに失敗しました'
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f0f2f5;
}

.login-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

h2 {
  text-align: center;
  margin-bottom: 1.5rem;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin: 0.5rem 0 0.2rem;
  font-weight: bold;
}

input {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  margin-bottom: 1rem;
}

button {
  background: #42b983;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s ease;
}

button:hover {
  background: #369f77;
}

.error {
  color: red;
  margin-top: 0.5rem;
  font-size: 0.9rem;
}

.signup-link {
  display: block;
  margin-top: 1rem;
  text-align: center;
  color: #42b983;
  text-decoration: none;
  font-size: 0.9rem;
}
.signup-link:hover {
  text-decoration: underline;
}
</style>
