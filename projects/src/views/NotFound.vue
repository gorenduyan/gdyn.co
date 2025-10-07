<script setup lang="ts">
import { onMounted } from 'vue'

// Environment variables
const redirectUrl = import.meta.env.VITE_REDIRECT_URL
const websiteUrl = import.meta.env.VITE_WEBSITE_URL

// Redirect after a short delay
onMounted(() => {
  setTimeout(() => {
    window.location.href = redirectUrl || websiteUrl
  }, 2000)
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <div class="text-center max-w-md">
      <div class="mb-8">
        <div class="inline-block bg-primary-100 dark:bg-primary-900 rounded-full p-6 mb-4">
          <svg class="w-20 h-20 text-primary-600 dark:text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h1 class="text-4xl font-bold text-primary-900 dark:text-white mb-3">Yönlendiriliyor...</h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
          {{ redirectUrl }} adresine yönlendiriliyorsunuz
        </p>

        <!-- Loading Animation -->
        <div class="flex justify-center items-center space-x-2 mb-6">
          <div class="w-3 h-3 bg-primary rounded-full animate-bounce" style="animation-delay: 0ms"></div>
          <div class="w-3 h-3 bg-primary rounded-full animate-bounce" style="animation-delay: 150ms"></div>
          <div class="w-3 h-3 bg-primary rounded-full animate-bounce" style="animation-delay: 300ms"></div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors">
        <p class="text-gray-600 dark:text-gray-400 mb-4">
          Otomatik yönlendirme çalışmazsa:
        </p>
        <a
          :href="redirectUrl"
          class="inline-block bg-gradient-to-r from-primary to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold py-3 px-8 rounded-xl transition-all transform hover:scale-105 shadow-lg"
        >
          Buraya Tıklayın
        </a>
      </div>
    </div>
  </div>
</template>
