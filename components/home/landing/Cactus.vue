<style lang="scss">
.glass {
  border-radius: 60px;
  backdrop-filter: blur($--glass-blur + 1);

  img:hover {
    animation-timing-function: ease-in-out;
    -webkit-animation-timing-function: ease-in-out;
    animation: shake 2s infinite; /* Adjust the duration as you wish */
  }
}
</style>

<template>
  <div class="glass" style="height: 550px; width: 550px">
    <img src="@/assets/illus/cactus.png" alt="">
  </div>
</template>

<script>
export default {
  components: { },
  props: { },
  data () {
    return {
    }
  },
  computed: {
  },
  mounted () {
    console.log('Component mounted')
  },
  methods: {
  }
}
</script>
