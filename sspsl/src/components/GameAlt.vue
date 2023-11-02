<template>
  <!-- Buttons -->
  <div class="row mt-4 buttons">
    <!-- Choices buttons and state -->
    <div
      v-for="choice in choices"
      :key="choice"
      @click="play(choice)"
      class="choice col-md-4 text-center d-flex justify-content-center rounded p-3 mx-auto"
      :class="{
        'bg-success': userChoice === choice && computerChoice !== choice,
        'bg-danger': computerChoice === choice && userChoice !== choice,
        'bg-primary': userChoice === choice && computerChoice === choice,
      }"
    >
    <!-- Images -->
      <img
        :src="'' + choice + '.svg'"
        height="250"
        :alt="choice"
        class="w-75 my-auto mx-auto rounded"/>
    </div>
  </div>

  <hr>

  <div class="row text-center mt-2">
    <div v-if="userChoice === null">
      <mark class="rounded ">Ready to play?</mark>
      <hr>
    </div>
    <div v-if="userChoice !== null">
      <p><mark class="rounded">You chose {{ userChoice }}</mark></p>
      <p><mark class="rounded">The computer chose {{ computerChoice }}</mark></p>
      <mark class="rounded">{{ result }}</mark>
      <hr>
    </div>
  </div>
</template>

<script setup>
// Import stored ref
import { userChoice, computerChoice, result, userScore, computerScore } from './store.js'

// Choices you can make
const choices = ['rock', 'scissors', 'paper', 'lizard', 'spock']

// List choice outcomes
const outcomes = {
  rock: { beats: ['scissors', 'lizard'], losesTo: ['paper', 'spock'] },
  scissors: { beats: ['paper', 'lizard'], losesTo: ['rock', 'spock'] },
  paper: { beats: ['rock', 'spock'], losesTo: ['scissors', 'lizard'] },
  lizard: { beats: ['spock', 'paper'], losesTo: ['rock', 'scissors'] },
  spock: { beats: ['scissors', 'rock'], losesTo: ['paper', 'lizard'] },
}

// Play the game
function play(choice) {
  userChoice.value = choice
  computerChoice.value = choices[Math.floor(Math.random() * choices.length)]

  // inputs
  const user = userChoice.value
  const computer = computerChoice.value

  // Determine result
  if (user === computer) {
    result.value = 'Tie'
  } else if (outcomes[user]?.beats.includes(computer)) {
    result.value = 'You win'
    userScore.value++
  } else {
    result.value = 'You lose'
    computerScore.value++
  }

  // Disable buttons after choice
  document.querySelectorAll('.choice').forEach(div => {
    div.style.pointerEvents = 'none'
    div.style.opacity = '0.8'
  })
}
</script>


<style scoped>
</style>