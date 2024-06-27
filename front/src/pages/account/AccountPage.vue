<template>
  <div>
    {{ authStore.user }}
    <div class="flex flex-row flex-wrap flexitems-center gap-x-8 gap-y-4 m-4">
      <div class="flex flex-col gap-2">
        <label for="username">Username</label>
        <input v-model="authStore.user.username" id="username" type="text"
          class="px-4 p-2 rounded-lg bg-dark-gray text-light" placeholder="Username" />
      </div>
      <div class="flex flex-col gap-2">
        <label for="email">Email</label>
        <input v-model="authStore.user.email" id="email" type="email"
          class="px-4 p-2 rounded-lg bg-dark-gray text-light" placeholder="Email" disabled />
      </div>
      <div class="flex flex-col gap-2">
        <label for="email">Birthdate</label>
        <input v-model="authStore.user.birthdate" id="birthdate" type="date"
        class="w-full px-4 p-2 rounded-lg bg-dark-gray text-light" placeholder="Birthdate" />
      </div>
      <div class="flex flex-col gap-2">
        <label for="language">Language</label>
        <select v-model="authStore.user.language" id="language" class="px-4 p-2 rounded-lg bg-dark-gray text-light">
          <option value="" disabled>Language</option>
          <option v-for="(value, key) in languages" :key="key" :value="key" :selected="key === authStore.user.language">
            {{ value }}</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
import debounce from 'lodash/debounce'
import { isValidEmail } from '@/helpers/helpers.js'
import { isValidDate } from '@/helpers/helpers.js'
import { notify } from '@/helpers/notif.js'

const authStore = useAuthStore()

authStore.fetchUserInfos()

const languages = ref({
  en: 'English',
})

function valid() {
  // return false // ? uncomment this line to enable form validation
  if (authStore.user.username.length === 1) return "Username is required"
  if (authStore.user.birthdate.length === 1) return "Birthdate is required"
  if (authStore.user.language.length === 1) return "Language is required"
  if (authStore.user.email.length === 1) return "Email is required"
  if (!isValidEmail(authStore.user.email)) return "Please enter a valid email"
  if (!isValidDate(authStore.user.birthdate)) return "Please enter a valid birthdate"
  return false
}

// Save user infos with a debounce of 1 second, to avoid too many requests
const handleSave = debounce(() => {

  authStore.user.username = authStore.user.username.trim()
  authStore.user.birthdate = authStore.user.birthdate.trim()
  authStore.user.language = authStore.user.language.trim()
  authStore.user.email = authStore.user.email.trim()

  const error = valid()
  if (error) {
    notify(error, 'error')
  } else {
    authStore.updateUserInfos()
  }

}, 1000)

// Save user infos when user changes them
watch(() => authStore.user.email, handleSave)
watch(() => authStore.user.username, handleSave)
watch(() => authStore.user.birthdate, handleSave)
watch(() => authStore.user.language, handleSave)

</script>