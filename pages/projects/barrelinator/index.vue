<style>
.break {
  flex-basis: 100%;
}
</style>

<template>
  <div align="center">
    <h1 class="mt-10">Barrel'inator</h1>
    <p class="text--secondary mb-10">(not for real guns pls)</p>
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
    <div v-for="unit of units">
      <div class="row my-10 ">

        <v-card
          v-for="part of parts"
          elevation="1"
          shaped
          class="my-3 mx-2"
          :class="part.classes"
        >
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

      </div>
    </div>
  </div>
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
  classes?: string[];
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
  
    const parts: IParts[] = [
      {
        slug: EParts.handguard,
        name: EPartsName.handguard,
        classes: ['col-5']
      },
      {
        slug: EParts.suppressor,
        name: EPartsName.suppressor,
        classes: ['col']
      },
      {
        slug: EParts.tracer,
        name: EPartsName.tracer,
        classes: ['col']
      },
      {
        slug: EParts.innerbarrel,
        name: EPartsName.innerbarrel,
        classes: ['col-12']
      }
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
      defaultValues,
      ratio,
      units,
      parts,
      dimensions,
      show
    }
  },
  computed: {
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
