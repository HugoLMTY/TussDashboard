<style>
</style>

<template>
  <Section :title="'Mes liens'" :subtitle="'Pour rien rater de mes masterclasses'">
    ( ͡° ͜ʖ ͡°)

    <v-row class="my-10" align="center" justify="center">
      <Button class="col" title="default" default />
      <Button class="col" title="default outlined" default outlined />

      <Button class="col" title="secondary" secondary />
      <Button class="col" title="secondary outlined" secondary outlined />

      <Button class="col" title="glass" glass/>
    </v-row>

    <v-row class="my-10" align="center" justify="center">
      <Button class="col" title="disabled default" default disabled/>
      <Button class="col" title="disabled default outlined" default outlined disabled/>

      <Button class="col" title="disabled secondary" secondary disabled/>
      <Button class="col" title="disabled secondary outlined" secondary outlined disabled/>

      <Button class="col" title="disabled glass" glass disabled/>
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
