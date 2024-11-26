<template>
    <div>
        <div class="flex flex-col items-center justify-center space-y-4 mt-4 mx-4">
            <input v-model="email" id="email" type="email"
                class="w-full px-4 p-2 rounded-lg bg-gray-dark text-light" placeholder="Email" />
            <input v-model="password" id="password" type="password"
                class="w-full px-4 p-2 rounded-lg bg-gray-dark text-light" placeholder="Password" />
        </div>
        <slot />
        <div class="flex flex-col md:flex-row-reverse items-center justify-center md:justify-around gap-4 mt-8 md:m-6">
            <button class="bg-dark-light text-light p-2 rounded-lg cursor-pointer hover:bg-gray-dark transition-colors duration-200" @click="handleLogin()">
                <span class="mx-2 my-0.5">Login</span>
            </button>
            <hr class="block md:hidden w-1/3" />
            <button class="text-light p-2 rounded-lg cursor-pointer hover:bg-dark-light transition-colors duration-200" @click="emit('setAuthType', 'register')">
                <span class="mx-2 my-0.5">Register</span>
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue"
import { notif } from '@/helpers/notif.js'
import { isValidEmail } from '@/helpers/functions.js'
import { useAuthStore } from '@/stores/auth'

const emit = defineEmits(['setAuthType'])

const authStore = useAuthStore()

const email = ref('')
const password = ref('')

function valid() {
    // return false // ? uncomment this line to skip form validation
    if (password.value.length === 0) return "Please enter your password"
    if (email.value.length === 0) return "Please enter your email"
    if (!isValidEmail(email.value)) return "Please enter a valid email"
    return false
}

async function handleLogin() {

    email.value = email.value.trim()
    password.value = password.value.trim()

    const error = valid()
    if (error) {
        notif.notify(error, 'error')
    } else {
        authStore.login(email.value, password.value)
        email.value = ''
        password.value = ''
    }
}
</script>