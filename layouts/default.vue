<style lang="scss">

::-webkit-scrollbar {
  width: 7px;
  border-radius: 20px;
}
::-webkit-scrollbar-track {
  background: $--grey-500;
  border-radius: 20px;
}
::-webkit-scrollbar-thumb {
  background: $--grey-300;
  border-radius: 20px;
}

#app {
  font-family: Sora;

  height: 3429px;

  scroll-behavior: smooth;

  position: relative;
  background: linear-gradient(180deg, rgba(77, 27, 255, 0.12) 0%, rgba(77, 27, 255, 0.00) 50%, rgba(77, 27, 255, 0.00) 100%), $--grey-700;
}

#app::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 180vh;
  background: url(~/assets/illus/background.svg), $--primary-500 0px -30.706px / 100% 112.941% no-repeat;
  background-size: cover;
  background-position: center;
  mask-image: linear-gradient(black, transparent, transparent);
}


</style>

<template>
  <v-app id="app" dark>
    <NavDrawer />
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import NavDrawer from '~/components/global/NavDrawer.vue'

export default {
  name: 'DefaultLayout',
  components: { NavDrawer },
  data() {
    return {
    };
  },
  watch: {},
  mounted() {},
  methods: {
  },
}
</script>
