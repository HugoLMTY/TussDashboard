<style lang="scss">
.main-container {
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100%;
  width: 100%;
}

#render--container {
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100%;
  width: 100%;

}

#img--container {
  position: relative;

margin-top: 15vh;
}

#affiche {
  position: relative;
  border-radius: 12px;
  user-select: none;
  z-index: 2;
}

.deco {
  position: absolute;
  transform-origin: center;

  border-radius: 50%;
  aspect-ratio: 1/1;

  z-index: 3;
}

.selected {
  box-shadow: 0px 0px 10px 2px white;
  transition-duration: 0.3s;
}
</style>

<template>
    <Page title="Paralafiche" subtitle="sa bouj">
    <v-dialog v-model="dialog" width="710">
      <v-card>
        <v-card-title class="ma-3">
          {{ action?.toUpperCase() }}
        </v-card-title>

        <v-card-text>
          <v-text-field v-model="datas" :disabled="action === 'export'" />
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn
            color="primary"
            text
            @click="action = null, dialog = false"
          >
            Fermer
          </v-btn>
          <v-spacer></v-spacer>

          <v-btn
            color="primary"
            text
            @click="action === 'export' ? copy() : confirmImport()"
          >
            {{
              action === 'export'
                ? 'Copier'
                : 'Importer'
            }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-navigation-drawer
      v-model="menu"
      absolute
      right
      :width="500"
      style="z-index: 5"
    >
      <div id="menu--container">
        <v-btn class="my-5" @click="menu = !menu">
          Fermer
        </v-btn>
        
        <v-expansion-panels id="boxshadow_panels">
          <v-expansion-panel>

            <v-expansion-panel-header>
              Box Shadow
            </v-expansion-panel-header>

            <v-expansion-panel-content>
              <v-card-title>
                Box Shadow
                <v-spacer />

                <v-switch v-model="boxShadow.active" />
              </v-card-title>

              <v-row>
                <v-col cols="6">
                  <v-switch v-model="boxShadow.opposite" label="Opposite" :disabled="!boxShadow.active"/>
                </v-col>

                <v-col cols="6">
                  <v-text-field v-model="boxShadow.color" mode="hexa" type="color" label="Couleur" :disabled="!boxShadow.active"/>
                </v-col>

                <v-col cols="12">
                  <v-slider v-model="boxShadow.distance" :hint="String(boxShadow.distance)" persistent-hint max="48" min="1" step="1" label="Distance" :disabled="!boxShadow.active"/>
                </v-col>

                <v-col cols="12">
                  <v-slider v-model="boxShadow.position.x" :hint="String(boxShadow.position.x)" persistent-hint max="50" min="-50" step="1" label="X" :disabled="!boxShadow.active"/>
                </v-col>

                <v-col cols="12">
                  <v-slider v-model="boxShadow.position.y" :hint="String(boxShadow.position.y)" persistent-hint max="50" min="-50" step="1" label="Y" :disabled="!boxShadow.active"/>
                </v-col>
              </v-row>
            </v-expansion-panel-content>

          </v-expansion-panel>
        </v-expansion-panels>

        <v-expansion-panels id="decos_panels" v-model="selected" class="my-5">
          <v-expansion-panel v-for="(deco, i) in decos" :key="'menu_' + deco.id">

            <v-expansion-panel-header>
              {{ deco.name ? deco.name : 'Deco #' + deco.id }}
            </v-expansion-panel-header>

            <v-expansion-panel-content>
              <v-card-title>
                {{ deco.name ? deco.name : 'Deco #' + deco.id }}
                <v-btn icon @click="renameDeco(deco)">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>

                <v-spacer />

                <v-switch v-model="decos[i].active" />
                <v-btn icon color="red" @click="removeDeco(deco)">
                  <v-icon>mdi-trash-can</v-icon>
                </v-btn>
              </v-card-title>

              <v-row class="pa-5">
                <v-col cols="6">
                  <v-switch v-model="decos[i].opposite" label="Opposite" :disabled="!decos[i].active"/>
                </v-col>

                <v-col cols="6">
                  <v-text-field v-model="decos[i].color" type="color" label="Couleur" :disabled="!decos[i].active"/>
                </v-col>

                <v-col cols="6">
                  <v-switch v-model="decos[i].border" label="Bordure" :disabled="!decos[i].active"/>
                </v-col>

                <v-col cols="6">
                  <v-text-field v-model="decos[i].borderColor" mode="hexa" type="color" label="Couleur" :disabled="!decos[i].active"/>
                </v-col>

                <v-col v-for="({ slug, name, range, step }) in fields" :key="'slider_' + slug + '_' + i" cols="12" >
                  <!-- position.x + position.y -->
                  <v-slider
                    v-if="slug.split('.')[1]"
                    v-model="decos[i][slug.split('.')[0]][slug.split('.')[1]]" 
                    :min="range[0]"
                    :max="range[1]"
                    :step="step || 1"
                    :label="name"
                    :hint="String(decos[i][slug.split('.')[0]][slug.split('.')[1]])"
                    :disabled="!decos[i].active"
                    persistent-hint
                  />
                  <v-slider
                    v-else
                    v-model="decos[i][slug]"
                    :min="range[0]"
                    :max="range[1]"
                    :step="step || 1"
                    :label="name"
                    :hint="String(decos[i][slug])"
                    :disabled="!decos[i].active"
                    persistent-hint
                    />
                </v-col>
              </v-row>
            </v-expansion-panel-content>

          </v-expansion-panel>
        </v-expansion-panels>

        <v-btn :disabled="decos.length >= maxDecos" @click="addDeco">
          {{
            decos.length >= maxDecos
              ? `${maxDecos} décos max (pas vraiment opti)`
              : 'Ajouter une déco'
          }}
        </v-btn>

        <v-row class="mt-5">
          <v-col>
            <v-btn color="primary" @click="exportSettings()" >Export</v-btn>
          </v-col>
          <v-col>
            <v-btn color="secondary" @click="importSettings()" >Import</v-btn>
          </v-col>
          <v-col>
            <v-btn color="danger" @click="reset()" >Reset</v-btn>
          </v-col>
        </v-row>

        <v-row class="mt-5">
          <v-col>
            <v-btn color="purple" @click="save()" >Save</v-btn>
          </v-col>
          <v-col>
            <v-btn color="teal" @click="load()" >Load</v-btn>
          </v-col>
        </v-row>
      </div>
    </v-navigation-drawer>

    <Button glass @click="menu = !menu">
      Menu
    </Button>

    <div v-if="decos.length" id="render-container">
      <div id="img--container">
        <div
          v-for="(deco, i) in decos"
          :key="'deco_' + deco.id"
          :ref="'deco_' + deco.id"
          class="deco"
          :class="{ 'selected': selected === i}"
        />
        <img id="affiche" src="@/assets/illus/pp_small.png" />
      </div>
    </div>

  </Page>
</template>

<script>
export default {
  components: { },
  props: { },
  data () {
    return {
      menu: false,

      dialog: false,
      action: null,
      datas: '',
      
      selected: null,
      maxDecos: 8,

      fields: [
        {
          slug: 'opposite',
          name: 'Opposite',
          range: [1, 10]
        },
        {
          slug: 'zindex',
          name: 'Couche',
          range: [1, 5]
        },
        {
          slug: 'size',
          name: 'Taille',
          range: [1, 100]
        },
        {
          slug: 'distance',
          name: 'Distance',
          range: [1, 40]
        },
        {
          slug: 'position.x',
          name: 'X',
          range: [ -200, 200 ]
        },
        {
          slug: 'position.y',
          name: 'Y',
          range: [ -200, 200 ]
        }
      ],
      decos: [],
      boxShadow: {
        active: true,
        opposite: false,
        color: '#F33136',
        distance: 25,
        position: { x: 0, y: 0 }
      },
      baseDecos: [
      ]
    }
  },
  computed: {},
  watch: {
    menu (state) {
      if (!state) {
        this.selected = null
      }
    }
  },
  mounted () {
    // this.decos = JSON.parse(JSON.stringify(this.baseDecos))
    const saved = localStorage.getItem('paralafiche')
    if (saved) {
      const { decos, boxShadow } = JSON.parse(saved)
      this.decos = decos
      this.boxShadow = boxShadow
    } else {
      const randomCount = Math.floor(Math.random() * (this.maxDecos - 2) + 2)
      for (let i = 0; i < randomCount; i++) {
        this.addDeco()
      }
    }

    document.addEventListener('mousemove', (e) => this.onMove(e))
    this.onMove()
  },
  destroyed () {
    document.removeEventListener('mousemove', () => {})
  },
  methods: {
    onMove (e = { clientX: 0, clientY: 0}) {
      const container = document.getElementById('img--container')
      if (!container) return

      const mouse = {
        x: (e.clientX) - (container.offsetLeft + container.clientWidth / 2),
        y: (e.clientY) - (container.offsetTop + container.clientHeight / 2)
      }
      const affiche = document.getElementById('affiche')
      // const distance = Math.sqrt(mouse.x * mouse.x + mouse.y * mouse.y) / 20000;
      const distance = {
        x: Math.abs(mouse.x) / 20000,
        y: Math.abs(mouse.y) / 20000
      }

      this.drawBoxShadow({ mouse, affiche })
      this.drawDecos({ mouse, container, distance })
    },

    // -| ? |---------------------- DRAWING
    drawBoxShadow ({ mouse, affiche }) {
      if (!this.boxShadow.active) {
        affiche.style.boxShadow = '0px 0px 0px 0px'
      } else {
        const { color, distance, opposite, position } = this.boxShadow

        const getDistance = (axis) => {
          const d = mouse[axis] / (50 - distance)

          return opposite ? -d : d
        }
        
        const x = position.x + getDistance('x')
        const y = position.y + getDistance('y')

        affiche.style.boxShadow = `${x}px ${y}px 0px 0px ${color}`
      }
    },

    drawDecos ({ mouse, container, distance }) {
      this.decos
      .forEach(deco => {
        const el = this.$refs['deco_' + deco.id][0]
        if (!el) return
        if (!deco.active) { el.style.width = '0px'; el.style.border = 'none'; return }

        const offset = (axis) => {
          const base = container[axis === 'x' ? 'clientWidth' : 'clientHeight'] / 2
          const center = base - (deco.size / 2)
          const position = center + deco.position[axis]
      
          const cursor = mouse[axis]
      
          // const multiplicator = distance * (deco.distance / 10) 
          const multiplicator = distance[axis] * (deco.distance / 10)
          const offset = deco.opposite ? -multiplicator : multiplicator

          return (position + cursor * offset) + 'px'
        }

        if (deco.border) {
          el.style.border = `1px solid ${deco.borderColor}`
        } else {
          el.style.border = 'none'
        }

        el.style.left = offset('x')
        el.style.top = offset('y')
        el.style.width = deco.size + 'px'
        el.style.backgroundColor = deco.color
        el.style.zIndex = deco.zindex
      })
    },

  
    // -| ? |---------------------- DECO HANDLING
    addDeco() {
      const random = (slug) => {
        const { range } = this.fields.find(f => f.slug === slug)
        return Math.floor(Math.random() * (range[1] - range[0]) + range[0])
      }

      this.decos.push({ 
        id: this.decos.length + 1,
        name: '',
        active: true,
        opposite: Math.random() >= 0.5,
        color: '#' + Math.floor(Math.random()*16777215).toString(16),
        zindex: random('zindex'),
        size: random('size'),
        distance: random('distance'),
        position: {
          x: random('position.x'),
          y: random('position.y')
        }
      })
    },

    removeDeco ({ id, name }) {
      const remove = confirm(`Supprimer ${ name || `Deco #${id}` } ?`)
      if (!remove) return

      this.decos = this.decos.filter(d => d.id !== id)
    },

    renameDeco ({ id }) {
      const target = this.decos.find(d => d.id === id)
      if (!target) return alert('Pa trouvé')

      const name = prompt('Quel nom ?')
      if (name) { target.name = name; return }

      if (!target.name) return
      
      const reset = confirm('Supprimer le nom ?')
      if (reset) { target.name = ''; }
    },
    
    // -| ? |---------------------- GLOBAL ACTIONS
    exportSettings () {
      this.action = 'export'

      this.datas = JSON.stringify({
        decos: this.decos,
        boxShadow: this.boxShadow
      })

      this.dialog = true
    },
    copy () {
      navigator.clipboard.writeText(this.datas);
      this.dialog = false
      this.action = null
    },

    importSettings () {
      this.action = 'import'
      
      this.dialog = true
    },
    confirmImport() {
      const datas = JSON.parse(this.datas)

      this.decos = datas.decos
      this.boxShadow = datas.boxShadow

      this.dialog = false
      this.action = null
    },

    save () {
      localStorage.setItem('paralafiche', JSON.stringify({
        decos: this.decos,
        boxShadow: this.boxShadow
      }))
    },
    load () {
      const saved = localStorage.getItem('paralafiche')
      if (!saved) return

      const { decos, boxShadow } = JSON.parse(saved)
      this.decos = decos
      this.boxShadow = boxShadow
    },

    reset () {
      this.decos = this.baseDecos
    }
    
  }
}
</script>
