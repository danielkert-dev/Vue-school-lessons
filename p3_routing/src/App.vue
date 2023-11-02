<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <!-- Navigation and links -->
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="nav-item">
        <RouterLink to="/" class="nav-link">Home</RouterLink>
        </div>
        <div class="nav-item">
        <RouterLink to="/about" class="nav-link">About</RouterLink>
        </div>
        <div class="nav-item">
        <RouterLink to="/daniel" class="nav-link">Daniel</RouterLink>
        </div>
      </nav>
  </header>

  <!-- Display the content -->
  <RouterView />
</template>

<style scoped>

</style>
