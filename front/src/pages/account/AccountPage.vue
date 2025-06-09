<template>
  <div>
    <TopActions :goBackButton="true" />

    <section>
      <h2 class="text-xl font-bold my-4">Global</h2>
      <div class="flex flex-row flex-wrap flexitems-center gap-x-8 gap-y-4 m-4">
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
      <h2 class="text-xl font-bold my-4">Parameters</h2>
      <div class="flex flex-row flex-wrap flexitems-center gap-x-8 gap-y-4 m-4">
        <div class="flex flex-row gap-2">
          <input v-model="authStore.user.homePageEnableSpents" name="homePageEnableSpents" type="checkbox" />
          <label for="homePageEnableSpents">Enable life spents on homepage</label>
        </div>
        <div class="flex flex-row gap-2">
          <input v-model="authStore.user.homePageEnableStats" name="homePageEnableStats" type="checkbox" />
          <label for="homePageEnableStats">Enable stats on homepage</label>
        </div>
        <div class="flex flex-row gap-2">
          <input v-model="authStore.user.homePageEnableQuote" name="homePageEnableQuote" type="checkbox" />
          <label for="homePageEnableQuote">Enable quote on homepage</label>
        </div>
        <div class="flex flex-row gap-2">
          <input v-model="authStore.user.homePageEnableUpcomings" name="homePageEnableUpcomings" type="checkbox" />
          <label for="homePageEnableUpcomings">Enable upcoming birthdays on homepage</label>
        </div>
        <div class="flex flex-row gap-2">
          <input v-model="authStore.user.homePageEnableLasts" name="homePageEnableLasts" type="checkbox" />
          <label for="homePageEnableLasts">Enable lasts elements added on homepage</label>
        </div>
      </div>
    </section>
    <hr>
    <hr>
    <section>
      <h2 class="text-xl font-bold my-4">Danger zone</h2>
      <div class="flex flex-row flex-wrap flexitems-center gap-x-8 gap-y-4 m-4">
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
import debounce from '@/composables/debounce.js'
import BottomActions from '@/components/actions/BottomActionsComponent.vue'
import TopActions from '@/components/actions/TopActionsComponent.vue'
import DatePicker from '@/components/fields/DatePickerComponent.vue'
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