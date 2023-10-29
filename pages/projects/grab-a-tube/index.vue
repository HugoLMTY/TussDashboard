<style>
</style>

<template>
  <div align="center">
    <h1 class="mt-10">Grab-A-Tube</h1>
    <p class="text--secondary mb-10"><i>you've never been here</i></p>
    <v-text-field
      v-model="url"
      outlined
      label="URL"
      style="max-width: 69%;"
      placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQn"
      :error="error"
      :loading="loading"
      :error-messages="error ? [message] : []"
      :color="loading ? 'red' : ''"
    />
    <v-btn
      depressed
      :outlined="!loading"
      :disabled="!url || url.length < 10 || error || loading"
      @click="download"
    >
    Grab It
    <!-- <i v-if="!loading"> Grab It </i>
    <v-progress-circular
      v-else
      :width="2"
      :size="20"
      indeterminate
      color="red"
    /> -->
    </v-btn>
  </div>
</template>

<script>
import ytdl from 'ytdl-core';

export default {
  components: { },
  props: { },
  data () {
    return {
      url: '',
      infos: { },
      loading: false,
      error: false,
      message: '',
    }
  },
  computed: {},
  mounted () {},
  watch: {
    url (val) {
      if (val) {
        this.error = false
      }
    }
  },
  methods: {
    async download () {
      try {
        this.loading = true

        if (!this.url) { return this.handleError('URL requis') }

        const id = this.checkUrl()
        if (!id) { return this.handleError('URL Invalide') }

        const infos = await ytdl.getInfo(id)

        this.loading = false        
        console.log({ id, infos })

      } catch(err) {
        this.handleError(err)
      }
    },
    checkUrl () {
      const url = this.url.split('&')[0]
      const validators = ['youtube.com', 'youtu.be']
      const separators = ['watch?v=', 'youtu.be/']

      if (url.length < 10) return false
      if (url.length === 11) return url
      if (!validators.some(validator => url.includes(validator))) {
        return false
      }

      const separator = separators.find(separator => url.includes(separator))
      if (!separator) return false

      const id = url.split(separator)[1]?.split('?')[0]
      return id
    },  
    handleError (err = null) {
      if (err) { console.log(err) }

      this.message = err?.message || ''
      this.loading = false
      this.error = true
      this.url = ''
    },
  }
}
</script>
