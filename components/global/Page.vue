<style>
.page::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 120vw;
  height: 100%;
  pointer-events: none;
  
  background: url(~/assets/illus/wavy.svg), 0px -30.706px / 100% 112.941% no-repeat;
  background-size: cover;
  background-position: center;
  mask-image: linear-gradient(transparent, black, transparent);
  min-height: 100vh;

  z-index: 0;
}

.page {
  position: relative;
}
</style>

<template>
  <div class="page" align="center">
    <h1 class="mt-10">
      <slot name="title">{{ title }}</slot>
    </h1>

    <p class="text--secondary mb-10">
      <slot name="subtitle">{{ subtitle }}</slot>
    </p>

    <slot />

  </div>
</template>

<script>
export default {
  components: { },
  props: { 
    title: {
      type: String,
      default: 'Title'
    },
    subtitle: {
      type: String,
      default: 'Subtitle'
    }
  },
  data () {
    return {
    }
  },
  computed: {
  },
  mounted () {
    
  },
  methods: {
  }
}
</script>
