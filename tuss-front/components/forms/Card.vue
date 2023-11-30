<style lang="scss" scoped>

.card--container {
  display: flex !important;
  flex-direction: column !important;
  gap: 8px !important;
  border-radius: 20px;
  padding: 32px 24px;

  &.default {
    background: $--grey-600;
    z-index: 1;
    backdrop-filter: blur(0);    
  }

  &.mesh {
    position: relative;
    border-radius: calc(20px + $--mesh-offset);
    
    background: 
      linear-gradient(217deg, $--primary-base, rgba(255,0,0,0) 70.71%),
      linear-gradient(127deg, $--primary-200, rgba(0,255,0,0) 60.71%),
      linear-gradient(336deg, $--secondary-base, rgba(0,0,255,0) 90.71%);

    padding: $--mesh-offset $--mesh-offset !important;

    .card--content-container {
      background: $--mesh-opacity;
      border-radius: 20px;
      // padding: calc(32px + $--mesh-offset) calc(24px + $--mesh-offset) !important;
      padding: 32px 24px !important;
    }


    ::after {
      content: '';
      position: absolute;
      top: $--mesh-offset;
      left: $--mesh-offset;
      width: calc(100% - calc($--mesh-offset * 2));
      height: calc(100% - calc($--mesh-offset * 2));
      border-radius: 20px;
      
      margin: auto;
    }
  }

  text-align: left !important;

  .card--title {
    color: $--grey-100;

    font-family: Sora;
    font-size: 28px;
    font-weight: 700;
    line-height: 140%;
    letter-spacing: -0.28px;

    display: flex;
    justify-content: space-between;

    margin-bottom: 10px;

    .card--info {
      color: $--grey-200;

      font-family: Nunito Sans;
      font-size: 18px;
      font-weight: 400;
      line-height: 160%;
      letter-spacing: 0.32px;

      margin-bottom: 24px;

      height: 70px;
    }
    
  }

  .card--content {  
    color: $--grey-100;

    font-family: Nunito Sans !important;
    font-size: 16px;
    font-weight: 400;
    line-height: 160%;
    letter-spacing: 0.32px;
  }
}
</style>

<template>
  <div>
    <div v-if="type !== 'mesh'" class="card--container" :class="[type]">
      <h4 class="card--title">
        <slot name="title">{{ title }}</slot>
        <div class="card--info">
          <slot name="info">{{ info }}</slot>
        </div>
      </h4>
      <div class="card--content">
        <slot>{{ content }}</slot>
      </div>
    </div>
    
    <div v-else class="card--container" :class="[type]">
      <div class="card--content-container">
        <h4 class="card--title">
          <slot name="title">{{ title }}</slot>
          <div class="card--info">
            <slot name="info">{{ info }}</slot>
          </div>
        </h4>
        <div class="card--content">
          <slot>{{ content }}</slot>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  components: { },
  props: {
    title: {
      type: String,
      default: null
    },
    info: {
      type: String,
      default: null
    },
    content: {
      type: String,
      default: null
    },
    default: {
      type: Boolean,
      default: false
    },
    glass: {
      type: Boolean,
      default: false
    },
    mesh: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  },
  computed: {
    type () {
      if (this.default) return 'default'
      if (this.glass) return 'glass'
      if (this.mesh) return 'mesh'

      return 'default'
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>
