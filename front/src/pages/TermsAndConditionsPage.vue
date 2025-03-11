<template>
  <div>
    <section>
      <h1 class="text-2xl font-bold mb-4">1. Acceptance of Terms</h1>
      <p>
        By using {{ VITE_APP_NAME }}, you acknowledge that you have read, understood, and agreed to these Terms. We may
        update these Terms at any time, and your continued use of the Service constitutes acceptance of the changes.
      </p>
    </section>

    <section>
      <h1 class="text-2xl font-bold mb-4">2. No Liability</h1>
      <p>
        We provide this Service "as is" and "as available." We disclaim all liability for any losses, damages, or harm
        caused by the use of this Service. We are not responsible for user-generated content, third-party interactions,
        or
        any unlawful, harmful, or misleading activity conducted on or through this platform.
      </p>
    </section>

    <section>
      <h1 class="text-2xl font-bold mb-4">3. User Responsibility</h1>
      <p>
        You are solely responsible for your actions when using the Service. This includes compliance with all
        applicable
        laws and regulations. We are not liable for any misuse, data loss, security breaches, or other consequences
        resulting from your activity.
      </p>
    </section>

    <section>
      <h1 class="text-2xl font-bold mb-4">4. Account Registration</h1>
      <p>
        If you create an account, you must provide accurate information and keep it secure. We are not responsible for
        unauthorized access to your account.
      </p>
    </section>

    <section>
      <h1 class="text-2xl font-bold mb-4">5. No Warranties</h1>
      <p>
        We do not guarantee that the Service will be uninterrupted, error-free, secure, or suitable for any particular
        purpose. Use it at your own risk.
      </p>
    </section>

    <section>
      <h1 class="text-2xl font-bold mb-4">6. Third-Party Links and Content</h1>
      <p>
        The Service may contain links to third-party websites or content. We do not endorse or take responsibility for
        any
        third-party materials.
      </p>
    </section>

    <section>
      <h1 class="text-2xl font-bold mb-4">7. Termination</h1>
      <p>
        We reserve the right to terminate accounts or restrict access at our sole discretion, without notice, for any
        reason.
      </p>
    </section>

    <section>
      <h1 class="text-2xl font-bold mb-4">8. Indemnification</h1>
      <p>
        You agree to indemnify and hold harmless {{ VITE_APP_NAME }} and its owners, employees, and affiliates from
        any
        claims, damages, or expenses arising from your use of the Service.
      </p>
    </section>


    <section>
      <h1 class="text-2xl font-bold mb-4">9. Contact</h1>
      <p>
        For questions regarding these Terms, check <a :href="VITE_GIT_REPO" target="_blank"
        class="text-light text-primary">the GitHub repository</a>.
      </p>
    </section>

    <section>
      <h1 class="text-2xl font-bold mb-4">10. Last but not least</h1>
      <p>
        By using this Service, you acknowledge and accept these Terms and Conditions. If you disagree, discontinue use
        immediately.
      </p>
    </section>

  </div>
</template>

<script setup>
import { VITE_APP_NAME, VITE_GIT_REPO } from '@/config';
</script>