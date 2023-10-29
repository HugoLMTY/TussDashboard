<template>
  <v-app dark>
    <v-navigation-drawer
      ref="drawer"
      v-model="drawer"
      :mini-variant="miniVariant"
      app
      permanent
      expand-on-hover
    >
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              <img src="@/assets/pp_small.png" alt="Avatar" style="border-radius: 50%; width: 24px; aspect-ratio: 1/1;">
            </v-list-item-title>
            <v-list-item-title class="text-h6">
              Hugo LE METAYER
            </v-list-item-title>
            <v-list-item-subtitle>
              hugo.lm2707@gmailcom
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

      <v-divider></v-divider>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      drawer: true,
      miniVariant: true,
      items: [
        {
          icon: 'mdi-home',
          title: 'Home',
          to: '/',
        },
        {
          icon: 'mdi-pound-box',
          title: 'Find Your Good Words',
          to: '/projects/fygw',
        },
        {
          icon: 'mdi-barrel',
          title: 'Barrelinator',
          to: '/projects/barrelinator',
        },
        {
          icon: 'mdi-progress-download',
          title: 'Grab-A-Tube',
          to: '/projects/grab-a-tube',
        },
      ],
      title: 'Tuss',
    }
  },
  mounted() {
    this.setTitle()
  },
  watch: {
    $route ({ path }) {
      this.setTitle()
    }
  },
  methods: {
    setTitle () {
      const { path } = this.$route
      this.title = path === '/' ? 'Home' : this.items.find(item => item.to === path).title
    }
  }
}
</script>
