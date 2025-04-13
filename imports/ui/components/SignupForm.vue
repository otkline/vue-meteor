<template>
    <div>
        <h2>新規登録</h2>
        <form @submit.prevent="handleSignup">
            <label>
            メールアドレス：
            <input v-model="email" type="email" required />
            </label>
            <br />
            <label>
            パスワード：
            <input v-model="password" type="password" required />
            </label>
            <br />
            <button type="submit">登録</button>
            <p v-if="error" style="color: red;">{{ error }}</p>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { Accounts } from 'meteor/accounts-base'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')
const password = ref('')
const error = ref('')

const handleSignup = async () => {
  error.value = ''
  try {
    const result = await Meteor.callAsync('registerUser', email.value, password.value)
    console.log('登録成功:', result)
    localStorage.setItem('userId', result.userId)
    router.push('/dashboard')
  } catch (err) {
    error.value = err.reason || '登録に失敗しました'
  }
}
</script>
