<template>
  <div>
    <TopActions :goBackButton="true" />
    <section>
      <h1 class="text-2xl font-bold mb-4">Terms and conditions</h1>
      <p>
        By using {{ VITE_APP_NAME }}, you agree to the <router-link to="/terms-and-conditions"
          class="text-light text-primary">terms and conditions</router-link>.
      </p>
    </section>
    <section>
      <h1 class="text-2xl font-bold mb-4">Origin</h1>
      <p>
        This web app have been inspired by <a href="https://www.youtube.com/watch?v=UzPWp7g3jBg" target="_blank"
          class="text-light text-primary">this youtube video</a>.
      </p>
    </section>
    <section>
      <h1 class="text-2xl font-bold mb-4">Open source</h1>
      <p>
        {{ VITE_APP_NAME }} is an open source project available in <a :href="VITE_GIT_REPO" target="_blank"
          class="text-light text-primary">GitHub</a>.
      </p>
    </section>
    <section>
      <h1 class="text-2xl font-bold mb-4">Bug report</h1>
      <p>
        If you find a bug, please report it in the <a :href="VITE_GIT_REPO + '/issues'" target="_blank"
          class="text-light text-primary">issues</a> section.
      </p>
    </section>

    <Footer />
  </div>
</template>

<script setup>
import TopActions from '@/components/TopActionsComponent.vue'
import Footer from '@/components/FooterComponent.vue'
import { VITE_APP_NAME, VITE_GIT_REPO } from '@/config';

</script>