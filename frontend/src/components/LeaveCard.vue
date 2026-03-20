<template>
  <div class="bg-white border border-slate-200 rounded-2xl p-5 hover:border-slate-300 transition shadow-sm">
    <div class="flex items-start justify-between gap-4">
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-3 mb-2 flex-wrap">
          <span class="font-semibold text-slate-800 text-sm">{{ leave.leaveType }}</span>
          <span :class="{
            'px-2.5 py-0.5 rounded-full text-xs font-semibold border': true,
            'bg-amber-50 text-amber-700 border-amber-200': leave.status === 'Pending',
            'bg-green-50 text-green-700 border-green-200': leave.status === 'Approved',
            'bg-red-50 text-red-700 border-red-200': leave.status === 'Rejected',
          }">{{ leave.status }}</span>
        </div>
        <p class="text-slate-500 text-xs mb-1">
          From {{ fmt(leave.startDate) }} to {{ fmt(leave.endDate) }}
          <span class="text-slate-400 ml-2">· {{ days }} day{{ days !== 1 ? "s" : "" }}</span>
        </p>
        <p class="text-slate-500 text-xs mt-2">{{ leave.reason }}</p>
        <p v-if="leave.userId?.name" class="text-slate-400 text-xs mt-2">
          👤 {{ leave.userId.name }} · {{ leave.userId.email }}
        </p>
      </div>
      <div v-if="showActions && leave.status === 'Pending'" class="flex flex-col gap-2 shrink-0">
        <button @click="$emit('approve', leave._id)"
          class="px-4 py-1.5 bg-green-50 text-green-700 border border-green-200 text-xs font-semibold rounded-lg hover:bg-green-100 transition">
          ✓ Approve
        </button>
        <button @click="$emit('reject', leave._id)"
          class="px-4 py-1.5 bg-red-50 text-red-700 border border-red-200 text-xs font-semibold rounded-lg hover:bg-red-100 transition">
          ✗ Reject
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from "vue"
const props = defineProps({ leave: Object, showActions: { type: Boolean, default: false } })
defineEmits(["approve", "reject"])
const fmt = (d) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
const days = computed(() => Math.ceil((new Date(props.leave.endDate) - new Date(props.leave.startDate)) / 86400000) + 1)
</script>