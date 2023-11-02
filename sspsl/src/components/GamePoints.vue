<template>
<!-- points -->
<div class="row text-center">
<mark class="col-md-6 mx-1 rounded w-25 mx-auto">User: {{ userScore }}</mark>
<mark class="col-md-6 mx-1 rounded w-25 mx-auto">Computer: {{ computerScore }}</mark>
</div>

<hr>
</template>

<script setup>
import { userScore, computerScore } from './store.js'

</script>