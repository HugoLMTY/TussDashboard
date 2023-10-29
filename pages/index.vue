<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="logo py-4 d-flex justify-center">
        <NuxtLogo />
        <VuetifyLogo />
      </v-card>
      <v-card>
        <v-card-title class="headline">
          Bienvenue chez moi, fais pas comme chez toi !
        </v-card-title>
        <hr class="my-3" />
        <v-card-text>
          <p>
            Ici c'est mon bac à sable, il y a un peu de tout mais j'essaye de le ranger (mieux que ma chambre, si possible).
          </p>
          <p>
            Au menu on a:
          </p>

          <ul>
            <li>
              Un générateur d'insulte, en cas de panne d'inspiration.
              <br>
              <nuxt-link to="/projects/fygw"> Find Your Good Words </nuxt-link>
            </li>

            <li>
              Un calculateur de dimensions mm/pouces pour les canons d'airsoft
              <br>
              <nuxt-link to="/projects/barrelinator"> Barrelinator </nuxt-link>
            </li>

            <li>
              Un téléchargeur de vidéo Youtube, c'est pas comme si ça existait déjà. (il est cassé en plus)
              <br>
              <nuxt-link to="/projects/grab-a-tube"> Grab A Tube </nuxt-link>
            </li>
          </ul>

          <div class="mt-3 text-xs-right">
            <em><small>&mdash; Hugo LM</small></em>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'IndexPage'
}
</script>
