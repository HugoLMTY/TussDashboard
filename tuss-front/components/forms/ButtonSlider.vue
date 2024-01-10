<style lang="scss" scoped>
.slider--container {
  min-height: 50px;
  min-width: 250px;

  user-select: none;

  .title {
    color: $--primary-300;

    font-size: 12px;
    font-weight: 500;
    line-height: 130%;

    height: 16px;
  }

  .slider {
    display: flex;
    align-items: flex-start;
    align-self: stretch;

    padding: 3px;

    border-radius: 6px;
    border: 1px solid $--grey-100;

    width: fit-content;

    .item {
      display: flex;
      padding: 8px 12px;
      justify-content: center;
      align-items: center;
      flex: 1 0 0;
      
      transition-duration: 0.2s;

      width: 120px;

      cursor: pointer;

      border-radius: 8px;
      border: 3px solid transparent;

      &.active {
        background: $--primary-400;
        
        span {
          color: $--primary-700 !important;
        }
      }

      span {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        flex: 1 0 0;
        overflow: hidden;
        text-align: center;
        text-overflow: ellipsis;

        /* Small */
        font-size: 12px;
        font-style: normal;
        font-weight: 500;
        line-height: 130%; /* 15.6px */


        color: $--primary-300;
      }
    }
  }

}
</style>

<template>
  <div class="slider--container">
    <p class="title">{{ title }}</p>

    <div class="slider">
      <div
        v-for="item in items"
        class="item"
        :class="{ 'active': typeof item === 'string' ? value === item : value === item.value }"
        @click="$emit('input', typeof item === 'string' ? item : item.value)"
      >
        <span> {{ typeof item === 'string' ? item : item.text }} </span>
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
    value: {
      type: String,
      default: null
    },
    items: {
      type: Array,
      default: null
    },
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
