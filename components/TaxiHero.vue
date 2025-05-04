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
                  <span class="text-yellow-400" ref="">{{ t('hero.taxi') }}</span>
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
            <a href='tel:+385921696002'
              class="group relative px-8 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-bold rounded-lg transition-all duration-300 transform hover:scale-[1.03] shadow-lg hover:shadow-yellow-400/25 overflow-hidden flex items-center justify-center">
              <!-- Ripple Effect -->
              <span
                class="absolute inset-0 w-full h-full transition-all duration-300 scale-0 transform origin-center rounded-lg group-hover:scale-100 group-hover:opacity-0 bg-yellow-300 group-active:opacity-0"></span>

              <span class="relative flex items-center">
                <span>+385 92 169 6002</span>
                <svg class="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                  fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z">
                  </path>
                </svg>
              </span>
            </a>
            <!--  WhatsApp CTA with Glassmorphism -->
            <a href="https://wa.me/385921696002" target="_blank"
              class="group relative px-8 py-4 bg-green-500/10 backdrop-blur-lg border border-green-500/15 hover:bg-green-500/15 hover:border-green-300/20 text-white font-medium rounded-lg transition-all duration-300 flex items-center justify-center shadow-xl shadow-black/5">
              <span class="flex items-center">

                <span>{{ t('hero.whatsapp') }}</span>
                <svg
                  class="w-0 h-5 ml-0 opacity-0 transform group-hover:w-5 group-hover:ml-2 group-hover:opacity-100 transition-all duration-300"
                  fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"></path>
                </svg>
              </span>
            </a>
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
                <div class="text-white font-medium group-hover:text-yellow-400 transition-colors duration-300">
                  {{ t(`hero.features.${feature.id}.title`) }}
                </div>
                <div class="text-gray-400 text-xs">{{ t(`hero.features.${feature.id}.description`) }}</div>
              </div>
            </div>
          </div>
        </ClientOnly>
      </div>
    </div>

  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, defineComponent, h } from 'vue';
import { useI18n } from 'vue-i18n';

// Set up i18n for this component
const { t, locale } = useI18n({
  inheritLocale: true,
  useScope: 'local',
  messages: {
    en: {
      hero: {
        city: 'Poreč',
        taxi: 'Taxi',
        subtitle: 'Safe and reliable taxi service available 24/7. Fast pickups anywhere in Poreč.',
        whatsapp: 'WhatsApp',
        features: {
          quickResponse: {
            title: 'Fast Dispatch',
            description: 'Vehicles sent immediately'
          },
          service247: {
            title: 'Available 24/7',
            description: 'Always at your service'
          },
          modernFleet: {
            title: 'Modern Fleet',
            description: 'Comfortable and clean vehicles'
          },
          payments: {
            title: 'Flexible Payments',
            description: 'Pay by cash or card'
          }
        }
      }
    },
    hr: {
      hero: {
        city: 'Poreč',
        taxi: 'Taksi',
        subtitle: 'Sigurna i pouzdana taksi usluga dostupna 0-24. Brzo preuzimanje na svim lokacijama u Poreču.',
        whatsapp: 'WhatsApp',
        features: {
          quickResponse: {
            title: 'Brz Dolazak',
            description: 'Vozilo stiže odmah'
          },
          service247: {
            title: 'Dostupni 0-24',
            description: 'Uvijek na raspolaganju'
          },
          modernFleet: {
            title: 'Moderna Vozila',
            description: 'Udobna i čista vozila'
          },
          payments: {
            title: 'Fleksibilno Plaćanje',
            description: 'Primamo gotovinu i kartice'
          }
        }
      }
    },
    de: {
      hero: {
        city: 'Poreč',
        taxi: 'Taxi',
        subtitle: 'Sicherer und zuverlässiger Taxiservice – rund um die Uhr. Schnelle Abholung in ganz Poreč.',
        whatsapp: 'WhatsApp',
        features: {
          quickResponse: {
            title: 'Schneller Einsatz',
            description: 'Fahrzeug sofort unterwegs'
          },
          service247: {
            title: 'Rund um die Uhr',
            description: 'Immer für Sie da'
          },
          modernFleet: {
            title: 'Moderne Fahrzeuge',
            description: 'Bequem und gepflegt'
          },
          payments: {
            title: 'Flexible Zahlungen',
            description: 'Bar oder mit Karte bezahlen'
          }
        }
      }
    },
    it: {
      hero: {
        city: 'Parenzo',
        taxi: 'Taxi',
        subtitle: 'Servizio taxi sicuro e affidabile, disponibile 24 ore su 24. Prelievi rapidi ovunque a Poreč.',
        whatsapp: 'WhatsApp',
        features: {
          quickResponse: {
            title: 'Intervento Rapido',
            description: 'Veicolo inviato subito'
          },
          service247: {
            title: 'Disponibile H24',
            description: 'Sempre a tua disposizione'
          },
          modernFleet: {
            title: 'Veicoli Moderni',
            description: 'Comodi e ben tenuti'
          },
          payments: {
            title: 'Pagamenti Flessibili',
            description: 'Accettiamo contanti e carte'
          }
        }
      }
    }
  }

});

// Icon Components
const ClockIcon = defineComponent({
  render: () => h('svg', { fill: 'currentColor', viewBox: '0 0 20 20' }, [
    h('path', { 'fill-rule': 'evenodd', d: 'M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z', 'clip-rule': 'evenodd' })
  ])
});


const CarIcon = defineComponent({
  render: () => h('svg', { fill: 'currentColor', viewBox: '0 0 20 20' }, [
    // Airport building
    h('path', { d: 'M3 4a2 2 0 012-2h10a2 2 0 012 2v3h-2V4H5v3H3V4z' }),
    // Car/shuttle
    h('path', { d: 'M2 10a2 2 0 012-2h12a2 2 0 012 2v3a2 2 0 01-2 2v1a1 1 0 01-1 1h-2a1 1 0 01-1-1v-1H8v1a1 1 0 01-1 1H5a1 1 0 01-1-1v-1a2 2 0 01-2-2v-3zm3.5 1a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm9 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3z' })
  ])
});

const PhoneIcon = defineComponent({
  render: () => h('svg', { fill: 'currentColor', viewBox: '0 0 20 20' }, [
    h('path', { d: 'M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z' })
  ])
});

const CreditCardIcon = defineComponent({
  render: () => h('svg', { fill: 'currentColor', viewBox: '0 0 20 20' }, [
    h('path', { d: 'M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z' }),
    h('path', { 'fill-rule': 'evenodd', d: 'M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z', 'clip-rule': 'evenodd' })
  ])
});

// Taxi service features with IDs for translation
const features = [
  {
    id: 'quickResponse',
    icon: PhoneIcon
  },
  {
    id: 'service247',
    icon: ClockIcon
  },
  {
    id: 'modernFleet',
    icon: CarIcon
  },
  {
    id: 'payments',
    icon: CreditCardIcon
  }
];

// Hero images for background carousel
const heroImages = ref([
  {
    url: "https://www.myporec.com/uploads/imgcache/large/articles/dji_0567.jpg",
    scale: 1.05,
    offset: -10,
    offsetX: 5,
    brightness: 0.85,
    contrast: 1.15,
    saturation: 1.05
  },
  {
    url: "https://www.visit-croatia.hr/photos/districts/thumbs/Porec-Rivijera-618d2a6bf082c107547762_huge.jpg",
    scale: 1.05,
    offset: -10,
    offsetX: 5,
    brightness: 0.85,
    contrast: 1.15,
    saturation: 1.05
  },
]);

const currentImageIndex = ref(0);
let intervalId = null;

onMounted(() => {
  // Image carousel
  intervalId = setInterval(() => {
    currentImageIndex.value = (currentImageIndex.value + 1) % heroImages.value.length;
  }, 8000);
});

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId);
});
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