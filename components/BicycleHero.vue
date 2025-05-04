<template>
  <!-- Hero Section with Advanced Layering and Effects -->
  <section class="relative h-screen overflow-hidden">
    <!-- Dynamic Background System with Layered Effects -->
    <div class="absolute inset-0">
      <!-- Advanced Image Carousel with Parallax and Ken Burns Effects -->
      <transition-group name="fade" tag="div" class="h-full w-full">
        <div v-for="(image, index) in heroImages" :key="image.url" v-show="currentImageIndex === index"
          class="absolute inset-0 bg-cover bg-center transition-all duration-2000 ease-out transform-gpu" :style="{
            backgroundImage: `url(${image.url})`,
            transform: `scale(${image.scale}) translateY(${image.offset}px) translateX(${image.offsetX}px)`,
            filter: `brightness(${image.brightness}) contrast(${image.contrast}) saturate(${image.saturation})`
          }">
        </div>
      </transition-group>

      <!-- Multi-layer Gradient System for Depth -->
      <div class="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/40"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.6)_100%)]"></div>

      <!-- Advanced Dynamic Particles System -->
      <ClientOnly>
        <div class="absolute inset-0 z-1">
          <div v-for="i in 30" :key="`particle-${i}`" class="particle absolute rounded-full" :class="{
            'particle-slow': i % 3 === 0,
            'particle-medium': i % 3 === 1,
            'particle-fast': i % 3 === 2,
            'particle-tiny': i <= 10,
            'particle-small': i > 10 && i <= 20,
            'particle-normal': i > 20
          }" :style="{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          opacity: 0.1 + (Math.random() * 0.4),
          animationDelay: `${Math.random() * 10}s`,
          animationDuration: `${15 + Math.random() * 30}s`
        }">
          </div>
        </div>
      </ClientOnly>

      <!-- Subtle Noise Texture Overlay -->
      <div class="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay pointer-events-none"></div>
    </div>

    <!-- 3D Transform Content Container -->
    <div class="relative h-full container mx-auto px-6 flex flex-col justify-center items-start perspective-1000">
      <!-- Hero Content with Staggered Animation and 3D Effects -->
      <div class="max-w-2xl space-y-8 transform-gpu">

        <!-- Enhanced Heading with Creative Typography -->
        <ClientOnly>
          <div class="relative" v-motion :initial="{ opacity: 0, y: 80 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 400, duration: 800 } }">
            <h1 class="text-5xl md:text-7xl font-bold text-white leading-none tracking-tight">
              <span class="block">{{ t('hero.city') }}</span>
              <div class="flex items-baseline gap-3 mt-2">
                <span class="block">City</span>
                <div class="relative inline-block group">
                  <span class="text-yellow-400" ref="typingTextEl">{{ t('hero.cycling') }}</span>
                  <span class="typed-cursor">|</span>
                  <!-- Animated SVG Underline -->
                  <svg class="absolute -bottom-2 left-0 w-full overflow-visible" height="12" width="100%"
                    viewBox="0 0 138 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path class="draw-path" d="M1 5.5C43.3333 0.333333 89 -1.08 137 5.5" stroke="#EAB308"
                      stroke-width="3" stroke-linecap="round" />
                  </svg>
                </div>
              </div>
            </h1>

            <!-- Decorative Elements -->
            <div class="absolute -top-10 -left-10 w-20 h-20 text-yellow-500/20 rotate-12 hidden md:block">
              <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
            </div>
          </div>
        </ClientOnly>
        <!-- Enhanced Subtitle with Gradient -->
        <p
          class="text-xl md:text-2xl font-light text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400 leading-relaxed max-w-xl">
          <span>{{ t('hero.subtitle') }}</span>
        </p>
        <!-- CTA Section with Advanced Hover Effects -->
        <ClientOnly>
          <div class="flex flex-col sm:flex-row gap-4 pt-4" v-motion :initial="{ opacity: 0, y: 30 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 1000, duration: 800 } }">
            <!-- Primary CTA with Pulse Effect -->
            <button @click="scrollTo('bicycleRoutes')"
              class="group relative px-8 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-bold rounded-lg transition-all duration-300 transform hover:scale-[1.03] shadow-lg hover:shadow-yellow-400/25 overflow-hidden flex items-center justify-center">
              <!-- Ripple Effect -->
              <span
                class="absolute inset-0 w-full h-full transition-all duration-300 scale-0 transform origin-center rounded-lg group-hover:scale-100 group-hover:opacity-0 bg-yellow-300 group-active:opacity-0"></span>

              <span class="relative flex items-center">
                <span>{{ t('hero.exploreLocations') }}</span>
                <svg class="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                  fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"></path>
                </svg>
              </span>
            </button>

            <!-- Secondary CTA with Glassmorphism -->
            <button @click="scrollTo('aboutUs')"
              class="group relative px-8 py-4 bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/15 hover:border-white/30 text-white font-medium rounded-lg transition-all duration-300 flex items-center justify-center shadow-xl shadow-black/5">
              <span class="flex items-center">
                <span>{{ t('hero.aboutUs') }}</span>
                <svg
                  class="w-0 h-5 ml-0 opacity-0 transform group-hover:w-5 group-hover:ml-2 group-hover:opacity-100 transition-all duration-300"
                  fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"></path>
                </svg>
              </span>
            </button>
          </div>
        </ClientOnly>

        <!-- Enhanced Feature Highlights with Hover Effects -->
        <ClientOnly>
          <div class="grid grid-cols-2 mx-auto w-full gap-6 mt-8" v-motion :initial="{ opacity: 0 }"
            :enter="{ opacity: 1, transition: { delay: 1200, duration: 800 } }">
            <div v-for="(feature, index) in features" :key="feature.id" class="flex items-center group cursor-pointer"
              v-motion :initial="{ opacity: 0, y: 20 }"
              :enter="{ opacity: 1, y: 0, transition: { delay: 1200 + (index * 100), duration: 600 } }">
              <div
                class="w-12 h-12 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center mr-3 transition-all duration-300 group-hover:bg-yellow-400/20 group-hover:scale-110 relative overflow-hidden">
                <div
                  class="absolute inset-0 bg-gradient-to-br from-yellow-300/0 to-yellow-600/0 group-hover:from-yellow-300/10 group-hover:to-yellow-600/20 transition-all duration-500">
                </div>
                <component :is="feature.icon"
                  class="w-5 h-5 text-yellow-400 relative z-10 transition-all duration-300 group-hover:scale-110" />
              </div>
              <div class="text-sm">
                <div class="text-white font-medium group-hover:text-yellow-400 transition-colors duration-300">{{
                  t(`features.${feature.id}.title`) }}</div>
                <div class="text-gray-400 text-xs">{{ t(`features.${feature.id}.description`) }}</div>
              </div>
            </div>
          </div>
        </ClientOnly>
      </div>
    </div>

  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, defineComponent, h } from 'vue';
import Typed from 'typed.js';
import { useMouse } from '@vueuse/core';
import { useI18n } from 'vue-i18n';

// Setup i18n in component
const { t, locale } = useI18n({
  inheritLocale: true,
  useScope: 'local',
  messages: {
    en: {
      hero: {
        city: 'Poreč',
        cityWord: 'City',
        cycling: 'Cycling',
        subtitle: 'Seamless bicycle transport solutions across Istria. We move your bikes so you can focus on the ride.',
        exploreLocations: 'Explore Locations',
        aboutUs: 'About us'
      },
      features: {
        doorToDoor: {
          title: 'Door-to-Door',
          description: 'Pickup and delivery'
        },
        secureTransport: {
          title: 'Secure Transport',
          description: 'Specialized bike racks'
        },
        anyLocation: {
          title: 'Any Location',
          description: 'Throughout Istria'
        },
        flexibleScheduling: {
          title: 'Flexible Scheduling',
          description: '7 days a week service'
        }
      }
    },
    hr: {
      hero: {
        city: 'Poreč',
        cityWord: 'Grad',
        cycling: 'Biciklizam',
        subtitle: 'Besprijekorna rješenja za prijevoz bicikala diljem Istre. Mi prevozimo vaše bicikle kako biste se vi mogli usredotočiti na vožnju.',
        exploreLocations: 'Istražite lokacije',
        aboutUs: 'O nama'
      },
      features: {
        doorToDoor: {
          title: 'Od vrata do vrata',
          description: 'Preuzimanje i dostava'
        },
        secureTransport: {
          title: 'Siguran prijevoz',
          description: 'Specijalizirani nosači'
        },
        anyLocation: {
          title: 'Bilo koja lokacija',
          description: 'Diljem Istre'
        },
        flexibleScheduling: {
          title: 'Fleksibilno raspoređivanje',
          description: 'Usluga 7 dana u tjednu'
        }
      }
    },
    it: {
      hero: {
        city: 'Parenzo',
        cityWord: 'Città',
        cycling: 'Ciclismo',
        subtitle: 'Soluzioni di trasporto biciclette senza problemi in tutta l\'Istria. Spostiamo le tue biciclette così puoi concentrarti sulla corsa.',
        exploreLocations: 'Esplora località',
        aboutUs: 'Chi siamo'
      },
      features: {
        doorToDoor: {
          title: 'Porta a Porta',
          description: 'Ritiro e consegna'
        },
        secureTransport: {
          title: 'Trasporto Sicuro',
          description: 'Portabici specializzati'
        },
        anyLocation: {
          title: 'Qualsiasi Località',
          description: 'In tutta l\'Istria'
        },
        flexibleScheduling: {
          title: 'Programmazione Flessibile',
          description: 'Servizio 7 giorni su 7'
        }
      }
    },
    de: {
      hero: {
        city: 'Poreč',
        cityWord: 'Stadt',
        cycling: 'Radfahren',
        subtitle: 'Nahtlose Fahrradtransportlösungen in ganz Istrien. Wir transportieren Ihre Fahrräder, damit Sie sich auf die Fahrt konzentrieren können.',
        exploreLocations: 'Entdecken Sie Standorte',
        aboutUs: 'Über uns'
      },
      features: {
        doorToDoor: {
          title: 'Tür-zu-Tür',
          description: 'Abholung und Lieferung'
        },
        secureTransport: {
          title: 'Sicherer Transport',
          description: 'Spezialisierte Fahrradträger'
        },
        anyLocation: {
          title: 'Jeder Standort',
          description: 'In ganz Istrien'
        },
        flexibleScheduling: {
          title: 'Flexible Planung',
          description: 'Service an 7 Tagen die Woche'
        }
      }
    }
  }
});

// Icon Components
const TruckIcon = defineComponent({
  render: () => h('svg', { fill: 'currentColor', viewBox: '0 0 20 20' }, [
    h('path', { d: 'M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z' }),
    h('path', { d: 'M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z' })
  ])
});

const ClockIcon = defineComponent({
  render: () => h('svg', { fill: 'currentColor', viewBox: '0 0 20 20' }, [
    h('path', { 'fill-rule': 'evenodd', d: 'M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z', 'clip-rule': 'evenodd' })
  ])
});

const ShieldIcon = defineComponent({
  render: () => h('svg', { fill: 'currentColor', viewBox: '0 0 20 20' }, [
    h('path', { 'fill-rule': 'evenodd', d: 'M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z', 'clip-rule': 'evenodd' })
  ])
});

const BikeIcon = defineComponent({
  render: () => h('svg', { fill: 'currentColor', viewBox: '0 0 20 20' }, [
    h('path', { 'fill-rule': 'evenodd', d: 'M6 3a1 1 0 011-1h2a1 1 0 110 2H7a1 1 0 01-1-1zm9 9a3 3 0 11-6 0 3 3 0 016 0zm-9 0a3 3 0 11-6 0 3 3 0 016 0z', 'clip-rule': 'evenodd' }),
    h('path', { d: 'M12.93 5h1.57a.5.5 0 01.5.5v3.893a.5.5 0 01-.5.5h-1.57a.5.5 0 01-.5-.5V5.5a.5.5 0 01.5-.5zm-9.5 5.5a.5.5 0 01.5-.5h3.93a.5.5 0 01.355.15L10 12l1.785-1.85a.5.5 0 01.355-.15h3.86a.5.5 0 010 1h-3.5l-2 2.5-2-2.5h-3.5a.5.5 0 01-.5-.5z' })
  ])
});

const GlobeIcon = defineComponent({
  render: () => h('svg', { fill: 'currentColor', viewBox: '0 0 20 20' }, [
    h('path', { 'fill-rule': 'evenodd', d: 'M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z', 'clip-rule': 'evenodd' })
  ])
});

const MapIcon = defineComponent({
  render: () => h('svg', { fill: 'currentColor', viewBox: '0 0 20 20' }, [
    h('path', { 'fill-rule': 'evenodd', d: 'M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z', 'clip-rule': 'evenodd' })
  ])
});

const CalendarIcon = defineComponent({
  render: () => h('svg', { fill: 'currentColor', viewBox: '0 0 20 20' }, [
    h('path', { 'fill-rule': 'evenodd', d: 'M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z', 'clip-rule': 'evenodd' })
  ])
});

const features = [
  {
    icon: TruckIcon,
    id: "doorToDoor"
  },
  {
    icon: ShieldIcon,
    id: "secureTransport"
  },
  {
    icon: MapIcon,
    id: "anyLocation"
  },
  {
    icon: CalendarIcon,
    id: "flexibleScheduling"
  }
];


// Enhanced hero images with more animation properties
const heroImages = ref([
  {
    url: "https://www.rollingexistence.com/wp-content/uploads/2021/09/tunnel.jpg",
    scale: 1,
    offset: 0,
    offsetX: 0,
    brightness: 0.9,
    contrast: 1.1,
    saturation: 1.1
  },
  {
    url: "https://media.timeout.com/images/105315457/image.jpg",
    scale: 1.05,
    offset: -10,
    offsetX: 5,
    brightness: 0.85,
    contrast: 1.15,
    saturation: 1.05
  },
  {
    url: "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/11/df/a2/1e.jpg",
    scale: 1.1,
    offset: 0,
    offsetX: -5,
    brightness: 0.8,
    contrast: 1.2,
    saturation: 1
  },
  {
    url: "https://www.np-brijuni.hr/imagecache/maxsize/6f67e492-4a50-4136-93fd-89f06287a549/28-12-2018/brijuni_iz_zraka2.jpg",
    scale: 1,
    offset: 0,
    offsetX: 0,
    brightness: 0.9,
    contrast: 1.1,
    saturation: 1.1
  },
  {
    url: "https://www.campinginparks.eu/attachment/thumbnail/5c582663081be/pp-ucka-stipesurac.jpg?w=1280&h=720&mode=auto&q=60",
    scale: 1.05,
    offset: -10,
    offsetX: 5,
    brightness: 0.85,
    contrast: 1.15,
    saturation: 1.05
  },
  {
    url: "https://www.venezialines.com/wp-content/uploads/2021/01/01-ISTRA-Rt-Kamenjak-DJI_0184-Pano_ACR-aleksandar-gospic.jpg",
    scale: 1.1,
    offset: 0,
    offsetX: -5,
    brightness: 0.8,
    contrast: 1.2,
    saturation: 1
  },
  {
    url: "https://www.otiumyachts.com/img/db/news-media/41dc0780b2983a21b18f4c341d4969d7.png",
    scale: 1,
    offset: 0,
    offsetX: 0,
    brightness: 0.9,
    contrast: 1.1,
    saturation: 1.1
  },
  {
    url: "https://np-plitvicka-jezera.hr/wp-content/uploads/2023/09/S-view-2-1.jpg",
    scale: 1.05,
    offset: -10,
    offsetX: 5,
    brightness: 0.85,
    contrast: 1.15,
    saturation: 1.05
  },
  {
    url: "https://media.tacdn.com/media/attractions-splice-spp-674x446/10/61/37/73.jpg",
    scale: 1.1,
    offset: 0,
    offsetX: -5,
    brightness: 0.8,
    contrast: 1.2,
    saturation: 1
  }
]);

const currentImageIndex = ref(0);
const showMobileMenu = ref(false);
let intervalId = null;
let typedInstance = null;
const typingTextEl = ref(null);

// Mouse position for parallax effects
const { x, y } = useMouse();
const mouseX = ref(0);
const mouseY = ref(0);

// Import the useScrollTo composable function or define it if needed
const useScrollTo = () => {
  const scrollTo = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return { scrollTo };
};

const { scrollTo } = useScrollTo();

// Initialize animations and effects with improved timings
onMounted(() => {
  // Set up enhanced image carousel with more complex animations
  intervalId = setInterval(() => {
    // Apply image transition effects
    const current = heroImages.value[currentImageIndex.value];
    current.scale = 1;
    current.offset = 0;
    current.offsetX = 0;
    current.brightness = 0.85;

    // Prepare next image with more dramatic initial state
    currentImageIndex.value = (currentImageIndex.value + 1) % heroImages.value.length;
    const next = heroImages.value[currentImageIndex.value];
    next.scale = 1.08;
    next.offset = Math.random() > 0.5 ? 15 : -15;
    next.offsetX = Math.random() > 0.5 ? 10 : -10;
    next.brightness = 0.75;

    // Animate next image to settled state
    setTimeout(() => {
      if (next) {
        next.scale = 1;
        next.offset = 0;
        next.offsetX = 0;
        next.brightness = 0.85;
      }
    }, 500);
  }, 8000);

  // Enhanced typing effect with better strings, now using translated content
  nextTick(() => {
    if (typingTextEl.value) {
      // Set up the typed instance with translated strings
      const getTypedStrings = () => {
        const activities = {
          en: ['Cycling', 'Adventures', 'Explorations'],
          hr: ['Biciklizam', 'Avanture', 'Istraživanja'],
          it: ['Ciclismo', 'Avventure', 'Esplorazioni'],
          de: ['Radfahren', 'Abenteuer', 'Erkundungen']
        };

        // Return strings for current locale, fallback to English
        return activities[locale.value] || activities.en;
      };

      typedInstance = new Typed(typingTextEl.value, {
        strings: getTypedStrings(),
        typeSpeed: 60,
        backSpeed: 40,
        backDelay: 3000,
        startDelay: 1000,
        loop: true,
        showCursor: false
      });

      // Watch for locale changes to update the typed strings
      watch(locale, (newLocale) => {
        if (typedInstance) {
          typedInstance.destroy();
          nextTick(() => {
            typedInstance = new Typed(typingTextEl.value, {
              strings: getTypedStrings(),
              typeSpeed: 60,
              backSpeed: 40,
              backDelay: 3000,
              startDelay: 1000,
              loop: true,
              showCursor: false
            });
          });
        }
      });
    }
  });

  // Subtle parallax effect based on mouse position
  window.addEventListener('mousemove', updateMousePosition);
});

// Clean up resources
onUnmounted(() => {
  if (intervalId) clearInterval(intervalId);
  if (typedInstance) typedInstance.destroy();
  window.removeEventListener('mousemove', updateMousePosition);
});

// Update mouse position for parallax effects
const updateMousePosition = () => {
  mouseX.value = (x.value / window.innerWidth - 0.5) * 20;
  mouseY.value = (y.value / window.innerHeight - 0.5) * 20;

  // Apply subtle movement to current hero image
  const current = heroImages.value[currentImageIndex.value];
  if (current) {
    current.offsetX = mouseX.value * 0.3;
    current.offset = mouseY.value * 0.3;
  }
};
</script>

<style scoped>
/* Enhanced Fade Transition for Images */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s cubic-bezier(0.4, 0, 0.2, 1),
    transform 7s cubic-bezier(0.4, 0, 0.2, 1),
    filter 2s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Advanced Particles System */
.particle {
  pointer-events: none;
  background-color: rgba(255, 255, 255, 0.6);
}

.particle-tiny {
  width: 1px;
  height: 1px;
}

.particle-small {
  width: 2px;
  height: 2px;
}

.particle-normal {
  width: 3px;
  height: 3px;
}

.particle-slow {
  animation: float-slow 30s infinite ease-in-out;
}

.particle-medium {
  animation: float-medium 25s infinite ease-in-out;
}

.particle-fast {
  animation: float-fast 20s infinite ease-in-out;
}

@keyframes float-slow {

  0%,
  100% {
    transform: translateY(0) translateX(0) rotate(0deg);
  }

  25% {
    transform: translateY(-30px) translateX(15px) rotate(5deg);
  }

  50% {
    transform: translateY(-15px) translateX(30px) rotate(10deg);
  }

  75% {
    transform: translateY(-45px) translateX(-15px) rotate(-5deg);
  }
}

@keyframes float-medium {

  0%,
  100% {
    transform: translateY(0) translateX(0) rotate(0deg);
  }

  20% {
    transform: translateY(-25px) translateX(20px) rotate(10deg);
  }

  40% {
    transform: translateY(-10px) translateX(-20px) rotate(-10deg);
  }

  60% {
    transform: translateY(-30px) translateX(10px) rotate(5deg);
  }

  80% {
    transform: translateY(-15px) translateX(-30px) rotate(-5deg);
  }
}

@keyframes float-fast {

  0%,
  100% {
    transform: translateY(0) translateX(0) rotate(0deg);
  }

  20% {
    transform: translateY(-20px) translateX(25px) rotate(15deg);
  }

  40% {
    transform: translateY(-35px) translateX(-15px) rotate(-10deg);
  }

  60% {
    transform: translateY(-10px) translateX(30px) rotate(5deg);
  }

  80% {
    transform: translateY(-25px) translateX(-25px) rotate(-15deg);
  }
}

/* Custom animation for typing cursor */
.typed-cursor {
  color: #EAB308;
  font-weight: bold;
  animation: blink 0.7s infinite;
}

@keyframes blink {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0;
  }
}

/* SVG Path Animation */
.draw-path {
  stroke-dasharray: 200;
  stroke-dashoffset: 200;
  animation: draw 2s ease-in-out forwards 1s;
}

@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}

/* Scroll Indicator Animation */
@keyframes scrollIndicator {
  0% {
    transform: translateY(0);
    opacity: 0.6;
  }

  50% {
    transform: translateY(6px);
    opacity: 1;
  }

  100% {
    transform: translateY(0);
    opacity: 0.6;
  }
}

.animate-scrollIndicator {
  animation: scrollIndicator 1.5s ease-in-out infinite;
}
</style>