<template>
  <!-- Hero Section with Advanced Layering and Effects -->
  <section class="relative h-screen overflow-hidden">
    <!-- Dynamic Background System with Layered Effects -->
    <div class="absolute inset-0">
      <!-- Advanced Image Carousel with Parallax and Ken Burns Effects -->
      <transition-group name="fade" tag="div" class="h-full w-full">
        <video autoplay muted loop playsinline poster="/public/poseidoncover1.jpg" class="w-full h-full object-cover">
          <source src="/public/poseidon.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
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

    <div class="absolute top-0 left-0 w-64 h-64 bg-red-600 opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2">
    </div>
    <!-- 3D Transform Content Container -->
    <div class="relative h-full container mx-auto px-6 flex flex-col justify-center items-start perspective-1000">
      <!-- Hero Content with Staggered Animation and 3D Effects -->
      <div class="max-w-2xl space-y-8 transform-gpu">

        <!-- Enhanced Heading with Creative Typography -->
        <div class="relative">
          <h1 class="text-5xl md:text-7xl font-bold text-white leading-none tracking-tight">
            <span class="block">{{ t('hero.city_name') }}</span>
            <div class="flex items-baseline gap-3 mt-2">
              <div class="relative inline-block group">
                <img src="/public/poseidon.svg" alt="">
              </div>
            </div>
          </h1>

          <!-- Decorative Elements -->
          <div class="absolute -top-10 -left-10 w-20 h-20 text-red-600/20 rotate-12 hidden md:block">
            <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
          </div>
        </div>

        <!-- Enhanced Subtitle with Gradient -->
        <p class="text-xl md:text-2xl font-light text-white leading-relaxed max-w-xl">
          <span>{{ t('hero.subtitle') }}</span>
        </p>

        <!-- CTA Section with Advanced Hover Effects -->
        <div class="flex flex-col sm:flex-row gap-4 pt-4">
          <!-- Primary CTA with Pulse Effect -->
          <button @click="scrollTo('services')"
            class="group relative px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-[1.03] shadow-lg hover:shadow-red-600/25 overflow-hidden flex items-center justify-center">
            <!-- Ripple Effect -->
            <span
              class="absolute inset-0 w-full h-full transition-all duration-300 scale-0 transform origin-center rounded-lg group-hover:scale-100 group-hover:opacity-0 bg-red-500 group-active:opacity-0"></span>

            <span class="relative flex items-center">
              <span>{{ t('hero.cta.services') }}</span>
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
              <span>{{ t('hero.cta.about') }}</span>
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

        <!-- Enhanced Feature Highlights with Hover Effects -->
        <div class="grid grid-cols-2 mx-auto w-full gap-6 mt-8">
          <div v-for="(feature, index) in features" :key="feature.id" class="flex items-center group cursor-pointer">
            <div
              class="w-12 h-12 rounded-xl bg-red-600/10 border border-red-600/20 flex items-center justify-center mr-3 transition-all duration-300 group-hover:bg-red-600/20 group-hover:scale-110 relative overflow-hidden">
              <div
                class="absolute inset-0 bg-gradient-to-br from-red-500/0 to-red-700/0 group-hover:from-red-500/10 group-hover:to-red-700/20 transition-all duration-500">
              </div>
              <component :is="feature.icon"
                class="w-5 h-5 text-red-500 relative z-10 transition-all duration-300 group-hover:scale-110" />
            </div>
            <div class="text-sm">
              <div class="text-white font-medium group-hover:text-red-400 transition-colors duration-300">
                {{ t(`hero.features.${feature.id}.title`) }}
              </div>
              <div class="text-gray-300 text-xs">{{ t(`hero.features.${feature.id}.description`) }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, defineComponent, h } from 'vue';
import Typed from 'typed.js';
import { useMouse } from '@vueuse/core';
import { useI18n } from 'vue-i18n';

// Connect to i18n
const { t, locale } = useI18n({
  inheritLocale: true,
  useScope: 'local',
  messages: {
    en: {
      hero: {
        city_name: 'Taxi Boat',
        typing_strings: ['Poseidon'],
        subtitle: 'Enjoy premium transportation with professional drivers and a top-class fleet.',
        cta: {
          services: 'View Services',
          about: 'Learn More'
        },
        features: {
          drivers: {
            title: 'Expert Drivers',
            description: 'Skilled and multilingual professionals'
          },
          punctual: {
            title: 'Always On Time',
            description: 'Punctuality you can count on'
          },
          safe: {
            title: 'Safe & Reliable',
            description: 'Licensed and fully insured vehicles'
          },
          payment: {
            title: 'Flexible Payment',
            description: 'Cash and card accepted'
          }
        }
      }
    },
    hr: {
      hero: {
        city_name: 'Taxi Boat',
        typing_strings: ['Transferi', 'Taxi', 'Izleti'],
        subtitle: 'Uživajte u vrhunskom prijevozu sa stručnim vozačima i modernom flotom.',
        cta: {
          services: 'Pogledaj Usluge',
          about: 'Saznaj Više'
        },
        features: {
          drivers: {
            title: 'Stručni Vozači',
            description: 'Iskusni i višejezični profesionalci'
          },
          punctual: {
            title: 'Uvijek Točni',
            description: 'Pouzdano i bez kašnjenja'
          },
          safe: {
            title: 'Sigurnost na Prvom Mjestu',
            description: 'Licencirana i osigurana vozila'
          },
          payment: {
            title: 'Fleksibilno Plaćanje',
            description: 'Primamo gotovinu i kartice'
          }
        }
      }
    },
    de: {
      hero: {
        city_name: 'Taxi Boat',
        typing_strings: ['Transfers', 'Taxi', 'Ausflüge'],
        subtitle: 'Genießen Sie erstklassigen Transport mit erfahrenen Fahrern und moderner Flotte.',
        cta: {
          services: 'Dienstleistungen',
          about: 'Mehr erfahren'
        },
        features: {
          drivers: {
            title: 'Erfahrene Fahrer',
            description: 'Professionell und mehrsprachig'
          },
          punctual: {
            title: 'Pünktlich & Zuverlässig',
            description: 'Ihre Zeit ist uns wichtig'
          },
          safe: {
            title: 'Sicher & Vertrauenswürdig',
            description: 'Lizenzierte und versicherte Fahrzeuge'
          },
          payment: {
            title: 'Flexible Zahlung',
            description: 'Bar- und Kartenzahlung möglich'
          }
        }
      }
    },
    it: {
      hero: {
        city_name: 'Parenzo',
        typing_strings: ['Trasferimenti', 'Taxi', 'Escursioni'],
        subtitle: 'Goditi un trasporto premium con autisti esperti e una flotta moderna.',
        cta: {
          services: 'Scopri i Servizi',
          about: 'Scopri di Più'
        },
        features: {
          drivers: {
            title: 'Autisti Esperti',
            description: 'Professionisti esperti e multilingue'
          },
          punctual: {
            title: 'Sempre Puntuali',
            description: 'Rispettiamo il tuo tempo'
          },
          safe: {
            title: 'Sicurezza Garantita',
            description: 'Flotta autorizzata e assicurata'
          },
          payment: {
            title: 'Pagamento Flessibile',
            description: 'Accettiamo contanti e carte'
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

const CheckBadgeIcon = defineComponent({
  render: () => h('svg', { fill: 'currentColor', viewBox: '0 0 20 20' }, [
    h('path', { 'fill-rule': 'evenodd', d: 'M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z', 'clip-rule': 'evenodd' })
  ])
});

const BoltIcon = defineComponent({
  render: () => h('svg', { fill: 'currentColor', viewBox: '0 0 20 20' }, [
    h('path', { 'fill-rule': 'evenodd', d: 'M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z', 'clip-rule': 'evenodd' })
  ])
});

const UsersIcon = defineComponent({
  render: () => h('svg', { fill: 'currentColor', viewBox: '0 0 20 20' }, [
    h('path', { d: 'M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z' })
  ])
});

const CreditCardIcon = defineComponent({
  render: () => h('svg', { fill: 'currentColor', viewBox: '0 0 20 20' }, [
    h('path', { d: 'M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z' }),
    h('path', { 'fill-rule': 'evenodd', d: 'M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z', 'clip-rule': 'evenodd' })
  ])
});

// Modified features with unique IDs for i18n
const features = [
  {
    id: 'drivers',
    icon: UsersIcon
  },
  {
    id: 'punctual',
    icon: ClockIcon
  },
  {
    id: 'safe',
    icon: ShieldIcon
  },
  {
    id: 'payment',
    icon: CreditCardIcon
  }
];

// Enhanced hero images with more animation properties
const heroImages = ref([
  {
    url: "https://www.porec.hr/thumbnail.aspx?filename=/cmsmedia/sadrzaj/homepage/96201.jpg&width=1920&height=900&trim=1&save=1&quality=80",
    scale: 1,
    offset: 0,
    offsetX: 0,
    brightness: 0.9,
    contrast: 1.1,
    saturation: 1.1
  },
  {
    url: "https://images.divisare.com//images/c_limit,f_auto,h_2000,q_auto,w_3000/v1515683369/u87nrxhz6tmey1jiuzxt/one-works-venice-marco-polo-international-airport.jpg",
    scale: 1.05,
    offset: -10,
    offsetX: 5,
    brightness: 0.85,
    contrast: 1.15,
    saturation: 1.05
  },
  {
    url: "https://www.rollingexistence.com/wp-content/uploads/2021/09/tunnel.jpg",
    scale: 1.1,
    offset: 0,
    offsetX: -5,
    brightness: 0.8,
    contrast: 1.2,
    saturation: 1
  },
  {
    url: "https://www.np-brijuni.hr/imagecache/maxsize/6f67e492-4a50-4136-93fd-89f06287a549/28-12-2018/brijuni_iz_zraka2.jpg",
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

  // Get localized typing strings from i18n
  const typingStrings = t('hero.typing_strings', [], { resolver: (val) => val });

  // Enhanced typing effect with better strings
  nextTick(() => {
    if (typingTextEl.value) {
      typedInstance = new Typed(typingTextEl.value, {
        strings: Array.isArray(typingStrings) ? typingStrings : ['Transfers', 'Taxi', 'Tours'],
        typeSpeed: 60,
        backSpeed: 40,
        backDelay: 3000,
        startDelay: 1000,
        loop: true,
        showCursor: false
      });
    }
  });

  // Subtle parallax effect based on mouse position
  window.addEventListener('mousemove', updateMousePosition);

  // Listen for language changes and update typing strings
  watch(locale, (newLocale) => {
    if (typedInstance) {
      // Get new strings for the selected locale
      const newTypingStrings = t('hero.typing_strings', [], { resolver: (val) => val });

      // Reset typed instance with new strings
      typedInstance.destroy();
      nextTick(() => {
        if (typingTextEl.value) {
          typedInstance = new Typed(typingTextEl.value, {
            strings: Array.isArray(newTypingStrings) ? newTypingStrings : ['Transfers', 'Taxi', 'Tours'],
            typeSpeed: 60,
            backSpeed: 40,
            backDelay: 3000,
            startDelay: 1000,
            loop: true,
            showCursor: false
          });
        }
      });
    }
  });
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

/* Enhanced Fade Transition for Images */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Floating particles animation */
.particle {
  position: absolute;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  pointer-events: none;
  animation: float 15s infinite ease-in-out;
}

@keyframes float {

  0%,
  100% {
    transform: translateY(0) translateX(0);
  }

  25% {
    transform: translateY(-20px) translateX(10px);
  }

  50% {
    transform: translateY(-10px) translateX(20px);
  }

  75% {
    transform: translateY(-30px) translateX(-10px);
  }
}

/* Custom animation for typing cursor */
.typed-cursor {
  color: #EAB308;
  font-weight: bold;
}
</style>