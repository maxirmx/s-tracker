// auth.js
import { reactive } from 'vue'

export const state = reactive({
  authorized: false,
  authorize() { this.authorized = true },
  deauthorize() { this.authorized = false }
})
