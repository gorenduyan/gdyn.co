<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface PlatformInfo {
  isAndroid: boolean
  isIOS: boolean
  isMobile: boolean
}

const platform = ref<PlatformInfo>({
  isAndroid: false,
  isIOS: false,
  isMobile: false
})

const isRedirecting = ref(false)
const progress = ref(0)
const currentYear = new Date().getFullYear()

// Environment variables
const appName = import.meta.env.VITE_APP_NAME
const appDescription = import.meta.env.VITE_APP_DESCRIPTION
const googlePlayUrl = import.meta.env.VITE_GOOGLE_PLAY_URL
const appStoreUrl = import.meta.env.VITE_APP_STORE_URL
const websiteUrl = import.meta.env.VITE_WEBSITE_URL
const logoLight = import.meta.env.VITE_LOGO_LIGHT
const logoDark = import.meta.env.VITE_LOGO_DARK
const companyName = import.meta.env.VITE_COMPANY_NAME
const footerText = import.meta.env.VITE_FOOTER_TEXT
const whatsappChannelUrl = import.meta.env.VITE_WHATSAPP_CHANNEL_URL

const detectPlatform = () => {
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera

  const isAndroid = /android/i.test(userAgent)
  const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream
  const isMobile = isAndroid || isIOS

  platform.value = {
    isAndroid,
    isIOS,
    isMobile
  }
}

const startRedirect = () => {
  isRedirecting.value = true

  // Animate progress bar
  const duration = 2000 // 2 seconds
  const interval = 20 // Update every 20ms
  const steps = duration / interval
  const increment = 100 / steps

  const timer = setInterval(() => {
    progress.value += increment
    if (progress.value >= 100) {
      clearInterval(timer)
      progress.value = 100

      // Redirect after animation completes
      setTimeout(() => {
        if (platform.value.isAndroid) {
          window.location.href = googlePlayUrl
        } else if (platform.value.isIOS) {
          window.location.href = appStoreUrl
        }
      }, 100)
    }
  }, interval)
}

onMounted(() => {
  detectPlatform()

  // Auto-redirect if mobile
  if (platform.value.isAndroid || platform.value.isIOS) {
    startRedirect()
  }
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-4 py-12">
    <div class="max-w-3xl w-full">
      <!-- Logo / Header -->
      <div class="text-center pb-10">
        <img
          :src="logoLight"
          :alt="appName + ' Logo'"
          style="width:80%"
          class="mx-auto mb-5 dark:hidden"
        />
        <img
          :src="logoDark"
          :alt="appName + ' Logo'"
          style="width:80%"
          class="mx-auto mb-5 hidden dark:block"
        />
        <p class="text-base text-gray-600 dark:text-gray-400 max-w-lg mx-auto">{{ appDescription }}</p>
      </div>

      <!-- Download Options - Recommended First -->
      <div class="space-y-4 mb-6">
        <!-- Android Card - Show first if Android -->
        <a
          v-if="platform.isAndroid"
          :href="googlePlayUrl"
          target="_blank"
          class="group block bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-primary dark:border-primary-600 ring-4 ring-primary-100 dark:ring-primary-900"
        >
          <!-- Progress Bar inside card -->
          <div v-if="isRedirecting" class="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
            <div class="text-center mb-3">
              <p class="text-sm font-semibold text-gray-900 dark:text-white">Yönlendiriliyor...</p>
            </div>
            <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
              <div
                class="bg-gradient-to-r from-primary to-primary-700 h-full rounded-full transition-all duration-75 ease-linear"
                :style="{ width: progress + '%' }"
              ></div>
            </div>
          </div>

          <div class="flex items-center gap-4">
            <div class="bg-gradient-to-br from-green-400 to-green-600 rounded-xl p-3 flex items-center justify-center flex-shrink-0">
              <svg class="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
              </svg>
            </div>
            <div class="flex-1 flex flex-col gap-1">
              <div class="flex items-center gap-2">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white">Google Play</h3>
                <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-primary text-white">
                  Önerilen
                </span>
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-400">Android için indir</p>
              <div class="flex items-center text-xs text-gray-500 dark:text-gray-400">
                <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                  play.google.com/apps/gorenduyan
              </div>
            </div>
            <svg class="w-5 h-5 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </a>

        <!-- iOS Card - Show first if iOS -->
        <a
          v-if="platform.isIOS"
          :href="appStoreUrl"
          target="_blank"
          class="group block bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-primary dark:border-primary-600 ring-4 ring-primary-100 dark:ring-primary-900"
        >
          <!-- Progress Bar inside card -->
          <div v-if="isRedirecting" class="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
            <div class="text-center mb-3">
              <p class="text-sm font-semibold text-gray-900 dark:text-white">Yönlendiriliyor...</p>
            </div>
            <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
              <div
                class="bg-gradient-to-r from-primary to-primary-700 h-full rounded-full transition-all duration-75 ease-linear"
                :style="{ width: progress + '%' }"
              ></div>
            </div>
          </div>

          <div class="flex items-center gap-4">
            <div class="bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl p-3 flex items-center justify-center flex-shrink-0">
              <svg class="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z"/>
              </svg>
            </div>
            <div class="flex-1 flex flex-col gap-1">
              <div class="flex items-center gap-2">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white">App Store</h3>
                <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-primary text-white">
                  Önerilen
                </span>
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-400">iOS için indir</p>
              <div class="flex items-center text-xs text-gray-500 dark:text-gray-400">
                <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.0" />
                </svg>
                apps.apple.com/app/gören-duyan
              </div>
            </div>
            <svg class="w-5 h-5 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </a>

        <!-- Google Play Card - Show as alternative if not Android -->
        <a
          v-if="!platform.isAndroid"
          :href="googlePlayUrl"
          target="_blank"
          class="group block bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-300 border-2 border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary-600"
        >
          <div class="flex items-center gap-4">
            <div class="bg-gradient-to-br from-green-400 to-green-600 rounded-lg p-2.5 flex items-center justify-center flex-shrink-0">
              <svg class="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
              </svg>
            </div>
            <div class="flex-1 flex flex-col gap-1">
              <h3 class="text-lg font-bold text-gray-900 dark:text-white">Google Play</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">Android için indir</p>
              <div class="flex items-center text-xs text-gray-500 dark:text-gray-400">
                <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                  play.google.com/apps/gorenduyan
              </div>
            </div>
            <svg class="w-5 h-5 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </a>

        <!-- App Store Card - Show as alternative if not iOS -->
        <a
          v-if="!platform.isIOS"
          :href="appStoreUrl"
          target="_blank"
          class="group block bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-300 border-2 border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary-600"
        >
          <div class="flex items-center gap-4">
            <div class="bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg p-2.5 flex items-center justify-center flex-shrink-0">
              <svg class="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z"/>
              </svg>
            </div>
            <div class="flex-1 flex flex-col gap-1">
              <h3 class="text-lg font-bold text-gray-900 dark:text-white">App Store</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">iOS için indir</p>
              <div class="flex items-center text-xs text-gray-500 dark:text-gray-400">
                <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                apps.apple.com/app/gören-duyan
              </div>
            </div>
            <svg class="w-5 h-5 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </a>
      </div>

      <!-- Web Card -->
      <a
        :href="websiteUrl"
        target="_blank"
        class="group block bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border-2 border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary-600"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <div class="bg-gradient-to-br from-gray-400 to-gray-600 rounded-lg p-2 mr-3">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <div>
              <h3 class="text-base font-bold text-gray-900 dark:text-white">Web Sitesi</h3>
              <p class="text-xs text-gray-600 dark:text-gray-400">gorenduyan.com</p>
            </div>
          </div>
          <svg class="w-4 h-4 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </div>
      </a>

      <!-- WhatsApp Channel Card -->
      <a
        :href="whatsappChannelUrl"
        target="_blank"
        class="group mt-2 block bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border-2 border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <div class="bg-gradient-to-br from-green-400 to-green-600 rounded-lg p-2 mr-3">
              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
            </div>
            <div>
              <h3 class="text-base font-bold text-gray-900 dark:text-white">WhatsApp Kanalı</h3>
              <p class="text-xs text-gray-600 dark:text-gray-400">Güncellemeler için katılın</p>
            </div>
          </div>
          <svg class="w-4 h-4 text-gray-400 group-hover:text-green-500 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </div>
      </a>

      <!-- Footer -->
      <div class="text-center mt-10 text-gray-500 dark:text-gray-500 text-sm">
        <p>© {{ currentYear }} {{ companyName }}. {{ footerText }}</p>
      </div>
    </div>
  </div>
</template>
