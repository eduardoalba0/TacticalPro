import axios from 'axios'
import store from '../store.js'

const resolvedBaseURL =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_API_BASE_URL ||
  '/api'

const api = axios.create({
    baseURL: resolvedBaseURL,
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
