<template>
  <footer
    class="bg-gradient-to-b from-gray-900 to-black border-t border-red-600/30 text-white relative overflow-hidden">
    <!-- Animated background particles -->
    <ClientOnly>
      <div v-for="i in 6" :key="i" class="absolute rounded-full bg-red-600 opacity-10"
        :style="`width: ${20 + i * 10}px; height: ${20 + i * 10}px; top: ${Math.random() * 100}%; left: ${Math.random() * 100}%; animation: float ${5 + i}s infinite ease-in-out ${i}s;`">
      </div>

    </ClientOnly>
    <!-- Main Footer Content -->
    <div class="container mx-auto px-4 pt-12 pb-4 z-1">
      <!-- Top Section -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        <!-- Company Info -->
        <div class="space-y-4">
          <div class="flex items-center mb-6">
            <span class="text-2xl font-bold">
<img src="/poseidon.svg" alt="">
            </span>
          </div>
          <p class="text-gray-400 text-sm">
            {{ $t('footer.company_description') }}
          </p>
          <div class="flex items-center space-x-1 text-sm text-gray-400">
            <div class="bg-red-600 text-white p-1 rounded">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <address class="not-italic">
              {{ $t('footer.address') }}
            </address>
          </div>
          <div class="flex items-center space-x-1 text-sm text-gray-400">
            <div class="bg-red-600 text-white p-1 rounded">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path
                  d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z">
                </path>
              </svg>
            </div>
            <a href="tel:+385921696002" class="hover:text-red-500 transition-colors">+385 92 169 6002</a>
          </div>
          <div class="flex items-center space-x-1 text-sm text-gray-400">
            <div class="bg-red-600 text-white p-1 rounded">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            <a href="mailto:poseidon@gmail.com"
              class="hover:text-red-500 transition-colors">poseidon@gmail.com</a>
          </div>
        </div>

        <!-- Quick Links - Modified to include only Home and About Us -->
        <div>
          <h4 class="text-lg font-semibold mb-6 relative">
            {{ $t('footer.quick_links') }}
            <span class="absolute -bottom-2 left-0 w-12 h-1 bg-red-600 rounded-full"></span>
          </h4>
          <ul class="space-y-3">
            <li>
              <NuxtLink to="/" class="text-gray-400 hover:text-red-500 transition-colors flex items-center group">
                <span
                  class="w-0 h-0.5 bg-red-600 mr-0 group-hover:w-2 group-hover:mr-1 transition-all duration-300"></span>
                {{ $t('home') }}
              </NuxtLink>
            </li>
            <li>
              <a @click="scrollTo('aboutUs')"
                class="text-gray-400 hover:text-red-500 transition-colors flex items-center group cursor-pointer">
                <span
                  class="w-0 h-0.5 bg-red-600 mr-0 group-hover:w-2 group-hover:mr-1 transition-all duration-300"></span>
                {{ $t('about_us') }}
              </a>
            </li>
            <li>
              <a @click="scrollTo('vehicleFleet')"
                class="text-gray-400 hover:text-red-500 transition-colors flex items-center group cursor-pointer">
                <span
                  class="w-0 h-0.5 bg-red-600 mr-0 group-hover:w-2 group-hover:mr-1 transition-all duration-300"></span>
                {{ $t('vehicle_fleet') }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Services - Modified to replace airport transfers with bicycle transport and add events -->
        <div>
          <h4 class="text-lg font-semibold mb-6 relative">
            {{ $t('footer.our_services') }}
            <span class="absolute -bottom-2 left-0 w-12 h-1 bg-red-600 rounded-full"></span>
          </h4>
          <ul class="space-y-3">
            <li>
              <NuxtLink to="/taxi" class="text-gray-400 hover:text-red-500 transition-colors flex items-center group">
                <span
                  class="w-0 h-0.5 bg-red-600 mr-0 group-hover:w-2 group-hover:mr-1 transition-all duration-300"></span>
                {{ $t('taxi') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/transfers"
                class="text-gray-400 hover:text-red-500 transition-colors flex items-center group">
                <span
                  class="w-0 h-0.5 bg-red-600 mr-0 group-hover:w-2 group-hover:mr-1 transition-all duration-300"></span>
                {{ $t('transfers') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/excursions"
                class="text-gray-400 hover:text-red-500 transition-colors flex items-center group">
                <span
                  class="w-0 h-0.5 bg-red-600 mr-0 group-hover:w-2 group-hover:mr-1 transition-all duration-300"></span>
                {{ $t('excursions') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/bicycle-transfer"
                class="text-gray-400 hover:text-red-500 transition-colors flex items-center group">
                <span
                  class="w-0 h-0.5 bg-red-600 mr-0 group-hover:w-2 group-hover:mr-1 transition-all duration-300"></span>
                {{ $t('bicycle_transport') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/events" class="text-gray-400 hover:text-red-500 transition-colors flex items-center group">
                <span
                  class="w-0 h-0.5 bg-red-600 mr-0 group-hover:w-2 group-hover:mr-1 transition-all duration-300"></span>
                {{ $t('events') }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Custom Request Section (Replaces Newsletter & Social) -->
        <div>
          <h4 class="text-lg font-semibold mb-6 relative">
            {{ $t('footer.custom_request') }}
            <span class="absolute -bottom-2 left-0 w-12 h-1 bg-red-600 rounded-full"></span>
          </h4>
          <form @submit.prevent="sendCustomRequest" class="mb-4">
            <div class="flex flex-col space-y-3">
              <textarea v-model="customRequest" :placeholder="$t('footer.custom_request')"
                class="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-red-600 text-white text-sm h-24"
                required>
              </textarea>
              <button type="submit"
                class="px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors">
                {{ $t('footer.send') }}
              </button>
            </div>
          </form>

          <h5 class="text-base font-medium mb-3">{{ $t('footer.follow_us') }}</h5>
          <div class="flex">
            <!-- Only Facebook Icon -->
            <a href="" target='_blank' aria-label="Facebook"
              class="w-8 h-8 rounded-full border border-gray-700 flex items-center justify-center hover:bg-red-600 hover:border-red-600 hover:text-white transition-all duration-300 transform hover:scale-110 group">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-4 h-4" fill="currentColor">
                <path
                  d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Payment Methods -->
      <div class="border-t border-gray-800 pt-8 pb-4">
        <h4 class="text-sm font-semibold mb-4 text-center">{{ $t('footer.payment_methods') }}</h4>
        <div class="flex flex-wrap justify-center gap-4">
          <div v-for="(method, index) in paymentMethods" :key="`payment-${index}`"
            class="w-12 h-8 bg-white rounded px-1 flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity">
            <img :src="method.icon" :alt="method.name" class="max-w-full max-h-full">
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div
        class="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
        <div class="mb-4 md:mb-0">
          &copy; {{ new Date().getFullYear() }} Poseidon. {{ $t('footer.all_rights_reserved') }}
        </div>
        <div class="flex flex-wrap justify-center gap-4">
          <a v-for="(link, index) in legalLinks" :key="`legal-${index}`" :href="link.route"
            class="hover:text-red-500 transition-colors">
            {{ $t(link.label) }}
          </a>
        </div>
      </div>

      <!-- Back to Top Button -->
      <div class="flex justify-center mt-6">
        <button @click="scrollToTop"
          class="group rounded-full w-10 h-10 bg-gray-800 hover:bg-red-600 flex items-center justify-center transition-all duration-300 hover:scale-110">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400 group-hover:text-white transition-colors"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round">
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </button>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const customRequest = ref('');

// Payment Methods
const paymentMethods = [
  { name: 'Visa', icon: '/svgs/visa.svg' },
  { name: 'Mastercard', icon: '/svgs/mastercard.svg' },
  { name: 'American Express', icon: '/svgs/amex.svg' },
];

// Legal Links
const legalLinks = [
  { route: '/privacy', label: 'footer.privacy_policy' },
];

// Methods
const sendCustomRequest = () => {
  // Open mail client with the custom request
  const mailtoLink = `mailto:poseidon@gmail.com?subject=Custom Request&body=${encodeURIComponent(customRequest.value)}`;
  window.location.href = mailtoLink;
  customRequest.value = '';
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

const scrollTo = (elementId) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

onMounted(() => {
  // Add animation style to document
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-20px); }
    }
  `;
  document.head.appendChild(style);
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>