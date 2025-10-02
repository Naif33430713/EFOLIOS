<template>
  <div id="nav">
    <router-link to="/get-book-count">Book Counter</router-link>
  </div>

  <!-- Where pages render -->
  <router-view />
</template>

<script setup>
// No logic needed here
</script>

<style scoped>
#nav {
  margin-bottom: 20px;
  text-align: center;
}
</style>