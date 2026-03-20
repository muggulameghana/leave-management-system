import axios from "axios"
const api = axios.create({ baseURL: "/api", headers: { "Content-Type": "application/json" } })
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) { localStorage.clear(); window.location.href = "/login" }
    return Promise.reject(err)
  }
)
export const authAPI = {
  signup: (data) => api.post("/auth/signup", data),
  login:  (data) => api.post("/auth/login",  data),
}
export const leaveAPI = {
  apply:   (data) => api.post("/leaves", data),
  getAll:  ()     => api.get("/leaves"),
  approve: (id)   => api.patch(`/leaves/${id}/approve`),
  reject:  (id)   => api.patch(`/leaves/${id}/reject`),
}
