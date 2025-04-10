<script setup>
import Hello from './Hello.vue'
import Info from './Info.vue'
import { Meteor } from 'meteor/meteor';

// Meteor メソッドを呼び出して、データを取得する
Meteor.call('getUsers', (error, result) => {
  if (error) {
    console.error('Error fetching users:', error)
  } else {
    console.log(result)
  }
})
Meteor.call('getUsers2', (error, result) => {
  if (error) {
    console.error('Error fetching users:', error)
  } else {
    console.log(result)
  }
})
// console.log("Registered Methods:", Object.keys(Meteor.server.method_handlers));
</script>

<template>
  <h1 class="text-3xl font-bold my-6">Welcome to Meteor!</h1>
  <Hello />
  <Info />
</template>
