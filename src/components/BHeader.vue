<template>
  <div class="container">
    <header class="d-flex justify-content-center py-3">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active" aria-current="page">
            Home (Week 5)
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link" active-class="active">
            About
          </router-link>
        </li>

        <!-- Auth-aware nav -->
        <li class="nav-item" v-if="!authed">
          <router-link to="/login" class="nav-link" active-class="active">Login</router-link>
        </li>
        <li class="nav-item" v-else>
          <button class="nav-link btn btn-link p-0" @click="doLogout">Logout</button>
        </li>
      </ul>
    </header>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { isAuthenticated, logout } from '../stores/auth'

const authed = computed(() => isAuthenticated.value)
const doLogout = () => logout()
</script>

<style scoped>
.nav .nav-link.active { font-weight: 600; }
</style>