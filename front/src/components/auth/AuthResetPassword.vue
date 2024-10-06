<template>
    <div>
        <div class="flex flex-col items-center justify-center space-y-4 mt-4 mx-4">
            <input v-model="code" id="code" type="text" class="w-full px-4 p-2 rounded-lg bg-gray-dark text-light"
                placeholder="Code" />
            <input v-model="password" id="password" type="password"
                class="w-full px-4 p-2 rounded-lg bg-gray-dark text-light" placeholder="Password" />
            <input v-model="confirmPassword" id="confirmPassword" type="password"
                class="w-full px-4 p-2 rounded-lg bg-gray-dark text-light" placeholder="Confirm password" />
            <PasswordStrength :password="password || confirmPassword || ''" />
        </div>
        <slot />
        <div class="flex flex-col md:flex-row-reverse items-center justify-center md:justify-around gap-4 mt-8 md:m-6">
            <button class="bg-dark-light text-light p-2 rounded-lg cursor-pointer transition-colors duration-200 hover:bg-dark-light"
                @click="handleResetPassword()">
                <span class="mx-2 my-0.5">Send</span>
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { notify } from '@/helpers/notif.js'
import PasswordStrength from '@/components/PasswordStrengthComponent.vue'
import { missingsElementsPassword } from '@/helpers/helpers.js'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const code = ref(null)
const password = ref('')
const confirmPassword = ref('')

function valid() {
    // return false; // ? uncomment this line to enable form validation
    if (!code.value) return 'Please enter the code'
    if (password.value.length === 0) return "Please enter your password"
    if (confirmPassword.value.length === 0) return "Please enter your password"
    if (password.value !== confirmPassword.value) return 'Passwords do not match'
    if (missingsElementsPassword(password.value).length > 0) return `Password must at least contain: ${missingsElementsPassword(password.value).join(', ')}`
    return false
}

async function handleResetPassword() {
    const error = valid()
    if (error) {
        notify(error, 'error')
    } else {
        authStore.resetPassword(code.value, password.value)
        code.value = ''
        password.value = ''
        confirmPassword.value = ''
    }
}
</script>