<style scoped>
.page::before {
  background: none !important;
}
</style>

<template>
  <Page title="ScrIAp" subtitle="skibilipapap">
    <v-text-field
      v-model="prompt"
      outlined
      label="Prompt"
      required
      style="max-width: 69%;"
      placeholder="Ta mère en slip de guerre"
      :error="error"
      :loading="loading"
      :error-messages="error ? [message] : []"
      :color="loading ? 'red' : ''"
    />
    <v-btn
      depressed
      :outlined="!loading"
      :disabled="loading || !prompt?.trim()"
      :loading="loading"
      @click="generate"
    >
      Git Gud
    </v-btn>
    
    <div v-if="generatedImage" class="mt-5">
      <img :src="generatedImage" />
    </div>
  </Page>
</template>

<script>

import ScriapService from '@/services/scriap'

export default {
  components: { },
  props: { },
  data () {
    return {
      prompt: '',
      generatedImage: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-YAI79humZBwai7n7BcHVv4Aw/user-i5R97kyrHV69jSTvbYRESHA5/img-0Q5j7Wv8hF54n415CHuq5wgq.png?st=2024-01-10T08%3A35%3A34Z&se=2024-01-10T10%3A35%3A34Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-01-10T02%3A32%3A39Z&ske=2024-01-11T02%3A32%3A39Z&sks=b&skv=2021-08-06&sig=HG00cY4Q/RJohfcx9wBVCQpIUMpDNq3CclYAyynmtLk%3D',
      loading: false,
      error: false,
      message: '',
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {
    async generate () {
      this.loading = true
      this.error = false
      this.message = ''
      try {
        const p = this.prompt.replace(/ /g, '_')
        const result = await ScriapService.generateImage(p)
        console.log({ result })

        this.generatedImage = result?.data?.[0]?.url
      } catch (e) {
        this.error = true
        this.message = e.message
      } finally {
        this.loading = false
      }
    },
  }
}
</script>
