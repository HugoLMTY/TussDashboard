<style lang="scss">
.draw--container {
  overflow: auto;
}

.part,
.part-card {
/* From https://css.glass */
background: rgba(255, 255, 255, 0.19);
border-radius: 16px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(11.1px);
-webkit-backdrop-filter: blur(11.1px);
}
</style>

<template>
  <Page :title="'Barrel\'inator'" :subtitle="'(not for real guns pls)'">
    <div v-if="draw" class="draw--container">
      <div class="d-flex align-start justify-start">
        <div v-for="part of parts.filter(p => show[p.slug] && p.slug !== 'innerbarrel')" :key="'part_' + part.slug" class="pa-2">
          <v-sheet
              class="text-center"
              rounded
              style="overflow: hidden; color: black"
              :color="'primary lighten-3'"
              height="25"
              :width="(dimensions[part.slug] * ratio) + 'px'"
            >
              {{ part.name }}
          </v-sheet>
        </div>
      </div>
      <div class="d-flex align-start justify-start">
        <div class="pa-2">
          <v-sheet
              v-if="show.innerbarrel"
              class="text-center"
              rounded
              style="overflow: hidden; color: black"
              :color="'primary lighten-3'"
              height="25"
              :width="(dimensions.innerbarrel * ratio) + 'px'"
            >
              {{ parts.find(p => p.slug === 'innerbarrel')?.name }}
          </v-sheet>
        </div>
      </div>
    </div>

    <v-slider
      v-model=ratio
      class="ma-10"
      label="Ratio"
      :min="0.1"
      :max="5"
      :step="0.1"
    />
    
    <div class="row mb-5">
      <Card
        v-for="part of parts"
        :key="'form_' + part.slug"
        :cols="part.cols"
        :title="part.name"
        :class="`col-${part.cols}`"
        glass
      >
        <template #info>
          <v-switch v-model="show[part.slug]" :disabled="['innerbarrel', 'handguard'].includes(part.slug)" />
        </template>

        <div class="row">
          <div
            v-for="unit in units"
            :key="'form_' + part.slug + '_unit_' + unit.slug" 
            class="col"
          >
            <v-text-field
              type="number"
              min="1"
              :label="part.name + ` (${unit.name})`"
              :disabled="!show[part.slug]"
              :value="getDimension(part.slug, unit.slug)"
              @input="setDimension(part.slug, $event, unit.slug)"
            />
          </div>

          <v-slider
            v-model="dimensions[part.slug]"
            class="col-12"
            label="Ratio"
            :min="part.range[0]"
            :max="part.range[1]"
            :step="1"
          />
        </div>
      </Card>
    </div>

    <Card mesh title="Total">
      <v-data-table
        :headers="headers"
        :items="tableValues"
        class="elevation-1"
      />
    </Card>

  </Page>
</template>

<script lang="ts">

import { EUnits, EUnitsName, EParts, EPartsName, IUnits, IParts, IShow, IDimensions } from '@/types/barrelinator.types'

export default {
  components: { },
  props: { },
  data () {
    const defaultValues = {
      ratio: 2,
      dimensions: {
        handguard: 406,
        suppressor: 145,
        tracer: 50,
        innerbarrel: 509
      }
    }

    const ratio: number = defaultValues.ratio
    const units: IUnits[] = [
      { slug: EUnits.mm, name: EUnitsName.mm },
      { slug: EUnits.in, name: EUnitsName.in }
    ]

    const show: IShow = {
      [EParts.handguard]: true,
      [EParts.suppressor]: true,
      [EParts.tracer]: true,
      [EParts.innerbarrel]: true
    }
  
    const dimensions: IDimensions = {
      [EParts.handguard]: defaultValues.dimensions.handguard,
      [EParts.suppressor]: defaultValues.dimensions.suppressor,
      [EParts.tracer]: defaultValues.dimensions.tracer,
      [EParts.innerbarrel]: defaultValues.dimensions.innerbarrel,
    };

    return {
      draw: true,
      defaultValues,
      ratio,
      units,
      dimensions,
      show,
      headers: [] as { text: string, value: string }[],
      parts: [] as IParts[]
    }
  },
  computed: {
    isMobile (): boolean {
      return this.$vuetify.breakpoint.mdAndDown
    },
    isVerySmall (): boolean {
      return this.$vuetify.breakpoint.smAndDown
    },  
    tableValues () {
      const values: any = []
      
      this.units.forEach(unit => {
        const current: any = {} 

        this.headers.forEach(header => {
          const getVal = (slug: string) => {
            switch (slug) {
              case 'unit':
                return unit.name
  
              case 'total':
                return (
                  this.getDimension(EParts.handguard, unit.slug) +
                  this.getDimension(EParts.suppressor, unit.slug) +
                  this.getDimension(EParts.tracer, unit.slug)
                )  

              case 'diff':
                return this.getDimension(EParts.innerbarrel, unit.slug) - (this.getDimension(EParts.handguard, unit.slug) + this.getDimension(EParts.suppressor, unit.slug))
  
              default:
                return this.getDimension(slug as EParts, unit.slug)
            }
          }
          current[header.value] = `${getVal(header.value)}${header.value !== 'unit' ? unit.slug : ''}`
        })

        values.push(current)
      })

      return values
    }
  },
  mounted () {
    this.load()
    this.dimensions = { ...this.defaultValues.dimensions }
    this.parts = this.buildParts()
    this.headers = this.buildHeaders()
  },
  methods: {
    buildParts (): IParts[] {
      return [
        {
          slug: EParts.handguard,
          name: EPartsName.handguard,
          cols: this.isVerySmall ? '12' : this.isMobile ? '12' : '5',
          range: [ 100, 800 ]
        },
        {
          slug: EParts.suppressor,
          name: EPartsName.suppressor,
          cols: this.isVerySmall ? '12' : this.isMobile ? '6' : '4',
          range: [ 50, 300 ]
        },
        {
          slug: EParts.tracer,
          name: EPartsName.tracer,
          cols: this.isVerySmall ? '12' : this.isMobile ? '6' : '3',
          range: [ 10, 300 ]
        },
        {
          slug: EParts.innerbarrel,
          name: EPartsName.innerbarrel,
          cols: '12',
          range: [ 100, 800 ]
        }
      ]
    },
    buildHeaders (): { text: string, value: string }[] {
      return [
        {
          text: 'Unité',
          value: 'unit'
        },
        ...this.parts.map(p => ({
          text: p.name,
          value: p.slug
        })),
        {
          text: 'Total externe',
          value: 'total'
        },
        {
          text: 'Différence',
          value: 'diff'
        },
      ]
    },

    setRatio (value: number) {
      this.ratio = value
    },

    getDimension (type: EParts, unit: EUnits): number {
      return unit === 'mm' 
        ? Math.round(this.dimensions[type]) 
        : Math.round(this.dimensions[type] / 25.40)
    },
    setDimension (type: EParts, value: number, unit: EUnits): void {
      this.dimensions[type] = unit === 'mm'
        ? value 
        : value * 25.40
    },

    reset (): void {
      this.ratio = this.defaultValues.ratio
      this.dimensions = { ...this.defaultValues.dimensions }
    },

    saveAsDefault (): void {
      this.defaultValues.ratio = this.ratio
      this.defaultValues.dimensions.handguard = this.dimensions.handguard
      this.defaultValues.dimensions.suppressor = this.dimensions.suppressor
      this.defaultValues.dimensions.tracer = this.dimensions.tracer
      this.defaultValues.dimensions.innerbarrel = this.dimensions.innerbarrel
    },
    
    save (): void {
      localStorage.setItem('ratio', this.ratio.toString())
      localStorage.setItem('dimensions', JSON.stringify(this.dimensions))
    },
    load (): void {
      this.ratio = parseFloat(localStorage.getItem('ratio') || '2')
      this.dimensions = JSON.parse(localStorage.getItem('dimensions') || '{}')
    }
  }
}
</script>
