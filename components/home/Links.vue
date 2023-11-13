<style>
</style>

<template>
  <Section :title="'Mes liens'" :subtitle="'Pour rien rater de mes masterclasses'">
    ( ͡° ͜ʖ ͡°)

    <v-row class="my-10" align="center" justify="center">

      <Button class="col" title="default" default />
      <Button class="col" title="default outline" default outline />

      <Button class="col" title="secondary" secondary />
      <Button class="col" title="secondary outline" secondary outline />

      <Button class="col" title="glass" glass/>
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
