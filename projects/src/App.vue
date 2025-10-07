<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

const isDark = ref(false)

const updateTheme = () => {
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

const checkSystemTheme = () => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  isDark.value = prefersDark
  updateTheme()
}

onMounted(() => {
  checkSystemTheme()

  // Listen for system theme changes
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  mediaQuery.addEventListener('change', (e) => {
    isDark.value = e.matches
    updateTheme()
  })
})

watch(isDark, () => {
  updateTheme()
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-primary-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
    <router-view />
  </div>
</template>
