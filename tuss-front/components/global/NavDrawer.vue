<style lang="scss">
#nav::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 300vw;
  height: 300vh;
  background: url(~/assets/illus/background.svg), lightgray 0px -30.706px / 100% 112.941% no-repeat;
  mix-blend-mode: color-dodge;
  background-size: cover;
  background-position: center;
  mask-image: linear-gradient(black, transparent, transparent);
}

#nav {
  background: linear-gradient(180deg, rgba(77, 27, 255, 0.12) 0%, rgba(77, 27, 255, 0.00) 50%, rgba(77, 27, 255, 0.00) 100%), $--grey-700;
  position: fixed;
  overflow: hidden;
  backdrop-filter: blur(10px) !important;
  opacity: 0.9;

  border-radius: 0px 16px 16px 0px !important;

  .header {
    user-select: none;
  }

  .v-list-item {

    margin-top: 10px;
    margin-bottom: 10px;

    padding-top: 5px;
    padding-bottom: 5px;

    transition-duration: 0.15s !important;

    img.icon {
      filter: brightness(0.5);
    }

    &:not(.header):hover {
      background: rgba(255, 255, 255, 0.19);
      border-radius: 16px;
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(20px);
    }

    &.active {
      img.icon {
        filter: brightness(1);
      }
    }

    &::before {
      background-color: transparent;
    }
  }
}
</style>

<template>
  <v-navigation-drawer
    id="nav"
    ref="drawer"
    app
    dark
    permanent
    mini-variant
    expand-on-hover
  >    
    <v-list>

      <v-list-item class="header">
        <v-list-item-content>
          <v-list-item-title>
            <img src="@/assets/illus/logo_ai.svg" alt="Avatar" style="border-radius: 50%; width: 27px; aspect-ratio: 1/1;">
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <div v-for="group in Object.keys(groupedItems)" :key="`group_${group}`">

        <v-list-item v-if="group" class="header">
          <v-list-item-content>
            <v-list-item-title>
              {{ group }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        
        <v-list-item
          v-for="({ icon, to, title }, i) in groupedItems[group]"
          :key="i"
          :to="to"
          :active-class="'active'"
          router
          exact
        >
          <v-list-item-action>
            <img class="icon" :src="require(`@/assets/icons/${icon}${isActive(to) ? '_fill' : ''}.svg`)" alt="">
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>{{ title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        
        <v-divider class="mx-2" />

      </div>

      <!-- <v-divider class="mx-2" /> -->

      
      
    </v-list>

    <template #append>
      <v-list-item v-if="false"
        class="settings"
        to="/settings"
        :active-class="'active'"
        router
        exact
      >
        <v-list-item-action>
          <img class="icon" :src="require(`@/assets/icons/settings${isActive('/settings') ? '_fill' : ''}.svg`)">
        </v-list-item-action>

        <v-list-item-content>
          <v-list-item-title>Réglages</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-else
        class="settings"
        :class="{ 'active': flood }"
        @click="flood = !flood"
      >
        <v-list-item-action>
          <img class="icon" :src="require(`@/assets/icons/settings${flood ? '_fill' : ''}.svg`)">
        </v-list-item-action>

        <v-list-item-content>
          <v-list-item-title>Flood</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-navigation-drawer>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      miniVariant: false,
      flood: false,
      items: [
      {
          icon: 'home',
          title: 'Accueil',
          group: '',
          to: '/',
        },
        {
          icon: 'glass',
          title: 'Sandbox',
          group: 'Random',
          to: '/projects/sandbox',
        },
        {
          icon: 'hashtag',
          title: 'Find Your Good Words',
          group: 'Random',
          to: '/projects/fygw',
        },
        {
          icon: 'bubble',
          title: 'Paralafiche',
          group: 'Random',
          to: '/projects/paralafiche',
        },
        {
          icon: 'ruler',
          title: 'Barrelinator',
          group: 'Airsoft',
          to: '/projects/barrelinator',
        },
        {
          icon: 'box',
          title: 'Gearout',
          group: 'Airsoft',
          to: '/projects/gearout',
        },
      ],
    }
  },
  computed: {
    groupedItems () {
      const groups = this.items.reduce((acc, item) => {
        if (!acc[item.group]) {
          acc[item.group] = []
        }
        acc[item.group].push(item)
        return acc
      }, {})
      
      return groups
    }
  },
  watch: {},
  mounted() {},
  methods: {
    isActive (route) {
      return this.$route.path === route
    }
  }
}
</script>
