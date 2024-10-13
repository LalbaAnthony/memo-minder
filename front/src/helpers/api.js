import axios from 'axios'
import { VITE_API_URL } from '@/config';
import { useAuthStore } from '@/stores/auth'

const api = axios.create({
  baseURL: VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const authStore = useAuthStore()

  if (authStore.authenticated) {
    const token = authStore.token || authStore.user.connectionToken || null
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export async function get(endpoint, params = {}) {

  if (!endpoint) throw new Error('Please provide an endpoint for the API call')
  if (typeof endpoint !== 'string') throw new Error('Endpoint must be a string')
  if (typeof params !== 'object') throw new Error('Params must be an object')

  const response = await api.get(`${endpoint}`, { params })

  return {
    data: response.data,
    status: response.status,
  }
}

export async function post(endpoint, data = {}) {

  if (!endpoint) throw new Error('Please provide an endpoint for the API call')
  if (typeof endpoint !== 'string') throw new Error('Endpoint must be a string')
  if (typeof data !== 'object') throw new Error('Data must be an object')

  const response = await api.post(`${endpoint}`, data)

  return {
    data: response.data,
    status: response.status,
  }
}

export async function put(endpoint, data = {}) {

  if (!endpoint) throw new Error('Please provide an endpoint for the API call')
  if (typeof endpoint !== 'string') throw new Error('Endpoint must be a string')
  if (typeof data !== 'object') throw new Error('Data must be an object')

  const response = await api.put(`${endpoint}`, data)

  return {
    data: response.data,
    status: response.status,
  }
}

export async function del(endpoint, data = {}) {

  if (!endpoint) throw new Error('Please provide an endpoint for the API call')
  if (typeof endpoint !== 'string') throw new Error('Endpoint must be a string')
  if (typeof data !== 'object') throw new Error('Data must be an object')

  const response = await api.delete(`${endpoint}`, { data })

  return {
    data: response.data,
    status: response.status,
  }
}


