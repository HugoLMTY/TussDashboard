<style>
</style>

<template>
  <Page title="Gearout" subtitle="gear up loser">

    <Table
      v-for="(part, i) in parts"
      :key="'table_part_' + i"
      :headers="Object.keys(part)"
      :items="accessories.find(a => a.type === part)?.parts"
    />

  </Page>
</template>

<script lang="ts">

import { Rifle, Parts, IRifle, IPiece, IAccessory } from '~/types/airsoft/airsoft.types'
import { EParts } from '~/types/airsoft/parts.types'

export default {
  components: { },
  props: { },
  data () {
    return {
      rifle: {} as IRifle,
      accessories: [] as { type: EParts, parts: IAccessory[] }[],
      parts: [
        EParts.handguard,
        EParts.stock,
        EParts.outerbarrel,
        EParts.innerbarrel,
        EParts.receiver
      ]
    }
  },
  computed: {
  },
  mounted () {
    this.initRifle()
    this.fetchAccessories()
  },
  methods: {
    initRifle () {
      // no back yet
      this.rifle = {
        id: 'r0',
        img: '',
        name: 'AR-15',
        type: Rifle.ERifleTypes.ar15,
        parts: []
      } as IRifle
    },
    fetchAccessories () {
      // no api yet
      const parts = [ EParts.handguard, EParts.stock, EParts.outerbarrel, EParts.innerbarrel, EParts.receiver ]
      const toGenerate = 6
      parts.forEach(part => {
        const accessories = []
        for (let i = 0; i < toGenerate; i++) {
          accessories.push({
            id: `a${i}`,
            img: '',
            name: `${part} ${i}`,
            link: '',
            type: Parts.EPartsTypes.external,
            part,
          } as IAccessory)
        }
        this.accessories.push({
          type: part,
          parts: accessories
        })
      })
    }
  }
}
</script>
