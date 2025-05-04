<template>
  <header class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="{ 'bg-black shadow-xl': isScrolled, 'bg-black/70 backdrop-blur-md': !isScrolled }">
    <div class="container mx-auto px-4 lg:px-8">
      <!-- Top Bar with Contact Info -->
      <div class="hidden md:flex justify-between items-center border-b border-red-600/30 text-xs py-2 transition-all"
        :class="{ 'h-8': isScrolled, 'h-10': !isScrolled }">
        <div class="flex items-center space-x-4">
          <a href="tel:+385921696002" class="flex items-center text-white hover:text-red-500 transition-colors">
            <span class="mr-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path
                  d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z">
                </path>
              </svg>
            </span>
            +385 92 169 6002
          </a>
          <a href="mailto:poseidon@gmail.com" class="flex items-center text-white hover:text-red-500 transition-colors">
            <span class="mr-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </span>
            poseidon@gmail.com
          </a>
        </div>
        <div class="flex items-center space-x-3">
          <div class="language-switcher relative">
            <button @click="toggleLanguageDropdown"
              class="flex items-center text-white hover:text-red-500 transition-colors">
              <span>{{ currentLanguage.toUpperCase() }}</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 ml-1" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <div v-if="isLanguageDropdownOpen"
              class="absolute right-0 mt-2 bg-black border border-red-600/30 rounded shadowed-lg py-1 w-24 transition-all z-50">
              <button v-for="lang in availableLanguages" :key="lang.code" @click="changeLanguage(lang.code)"
                class="block w-full text-left px-4 py-1 text-white hover:bg-red-600/20 hover:text-red-500 transition-colors">
                {{ lang.name }}
              </button>
            </div>
          </div>
          <div class="social-icons flex items-center space-x-2">
            <a href="https://www.facebook.com/profile.php?id=61573394503894" target='_blank' aria-label="Facebook"
              class="text-white hover:text-red-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Main Navigation Bar -->
      <nav class="flex items-center justify-between transition-all duration-300"
        :class="{ 'h-16': isScrolled, 'h-20': !isScrolled }">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <NuxtLink to="/" class="flex items-center" @click="setActiveRoute('/')">
            <span class="text-2xl font-bold text-white rounded-full">
              <img class='w-28' src="/poseidon.svg" alt="">
            </span>
          </NuxtLink>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden lg:flex items-center space-x-1">
          <NuxtLink v-for="(item, index) in navItems" :key="index" :to="item.route"
            class="relative px-4 py-2 text-white font-medium transition-colors"
            :class="activeRoute === item.route ? 'text-red-600' : 'hover:text-red-500'"
            @click="setActiveRoute(item.route)">
            {{ $t(item.label) }}
            <span v-if="activeRoute === item.route"
              class="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 transform origin-bottom transition-transform duration-300"
              :class="{ 'scale-x-100': activeRoute === item.route }"></span>
          </NuxtLink>
        </div>



        <!-- Mobile Menu Button -->
        <button @click="toggleMobileMenu" class="lg:hidden text-white focus:outline-none" aria-label="Toggle menu">
          <svg v-if="!isMobileMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </nav>
    </div>

    <!-- Mobile Menu -->
    <div v-if="isMobileMenuOpen"
      class="lg:hidden bg-black/95 backdrop-blur-md absolute w-full shadow-xl border-t border-red-600/30 transition-all duration-300 ease-in-out">
      <div class="container mx-auto px-4 py-4">
        <div class="flex flex-col space-y-4">
          <!-- DESIGN 1: Service Navigation Items -->
          <NuxtLink v-for="(item, index) in navItems" :key="index" :to="item.route"
            class="px-8 py-3 border-2 border-red-600/70 text-white font-bold rounded-lg transition-all duration-300 hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 flex items-center justify-between"
            :class="activeRoute === item.route ? 'bg-red-600/20' : ''" @click="closeMenu(item.route)">
            {{ $t(item.label) }}
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m9 18 6-6-6-6"></path>
            </svg>
          </NuxtLink>


          <!-- DESIGN 3: Contact Buttons -->
          <div class="px-6 py-4 bg-gradient-to-r from-red-600/20 to-transparent rounded-lg border-r-2 border-red-600">
            <a href="tel:+385921696002" class="flex items-center text-white hover:text-red-500 transition-colors mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-red-600" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path
                  d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z">
                </path>
              </svg>
              <span class="font-medium">+385 92 169 6002</span>
            </a>

            <a href="https://wa.me/385921696002" target='_blank'
              class="flex items-center text-white hover:text-red-500 transition-colors mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-red-600" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path
                  d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z">
                </path>
              </svg>
              <span class="font-medium">WhatsApp</span>
            </a>

            <a href="mailto:poseidon@gmail.com"
              class="flex items-center text-white hover:text-red-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-red-600" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <span class="font-medium">poseidon@gmail.com</span>
            </a>

          </div>

          <!-- DESIGN 2: Language Selector -->
          <div class="px-4 py-3 bg-black/30 rounded-xl border border-red-600/30 backdrop-blur-sm">
            <div class="flex items-center justify-between">
              <div class="flex space-x-1">
                <button v-for="lang in availableLanguages" :key="lang.code" @click="changeLanguage(lang.code)"
                  class="px-3 py-1 text-sm rounded-full transition-all duration-300"
                  :class="currentLanguage === lang.code ? 'bg-red-600 text-white font-bold' : 'bg-black/50 text-white hover:bg-red-600/20 hover:text-red-500'">
                  {{ lang.name }}
                </button>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  </header>
  <div v-if="isMobileMenuOpen" class="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 transition-opacity duration-300"
    @click="closeMenu"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
const { scrollTo } = useScrollTo();

const props = defineProps({
  initialPath: {
    type: String,
    default: '/'
  }
});

const emit = defineEmits(['update:activeRoute']);

const { t, locale } = useI18n();
const route = useRoute();
const router = useRouter();

// State variables
const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);
const activeRoute = ref(props.initialPath);
const isLanguageDropdownOpen = ref(false);

// Available languages
const availableLanguages = [
  { code: 'en', name: 'English' },
  { code: 'hr', name: 'Hrvatski' },
  { code: 'it', name: 'Italiano' },
  { code: 'de', name: 'Deutsch' }
];

// Computed property for current language
const currentLanguage = computed(() => locale.value);

// Methods
const toggleLanguageDropdown = () => {
  isLanguageDropdownOpen.value = !isLanguageDropdownOpen.value;
};
// Lifecycle hooks
onMounted(() => {
  handleScroll();
  window.addEventListener('scroll', handleScroll);

  const currentPath = route.path;
  const pathWithoutLocale = currentPath.replace(/^\/[a-z]{2}/, '');
  setActiveRoute(pathWithoutLocale || '/');

  // Close dropdown when clicking outside
  document.addEventListener('click', handleOutsideClick);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  document.removeEventListener('click', handleOutsideClick);
});
const handleOutsideClick = (event) => {
  const languageSwitcher = document.querySelector('.language-switcher');
  if (languageSwitcher && !languageSwitcher.contains(event.target)) {
    isLanguageDropdownOpen.value = false;
  }
};

// Navigation items
const navItems = [
  { route: '/', label: 'home' },
  { route: '/excursions', label: 'excursions' },
  { route: '/rent-a-boat', label: 'rent_a_boat' },
  { route: '/taxi-boat', label: 'taxi_boat' },
  { route: '/skipper-training', label: 'skipper_training' },
];



// Methods for path handling
const localePath = (path) => {
  // Simple implementation - in actual Nuxt you'd use the nuxt/i18n localePath
  return `/${locale.value}${path}`;
};

// Scroll handling
const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

// Language handling
const changeLanguage = (lang) => {
  locale.value = lang;
  // In actual implementation, you'd use i18n to switch languages properly
};

// Menu handling
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMenu = (routePath) => {
  isMobileMenuOpen.value = false;
  setActiveRoute(routePath);
};

const closeMenuScrollTo = (id) => {
  isMobileMenuOpen.value = false;
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

const setActiveRoute = (routePath) => {
  activeRoute.value = routePath;
  emit('update:activeRoute', routePath);
};

// Lifecycle hooks
onMounted(() => {
  handleScroll(); // Initial check
  window.addEventListener('scroll', handleScroll);

  // Set active route based on current path
  const currentPath = route.path;
  const pathWithoutLocale = currentPath.replace(/^\/[a-z]{2}/, '');
  setActiveRoute(pathWithoutLocale || '/');
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
/* Animation styles */
.scale-x-100 {
  transform: scaleX(1);
}

/* Group hover animations */
.group-hover\:scale-100 {
  transform: scale(1);
}

.group-hover\:opacity-100 {
  opacity: 1;
}
</style>