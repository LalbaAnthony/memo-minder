import axios from 'axios'
import { VITE_BACK_API_URL } from '@/config';
import { VITE_FRONT_URL } from '@/config';
import { useAuthStore } from '@/stores/auth'

// ? Cannot use vue router to redirect to error page because inject() can only be used inside setup() or functional components

const axiosApi = axios.create({
  baseURL: VITE_BACK_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  validateStatus: function (status) {
    return status >= 200 && status < 500
  },
})

axiosApi.interceptors.request.use((config) => {
  const authStore = useAuthStore()

  if (authStore.authenticated) {
    const token = authStore.token || authStore.user.connectionToken || null
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

function verifyStatus(status) {

  // 401: Unauthorized
  if (status === 401) {
    useAuthStore().logout()
    return false
  }
  
  // 204: No Content (ex: user not found)
  if (status === 204) {
    return false
  }

  return true
}

async function get(endpoint, params = {}) {
  if (!endpoint) throw new Error('Please provide an endpoint for the API call')
  if (typeof endpoint !== 'string') throw new Error('Endpoint must be a string')
  if (typeof params !== 'object') throw new Error('Params must be an object')

  try {
    const response = await axiosApi.get(endpoint, { params })

    if (!verifyStatus(response.status)) return

    return {
      data: response.data,
      status: response.status,
    }
  } catch (error) {
    console.error('Error during API call using api.js:', error.stack)
    // window.location.href = `${VITE_FRONT_URL}/error-server`;
  }
}

async function post(endpoint, data = {}) {
  if (!endpoint) throw new Error('Please provide an endpoint for the API call')
  if (typeof endpoint !== 'string') throw new Error('Endpoint must be a string')
  if (typeof data !== 'object') throw new Error('Data must be an object')

  try {
    const response = await axiosApi.post(endpoint, data)

    if (!verifyStatus(response.status)) return

    return {
      data: response.data,
      status: response.status,
    }
  } catch (error) {
    console.error('Error during API call using api.js:', error.stack)
    // window.location.href = `${VITE_FRONT_URL}/error-server`;
  }
}

async function put(endpoint, data = {}) {
  if (!endpoint) throw new Error('Please provide an endpoint for the API call')
  if (typeof endpoint !== 'string') throw new Error('Endpoint must be a string')
  if (typeof data !== 'object') throw new Error('Data must be an object')

  try {
    const response = await axiosApi.put(endpoint, data)

    if (!verifyStatus(response.status)) return

    return {
      data: response.data,
      status: response.status,
    }
  } catch (error) {
    console.error('Error during API call using api.js:', error.stack)
    // window.location.href = `${VITE_FRONT_URL}/error-server`;
  }
}

async function del(endpoint, data = {}) {
  if (!endpoint) throw new Error('Please provide an endpoint for the API call')
  if (typeof endpoint !== 'string') throw new Error('Endpoint must be a string')
  if (typeof data !== 'object') throw new Error('Data must be an object')

  try {
    const response = await axiosApi.delete(endpoint, { data })

    if (!verifyStatus(response.status)) return

    return {
      data: response.data,
      status: response.status,
    }
  } catch (error) {
    console.error('Error during API call using api.js:', error.stack)
    // window.location.href = `${VITE_FRONT_URL}/error-server`;
  }
}

export const api = {
  get,
  post,
  put,
  del,
}
