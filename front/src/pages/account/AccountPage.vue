<template>
  <div>
    <TopActions :goBackButton="true" />

    <section>
      <h2 class="text-xl font-bold mb-6">Global</h2>
      <div class="flex flex-row flex-wrap items-center gap-x-8 gap-y-4 my-4 mx-2">
        <div class="flex flex-col gap-2">
          <label for="username">Username</label>
          <input v-model="authStore.user.username" id="username" type="text"
            class="px-4 p-2 rounded-lg bg-gray-dark text-light" placeholder="Username" />
        </div>
        <div class="flex flex-col gap-2">
          <label for="email">Email</label>
          <input v-model="authStore.user.email" id="email" type="email"
            class="px-4 p-2 rounded-lg bg-gray-dark text-light" placeholder="Email" disabled />
        </div>
        <div class="flex flex-col gap-2">
          <label for="birthdate">Birthdate</label>
          <DatePicker :actions="{}" :value="authStore.user.birthdate"
            @update="(v) => { authStore.user.birthdate = v }" />
        </div>
        <div class="flex flex-col gap-2">
          <label for="language">Language</label>
          <LanguagePicker :value="authStore.user.language" @update="(v) => { authStore.user.language = v }" />
        </div>
        <div class="flex flex-col gap-2">
          <label for="streamingPlatform">Streaming</label>
          <StreamingPlatformPicker :value="authStore.user.streamingPlatform"
            @update="(v) => { authStore.user.streamingPlatform = v }" />
        </div>
      </div>
    </section>
    <hr>
    <section>
      <h2 class="text-xl font-bold mb-6">Homepage</h2>
      <div class="flex flex-row flex-wrap items-center gap-x-8 gap-y-6 my-4 mx-2">
        <div class="w-full flex flex-row justify-between items-center gap-4">
          <div class="flex flex-row items-center gap-2">
            <ChartBarIcon class="size-6 text-gray-light" />
            <label>Enable life spents</label>
          </div>
          <Switch v-model="authStore.user.homePageEnableSpents" />
        </div>
        <div class="w-full flex flex-row justify-between items-center gap-4">
          <div class="flex flex-row items-center gap-2">
            <SquaresPlusIcon class="size-6 text-gray-light" />
            <label>Enable stats</label>
          </div>
          <Switch v-model="authStore.user.homePageEnableStats" />
        </div>
        <div class="w-full flex flex-row justify-between items-center gap-4">
          <div class="flex flex-row items-center gap-2">
            <ChatBubbleBottomCenterIcon class="size-6 text-gray-light" />
            <label>Enable quote</label>
          </div>
          <Switch v-model="authStore.user.homePageEnableQuote" />
        </div>
        <div class="w-full flex flex-row justify-between items-center gap-4">
          <div class="flex flex-row items-center gap-2">
            <UsersIcon class="size-6 text-gray-light" />
            <label>Enable upcoming birthdays</label>
          </div>
          <Switch v-model="authStore.user.homePageEnableUpcomings" />
        </div>
        <div class="w-full flex flex-row justify-between items-center gap-4">
          <div class="flex flex-row items-center gap-2">
            <CalendarDaysIcon class="size-6 text-gray-light" />
            <label>Enable lasts events added</label>
          </div>
          <Switch v-model="authStore.user.homePageEnableLastsEvents" />
        </div>
        <div class="w-full flex flex-row justify-between items-center gap-4">
          <div class="flex flex-row items-center gap-2">
            <FilmIcon class="size-6 text-gray-light" />
            <label>Enable lasts seasons added</label>
          </div>
          <Switch v-model="authStore.user.homePageEnableLastsSeasons" />
        </div>
      </div>
    </section>
    <hr>
    <section>
      <h2 class="text-xl font-bold mb-6">Danger zone</h2>
      <div class="flex flex-row flex-wrap items-center gap-x-8 gap-y-4 my-4 mx-2">
        <button
          class="text-light p-2 rounded-lg cursor-pointer bg-danger hover:bg-danger-dark transition-colors duration-200"
          @click="clearLocalData()">
          <span class="mx-2 my-0.5">Delete all local data</span>
        </button>
        <button
          class="text-light p-2 rounded-lg cursor-pointer bg-danger-dark hover:bg-danger-dark transition-colors duration-200"
          @click="deleteAccount()">
          <span class="mx-2 my-0.5">Delete my account</span>
        </button>
      </div>
    </section>

    <BottomActions :updateButton="true" @triggerUpdate="manualUpdate" />
  </div>
</template>

<script setup>
import { watch, onBeforeUnmount, onMounted, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import debounce from '@/composables/debounce'
import BottomActions from '@/components/actions/BottomActionsComponent.vue'
import TopActions from '@/components/actions/TopActionsComponent.vue'
import { FilmIcon } from '@heroicons/vue/24/solid'
import { ChatBubbleBottomCenterIcon } from '@heroicons/vue/24/solid'
import { CalendarDaysIcon } from '@heroicons/vue/24/solid'
import { UsersIcon } from '@heroicons/vue/24/solid'
import { ChartBarIcon } from '@heroicons/vue/24/solid'
import { SquaresPlusIcon } from '@heroicons/vue/24/solid'
import DatePicker from '@/components/fields/DatePickerComponent.vue'
import Switch from '@/components/SwitchComponent.vue'
import { useRouter } from 'vue-router'
import LanguagePicker from '@/components/fields/LanguagePickerComponent.vue'
import StreamingPlatformPicker from '@/components/fields/StreamingPlatformPickerComponent.vue'

const authStore = useAuthStore()
const router = useRouter()

const watched = ref(0)

function clearLocalData() {
  if (confirm("Are you sure you want to delete all local data? You will lose unsaved data and will be disconnected.")) {
    localStorage.clear()
    sessionStorage.clear()
    authStore.logout()
  }
}

function deleteAccount() {
  if (confirm("Are you sure you want to delete your account? You will lose all your data.")) {
    if (prompt("Please type your email to confirm.") === authStore.user.email) {
      if (confirm("Are you really sure? This action is irreversible.")) {
        authStore.deleteAccount()
      }
    } else {
      alert("Emails does not match", 'error')
    }
  }
}

async function manualUpdate() {
  debouncedUpdate.cancel()

  const success = await authStore.updateUser(true)
  if (success) router.push('/')
}

const debouncedUpdate = debounce(() => {
  authStore.updateUser()
}, 10000)

onMounted(() => {
  authStore.fetchUserInfos()
})

onBeforeUnmount(() => {
  debouncedUpdate
});

watch(() => authStore.user,
  () => {
    watched.value += 1
    if (watched.value <= 2) return // Skip the debounce on initial load
    debouncedUpdate();
  },
  { deep: true }
);

</script>