<template>
  <div>
    <TopActions :goBackButton="true" />
    <section>
      <h1 class="text-2xl font-bold mb-2">Terms and conditions</h1>
      <p>
        By using {{ VITE_APP_NAME }}, you agree to <router-link to="/terms-and-conditions"
          class="text-light text-primary">the terms and conditions</router-link>.
      </p>
    </section>
    <section>
      <h1 class="text-2xl font-bold mb-2">Credits</h1>
      <p>
        This web app have been inspired by <a href="https://www.youtube.com/watch?v=X7ZxomW71Vs" target="_blank"
          class="text-light text-primary">this youtube video</a>.
      </p>
    </section>
    <section>
      <h1 class="text-2xl font-bold mb-2">Open source</h1>
      <p>
        {{ VITE_APP_NAME }} is an open source project available in <a :href="VITE_GIT_REPO" target="_blank"
          class="text-light text-primary">GitHub</a>.
      </p>
    </section>
    <section>
      <h1 class="text-2xl font-bold mb-2">Bug report</h1>
      <p>
        If you find a bug, please report it in <a :href="VITE_GIT_REPO + '/issues'" target="_blank"
          class="text-light text-primary">the issues section</a>.
      </p>
    </section>

    <Footer />
  </div>
</template>

<script setup>
import TopActions from '@/components/actions/TopActionsComponent.vue'
import Footer from '@/components/FooterComponent.vue'
import { VITE_APP_NAME, VITE_GIT_REPO } from '@/config';

</script>