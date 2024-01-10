<style>
</style>

<template>
  <Page title="ARPlaces">
    <template #subtitle>
      Tell me where you pew pew <br>
      i'll tell you who you are
    </template>

    <Card mesh title="" class="mb-4">
      <template #info>
        <div class="d-flex flex-wrap">
          <ButtonSlider
            v-model="sortBy"
            class="ml-5 mb-5"
            title="Tri"
            :items="sortOptions"
          />
          <ButtonSlider
            v-model="selectedField"
            class="ml-5 mb-5"
            title="Terrain"
            :items="fields"
          />

        </div>
      </template>

      <Table :headers="headers" :items="mappedGames">
        <template #actions="{ item }">
          <Button gradient class="pa-2" title="Voir" @click="openGame(item)"/>
          <Button glass class="pa-2" title="Copier" @click="copyGame(item)"/>
        </template>
      </Table>
    </Card>
  </Page>
</template>

<script>
import ARPlacesService from '@/services/arplaces'

export default {
  components: { },
  props: { },
  data () {
    return {
      selectedField: 'Tous',
      sortBy: 'date asc',
      fields: [],
      sortOptions: [
        { text: 'Date ↓', value: 'date asc' },
        { text: 'Date ↑', value: 'date desc' },
        { text: 'Places ↓', value: 'places desc' },
        { text: 'Places ↑', value: 'places asc' },
      ],
      headers: [
        { text: 'Terrain', value: 'field' },
        { text: 'Places', value: 'places' },
        { text: 'Date', value: 'date' },
        { text: 'Link', value: 'link' },
        { text: 'Actions', value: 'actions' }
      ],
      games: []
    }
  },
  computed: {
    mappedGames () {
      return this.games
        .filter(({ field }) => {
          if (this.selectedField === 'Tous') return true
          return field === this.selectedField
        })
        .sort((a, b) => {
          if (this.sortBy === 'date asc') return a.fulldate - b.fulldate
          if (this.sortBy === 'date desc') return b.fulldate - a.fulldate
          if (this.sortBy === 'places asc') return a.places - b.places
          if (this.sortBy === 'places desc') return b.places - a.places
        })
    }
  },
  mounted () {
    this.fetch()
  },
  methods: {
    async fetch () {
      const result = await ARPlacesService.fetchPlaces()

      const fields = result.map(({ field }) => field)

      this.fields = ['Tous', ...new Set(fields)]        
      this.games = result
    },
    openGame (game) {
      window.open(game.link, '_blank')
    },
    copyGame (game) {
      navigator.clipboard.writeText(game.link);
    }
  }
}
</script>
