<template>
  <div class="container">
    <div class="row text-center mt-3">
      <mark class="col-md-4 mx-1 rounded w-25 mx-auto">Rock</mark>
      <mark class="col-md-4 mx-1 rounded w-25 mx-auto">Scissors</mark>
      <mark class="col-md-4 mx-1 rounded w-25 mx-auto">Paper</mark>
    </div>
    <hr>
    <!-- Game control -->
    <GameAlt/>
    <!-- Game points -->
    <GamePoints/>
    <!-- Game score -->
    <GameScore/>
  </div>
</template>

<script setup>
import GameAlt from './components/GameAlt.vue'
import GamePoints from './components/GamePoints.vue';
import GameScore from './components/GameScore.vue';

</script>
