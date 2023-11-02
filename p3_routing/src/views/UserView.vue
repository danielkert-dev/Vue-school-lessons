<script setup>
import { defineProps, ref } from 'vue';
import { useRouter, RouterLink } from 'vue-router';
const props = defineProps(['name']);
// List of users 
const nameList = [
  'Daniel',
  'Flavius',
  'Teo',
  'Casper',
  'Lukas',
  'Aron',
  'Maria',
  'Melvin',
  'Elias',
  'Oliver',
];
// Set title
document.title = props.name;
const updatedName = ref(props.name);
// Test names
if (!nameList.includes(props.name)) {
  updatedName.value = `${props.name} is not in our class`;
  useRouter().replace('/not-found');
} else {
  updatedName.value = `${props.name} is in our class`;
}
// Get image depending on the user
const getImagePath = (name) => {
  return `/src/assets/img/${name}.jpg`;
};
</script>

<template>
  <div class="container">
    <h1 class="text-center my-5">User page</h1>
    <!-- Show name -->
    <p class="text-center text-muted">{{ updatedName }}</p>
    <!-- Show image -->
    <img :src="getImagePath(props.name)" 
      alt="about"
      class="img rounded mx-auto d-block my-2 object-fit-scale" 
      width="200">
    <RouterLink to="/" class="btn btn-primary w-100">Go back to home</RouterLink>
  </div>
</template>
