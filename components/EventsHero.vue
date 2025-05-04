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
              <span class="block">{{ t('hero.city_name') }}</span>
              <div class="flex items-baseline gap-3 mt-2">
                <span class="block">City</span>
                <div class="relative inline-block group">
                  <span class="text-yellow-400" ref="typingTextEl">{{ t('hero.events') }}</span>
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
            <button @click='scrollTo("eventsRoutes")'
              class="group relative px-8 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-bold rounded-lg transition-all duration-300 transform hover:scale-[1.03] shadow-lg hover:shadow-yellow-400/25 overflow-hidden flex items-center justify-center">
              <!-- Ripple Effect -->
              <span
                class="absolute inset-0 w-full h-full transition-all duration-300 scale-0 transform origin-center rounded-lg group-hover:scale-100 group-hover:opacity-0 bg-yellow-300 group-active:opacity-0"></span>

              <span class="relative flex items-center">
                <span>{{ t('hero.explore_events') }}</span>
                <svg class="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                  fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"></path>
                </svg>
              </span>
            </button>

            <!-- Secondary CTA with Glassmorphism -->
            <button @click='scrollTo("aboutUs")'
              class="group relative px-8 py-4 bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/15 hover:border-white/30 text-white font-medium rounded-lg transition-all duration-300 flex items-center justify-center shadow-xl shadow-black/5">
              <span class="flex items-center">
                <span>{{ t('hero.about_us') }}</span>
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
            <div v-for="(feature, index) in localizedFeatures" :key="feature.title"
              class="flex items-center group cursor-pointer" v-motion :initial="{ opacity: 0, y: 20 }"
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
                <div class="text-white font-medium group-hover:text-yellow-400 transition-colors duration-300">
                  {{ feature.title }}
                </div>
                <div class="text-gray-400 text-xs">{{ feature.description }}</div>
              </div>
            </div>
          </div>
        </ClientOnly>
      </div>
    </div>

  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, defineComponent, h, computed } from 'vue';
import Typed from 'typed.js';
import { useMouse } from '@vueuse/core';
import { useI18n } from 'vue-i18n';

// Set up i18n
const { t, locale } = useI18n({
  inheritLocale: true,
  messages: {
    en: {
      hero: {
        city_name: "Poreč",
        city: "City",
        events: "Events",
        subtitle: "Arrive in style at concerts, festivals, conferences, and special events with our professional chauffeur services.",
        explore_events: "Explore Events",
        about_us: "About us",
        features: {
          concerts: {
            title: "Concerts & Festivals",
            description: "VIP arrival & departure"
          },
          ontime: {
            title: "On-Time Service",
            description: "Never miss the main act"
          },
          group: {
            title: "Group Transfers",
            description: "For small & large parties"
          },
          planning: {
            title: "Event Planning",
            description: "Customized schedules"
          }
        }
      }
    },
    hr: {
      hero: {
        city_name: "Poreč",
        city: "Grad",
        events: "Eventi",
        subtitle: "Dođite u stilu na koncerte, festivale, konferencije i posebne događaje s našim profesionalnim uslugama prijevoza.",
        explore_events: "Istraži Događaje",
        about_us: "O nama",
        features: {
          concerts: {
            title: "Koncerti i Festivali",
            description: "VIP dolazak i odlazak"
          },
          ontime: {
            title: "Točnost Usluge",
            description: "Nikad ne propustite glavni događaj"
          },
          group: {
            title: "Grupni Transferi",
            description: "Za male i velike grupe"
          },
          planning: {
            title: "Planiranje Događaja",
            description: "Prilagođeni rasporedi"
          }
        }
      }
    },
    de: {
      hero: {
        city_name: "Poreč",
        city: "Stadt",
        events: "Events",
        subtitle: "Kommen Sie stilvoll zu Konzerten, Festivals, Konferenzen und besonderen Veranstaltungen mit unserem professionellen Chauffeurdienst.",
        explore_events: "Events entdecken",
        about_us: "Über uns",
        features: {
          concerts: {
            title: "Konzerte & Festivals",
            description: "VIP An- und Abreise"
          },
          ontime: {
            title: "Pünktlicher Service",
            description: "Verpassen Sie nie den Hauptakt"
          },
          group: {
            title: "Gruppentransfers",
            description: "Für kleine & große Gruppen"
          },
          planning: {
            title: "Veranstaltungsplanung",
            description: "Individuelle Zeitpläne"
          }
        }
      }
    },
    it: {
      hero: {
        city_name: "Parenzo",
        city: "Città",
        events: "Eventi",
        subtitle: "Arrivate con stile a concerti, festival, conferenze ed eventi speciali con i nostri servizi di autista professionali.",
        explore_events: "Esplora Eventi",
        about_us: "Chi siamo",
        features: {
          concerts: {
            title: "Concerti e Festival",
            description: "Arrivo e partenza VIP"
          },
          ontime: {
            title: "Servizio Puntuale",
            description: "Non perdere mai l'evento principale"
          },
          group: {
            title: "Trasferimenti di Gruppo",
            description: "Per piccoli e grandi gruppi"
          },
          planning: {
            title: "Pianificazione Eventi",
            description: "Programmi personalizzati"
          }
        }
      }
    }
  }
});

// Icon Components
const StarIcon = defineComponent({
  render: () => h('svg', { fill: 'currentColor', viewBox: '0 0 20 20' }, [
    h('path', { d: 'M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' })
  ])
});

const ClockIcon = defineComponent({
  render: () => h('svg', { fill: 'currentColor', viewBox: '0 0 20 20' }, [
    h('path', { 'fill-rule': 'evenodd', d: 'M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z', 'clip-rule': 'evenodd' })
  ])
});

const ShieldIcon = defineComponent({
  render: () => h('svg', { fill: 'currentColor', viewBox: '0 0 20 20' }, [
    h('path', { 'fill-rule': 'evenodd', d: 'M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z', 'clip-rule': 'evenodd' })
  ])
});

const CarIcon = defineComponent({
  render: () => h('svg', { fill: 'currentColor', viewBox: '0 0 20 20' }, [
    // Vehicle
    h('path', { d: 'M2 10a2 2 0 012-2h12a2 2 0 012 2v3a2 2 0 01-2 2v1a1 1 0 01-1 1h-2a1 1 0 01-1-1v-1H8v1a1 1 0 01-1 1H5a1 1 0 01-1-1v-1a2 2 0 01-2-2v-3zm3.5 1a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm9 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3z' })
  ])
});

const MusicIcon = defineComponent({
  render: () => h('svg', { fill: 'currentColor', viewBox: '0 0 20 20' }, [
    h('path', { d: 'M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z' })
  ])
});

const GroupIcon = defineComponent({
  render: () => h('svg', { fill: 'currentColor', viewBox: '0 0 20 20' }, [
    h('path', { d: 'M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v1h-3zM4.75 12.094A5.973 5.973 0 004 15v1H1v-1a3 3 0 013.75-2.906z' })
  ])
});

const CalendarIcon = defineComponent({
  render: () => h('svg', { fill: 'currentColor', viewBox: '0 0 20 20' }, [
    h('path', { 'fill-rule': 'evenodd', d: 'M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z', 'clip-rule': 'evenodd' })
  ])
});

const CreditCardIcon = defineComponent({
  render: () => h('svg', { fill: 'currentColor', viewBox: '0 0 20 20' }, [
    h('path', { d: 'M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z' }),
    h('path', { 'fill-rule': 'evenodd', d: 'M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z', 'clip-rule': 'evenodd' })
  ])
});

// Feature objects with icon mapping
const featureIcons = {
  concerts: MusicIcon,
  ontime: ClockIcon,
  group: GroupIcon,
  planning: CalendarIcon
};

// Create localized features based on current locale
const localizedFeatures = computed(() => {
  return [
    {
      icon: featureIcons.concerts,
      title: t('hero.features.concerts.title'),
      description: t('hero.features.concerts.description')
    },
    {
      icon: featureIcons.ontime,
      title: t('hero.features.ontime.title'),
      description: t('hero.features.ontime.description')
    },
    {
      icon: featureIcons.group,
      title: t('hero.features.group.title'),
      description: t('hero.features.group.description')
    },
    {
      icon: featureIcons.planning,
      title: t('hero.features.planning.title'),
      description: t('hero.features.planning.description')
    }
  ];
});

const heroImages = ref([
  {
    url: "https://www.cassidytravel.ie/images/2504",
    scale: 1,
    offset: 0,
    offsetX: 0,
    brightness: 1,
    contrast: 1,
    saturation: 1
  },
  {
    url: "https://cdn.entr.io/cdn-cgi/image/width=1200/images/events/campaigns/organizer_uploads/194/19443_marketing_banner_1522x682_1719224536.png?v=1720507531?",
    scale: 1,
    offset: 0,
    offsetX: 0,
    brightness: 1,
    contrast: 1,
    saturation: 1
  },
  {
    url: "https://zrce.eu/wp-content/uploads/2018/10/Was_Ist_Zrce_06.jpg",
    scale: 1,
    offset: 0,
    offsetX: 0,
    brightness: 1,
    contrast: 1,
    saturation: 1
  },
  {
    url: "https://www.jambase.com/wp-content/uploads/2025/01/inmusic-2025-featured-1480x832.jpg",
    scale: 1,
    offset: 0,
    offsetX: 0,
    brightness: 1,
    contrast: 1,
    saturation: 1
  },
  {
    url: "https://www.meetinzagreb.hr/documents/ArenaZagreb-Colic_koncert.jpg",
    scale: 1,
    offset: 0,
    offsetX: 0,
    brightness: 1,
    contrast: 1,
    saturation: 1
  },
  {
    url: "https://www.pula.hr/media/uploads/posts/posts/images/Dino_Merlin_Arena_Pula_foto_Adria_Summer_Festival_2023_11.jpg",
    scale: 1,
    offset: 0,
    offsetX: 0,
    brightness: 1,
    contrast: 1,
    saturation: 1
  },
  {
    url: "https://production-bookitbee-app.s3.amazonaws.com/media/sharing/ro2wicqa_X7RFI67.png",
    scale: 1,
    offset: 0,
    offsetX: 0,
    brightness: 1,
    contrast: 1,
    saturation: 1
  },
  {
    url: "https://cdn.entr.io/images/events/213/21357_poster_900x1200.png?v=1730127712",
    scale: 1,
    offset: 0,
    offsetX: 0,
    brightness: 1,
    contrast: 1,
    saturation: 1
  },
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

const { scrollTo } = useScrollTo();

// Watch for language changes to update typed.js text
watch(locale, () => {
  if (typedInstance) {
    typedInstance.destroy();
    nextTick(() => {
      initTypingEffect();
    });
  }
});

// Initialize typing effect
const initTypingEffect = () => {
  if (typingTextEl.value) {
    typedInstance = new Typed(typingTextEl.value, {
      strings: [t('hero.events')],
      typeSpeed: 60,
      backSpeed: 40,
      backDelay: 3000,
      startDelay: 1000,
      loop: true,
      showCursor: false
    });
  }
};

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

  // Enhanced typing effect with better strings
  nextTick(() => {
    initTypingEffect();
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