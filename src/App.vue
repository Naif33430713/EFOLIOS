<template>
  <BHeader />
  <router-view />
</template>

<script setup>
import BHeader from './components/BHeader.vue'
</script>

<style>
.container { max-width: 900px; }
</style>