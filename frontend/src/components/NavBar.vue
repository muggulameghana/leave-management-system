<template>
  <nav class="bg-white border-b border-slate-200 sticky top-0 z-50">
    <div class="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center text-white text-sm">📋</div>
        <span class="text-lg font-bold text-slate-800">LeaveFlow</span>
      </div>
      <div class="flex items-center gap-4">
        <span class="text-sm text-slate-600">
          {{ auth.user?.name }}
          <span class="ml-2 px-2 py-0.5 rounded-full text-xs font-semibold border"
            :class="auth.isEmployer ? 'border-purple-300 text-purple-700 bg-purple-50' : 'border-blue-300 text-blue-700 bg-blue-50'">
            {{ auth.user?.role }}
          </span>
        </span>
        <button @click="logout"
          class="px-4 py-1.5 text-sm border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition">
          Sign out
        </button>
      </div>
    </div>
  </nav>
</template>
<script setup>
import { useAuthStore } from "../store/auth.js"
import { useRouter } from "vue-router"
const auth = useAuthStore()
const router = useRouter()
function logout() { auth.logout(); router.push("/") }
</script>