<template>
  <div class="min-h-screen bg-slate-100 text-slate-900 font-sans">
    <!-- Navbar -->
    <nav class="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center text-white text-sm">📋</div>
        <span class="text-xl font-bold text-slate-800">LeaveFlow</span>
      </div>
      <div class="flex gap-3 items-center">
        <router-link to="/login" class="px-4 py-2 text-sm text-slate-600 hover:text-slate-900 font-medium transition">Sign In</router-link>
        <router-link to="/signup" class="px-5 py-2 text-sm bg-slate-800 text-white font-semibold rounded-lg hover:bg-slate-700 transition">Get Started</router-link>
      </div>
    </nav>
    <!-- Hero -->
    <section class="text-center py-24 px-6">
      <div class="inline-block px-4 py-1 bg-white border border-slate-300 rounded-full text-slate-500 text-xs font-semibold uppercase tracking-widest mb-8">
        Leave Management
      </div>
      <h1 class="text-5xl font-extrabold text-slate-900 mb-6 leading-tight max-w-2xl mx-auto">
        Manage Employee Leave
        <span class="text-slate-500"> Effortlessly</span>
      </h1>
      <p class="text-slate-500 text-lg max-w-lg mx-auto mb-12 leading-relaxed">
        LeaveFlow streamlines leave requests and approvals for modern teams. Employees apply, managers decide — all in one place.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <router-link to="/login?role=employee"
          class="w-64 px-8 py-4 bg-slate-800 text-white font-semibold rounded-xl hover:bg-slate-700 transition flex items-center justify-center gap-2 text-sm">
          Employee Login →
        </router-link>
        <router-link to="/login?role=employer"
          class="w-64 px-8 py-4 bg-white text-slate-800 font-semibold rounded-xl hover:bg-slate-50 transition flex items-center justify-center gap-2 text-sm border border-slate-300">
          Employer Login →
        </router-link>
      </div>
    </section>
    <!-- Stats -->
    <section class="py-12 px-6">
      <div class="max-w-3xl mx-auto grid grid-cols-3 gap-6">
        <div class="bg-white rounded-2xl p-6 text-center border border-slate-200">
          <p class="text-3xl font-bold text-slate-800 mb-1">Fast</p>
          <p class="text-slate-500 text-sm">Leave approvals</p>
        </div>
        <div class="bg-white rounded-2xl p-6 text-center border border-slate-200">
          <p class="text-3xl font-bold text-slate-800 mb-1">Secure</p>
          <p class="text-slate-500 text-sm">JWT Authentication</p>
        </div>
        <div class="bg-white rounded-2xl p-6 text-center border border-slate-200">
          <p class="text-3xl font-bold text-slate-800 mb-1">Simple</p>
          <p class="text-slate-500 text-sm">Easy to use</p>
        </div>
      </div>
    </section>
    <!-- Features -->
    <section class="py-16 px-6 max-w-4xl mx-auto">
      <h2 class="text-center text-2xl font-bold text-slate-800 mb-12">Everything your team needs</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white border border-slate-200 rounded-2xl p-6 flex gap-4">
          <div class="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-xl shrink-0">📋</div>
          <div>
            <h3 class="text-slate-800 font-semibold mb-1">Apply for Leave</h3>
            <p class="text-slate-500 text-sm">Employees can apply for sick, casual, annual leave and more in seconds.</p>
          </div>
        </div>
        <div class="bg-white border border-slate-200 rounded-2xl p-6 flex gap-4">
          <div class="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-xl shrink-0">✅</div>
          <div>
            <h3 class="text-slate-800 font-semibold mb-1">Instant Approval</h3>
            <p class="text-slate-500 text-sm">Employers can approve or reject requests with a single click.</p>
          </div>
        </div>
        <div class="bg-white border border-slate-200 rounded-2xl p-6 flex gap-4">
          <div class="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-xl shrink-0">📊</div>
          <div>
            <h3 class="text-slate-800 font-semibold mb-1">Track Status</h3>
            <p class="text-slate-500 text-sm">View Pending, Approved and Rejected leaves in real time.</p>
          </div>
        </div>
        <div class="bg-white border border-slate-200 rounded-2xl p-6 flex gap-4">
          <div class="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-xl shrink-0">🔐</div>
          <div>
            <h3 class="text-slate-800 font-semibold mb-1">Secure & Private</h3>
            <p class="text-slate-500 text-sm">JWT authentication and role-based access keeps data safe.</p>
          </div>
        </div>
      </div>
    </section>
    <!-- How it works -->
    <section class="py-16 px-6 max-w-3xl mx-auto">
      <h2 class="text-center text-2xl font-bold text-slate-800 mb-12">How it works</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="text-center">
          <div class="w-12 h-12 rounded-full bg-slate-800 text-white font-bold text-lg flex items-center justify-center mx-auto mb-4">1</div>
          <h3 class="text-slate-800 font-semibold mb-2">Create Account</h3>
          <p class="text-slate-500 text-sm">Sign up as employee or employer</p>
        </div>
        <div class="text-center">
          <div class="w-12 h-12 rounded-full bg-slate-800 text-white font-bold text-lg flex items-center justify-center mx-auto mb-4">2</div>
          <h3 class="text-slate-800 font-semibold mb-2">Apply for Leave</h3>
          <p class="text-slate-500 text-sm">Fill leave type, dates and reason</p>
        </div>
        <div class="text-center">
          <div class="w-12 h-12 rounded-full bg-slate-800 text-white font-bold text-lg flex items-center justify-center mx-auto mb-4">3</div>
          <h3 class="text-slate-800 font-semibold mb-2">Get Decision</h3>
          <p class="text-slate-500 text-sm">Employer approves or rejects instantly</p>
        </div>
      </div>
    </section>
    <!-- CTA -->
    <section class="py-16 px-6">
      <div class="bg-slate-800 rounded-2xl max-w-2xl mx-auto p-12 text-center">
        <h2 class="text-3xl font-bold text-white mb-4">Ready to get started?</h2>
        <p class="text-slate-400 mb-8">Join LeaveFlow and simplify leave management today.</p>
        <router-link to="/signup"
          class="inline-block px-8 py-3 bg-white text-slate-800 font-bold rounded-xl hover:bg-slate-100 transition text-sm">
          Create Free Account
        </router-link>
      </div>
    </section>
    <!-- Footer -->
    <footer class="border-t border-slate-200 py-8 text-center text-slate-400 text-sm bg-white">
      © 2026 Leave Management
    </footer>
  </div>
</template>
<script setup>
</script>