import api from './api'

export default {
  async generateImage(prompt) {
    console.log('generate ' + prompt)
    const res = await api.get(`/scriap/generate/${prompt}`)

    return res
  },
}
