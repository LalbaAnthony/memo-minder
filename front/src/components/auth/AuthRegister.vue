<template>
    <div>
        <div class="flex flex-col items-center justify-center space-y-4 mt-4 mx-4">
            <input v-model="username" id="username" type="text" class="w-full px-4 p-2 rounded-lg bg-gray-dark text-light"
                placeholder="Username" />
            <input v-model="email" id="email" type="email" class="w-full px-4 p-2 rounded-lg bg-gray-dark text-light"
                placeholder="Email" />
            <select v-model="language" id="language" class="w-full px-4 p-2 rounded-lg bg-gray-dark text-light">
                <option value="" disabled selected>Language</option>
                <option v-for="(value, key) in languages" :key="key" :value="key">{{ value }}</option>
            </select>
            <DatePicker :value="birthdate" @update="(v) => { birthdate = v }" />
            <hr class="w-full" />            
            <input v-model="password" id="password" type="password"
                class="w-full px-4 p-2 rounded-lg bg-gray-dark text-light" placeholder="Password" />
            <input v-model="confirmPassword" id="confirmPassword" type="password"
                class="w-full px-4 p-2 rounded-lg bg-gray-dark text-light" placeholder="Confirm password" />
            <PasswordStrength :password="password || confirmPassword || ''" />
            <label class="flex flex-start space-x-2">
                <input v-model="acceptTerms" id="acceptTerms" type="checkbox" />
                <span class="text-light">I accept the terms and conditions</span>
            </label>
        </div>
        <slot />
        <div class="flex flex-col md:flex-row-reverse items-center justify-center md:justify-around gap-4 mt-8 md:m-6">
            <button class="bg-dark-light text-light p-2 rounded-lg cursor-pointer transition-colors duration-200 hover:bg-dark-light"
                @click="handleRegister()">
                <span class="mx-2 my-0.5">Register</span>
            </button>
            <hr class="block md:hidden w-1/3" />
            <button class="text-light p-2 rounded-lg cursor-pointer transition-colors duration-200 hover:bg-gray-dark"
                @click="emit('setAuthType', 'login')">
                <span class="mx-2 my-0.5">Login</span>
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { notify } from '@/helpers/notif.js'
import DatePicker from '@/components/DatePickerComponent.vue'
import PasswordStrength from '@/components/PasswordStrengthComponent.vue'
import { isValidEmail } from '@/helpers/helpers.js'
import { isValidDate } from '@/helpers/helpers.js'
import { missingElementsPassword } from '@/helpers/helpers.js'
import { useAuthStore } from '@/stores/auth'

const emit = defineEmits(['setAuthType'])

const authStore = useAuthStore()

const username = ref('')
const birthdate = ref('2000-01-01T00:00:00.000Z')
const email = ref('')
const language = ref('en')
const password = ref('')
const confirmPassword = ref('')
const acceptTerms = ref(false)

const languages = ref({
    en: 'English',
})

function valid() {
    // return false // ? uncomment this line to enable form validation
    if (username.value.length === 0) return "Please enter your username"
    if (birthdate.value.length === 0) return "Please enter your birthdate"
    if (isValidDate(birthdate.value)) return "Please enter a valid birthdate"
    if (language.value.length === 0) return "Please select your language"
    if (email.value.length === 0) return "Please enter your email"
    if (!isValidEmail(email.value)) return "Please enter a valid email"
    if (password.value.length === 0) return "Please enter your password"
    if (confirmPassword.value.length === 0) return "Please enter your password"
    if (password.value !== confirmPassword.value) return 'Passwords do not match'
    if (missingElementsPassword(password.value).length > 0) return `Password must at least contain: ${missingElementsPassword(password.value).join(', ')}`
    if (!acceptTerms.value) return 'Please accept the terms and conditions'
    return false
}

async function handleRegister() {
    username.value = username.value.trim()
    email.value = email.value.trim()
    birthdate.value = birthdate.value.trim()
    password.value = password.value.trim()
    confirmPassword.value = confirmPassword.value.trim()

    const error = valid()
    if (error) {
        notify(error, 'error')
    } else {
        authStore.register({
            username: username.value,
            email: email.value,
            birthdate: birthdate.value,
            language: language.value,
            password: password.value,
        })
        username.value = ''
        email.value = ''
        birthdate.value = ''
        language.value = ''
        password.value = ''
        confirmPassword.value = ''
        acceptTerms.value = false
    }
}
</script>