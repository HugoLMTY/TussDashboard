<style>
</style>

<template>
  <Page title="Sandbox" subtitle="pif pouf pas grand chose">

    <div class="d-flex overflow-auto" align="center">
      <Affiche
        v-for="{ title, desc, tags, img } in projects"
        :key="'affiche-' + title"
        class="ma-5"
        :title="title"
        :desc="desc"
        :tags="tags"
        :img="img"
      />
    </div>

  </Page>
</template>

<script>
import Affiche from '@/components/Affiche.vue'

export default {
  components: {
    Affiche
  },
  props: { },
  data () {
    return {
      projects: [
        {
          title: "L'échappée éternelle",
          desc: "Conception d'une affiche avec l'intelligence artificielle",
          tags: [
            'Affiche', 'IntelligenceArtificielle', 'Animation', 'Scolaire'
          ],
          img: 'affiches/clean_1.svg'
        },
        {
          title: "Le chat de ta mère Michelle",
          desc: "L'histoire tragique de la perte d'un chat",
          tags: [
            'Affiche', 'Tragique', 'Chat', 'Scolaire'
          ],
          img: 'affiches/daronne.png'
        },
        {
          title: "Le voleur de l'orange du marchand",
          desc: "L'aventure palpitante d'une orange volée",
          tags: [
            'Affiche', 'Aventure', 'Orange', 'Scolaire'
          ],
          img: 'affiches/chair.png'
        },
        {
          title: "L'assassinat de Jeffrey Epstein",
          desc: "Une affaire plus controversé que Dieudonné",
          tags: [
            'Affiche', 'Controverse', 'Epstein', 'Pas très scolaire'
          ],
          img: 'affiches/night.png'
        }
      ]
    }
  },
  computed: {},
  mounted () {},
  methods: {}
}
</script>
