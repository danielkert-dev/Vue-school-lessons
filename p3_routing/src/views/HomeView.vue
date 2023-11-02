<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'; 

const nameInput = ref('');
const router = useRouter();
// Test user by sending to userpage
const navigateToUser = () => {
  router.replace('/user/' + nameInput.value);
}
</script>

<template>
  <main>
    <div class="container">
      <div class="input-group my-5">
    <input v-model="nameInput" type="text" class="form-control" placeholder="Students in class" aria-label="Student in class" aria-describedby="button-addon2">
    <!-- Input user -->
    <button @click="navigateToUser" class="btn btn-primary" type="button" id="button-addon2">Go to User</button>
  </div>
    </div>
  </main>
</template>