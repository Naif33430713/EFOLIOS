<template>
  <div class="container my-4" style="max-width: 480px">
    <h1 class="mb-3">Login</h1>
    <form @submit.prevent="onSubmit" class="vstack gap-3">
      <div>
        <label class="form-label" for="u">Username</label>
        <input id="u" class="form-control" v-model="u" autocomplete="username" />
      </div>
      <div>
        <label class="form-label" for="p">Password</label>
        <input id="p" class="form-control" type="password" v-model="p" autocomplete="current-password" />
      </div>
      <div v-if="err" class="text-danger">{{ err }}</div>
      <button class="btn btn-primary" type="submit">Sign in</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { login } from '../stores/auth'
import { useRoute, useRouter } from 'vue-router'

const u = ref('')
const p = ref('')
const err = ref('')
const route = useRoute()
const router = useRouter()

const onSubmit = () => {
  err.value = ''
  const ok = login(u.value, p.value)
  if (!ok) {
    err.value = 'Invalid credentials.'
    return
  }
  const to = route.query.redirect?.toString() || '/about'
  router.push(to)
}
</script>

<style scoped></style>