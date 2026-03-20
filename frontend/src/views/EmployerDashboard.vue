<template>
  <div class="min-h-screen bg-slate-100">
    <NavBar />
    <div class="max-w-4xl mx-auto px-6 py-10">
      <h1 class="text-2xl font-bold text-slate-800 mb-8">Employer Dashboard</h1>
      <div class="grid grid-cols-4 gap-4 mb-8">
        <div class="bg-white border border-slate-200 rounded-2xl p-5 text-center shadow-sm">
          <p class="text-3xl font-bold text-slate-800 mb-1">{{ counts.total }}</p>
          <p class="text-slate-500 text-xs font-medium">Total</p>
        </div>
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
      <div class="flex items-center gap-3 mb-6 flex-wrap">
        <h2 class="text-lg font-bold text-slate-800 flex-1">All Leave Requests</h2>
        <div class="flex gap-2">
          <button v-for="f in ['All','Pending','Approved','Rejected']" :key="f"
            @click="filter = f"
            :class="['px-4 py-1.5 rounded-lg text-xs font-semibold transition border',
              filter === f
                ? 'bg-slate-800 text-white border-slate-800'
                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400']">
            {{ f }}
          </button>
        </div>
      </div>
      <div v-if="loading" class="text-slate-400 text-sm text-center py-12">Loading...</div>
      <div v-else-if="!filteredLeaves.length" class="bg-white border border-slate-200 rounded-2xl p-10 text-center text-slate-400 text-sm">
        No requests found.
      </div>
      <div v-else class="space-y-3">
        <LeaveCard v-for="l in filteredLeaves" :key="l._id" :leave="l" :show-actions="true"
          @approve="handleApprove" @reject="handleReject" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from "vue"
import NavBar from "../components/NavBar.vue"
import LeaveCard from "../components/LeaveCard.vue"
import { leaveAPI } from "../api/index.js"
const leaves = ref([])
const loading = ref(true)
const filter = ref("All")
const counts = computed(() => ({
  total:    leaves.value.length,
  pending:  leaves.value.filter(l => l.status === "Pending").length,
  approved: leaves.value.filter(l => l.status === "Approved").length,
  rejected: leaves.value.filter(l => l.status === "Rejected").length,
}))
const filteredLeaves = computed(() =>
  filter.value === "All" ? leaves.value : leaves.value.filter(l => l.status === filter.value)
)
async function fetchLeaves() {
  try { const { data } = await leaveAPI.getAll(); leaves.value = data.leaves }
  finally { loading.value = false }
}
async function handleApprove(id) { await leaveAPI.approve(id); await fetchLeaves() }
async function handleReject(id)  { await leaveAPI.reject(id);  await fetchLeaves() }
onMounted(fetchLeaves)
</script>