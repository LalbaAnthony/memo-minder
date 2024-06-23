<template>
    <div>
        <div class="flex flex-col items-center justify-center space-y-4 mt-4 mx-4">
            <input v-model="email" id="email" type="email"
                class="w-full px-4 p-2 rounded-lg bg-dark-gray text-light" placeholder="Email or username" />
            <input v-model="password" id="password" type="password"
                class="w-full px-4 p-2 rounded-lg bg-dark-gray text-light" placeholder="Password" />
        </div>
        <slot />
        <div class="flex flex-col md:flex-row-reverse items-center justify-center md:justify-around gap-4 mt-8 md:m-6">
            <button class="bg-light-dark text-light p-2 rounded-lg cursor-pointer hover:bg-dark-gray" @click="handleLogin()">
                <span class="mx-2 my-0.5">Login</span>
            </button>
            <hr class="block md:hidden w-1/3" />
            <button class="text-light p-2 rounded-lg cursor-pointer hover:bg-light-dark" @click="$emit('setType', 'register')">
                <span class="mx-2 my-0.5">Register</span>
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { notify } from '@/helpers/notif.js'
import { isValidEmail } from '@/helpers/helpers.js'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const email = ref('');
const password = ref('');

function valid() {
    // return false; // ? uncomment this line to skip form validation
    if (password.value.length < 1) return "Please enter your password";
    if (email.value.length < 1) return "Please enter your email";
    if (!isValidEmail(email.value)) return "Please enter a valid email";
    return false;
}

async function handleLogin() {

    email.value = email.value.trim();
    password.value = password.value.trim();

    const error = valid();
    if (error) {
        notify(error, 'error');
    } else {
        authStore.login(email.value, password.value)
        email.value = ''
        password.value = ''
    }
}
</script>