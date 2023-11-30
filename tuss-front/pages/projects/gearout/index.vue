<style lang="scss">

.accessory--container {
  border-radius: 12px;
  overflow: hidden;

  .accessory {
    height: 150px;
  
    padding: 16px;
  
    border-bottom: 0.5px solid #FFF;
    
    display: flex;
    align-items: center;
  
    // gap: 32px;
  
    background: $--grey-600;
  }
}
</style>

<template>
  <Page title="Gearout" subtitle="gear up loser">

    <Card glass title="Builder" class="mb-4">
      <div class="accessory--container">
        <div class="accessory" v-for="accessory in accessories" :accessory="accessories[0]">
          <v-row>
            <v-col cols="2">
              <!-- <img :src="accessories[0].parts[0].img" /> -->
              aze
            </v-col>

            <v-col cols="8">
              <div class="accessory__name">
                {{ accessory.parts[0].name }}
              </div>
            </v-col>

            <v-col cols="2">
              <div class="accessory__action">
                {{ accessory.parts[0].type }}
              </div>
            </v-col>
          </v-row>
        </div>
      </div>
    </Card>

    <Card mesh :title="selectedPart" class="mb-4">
      <template #info>
        <ButtonSlider v-model="selectedPart" title="Part" :items="parts" />
      </template>

      <Table :headers="headers" :items="items" />
    </Card>

  </Page>
</template>

<script lang="ts">

import {
  Rifle,
  Parts,

  IRifle,
  IPiece,
  IAccessory,
} from '~/types/airsoft/airsoft.types'
import { EParts } from '~/types/airsoft/parts.types'

export default {
  components: { },
  props: { },
  data () {
    return {
      headers: [] as { text: string, value: string }[],
      rifle: {} as IRifle,
      accessories: [] as { type: EParts, parts: IAccessory[] }[],
      parts: [
        EParts.handguard,
        EParts.stock,
        EParts.outerbarrel,
        EParts.innerbarrel,
        EParts.receiver
      ],
      selectedPart: '',
    }
  },
  computed: {
    items () {
      return this.accessories.find(a => a.type === this.selectedPart)?.parts
    }
  },
  mounted () {
    this.selectedPart = this.parts[0]
    this.headers = [
      { text: 'Name', value: 'name' },
      { text: 'Type', value: 'type' },
      { text: 'Part', value: 'part' }
    ]
    
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
  },
  watch: {
    selectedPart (val) {
      console.log(val)
    }
  }
}
</script>
