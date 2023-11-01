<style>
.draw--container {
  overflow: auto;
}
</style>

<template>
  <Page :title="'Barrel\'inator'" :subtitle="'(not for real guns pls)'">
    <div v-if="draw" class="draw--container">
      <div class="d-flex align-start justify-start">
        <div v-for="part of parts.filter(p => show[p.slug] && p.slug !== 'innerbarrel')" class="pa-2">
          <v-sheet
              class="text-center"
              style="overflow: hidden;"
              height="20"
              :width="dimensions[part.slug] * ratio"
            >
              {{ part.name }}
          </v-sheet>
        </div>
      </div>
      <div class="d-flex align-start justify-start">
        <div class="pa-2">
          <v-sheet
              v-if="show.innerbarrel"
              rounded="8"
              class="text-center"
              style="overflow: hidden;"
              height="20"
              :width="dimensions.innerbarrel * ratio"
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
      :style="{ 'font-size': `${ratio}em` }"
      :min="0.1"
      :max="5"
      :step="0.1"
    />
    
    <div v-for="unit of units" class="row my-10">
      <v-col
        v-for="part of parts"
        :cols="part.cols"
      >
      <v-card class="pa-1 ma-1" rounded>
          <v-card-text>
            <div> {{ unit.name }} ({{ unit.slug }}) </div>
            <div class="d-flex">
              <v-switch v-model="show[part.slug]" :disabled="['innerbarrel', 'handguard'].includes(part.slug)" />
              <p class="col text-h5 text--primary" :class="{ 'text--disabled': !show[part.slug] }">{{ part.name }}</p>
            </div>
            <v-text-field
              type="number"
              min="1"
              :label="part.name"
              :disabled="!show[part.slug]"
              :value="getDimension(part.slug, unit.slug)"
              @input="setDimension(part.slug, $event, unit.slug)"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </div>
  </Page>
</template>

<script lang="ts">

enum EUnits {
  mm = 'mm',
  in = 'in'
}
enum EUnitsName {
  mm = 'Millimètre',
  in = 'Pouce'
}
interface IUnits {
  slug: EUnits;
  name: EUnitsName;
}

enum EParts {
  handguard = 'handguard',
  suppressor = 'suppressor',
  tracer = 'tracer',
  innerbarrel = 'innerbarrel'
}
enum EPartsName {
  handguard = 'Garde main',
  suppressor = 'Silencieux',
  tracer = 'Traceur',
  innerbarrel = 'Canon Interne'
}
interface IParts {
  slug: EParts;
  name: EPartsName;
  cols?: string;
}

interface IShow {
  [EParts.handguard]: boolean;
  [EParts.suppressor]: boolean;
  [EParts.tracer]: boolean;
  [EParts.innerbarrel]: boolean;
}

interface IDimensions {
  [EParts.handguard]: number;
  [EParts.suppressor]: number;
  [EParts.tracer]: number;
  [EParts.innerbarrel]: number;
}

export default {
  components: { },
  props: { },
  data () {
    const defaultValues = {
      ratio: 2,
      dimensions: {
        handguard: 254,
        suppressor: 145,
        tracer: 50,
        innerbarrel: 363
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
  
    let dimensions: IDimensions = {
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
      show
    }
  },
  computed: {
    isMobile (): boolean {
      return this.$vuetify.breakpoint.mdAndDown
    },
    isVerySmall (): boolean {
      return this.$vuetify.breakpoint.smAndDown
    },
    parts (): IParts[] {
      return [
        {
          slug: EParts.handguard,
          name: EPartsName.handguard,
          cols: this.isVerySmall ? '12' : this.isMobile ? '12' : '5' 
        },
        {
          slug: EParts.suppressor,
          name: EPartsName.suppressor,
          cols: this.isVerySmall ? '12' : this.isMobile ? '6' : '4' 
        },
        {
          slug: EParts.tracer,
          name: EPartsName.tracer,
          cols: this.isVerySmall ? '12' : this.isMobile ? '6' : '3' 
        },
        {
          slug: EParts.innerbarrel,
          name: EPartsName.innerbarrel,
          cols: '12'
        }
      ]
    }
  
    // parts: IParts[] = 
  },
  mounted () {
    console.log('Component mounted')
  },
  methods: {
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
