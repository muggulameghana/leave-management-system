import { defineStore } from "pinia"
import { authAPI } from "../api/index.js"
export const useAuthStore = defineStore("auth", {
  state: () => ({
    user:    JSON.parse(localStorage.getItem("user") || "null"),
    token:   localStorage.getItem("token") || null,
    loading: false,
    error:   null,
  }),
  getters: {
    isLoggedIn: (s) => !!s.token,
    isEmployer: (s) => s.user?.role === "employer",
    isEmployee: (s) => s.user?.role === "employee",
  },
  actions: {
    async signup(payload) {
      this.loading = true; this.error = null
      try { const { data } = await authAPI.signup(payload); this._save(data); return data }
      catch (e) { this.error = e.response?.data?.message || "Signup failed"; throw e }
      finally { this.loading = false }
    },
    async login(payload) {
      this.loading = true; this.error = null
      try { const { data } = await authAPI.login(payload); this._save(data); return data }
      catch (e) { this.error = e.response?.data?.message || "Login failed"; throw e }
      finally { this.loading = false }
    },
    logout() {
      this.user = null; this.token = null
      localStorage.removeItem("token"); localStorage.removeItem("user")
    },
    _save(data) {
      this.token = data.token; this.user = data.user
      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify(data.user))
    },
  },
})
