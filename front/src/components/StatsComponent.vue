<template>
  <ul class="list-disc list-inside">
    <li>You still have time to adpopt <span class="text-primary font-bold">{{ nbOfPet }}</span> pets</li>
    <!-- TODO: - Nombre de premier apero en plein aire de l'année restant -->
    <!-- TODO: - Nb Election presidentiels -->
    <!-- TODO: - Nombre de coupe du monde à regarder -->
    <!-- TODO: - Block buster à regarder au cinema -->
    <!-- TODO: - Nombre d'éclipses solaires -->
    <!-- TODO: - Nombre de concert à voir -->
    <!-- TODO: - Temps pour apprendre d'un instrument -->
    <!-- TODO: - Temps pour apprendre une langue -->
    <!-- TODO: - Temps pour lire un livre -->
    <!-- TODO: - Temps pour regarder une série -->
    <!-- TODO: - Voyages restant (2 par an) -->
    <!-- TODO: - Nombre de chat/chien (un tout les 15 ans) -->
  </ul>
</template>

<script setup>
import { computed } from 'vue'
import { ageFromDate } from "@/helpers/helpers.js"
import { roundNb } from "@/helpers/helpers.js"

const props = defineProps({
  age: {
    type: Number,
    required: true
  }
})

const nbOfPet = computed(() => {
  const remainingYears = 80 - ageFromDate(props.age)
  return roundNb((remainingYears / 12), 0) // 12 years for a pet
})

</script>