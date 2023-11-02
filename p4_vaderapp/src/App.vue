<script setup>
import { RouterLink, RouterView } from 'vue-router'
import WeatherIcon from './components/icons/WeatherIcon.vue'
// Icon import test
</script>

<template>
  <header>
    <div class="navbar navbar-expand-lg navbar-light bg-light">
      <nav class="container-fluid">
        <RouterLink to="/" class="nav-brand">
          <!-- To go home incase of any error -->
          <WeatherIcon />
        </RouterLink>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <!-- <li class="nav-item my-auto">
        <RouterLink to="/fav" class="nav-link">Locations</RouterLink>
        </li> -->
        </ul>
        </div>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
</style>
