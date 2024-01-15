import api from './api'

export default {
  async fetchPlaces(params = {}) {
    const res = await api.post(`/arplaces`, { params })
    return res
  },
}
