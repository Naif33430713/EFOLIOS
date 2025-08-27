import { ref } from 'vue'

export const isAuthenticated = ref(false)

const VALID_USER = 'admin'
const VALID_PASS = 'admin123'

export function login(username, password) {
  if (username === VALID_USER && password === VALID_PASS) {
    isAuthenticated.value = true
    return true
  }
  return false
}

export function logout() {
  isAuthenticated.value = false
}