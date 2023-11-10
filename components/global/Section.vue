<style lang="scss" scoped>

.section {
  min-height: 100vh;
}
.title {
  font-family: Sora !important;

  color: var(--secondary-base, #1BD9FF);
  text-align: center;

  font-size: 21px;
  font-weight: 600;
  line-height: 140%;
  letter-spacing: 1.26px;
  text-transform: uppercase;

  margin-bottom: 8px;
}

.subtitle {
  font-family: Sora !important;

  color: var(--grey-100, #FFF);
  text-align: center;

  font-size: 51px;
  font-weight: 700;
  line-height: 120%;
  letter-spacing: -0.51px;

  margin-bottom: 48px;
}
</style>

<template>
  <div class="section" align="center">
    <h5 class="title">
      <slot name="title">{{ title }}</slot>
    </h5>

    <h2 class="subtitle">
      <slot name="subtitle">{{ subtitle }}</slot>
    </h2>

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
