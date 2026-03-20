<template>
  <div class="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-10">
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <div class="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-white text-xl mx-auto mb-4">📋</div>
        <h1 class="text-3xl font-bold text-slate-800 mb-1">LeaveFlow</h1>
        <p class="text-slate-500 text-sm">Create your account</p>
      </div>
      <div class="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
        <form @submit.prevent="handleSignup" class="space-y-5">
          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
            <input v-model="form.name" type="text" placeholder="Jane Smith"
              class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-400 transition" required />
          </div>
          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-2">Email</label>
            <input v-model="form.email" type="email" placeholder="you@company.com"
              class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-400 transition" required />
          </div>
          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-2">Password</label>
            <input v-model="form.password" type="password" placeholder="Min. 6 characters"
              class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-400 transition" required />
          </div>
          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-2">I am a...</label>
            <div class="grid grid-cols-2 gap-3">
              <button type="button" @click="form.role = 'employee'"
                :class="['py-3 rounded-xl text-sm font-semibold border transition',
                  form.role === 'employee' ? 'bg-slate-800 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-400']">
                👤 Employee
              </button>
              <button type="button" @click="form.role = 'employer'"
                :class="['py-3 rounded-xl text-sm font-semibold border transition',
                  form.role === 'employer' ? 'bg-slate-800 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-400']">
                🏢 Employer
              </button>
            </div>
          </div>
          <div v-if="auth.error" class="text-red-500 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3">
            {{ auth.error }}
          </div>
          <button type="submit"
            class="w-full py-3 px-6 bg-slate-800 text-white font-semibold rounded-xl hover:bg-slate-700 transition disabled:opacity-50"
            :disabled="auth.loading">
            {{ auth.loading ? "Creating account..." : "Create Account →" }}
          </button>
        </form>
        <p class="text-center text-slate-500 text-sm mt-6">
          Already have an account?
          <router-link to="/login" class="text-slate-800 font-semibold hover:underline ml-1">Sign in</router-link>
        </p>
      </div>
      <p class="text-center text-slate-400 text-xs mt-6">
        <router-link to="/" class="hover:underline">← Back to home</router-link>
      </p>
    </div>
  </div>
</template>
<script setup>
import { reactive } from "vue"
import { useRouter } from "vue-router"
import { useAuthStore } from "../store/auth.js"
const auth = useAuthStore()
const router = useRouter()
const form = reactive({ name: "", email: "", password: "", role: "employee" })
async function handleSignup() {
  try { await auth.signup(form); router.push(auth.isEmployer ? "/employer" : "/employee") } catch {}
}
</script>