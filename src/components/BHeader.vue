<template>
  <div class="container">
    <header class="d-flex justify-content-center py-3">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active">Home (Week 5)</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link" active-class="active">About</router-link>
        </li>

        <!--  Add Book link -->
        <li class="nav-item">
          <router-link to="/addbook" class="nav-link" active-class="active">Add Book</router-link>
        </li>

        <li class="nav-item" v-if="!currentUser">
          <router-link to="/signin" class="nav-link" active-class="active">Login</router-link>
        </li>
        <li class="nav-item" v-if="!currentUser">
          <router-link to="/register" class="nav-link" active-class="active">Register</router-link>
        </li>
        <li class="nav-item" v-if="currentUser">
          <button class="nav-link btn btn-link p-0" @click="doLogout">Logout</button>
        </li>
      </ul>
    </header>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'

const auth = getAuth()
const currentUser = ref(null)
onAuthStateChanged(auth, (user) => (currentUser.value = user))
const doLogout = async () => { await signOut(auth) }
</script>

<style scoped>
.nav .nav-link.active { font-weight: 600; }
</style>