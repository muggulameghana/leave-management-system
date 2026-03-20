<template>
  <div class="min-h-screen bg-slate-100">
    <NavBar />
    <div class="max-w-3xl mx-auto px-6 py-10">
      <h1 class="text-2xl font-bold text-slate-800 mb-8">My Dashboard</h1>
      <div class="grid grid-cols-3 gap-4 mb-8">
        <div class="bg-white border border-slate-200 rounded-2xl p-5 text-center shadow-sm">
          <p class="text-3xl font-bold text-amber-500 mb-1">{{ counts.pending }}</p>
          <p class="text-slate-500 text-xs font-medium">Pending</p>
        </div>
        <div class="bg-white border border-slate-200 rounded-2xl p-5 text-center shadow-sm">
          <p class="text-3xl font-bold text-green-600 mb-1">{{ counts.approved }}</p>
          <p class="text-slate-500 text-xs font-medium">Approved</p>
        </div>
        <div class="bg-white border border-slate-200 rounded-2xl p-5 text-center shadow-sm">
          <p class="text-3xl font-bold text-red-500 mb-1">{{ counts.rejected }}</p>
          <p class="text-slate-500 text-xs font-medium">Rejected</p>
        </div>
      </div>
      <div class="bg-white border border-slate-200 rounded-2xl p-6 mb-8 shadow-sm">
        <button @click="showForm = !showForm" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-bold text-slate-800">Apply for Leave</h2>
          <span class="text-slate-400 text-2xl font-light">{{ showForm ? "−" : "+" }}</span>
        </button>
        <div v-if="showForm" class="mt-6 space-y-4">
          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-2">Leave Type</label>
            <select v-model="applyForm.leaveType"
              class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-slate-400 transition">
              <option value="" disabled>Select type...</option>
              <option v-for="t in leaveTypes" :key="t" :value="t">{{ t }}</option>
            </select>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-2">Start Date</label>
              <input v-model="applyForm.startDate" type="date"
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-slate-400 transition" />
            </div>
            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-2">End Date</label>
              <input v-model="applyForm.endDate" type="date"
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-slate-400 transition" />
            </div>
          </div>
          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-2">Reason</label>
            <textarea v-model="applyForm.reason" rows="3" placeholder="Brief description..."
              class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-400 transition resize-none"></textarea>
          </div>
          <div v-if="applyError" class="text-red-500 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3">{{ applyError }}</div>
          <div v-if="applySuccess" class="text-green-600 text-sm bg-green-50 border border-green-200 rounded-xl px-4 py-3">{{ applySuccess }}</div>
          <button @click="submitLeave"
            class="w-full py-3 bg-slate-800 text-white font-semibold rounded-xl hover:bg-slate-700 transition disabled:opacity-50"
            :disabled="applying">
            {{ applying ? "Submitting..." : "Submit Application →" }}
          </button>
        </div>
      </div>
      <h2 class="text-lg font-bold text-slate-800 mb-4">My Leave History</h2>
      <div v-if="loading" class="text-slate-400 text-sm text-center py-12">Loading...</div>
      <div v-else-if="!leaves.length" class="bg-white border border-slate-200 rounded-2xl p-10 text-center text-slate-400 text-sm shadow-sm">
        No leave applications yet.
      </div>
      <div v-else class="space-y-3">
        <LeaveCard v-for="l in leaves" :key="l._id" :leave="l" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted, reactive } from "vue"
import NavBar from "../components/NavBar.vue"
import LeaveCard from "../components/LeaveCard.vue"
import { leaveAPI } from "../api/index.js"
const leaves = ref([])
const loading = ref(true)
const showForm = ref(false)
const applying = ref(false)
const applyError = ref("")
const applySuccess = ref("")
const leaveTypes = ["Sick Leave","Casual Leave","Annual Leave","Maternity Leave","Other"]
const applyForm = reactive({ leaveType: "", startDate: "", endDate: "", reason: "" })
const counts = computed(() => ({
  pending:  leaves.value.filter(l => l.status === "Pending").length,
  approved: leaves.value.filter(l => l.status === "Approved").length,
  rejected: leaves.value.filter(l => l.status === "Rejected").length,
}))
async function fetchLeaves() {
  try { const { data } = await leaveAPI.getAll(); leaves.value = data.leaves }
  finally { loading.value = false }
}
async function submitLeave() {
  applyError.value = ""; applySuccess.value = ""
  if (!applyForm.leaveType || !applyForm.startDate || !applyForm.endDate || !applyForm.reason) {
    applyError.value = "All fields are required."; return
  }
  applying.value = true
  try {
    await leaveAPI.apply({ ...applyForm })
    applySuccess.value = "Application submitted successfully!"
    Object.assign(applyForm, { leaveType: "", startDate: "", endDate: "", reason: "" })
    await fetchLeaves()
    setTimeout(() => { showForm.value = false; applySuccess.value = "" }, 2000)
  } catch (e) {
    applyError.value = e.response?.data?.message || "Submission failed."
  } finally { applying.value = false }
}
onMounted(fetchLeaves)
</script>