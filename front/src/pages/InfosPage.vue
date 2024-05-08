<template>
  <div>
    <h1 class="text-2xl font-bold text-light">Infos</h1>
    <section>
      <p>{{ SITE_NAME }} is a unique web application crafted with Vue.js and Node.js, designed to capture and preserve
        life's memorable moments in a delightful and secure way. With a focus on encapsulating memories into four
        distinct
        seasons - Spring, Summer, Autumn, and Winter - the app offers users a nostalgic journey through their past
        experiences.</p>
      <p>This web app is meant for personal use only. It is not intended for commercial purposes.</p>
    </section>

    <section>
      <h2 class="text-xl font-bold text-light my-4">Key Features:</h2>
      <ul class="list-disc list-inside">
        <li>Seasonal Organization: Seamlessly organize memories into four seasons, reflecting the changing landscapes of
          life.</li>
        <li>Event Cataloging: Capture significant events, from birthdays to vacations, and associate them with specific
          seasons for easy retrieval.</li>
        <li>Personnel Integration: Remember the people who made those moments special by tagging them along with events,
          fostering connections between memories and individuals.</li>
        <li>Musical Memories: Enhance reminiscing sessions by attaching personalized soundtracks to each season, setting
          the mood for reliving cherished moments.</li>
        <li>End-to-End Encryption: Prioritize user privacy and security with robust encryption mechanisms, ensuring that
          all data remains confidential and protected from unauthorized access.</li>
      </ul>
    </section>

    <section>
      <h2 class="text-xl font-bold text-light my-4">How It Works:</h2>
      <ol class="list-decimal list-inside">
        <li>Create Your Seasons: Start by creating a new season for each quarter of the year, providing a canvas for
          your
          memories.</li>
        <li>Add Events: Populate each season with memorable events, whether it's a family gathering, a graduation
          ceremony, or a spontaneous road trip.</li>
        <li>Tag People: Attach the names of friends, family members, or colleagues who shared those moments, fostering a
          sense of community within your memories.</li>
        <li>Set the Mood: Select and link music tracks that resonate with the ambiance of each season, elevating the
          reminiscing experience to new heights.</li>
        <li>Secure Storage: Rest easy knowing that all your data is encrypted, safeguarding your memories against prying
          eyes while maintaining accessibility for your eyes only.</li>
      </ol>
    </section>

    <section>
      <h2 class="text-xl font-bold text-light my-4">Why {{ SITE_NAME }}?</h2>
      <ul class="list-disc list-inside">
        <li>Nostalgic Reflection: Rediscover the magic of past moments by immersing yourself in a chronological journey
          through the seasons of your life.</li>
        <li>Emotional Connection: Strengthen bonds with loved ones as you revisit shared experiences and celebrate the
          relationships that define your journey.</li>
        <li>Privacy Assurance: Trust in our commitment to data security, ensuring that your memories remain private and
          protected in a world of increasing digital vulnerabilities.</li>
      </ul>
    </section>
  </div>
</template>

<script setup>
import { SITE_NAME } from '@/config';
</script>