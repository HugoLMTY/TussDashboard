<style>
</style>

<template>
  <Section :title="'Mes projets'" :subtitle="'Regarde mes projets'">
    lame ahh projekts

    <v-row class="mb-10">
      <Card class="col" title="default" default/>
      <Card class="col" title="glass" glass/>
      <Card class="col" title="mesh" mesh/>
    </v-row>

    <v-row class="mb-10">
      <Card class="col-12" title="default" default/>
      <Card class="col-6" title="glass" glass/>
      <Card class="col-6" title="mesh" mesh/>
    </v-row>

    <v-row class="mb-10">
      <Card class="col-12" title="default" default/>
      <Card class="col-12" title="glass" glass/>
      <Card class="col-12" title="mesh" mesh/>
    </v-row>

  </Section>
</template>

<script>
export default {
  components: { },
  props: { },
  data () {
    return {
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {
  }
}
</script>
