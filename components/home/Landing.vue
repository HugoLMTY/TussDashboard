<style lang="scss">

.landing::before {
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
  z-index: 0;
  pointer-events: none;
}

.landing {
  min-height: 100vh;

  width: 100%;
  margin: auto;

  user-select: none;

  .header,
  .illustration {
    z-index: 2;
  }

  .title {
    font-family: Sora !important;
    font-size: 67px !important;
    font-weight: 700 !important;
    letter-spacing: -0.67px !important;
    line-height: 120% !important;
    margin-bottom: 16px;
    
    max-width: 100%;
  }

  .subtitle {
    font-family: Nunito Sans !important;
    font-size: 16px !important;
    font-weight: 400 !important;
    letter-spacing: 0.32px !important;
    line-height: 160% !important;
    color: $--grey-100 !important;
  }
}
</style>

<template>
  <v-row class="landing" justify="center" align="center">
    <v-col class="header" cols="12" md="6">
      <h1 class="title">
        Welcome chez oim, fais pas comme chez toi
      </h1>

      <span class="subtitle">
        Ici c'est mon bac à sable, 
        il y a un peu de tout mais j'essaye de le ranger
        (mieux que ma chambre, si possible).
      </span>
    </v-col>

    <v-col cols="12" md="6" align="start" justify="center">
      <Cactus />
    </v-col>
  </v-row>
</template>

<script>
import Cactus from '@/components/home/landing/Cactus.vue'

export default {
  components: { Cactus },
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
