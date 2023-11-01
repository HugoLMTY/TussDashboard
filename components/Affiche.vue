<style lang="scss" scoped>
.affiche {
  font-family: Sinkin Sans;

  display: flex;
  flex-direction: column;

  position: relative;

  min-width: 368px;
  width: 368px;
  height: 516px;
  padding: 24px;

  overflow: hidden;
  border-radius: 24px;
  
  box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.05);

  img {
    user-select: none;
  }

  &:hover {
    .background {
      filter: brightness(0.5);
    }

    .search {
      top: 50%;
    }
  }

  .background {
    position: absolute;
    top: 0;
    left: 0;
    object-fit: cover;
    height: 100%;

    transition-duration: 0.2s;

    z-index: 0;
  }

  .search {
    position: absolute;
    width: 52px;
    height: 52px;


    top: 150%;
    left: 50%;
    transform: translate(-50%, -50%);
    
    background: #FFF;
    border-radius: 50%;

    transition-duration: 0.4s;

    z-index: 2;

    &:hover {
      cursor: pointer;
    }

    .loupe {
      width: 24px;
      height: 24px;

      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .author {
    border-radius: 50%;
    width: 48px;
    height: 48px;

    position: absolute;
    top: 24px;
    right: 24px;
  }

  .header {
    font-family: 'Sinkin Sans' !important;
    max-width: 240px;

    text-transform: uppercase;
    z-index: 1;

    .subheader {
      font-size: 10px;

      font-weight: 500;
      line-height: 160%;

      letter-spacing: 0.4px;

      user-select: none;
    }

    .header {
      margin-top: 8px;
      margin-bottom: 16px;

      font-size: 20px;
      font-style: normal;

      font-weight: 900;
      line-height: 120%;

      letter-spacing: -0.2px;
    }

    .desc {
      font-family: 'Red Hat Display';

      font-size: 14px;
      font-style: normal;

      font-weight: 500;
      line-height: 140%;

      letter-spacing: 0.56px;
    }
  }

  .footer {
    .tag {
      font-family: 'Red Hat Display';

      margin: 6px;

      user-select: none;

      border-radius: 29.998px !important;
      border: 0.5px solid rgba(255, 255, 255, 0.56) !important;

      background: linear-gradient(101deg, rgba(255, 255, 255, 0.16) 7.64%, rgba(255, 255, 255, 0.13) 94.46%) !important;

      box-shadow: 0px 24px 14px 0px rgba(0, 0, 0, 0.05) !important;
      backdrop-filter: blur(1px) !important;
    }
  }

}
</style>

<template>
  <div class="affiche">
    <img src="@/assets/affiches/clean_1.svg" alt="background" class="background">
    <img src="@/assets/affiches/author.png" alt="author" class="author">
    <div class="search">
      <img src="@/assets/affiches/loupe.svg" alt="search" class="loupe">
    </div>

    <p class="header d-flex flex-column" align="start">
      <span class="subheader">Affiche:</span>
      <span class="header">{{ title }}</span>
      <span class="desc">{{ desc }}</span>
    </p>

    <v-spacer />
    
    <div class="footer" align="start">
      <v-chip class="tag" v-for="tag in tags">#{{  tag  }}</v-chip>
    </div>

  </div>
</template>

<script>
export default {
  components: { },
  props: {
    img: {
      type: String,
      default: '@/assets/pp_small.png'
    },
    title: {
      type: String,
      default: null
    },
    desc: {
      type: String,
      default: null
    },
    tags: {
      type: Array,
      default: () => []
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
