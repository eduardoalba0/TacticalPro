import axios from 'axios'
import store from '../store.js'

const baseURL = import.meta.env.VITE_API_BASE_URL || ''

const api = axios.create({
  baseURL,
  timeout: 10000,
})

api.interceptors.request.use(
  (config) => {
    const state = store.getState()
    const token = state.auth.token
    if (token != null) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default api
