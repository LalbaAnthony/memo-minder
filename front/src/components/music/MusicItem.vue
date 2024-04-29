<template>
  <div :class="`${props.platform}-item flex justify-between border-2 border-gray p-4 rounded-lg bg-light-dark p-2`"
    @click="openLink()">
    <div>
      <h1 class="text-2xl font-bold">{{ props.music.title }}</h1>
      <p class="text-light-gray">{{ props.music.artist }}</p>
    </div>
    <div :class="`flex items-center justify-center gap-4 p-2 pr-4 ${props.platform}-logo`">
      <svg v-if="props.platform === 'spotify'" xmlns="http://www.w3.org/2000/svg" width="40" height="40"
        fill="currentColor" viewBox="0 0 16 16">
        <path
          d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.669 11.538a.5.5 0 0 1-.686.165c-1.879-1.147-4.243-1.407-7.028-.77a.499.499 0 0 1-.222-.973c3.048-.696 5.662-.397 7.77.892a.5.5 0 0 1 .166.686m.979-2.178a.624.624 0 0 1-.858.205c-2.15-1.321-5.428-1.704-7.972-.932a.625.625 0 0 1-.362-1.194c2.905-.881 6.517-.454 8.986 1.063a.624.624 0 0 1 .206.858m.084-2.268C10.154 5.56 5.9 5.419 3.438 6.166a.748.748 0 1 1-.434-1.432c2.825-.857 7.523-.692 10.492 1.07a.747.747 0 1 1-.764 1.288" />
      </svg>
      <svg v-else-if="props.platform === 'apple'" xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
        <path
          d="M6 13c0 1.105-1.12 2-2.5 2S1 14.105 1 13s1.12-2 2.5-2 2.5.896 2.5 2m9-2c0 1.105-1.12 2-2.5 2s-2.5-.895-2.5-2 1.12-2 2.5-2 2.5.895 2.5 2" />
        <path fill-rule="evenodd" d="M14 11V2h1v9zM6 3v10H5V3z" />
        <path d="M5 2.905a1 1 0 0 1 .9-.995l8-.8a1 1 0 0 1 1.1.995V3L5 4z" />
      </svg>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  music: {
    type: Object,
    required: true,
  },
  platform: {
    type: String,
    possibleValues: ['spotify', 'apple'],
    default: 'spotify',
    required: true,
  },
})

function openLink() {
  window.open(props.music.streaming_link, '_blank');
}

</script>

<style scoped>
div.spotify-item:hover {
  background-color: #080808;
}

div.spotify-item:hover .spotify-logo {
  color: #1DD05D;
}

div.apple-item:hover {
  background-color: #FB3D55;
}

div.apple-item:hover .apple-logo {
  color: #FFFFFF;
}
</style>
