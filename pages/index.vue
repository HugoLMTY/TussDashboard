<style lang="scss">
.scroller {
  position: sticky;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 70%);

  border-radius: 50%;

  width: 120px;
  height: 120px;

  display: flex;
  justify-content: center;
  align-items: start;

  z-index: 2;
  background-color: black;
  opacity: 0.1;
  transition-duration: 0.2s;

  &:hover {
    padding-top: 25px;
    
    cursor: pointer;
    opacity: 0.3;

    transform: translate(-50%, 40%);
  }

  &:active {
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.65);

    transition: all 0.1s ease;
    transform: translate(-50%, 40%) scale(0.95);
  }

  & > *.last--ref {
    transform: rotate(180deg) !important;
  }

}

</style>

<template>
  <div>
    <Landing ref="section_landing" />
    <Projects ref="section_projects" />
    <Links ref="section_links" />

    <div class="scroller not-selectable" @click="handleScrollerClick">
      <v-icon ref="scroller--chevron" color="white" size="40">
        mdi-chevron-down
      </v-icon>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  components: {
    Landing: () => import('~/components/home/Landing.vue'),
    Projects: () => import('~/components/home/Projects.vue'),
    Links: () => import('~/components/home/Links.vue'),
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll () {
      const nextRef = this.getNextRef()
      this.$refs['scroller--chevron']?.$el.classList[nextRef ? 'remove' : 'add']('last--ref')
    },
    handleScrollerClick () {
      const refs = Object.keys(this.$refs).filter(ref => ref.includes('section_'))

      const nextRef = this.getNextRef()
      window.scrollTo({
        top: this.$refs[nextRef || refs[0]].$el.offsetTop - 50,
        behavior: 'smooth'
      })
    },
    getNextRef () {
      const refs = Object.keys(this.$refs).filter(ref => ref.includes('section_'))
      const offset = 50
      const refOnScreen = refs.find((ref) => {
        const el = this.$refs[ref].$el
        const elTop = el.getBoundingClientRect().top + offset
        const elBottom = el.getBoundingClientRect().bottom - offset
        const isOnScreen = elTop < window.innerHeight && elBottom > 0
        return isOnScreen
      })
      return refs[refs.indexOf(refOnScreen) + 1]
    }
  },

}
</script>
