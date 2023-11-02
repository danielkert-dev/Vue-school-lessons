<template>
    <div class="row text-center">
    <div v-if="userChoice !== null">
    <!-- Play again button -->
    <div class="row">
    <button @click="resetGame()" class="btn btn-primary w-25 mx-auto">Play again</button>
    </div>

    </div>
    </div>
</template>

<script setup>
import { userChoice, computerChoice, result } from './store.js'
// Reset the game and disable buttons
function resetGame() {
  userChoice.value = null
  computerChoice.value = null
  result.value = null
  document.querySelectorAll('.choice').forEach(div => {
    div.style.pointerEvents = 'auto'
    div.style.opacity = '1'
  })
}

</script>