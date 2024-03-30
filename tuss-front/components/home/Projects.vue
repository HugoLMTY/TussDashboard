<style>
</style>

<template>
  <Section :title="'Mes projets'" :subtitle="'Regarde mes projets'">
    lame ahh projekts

    <v-row class="mb-10">
      <Card class="col" title="default" default/>
      <Card class="col" title="glass" glass/>
      <Card class="col" title="mesh" mesh/>
    </v-row>

    <v-row class="mb-10">
      <Card class="col-12" title="default" default/>
      <Card class="col-6" title="glass" glass/>
      <Card class="col-6" title="mesh" mesh/>
    </v-row>

    <v-row class="mb-10">
      <Card class="col-12" title="default" default/>
      <Card class="col-12" title="glass" glass/>
      <Card class="col-12" title="mesh" mesh/>
    </v-row>

  </Section>
</template>

<script>
export default {
  components: { },
  props: { },
  data () {
    return {
      projects: [
        {
          name: 'Tuss',
          desc: 'Un site web (lui) pour montrer mes projets et faire un peu ce que je veux',
          img: 'https://picsum.photos/200/300',
          alive: true
        },
        {
          name: 'FYGW',
          desc: 'Un générateur d\'insultes procédural, gérant les insultes à plusieurs mots, différents genres, etc...',
          img: 'https://picsum.photos/200/300',
          alive: true
        },
        {
          name: 'Barrelinator',
          desc: 'Un outil de calcul pour les dimensions de pièces d\'airsoft',
          img: '',
          alive: true
        },
        {
          name: 'Grab-a-tube',
          desc: 'Un downloader de vidéos youtube (légal) (non) (de toute facon il fonctionne plus)',
          img: '',
          alive: false
        },
        {
          name: 'ARPlaces'
        }
      ]
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
