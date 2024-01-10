import axios from 'axios'

export default {
  redirectIfError(err) {
    throw err
    // if (res.status === 401) {
    //   window.location.href = '/'
    // }
  },

  async get(url, params) {
    try {
      const res = await axios.get('http://localhost:3003' + url, {
        params: {
          ...params,
        },
      })
      if (res && res.data) {
        return res.data
      }
    } catch (err) {
      return this.redirectIfError(err)
    }
  },
  async post(url, body) {
    try {
      const res = await axios.post('http://localhost:3003' + url, body)
      if (res && res.data) {
        return res.data
      }
    } catch (e) {
      this.redirectIfError(e.response)
    }
  },
  async put(url, body) {
    try {
      const res = await axios.put('http://localhost:3003' + url, body)
      if (res && res.data) {
        return res.data
      }
    } catch (e) {
      this.redirectIfError(e.response)
    }
  },
  async delete(url, body) {
    try {
      const res = await axios.delete('http://localhost:3003' + url, {
        data: body,
      })
      if (res && res.data) {
        return res.data
      }
    } catch (e) {
      this.redirectIfError(e.response)
    }
  },
}
