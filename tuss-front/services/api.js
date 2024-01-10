import axios from 'axios'

export default {
  redirectIfError(err)
  {
    throw err
    return err
    // if (res.status === 401) {
    //   window.location.href = '/'
    // }
  },

  async get(url, params)
  {
    try {
      console.log({ process: process.env })
      const res = await axios.get('http://localhost:3003' + url, {
        params: {
          ...params
        }
      })
      if (res && res.data) {
        return res.data
      }
    } catch (err) {
      return this.redirectIfError(err)
    }
  },
  async post(url, body)
  {
    try {
      const res = await axios.post(process.env.API_HOST + url, body)
      if (res && res.data) {
        return res.data
      }
    } catch (e) {
      this.redirectIfError(e.response)
    }
  },
  async put(url, body)
  {
    try {
      const res = await axios.put(process.env.API_HOST + url, body)
      if (res && res.data) {
        return res.data
      }
    } catch (e) {
      this.redirectIfError(e.response)
    }
  },
  async delete(url, body)
  {
    try {
      const res = await axios.delete(process.env.API_HOST + url, { data: body })
      if (res && res.data) {
        return res.data
      }
    } catch (e) {
      this.redirectIfError(e.response)
    }
  }
}
