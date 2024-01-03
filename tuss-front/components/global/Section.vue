<style lang="scss" scoped>
.section::before {
  content: '';
  position: absolute;
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

.section {

  position: relative;
  width: 100% !important;

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
  
    color: $--grey-100;
    text-align: center;
  
    font-size: 51px;
    font-weight: 700;
    line-height: 120%;
    letter-spacing: -0.51px;
  
    margin-bottom: 48px;
  }
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
