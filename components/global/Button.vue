<style lang="scss">

.button--content {
  font-family: Nunito Sans !important;
  font-weight: bold;

  display: inline-flex;
  height: 52px !important;
  width: 163px !important;
  padding: 16px 32px;
  justify-content: center;
  align-items: center;
  gap: 8px;

  border-radius: 12px;
  user-select: none;
  transition-duration: 0.2s !important;

  backdrop-filter: blur(0);
  
  &.default {
    border: 2px double transparent;
    background-origin: border-box;
    background-clip: border-box;
    background-image: linear-gradient(135deg, #16AECC 0%, #4D1BFF 100%);
    box-shadow: 0px 2px 10px 0px rgba(77, 27, 255, 0.30);

    &:hover,
    &.outline {
      border: 2px double transparent;
      background-image: 
        linear-gradient(rgb(13, 14, 33), rgb(13, 14, 33)),
        radial-gradient(circle at left top, #16AECC, #4D1BFF);
      background-clip: padding-box, border-box;
    }
  }

  &.alt {    
    background-color: var(--primary-base, #4D1BFF) !important;
    box-shadow: 0px 2px 10px 0px rgba(77, 27, 255, 0.30) !important;
    border: 2px solid var(--primary-base, #4D1BFF) !important;

    &:hover,
    &.outline {
      background: transparent !important;
      border: 2px solid var(--primary-base, #4D1BFF) !important;
    }
  }

  &.glass {
    border-top: 0.5px solid $--grey-200;
    border-left: 0.5px solid $--grey-200;
    background: linear-gradient(96deg, rgba(77, 27, 255, 0.20) 0%, rgba(255, 255, 255, 0.00) 100%), rgba(255, 255, 255, 0.04);
    backdrop-filter: blur(3px);

    &:hover {
      background: linear-gradient(96deg, rgba(77, 27, 255, 0.20) 0%, rgba(255, 255, 255, 0.05) 100%), rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(13px);
    }
  }
}
</style>

<template>
  <div class="button--container">
    <button class="button--content" :class="type">
      <slot>{{ title }}</slot>
    </button>
  </div>
</template>


<script>
export default {
  components: { },
  props: {
    title: {
      type: String,
      default: 'Example button'
    },
    content: {
      type: String,
      default: 'C’est fou tout les trucs qu’on peut dire avec un clavier'
    },
    outline: {
      type: Boolean,
      default: false
    },
    default: {
      type: Boolean,
      default: false
    },
    secondary: {
      type: Boolean,
      default: false
    },
    glass: {
      type: Boolean,
      default: false
    },
  },
  data () {
    return {
    }
  },
  computed: {
    type () {
      const classes = [this.outline ? 'outline' : '']
      
      if (this.default) return [classes, 'default']
      if (this.secondary) return [classes, 'alt']
      if (this.glass) return [classes, 'glass']

      return [classes, 'default']
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>