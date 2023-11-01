<style>
</style>

<template>
  <div align="center">
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
