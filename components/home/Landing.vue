<style lang="scss">
.landing {
  min-height: 100vh;

  width: 90%;
  margin: auto;

  user-select: none;

  .title {
    font-family: Sora !important;
    font-size: 67px !important;
    font-weight: 700 !important;
    letter-spacing: -0.67px !important;
    line-height: 120% !important;
    margin-bottom: 16px;
    
    max-width: 80%;
  }

  .subtitle {
    font-family: Nunito Sans !important;
    font-size: 16px !important;
    font-weight: 400 !important;
    letter-spacing: 0.32px !important;
    line-height: 160% !important;
    color: var(--grey-100, #FFF) !important;
  }

  .img {
    :hover {
      animation: shake 0.69s;
      animation-iteration-count: infinite;
    }

    @keyframes shake {
      0% { transform: translate(1px, 1px) rotate(0deg); }
      10% { transform: translate(-1px, -2px) rotate(-1deg); }
      20% { transform: translate(-3px, 0px) rotate(1deg); }
      30% { transform: translate(3px, 2px) rotate(0deg); }
      40% { transform: translate(1px, -1px) rotate(1deg); }
      50% { transform: translate(-1px, 2px) rotate(-1deg); }
      60% { transform: translate(-3px, 1px) rotate(0deg); }
      70% { transform: translate(3px, 1px) rotate(-1deg); }
      80% { transform: translate(-1px, -1px) rotate(1deg); }
      90% { transform: translate(1px, 2px) rotate(0deg); }
      100% { transform: translate(1px, -2px) rotate(-1deg); }
    }

    @keyframes squeeze {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }

  }
}
</style>

<template>
  <v-row class="landing" justify="center" align="center">
    <v-col cols="12" md="6">
      <h1 class="title">
        Welcome chez oim, fais pas comme chez toi
      </h1>

      <span class="subtitle">
        Ici c'est mon bac à sable, 
        il y a un peu de tout mais j'essaye de le ranger
        (mieux que ma chambre, si possible).
      </span>
    </v-col>

    <v-col class="img" cols="12" md="6" align="start">
      <img src="@/assets/illus/main_cactus.png" alt="">
    </v-col>
  </v-row>
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
