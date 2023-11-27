<style lang="scss">
.button--content {
  font-family: Nunito Sans !important;
  font-weight: bold;

  display: inline-flex;
  
  height: 50px !important;
  min-width: 150px !important;
  max-width: 300px !important;

  padding: 16px 32px;
  justify-content: center;
  align-items: center;
  gap: 8px;

  overflow: hidden;
  border-radius: 12px !important;
  user-select: none;
  transition-duration: 0.2s !important;

  color: whitesmoke;
  backdrop-filter: blur(0);

  &.default {

    &:not(.outlined):not(:hover) {
      background: linear-gradient(135deg, #16AECC 0%, #4D1BFF 100%);
    }

    &:not(.outlined):hover::before,
    &.outlined::before {
      // https://stackoverflow.com/a/66936639 | thanks alot to @TemaniAfif
      content: "";
      position: absolute;
      inset: 0;
      border-radius: 12px;
      padding: 2px;
      background: linear-gradient(135deg, #16AECC 0%, #4D1BFF 100%);
      mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
              mask-composite: exclude;
      pointer-events: none;
    }

    &.outlined:hover {
      box-shadow: 0px 2px 10px 5px rgba(77, 27, 255, 0.30);
    }
  }

  &.alt {
    background-color: var(--primary-base, #4D1BFF) !important;
    box-shadow: 0px 2px 10px 0px rgba(77, 27, 255, 0.30) !important;
    border: 2px solid var(--primary-base, #4D1BFF) !important;

    &:hover,
    &.outlined {
      background: transparent !important;
      border: 2px solid var(--primary-base, #4D1BFF) !important;
    }

    &.outlined:hover {
      box-shadow: 0px 2px 10px 5px rgba(77, 27, 255, 0.30) !important;
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
    <button class="button--content" :class="type" @click="$emit('click')">
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
    disabled: {
      type: Boolean,
      default: false
    },
    outlined: {
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
      const classes = [
        this.outlined ? 'outlined' : '',
        this.disabled ? 'disabled' : ''
      ]
      
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