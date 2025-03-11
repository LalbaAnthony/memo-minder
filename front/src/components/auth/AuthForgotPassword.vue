<template>
    <div>
        <div class="flex flex-col items-center justify-center space-y-4 mt-4 mx-4">
            <input v-model="email" id="email" type="email" class="w-full px-4 p-2 rounded-lg bg-gray-dark text-light"
                placeholder="Email" />
        </div>
        <slot />
        <div class="flex flex-col md:flex-row-reverse items-center justify-center md:justify-around gap-4 mt-8 md:m-6">
            <button
                class="bg-dark-light text-light p-2 rounded-lg cursor-pointer transition-colors duration-200 hover:bg-gray-dark"
                @click="handleForgotPassword()">
                <span class="mx-2 my-0.5">Send</span>
            </button>
        </div>
    </div>
</template>

<script setup>
import { notif } from '@/helpers/notif.js'
import { isValidEmail } from '@/helpers/functions.js'
import { useAuthStore } from '@/stores/auth'

const emit = defineEmits(['setAuthType'])

const authStore = useAuthStore()

function valid() {
    // return false // ? uncomment this line to skip form validation
    if (!authStore.fogotPasswordEmail) return "Please enter your email"
    if (!isValidEmail(authStore.fogotPasswordEmail)) return "Please enter a valid email"
    return false
}

async function handleForgotPassword() {
    const error = valid()
    if (error) {
        notif.notify(error, 'error')
    } else {
        authStore.fogotPasswordEmail = authStore.fogotPasswordEmail.trim()
        authStore.forgotPassword(authStore.fogotPasswordEmail)
        emit('setAuthType', 'resetPassword')
        authStore.fogotPasswordEmail = ''
    }
}
</script>