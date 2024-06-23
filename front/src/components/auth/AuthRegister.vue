<template>
    <div>
        <div class="flex flex-col items-center justify-center space-y-4 mt-4 mx-4">
            <input v-model="pseudo" id="pseudo" type="text" class="w-full px-4 p-2 rounded-lg bg-dark-gray text-light"
                placeholder="Username" />
            <input v-model="email" id="email" type="email" class="w-full px-4 p-2 rounded-lg bg-dark-gray text-light"
                placeholder="Email" />
            <select v-model="language" id="language" class="w-full px-4 p-2 rounded-lg bg-dark-gray text-light">
                <option value="" disabled selected>Language</option>
                <option v-for="(value, key) in languages" :key="key" :value="key">{{ value }}</option>
            </select>
            <input v-model="password" id="password" type="password"
                class="w-full px-4 p-2 rounded-lg bg-dark-gray text-light" placeholder="Password" />
            <input v-model="confirmPassword" id="confirmPassword" type="password"
                class="w-full px-4 p-2 rounded-lg bg-dark-gray text-light" placeholder="Confirm password" />
            <PasswordStrength :password="password || confirmPassword || ''" />
            <label class="flex items -center space-x-2">
                <input v-model="accept_terms" id="accept_terms" type="checkbox" />
                <span class="text-light">I accept the terms and conditions</span>
            </label>
        </div>
        <slot />
        <div class="flex flex-col md:flex-row-reverse items-center justify-center md:justify-around gap-4 mt-8 md:m-6">
            <button class="bg-light-dark text-light p-2 rounded-lg cursor-pointer hover:bg-light-dark"
                @click="handleRegister()">
                <span class="mx-2 my-0.5">Register</span>
            </button>
            <hr class="block md:hidden w-1/3" />
            <button class="text-light p-2 rounded-lg cursor-pointer hover:bg-dark-gray"
                @click="$emit('setType', 'login')">
                <span class="mx-2 my-0.5">Login</span>
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { notify } from '@/helpers/notif.js'
import PasswordStrength from '@/components/PasswordStrengthComponent.vue'
import { isValidEmail } from '@/helpers/helpers.js'
import { missingElementsPassword } from '@/helpers/helpers.js'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const pseudo = ref('')
const email = ref('')
const language = ref('en')
const password = ref('')
const confirmPassword = ref('')
const accept_terms = ref(false)

const languages = ref({
    en: 'English',
})

function valid() {
    // return false; // ? uncomment this line to enable form validation
    if (pseudo.value.length < 1) return "Please enter your username";
    if (language.value.length < 1) return "Please select your language";
    if (email.value.length < 1) return "Please enter your email";
    if (!isValidEmail(email.value)) return "Please enter a valid email";
    if (password.value.length < 1) return "Please enter your password";
    if (confirmPassword.value.length < 1) return "Please enter your password";
    if (password.value !== confirmPassword.value) return 'Passwords do not match'
    if (missingElementsPassword(password.value).length > 0) return `Password must at least contain: ${missingElementsPassword(password.value).join(', ')}`
    if (!accept_terms.value) return 'Please accept the terms and conditions'
    return false
}

async function handleRegister() {
    pseudo.value = pseudo.value.trim()
    email.value = email.value.trim()
    password.value = password.value.trim()
    confirmPassword.value = confirmPassword.value.trim()

    const error = valid()
    if (error) {
        notify(error, 'error')
    } else {
        authStore.register({
            pseudo: pseudo.value,
            email: email.value,
            language: language.value,
            password: password.value,
            accept_terms: accept_terms.value
        })
        pseudo.value = ''
        email.value = ''
        language.value = ''
        password.value = ''
        accept_terms.value = false
    }
}
</script>