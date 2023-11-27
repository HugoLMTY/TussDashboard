<style lang="scss">
.draw--container {
  overflow: auto;

  .parts--container {
    overflow-x: auto;
    max-width: inherit;

    .sheet--container {
      padding: 8px 8px;
      
      transition-duration: 0.2s;
    }
  }
}
</style>

<template>
  <Page title="Barrel'inator" subtitle="(not for real guns pls)">

    <!-- ? DRAW -->
    <Card v-if="draw" mesh scroll class="draw--container my-5">
      <div class="parts--container scroll">
        <div class="d-flex align-start justify-start">
          <div v-for="part of externalParts.filter(p => p.show)" :key="'part_' + part.slug" class="sheet--container">
            <v-sheet
                class="text-center"
                rounded
                style="overflow: hidden; color: black"
                :color="'primary lighten-3'"
                height="25"
                :width="(Number(dimensions[part.slug]) * ratio) + 'px'"
              >
                {{ part.name }}
            </v-sheet>
          </div>
        </div>
        <div v-for="part of internalParts.filter(p => p.show)" :key="'part_' + part.slug" class="d-flex align-start justify-start">
          <div class="sheet--container">
            <v-sheet
                v-if="part.show"
                class="text-center"
                rounded
                style="overflow: hidden; color: black"
                :color="'primary lighten-3'"
                height="25"
                :width="(Number(dimensions[part.slug]) * ratio) + 'px'"
              >
                {{ parts.find(p => p.slug === part.slug)?.name }}
            </v-sheet>
          </div>

          <div v-if="part.slug === 'outerbarrel'" class="d-flex">
            <div v-for="(extension, i) of extensions.filter(p => p.show)" :key="'extension_' + i" class="sheet--container">
              <v-sheet
                class="text-center"
                rounded
                style="overflow: hidden; color: black"
                :color="'primary lighten-3'"
                height="25"
                :width="(dimensions.barrelextension[i] * ratio) + 'px'"
              >
                Extension #{{ i + 1 }}
              </v-sheet>
            </div>
          </div>
        </div>
      </div>

      <!-- ? RATIO -->
      <v-slider
        v-model=ratio
        class="ma-10"
        label="Ratio"
        :min="0.1"
        :max="5"
        :step="0.1"
      />
    </Card>

    <!-- ? INPUTS -->
    <div class="row mb-5">

      <!-- ? EXTERNES -->
      <Card glass class="col-12" title="Externe">
        <template #info>
          <Button glass @click="toggleShow('external');"> <v-icon> {{ externalParts.some(p => p.show)  ? 'mdi-eye-off-outline' : 'mdi-eye-outline'}} </v-icon> </Button>
        </template>

        <div class="row">
          <Card
            v-for="part of externalParts"
            :key="'form_' + part.slug"
            :cols="part.cols"
            :title="part.name"
            :class="`col-${part.cols} ${part.show ? '' : 'disabled'}}`"
            glass
          >
            <template #info>
              <v-switch v-model="part.show" :disabled="parts.filter(p => p.show).length <= 1 && part.show" />
            </template>
    
            <div class="row">
              <div
                v-for="unit in units"
                :key="'form_' + part.slug + '_unit_' + unit.slug" 
                class="col"
              >
                <v-text-field
                  type="number"
                  :min="part.range[0]"
                  :label="part.name + ` (${unit.name})`"
                  :disabled="!part.show"
                  :value="getDimension(part.slug, unit.slug)"
                  @input="setDimension(part.slug, $event, unit.slug)"
                />
              </div>
    
              <v-slider
                v-model="dimensions[part.slug]"
                class="col-12"
                :disabled="!part.show"
                :min="part.range[0]"
                :max="part.range[1]"
                :step="1"
              />
            </div>
          </Card>
        </div>
      </Card>

      <!-- ? INTERNES -->
      <Card glass class="col-12" title="Interne">
        <template #info>
          <Button glass @click="toggleShow('internal')"> <v-icon> {{ internalParts.some(p => p.show)  ? 'mdi-eye-off-outline' : 'mdi-eye-outline'}} </v-icon> </Button>
        </template>

        <div class="row">
          <Card
            v-for="part of internalParts"
            :key="'form_' + part.slug"
            :cols="part.cols"
            :title="part.name"
            :class="`col-${part.cols} ${part.show ? '' : 'disabled'}}`"
            glass
          >
            <template #info>
              <v-switch v-model="part.show" :disabled="parts.filter(p => p.show && p.type !== 'extension').length <= 1 && part.show" />
            </template>
    
            <div class="row">
              <div
                v-for="unit in units"
                :key="'form_' + part.slug + '_unit_' + unit.slug" 
                class="col"
              >
                <v-text-field
                  type="number"
                  :min="part.range[0]"
                  :label="part.name + ` (${unit.name})`"
                  :disabled="!part.show"
                  :value="getDimension(part.slug, unit.slug)"
                  @input="setDimension(part.slug, $event, unit.slug)"
                />
              </div>
    
              <v-slider
                v-model="dimensions[part.slug]"
                class="col-12"
                :disabled="!part.show"
                :min="part.range[0]"
                :max="part.range[1]"
                :step="1"
              />
            </div>
          </Card>
        </div>
      </Card>

      <!-- ? EXTENSIONS -->
      <Card glass class="col-12" title="Extensions">
        <template #info>
          <!-- <v-switch v-model="part.show" :disabled="Object.values(show).filter(k => k === true).length <= 1 && part.show" /> -->
          <Button glass disabled @click="addExtension()">+</Button>
        </template>

        <div class="row">
          <Card
            v-for="(part, i) of extensions"
            :key="'form_' + part.slug + '_' + i"
            :cols="part.cols"
            :title="part.name"
            :class="`col-${part.cols} ${part.show ? '' : 'disabled'}}`"
            glass
          >
            <template #info>
              <div class="d-flex" align="center" justify="center">
                <!-- <v-btn class="col-6" icon disabled @click="deleteExtension(part.name)"> <v-icon color="red">mdi-trash-can-outline</v-icon> </v-btn> -->
                <v-switch v-model="part.show" class="col-6" :disabled="parts.filter(p => p.show).length <= 1 && part.show" />
              </div>
            </template>
    
            <div class="row">
              <!-- ? BROKEN -->
              <!-- <div
                v-for="unit in units"
                :key="'form_' + part.slug + '_unit_' + unit.slug" 
                class="col"
              >
                <v-text-field
                  type="number"
                  :min="part.range[0]"
                  :label="part.name + ` (${unit.name})`"
                  :disabled="!part.show"
                  :value="getDimension(part.slug, unit.slug, i)"
                  @input="setDimension(part.slug, $event, unit.slug, i)"
                />
              </div> -->
    
              <v-slider
                v-model="dimensions.barrelextension[i]"
                :label="dimensions.barrelextension[i] + 'mm | ' + Math.round(dimensions.barrelextension[i] / 25.40) + 'in'"
                class="col-12"
                :disabled="!part.show"
                :min="part.range[0]"
                :max="part.range[1]"
                :step="1"
              />
            </div>
          </Card>
        </div>
      </Card>
    </div>

    <!-- ? TABLE -->
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

import {
  ETypes,

  EUnits,
  EUnitsName,
  IUnits,

  EParts,
  EPartsName,
  IParts,

  IDimensions
} from '@/types/barrelinator.types'

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
        innerbarrel: 509,
        outerbarrel: 363,
        barrelextension: [ 110 ]
      }
    }

    const ratio: number = defaultValues.ratio
    const units: IUnits[] = [
      { slug: EUnits.mm, name: EUnitsName.mm },
      { slug: EUnits.in, name: EUnitsName.in }
    ]
  
    const dimensions: IDimensions = {
      [EParts.handguard]: defaultValues.dimensions.handguard,
      [EParts.suppressor]: defaultValues.dimensions.suppressor,
      [EParts.tracer]: defaultValues.dimensions.tracer,
      [EParts.innerbarrel]: defaultValues.dimensions.innerbarrel,
      [EParts.outerbarrel]: defaultValues.dimensions.outerbarrel,
      [EParts.barrelextension]: defaultValues.dimensions.barrelextension
    };

    return {
      draw: true,
      defaultValues,
      ratio,
      units,
      dimensions,
      headers: [] as { text: string, value: string }[],
      parts: [] as IParts[]
    }
  },
  computed: {
    isMobile (): boolean {
      // return this.$vuetify.breakpoint.mdAndDown
      return window.innerWidth <= 960
    },
    isVerySmall (): boolean {
      // return this.$vuetify.breakpoint.smAndDown
      return window.innerWidth <= 600
    },
    internalParts (): IParts[] {
      return this.parts.filter(p => p.type === 'internal')
    },
    externalParts (): IParts[] {
      return this.parts.filter(p => p.type === 'external')
    },
    extensions (): IParts[] {
      return this.parts.filter(p => p.type === 'extension')
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

              case 'diff_total':
                return this.getDimension(EParts.innerbarrel, unit.slug) - (this.getDimension(EParts.handguard, unit.slug) + this.getDimension(EParts.suppressor, unit.slug))
  
              case 'diff_barrel':
                return this.getDimension(EParts.outerbarrel, unit.slug) - this.getDimension(EParts.innerbarrel, unit.slug)

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
          range: [ 100, 800 ],
          type: ETypes.external,
          show: true
        },
        {
          slug: EParts.suppressor,
          name: EPartsName.suppressor,
          cols: this.isVerySmall ? '12' : this.isMobile ? '6' : '4',
          range: [ 50, 300 ],
          type: ETypes.external,
          show: true
        },
        {
          slug: EParts.tracer,
          name: EPartsName.tracer,
          cols: this.isVerySmall ? '12' : this.isMobile ? '6' : '3',
          range: [ 10, 300 ],
          type: ETypes.external,
          show: true
        },
        {
          slug: EParts.innerbarrel,
          name: EPartsName.innerbarrel,
          cols: this.isVerySmall ? '12' : this.isMobile ? '12' : '6',
          range: [ 100, 800 ],
          type: ETypes.internal,
          show: true
        },
        {
          slug: EParts.outerbarrel,
          name: EPartsName.outerbarrel,
          cols: this.isVerySmall ? '12' : this.isMobile ? '12' : '6',
          range: [ 100, 800 ],
          type: ETypes.internal,
          show: true
        },
        {
          slug: EParts.barrelextension,
          name: `${EPartsName.barrelextension} #${this.extensions.length + 1}`,
          cols: this.isVerySmall ? '12' : this.isMobile ? '12' : '6',
          range: [ 50, 200 ],
          type: ETypes.extension,
          show: true
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
          text: 'Différence (canon)',
          value: 'diff_barrel'
        },
        {
          text: 'Différence (total)',
          value: 'diff_total'
        },
      ]
    },

    // ? SHOW
    toggleShow (type: string): void {
      const targetParts = this.parts.filter(p => p.type === type)
      const hasOneActive = targetParts.some(p => p.show)
      console.log({ type, targetParts, hasOneActive })

      this.parts = this.parts
        .map(p => { return p.type === type ? { ...p, show: !hasOneActive } : p })
    },

    // ? EXTENSIONS
    addExtension () {
      this.parts.push({
        slug: EParts.barrelextension,
        name: `${EPartsName.barrelextension} #${this.extensions.length + 1}`,
        cols: this.isVerySmall ? '12' : this.isMobile ? '12' : '6',
        range: [ 50, 200 ],
        type: ETypes.extension,
        show: true
      })
    },
    deleteExtension (name: string) {
      this.parts = this.parts.filter(p => p.name !== name)
    },

    // ? DIMENSIONS / RATIO
    getDimension (type: EParts, unit: EUnits, extension?: number): number {
      const target = type === 'barrelextension' ? this.dimensions.barrelextension[extension || 0] : this.dimensions[type]

      return unit === 'mm' 
        ? Math.round(target) 
        : Math.round(target / 25.40)
    },
    setDimension (type: EParts, value: number, unit: EUnits, extension?: number): void {
      const setValue = (value: number) => ( unit === 'mm' ? value : value * 25.40 )

      if (type === 'barrelextension') {
        this.dimensions.barrelextension[extension || 0] = setValue(value)
      } else {
        this.dimensions[type] = setValue(value)
      }

      console.log({
        dim: this.dimensions
      })

    },

    // ? GLOBAL ACTIONS
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
