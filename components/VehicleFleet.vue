<template>
  <div class="relative z-20 mt-8 lg:mt-0" id="boatFleet">
    <!-- Section Title with animated underline -->
    <div class="mb-10 relative">
      <h2 class="text-4xl font-bold mb-5" v-html="$t('fleet.title')"></h2>
      <p class="text-gray-300 mt-4 max-w-md">
        {{ $t('fleet.description') }}
      </p>
    </div>

    <!-- Main Content with Boat Display -->
    <div class="relative mx-5 flex justify-start">
      <!-- Boat Showcase with 3D effect -->
      <div class="boat-showcase mb-10">
        <swiper :modules="[EffectCoverflow, Pagination, Navigation, Autoplay]" :effect="'coverflow'" :grabCursor="true"
          :centeredSlides="true" :slidesPerView="'auto'" :initialSlide='0' :coverflowEffect="{
            rotate: 30,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }" :pagination="{
            clickable: true,
            dynamicBullets: true,
            bulletClass: 'custom-bullet',
            bulletActiveClass: 'custom-bullet-active'
          }" :navigation="true" :autoplay="{
            delay: 10000,
            disableOnInteraction: false,
          }" :breakpoints="{
            320: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 1,
            },
            1024: {
              slidesPerView: 1,
            }
          }" class="w-full boat-swiper" @swiper="onSwiperInit">
          <swiper-slide class="cursor-pointer" @click="openBoatDetails(boat)">
            <div
              class="boat-card md:mt-14 bg-gray-800 rounded-xl overflow-hidden shadow-xl transform transition-transform duration-500 hover:scale-105 hover:shadow-red-600/20">
              <div class="relative h-72 overflow-hidden">
                <img :src="boat.images[0]" alt="Taxi Boat Poseidon"
                  class="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
                <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                <div class="absolute bottom-0 left-0 right-0 p-4">
                  <h4 class="text-white font-bold text-lg">Taxi Boat Poseidon</h4>
                  <div class="flex items-center text-red-500 mt-1">
                    <div class="flex mr-4">
                      <span v-html="icons.users" class="mr-1"></span>
                      <span class="text-xs text-gray-300">{{ boat.passengers }}</span>
                    </div>
                    <div class="flex">
                      <span v-html="icons.anchor" class="mr-1"></span>
                      <span class="text-xs text-gray-300">{{ boat.length }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>

    <!-- Boat Detail Modal -->
    <transition name="modal">
      <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center w-full">
        <div class="absolute inset-0 bg-black bg-opacity-80 backdrop-blur-sm" @click="closeModal"></div>
        <div class="bg-gray-900 rounded-xl overflow-hidden relative z-10 w-full max-w-3xl mx-4 animate-modal-in">
          <!-- Modal Header -->
          <div class="flex justify-between items-center p-4 bg-gray-800">
            <h3 class="text-xl font-bold text-white">Poseidon</h3>
            <button @click="closeModal" class="text-gray-300 hover:text-white">
              <span v-html="icons.close"></span>
            </button>
          </div>

          <!-- Modal Body -->
          <div class="p-0">
            <!-- Boat Images Slider -->
            <div class="relative h-64">
              <swiper :modules="[Pagination, Navigation]" :pagination="false" :navigation="true" class="w-full h-full">
                <swiper-slide v-for="(image, index) in boat.images" :key="index">
                  <img :src="image" :alt="`${$t(`fleet.boat.name`)} ${$t('fleet.view')} ${index + 1}`"
                    class="w-full h-full object-contain" />
                </swiper-slide>
              </swiper>
            </div>

            <!-- Boat Details -->
            <div class="p-6 space-y-4">
              <!-- Specifications -->
              <div>
                <h4 class="text-lg font-semibold text-red-600 mb-2">{{ $t('fleet.specifications') }}</h4>
                <div class="grid grid-cols-2 gap-4">
                  <div class="flex items-center bg-gray-800 p-3 rounded-lg">
                    <span v-html="icons.users" class="mr-3 text-red-500"></span>
                    <div>
                      <div class="text-xs text-gray-400">{{ $t('fleet.passengers') }}</div>
                      <div class="text-white font-medium">{{ boat.passengers }}</div>
                    </div>
                  </div>
                  <div class="flex items-center bg-gray-800 p-3 rounded-lg">
                    <span v-html="icons.anchor" class="mr-3 text-red-500"></span>
                    <div>
                      <div class="text-xs text-gray-400">{{ $t('fleet.length') }}</div>
                      <div class="text-white font-medium">{{ boat.length }}</div>
                    </div>
                  </div>
                  <div class="flex items-center bg-gray-800 p-3 rounded-lg">
                    <span v-html="icons.speed" class="mr-3 text-red-500"></span>
                    <div>
                      <div class="text-xs text-gray-400">{{ $t('fleet.speed') }}</div>
                      <div class="text-white font-medium">{{ boat.speed }}</div>
                    </div>
                  </div>
                  <div class="flex items-center bg-gray-800 p-3 rounded-lg">
                    <span v-html="icons.engine" class="mr-3 text-red-500"></span>
                    <div>
                      <div class="text-xs text-gray-400">{{ $t('fleet.engine') }}</div>
                      <div class="text-white font-medium">{{ boat.engine }}</div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Features List -->
              <div>
                <h4 class="text-lg font-semibold text-red-600 mb-2">{{ $t('fleet.features') }}</h4>
                <div class="grid grid-cols-2 gap-2">
                  <div v-for="(feature, index) in boat.features" :key="index" class="flex items-center">
                    <span v-html="icons.feature" class="text-red-500 mr-2"></span>
                    <span class="text-gray-300">{{ feature }}</span>
                  </div>
                </div>
              </div>

              <!-- Description -->
              <div>
                <h4 class="text-lg font-semibold text-red-600 mb-2">{{ $t('Description') }}</h4>
                <p class="text-gray-300">{{ $t(`fleet.boat.description`) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Icons using SVG for interface elements
const icons = {
  users: `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
  </svg>`,
  anchor: `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
    <path d="M13 7h2a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h2V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3zm-4-3v3h2V4H9z"/>
    <path d="M10 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
  </svg>`,
  speed: `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
    <path d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm1-13a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l2.828 2.829a1 1 0 1 0 1.415-1.415L11 9.586V5z"/>
  </svg>`,
  engine: `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
    <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
  </svg>`,
  close: `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
  </svg>`,
  feature: `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
  </svg>`,
};

// Boat data with multiple images
const boat = ref({
  id: 'poseidon',
  name: 'Taxi Boat Poseidon',
  images: [
    'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/ca/cb/3a/photo1jpg.jpg?w=1400&h=-1&s=1',
  ],
  alt: 'Taxi Boat Poseidon',
  passengers: 12,
  length: '8.5m',
  speed: '25 knots',
  engine: 'Yamaha 250HP',
  features: [
    'Shaded Seating Area',
    'redtooth Sound System',
    'Cooler Box',
    'Life Jackets',
    'Swim Platform',
    'Fresh Water Shower'
  ],
  description: 'Experience the beauty of coastal cruising with our premium Taxi Boat Poseidon. Perfect for private tours, island hopping, coastal excursions, and sea transfers. Featuring comfortable seating, sun protection, and modern amenities for an unforgettable maritime experience.',
});

// State management
const isModalOpen = ref(false);
const swiperInstance = ref(null);

// Methods
const openBoatDetails = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

// This function will keep track of swiper slides
const onSwiperInit = (swiper) => {
  swiperInstance.value = swiper;
};

// Lifecycle hooks
onMounted(() => {
  // Any initialization needed
});
</script>

<style>
.custom-bullet {
  width: 10px;
  height: 10px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  margin: 0 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.custom-bullet-active {
  background-color: #3B82F6;
  width: 12px;
  height: 12px;
}

/* General Styling */
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Swiper Customization */
.boat-swiper {
  width: 100%;
  max-width: 100%;
  padding: 20px 0;
}

.swiper-slide {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  transition: transform 0.3s ease;
}

.swiper-slide-active {
  transform: scale(1.05);
}

/* Swiper navigation buttons */
.swiper-button-next,
.swiper-button-prev {
  color: #3B82F6;
  background-color: rgba(0, 0, 0, 0.4);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  padding: 10px;
}

.swiper-button-next:after,
.swiper-button-prev:after {
  font-size: 16px;
  font-weight: bold;
}

/* Card Hover Effects */
.boat-card {
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.boat-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(59, 130, 246, 0.2);
}

/* Modal Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.animate-modal-in {
  animation: modalIn 0.3s ease forwards;
}

@keyframes modalIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Animations */
.animate-pulse-slow {
  animation: pulseSlow 3s ease-in-out infinite;
}

@keyframes pulseSlow {

  0%,
  100% {
    opacity: 0.3;
  }

  50% {
    opacity: 0.8;
  }
}

.animate-wave {
  animation: wave 5s ease-in-out infinite;
}

@keyframes wave {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }
}

/* Shadow Effects */
.shadow-glow-red {
  box-shadow: 0 0 15px rgba(59, 130, 246, 0.6);
}

.perspective {
  transform-style: preserve-3d;
  transition: transform 0.3s ease;
}

.perspective:hover {
  transform: perspective(1000px) rotateX(5deg);
}

/* Responsive Adjustments */
@media (max-width: 640px) {
  .boat-showcase {
    margin-left: -16px;
    margin-right: -16px;
    width: calc(100% + 32px);
  }
}

/* Additional Boat Card Styling */
.boat-card .features-tag {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: rgba(0, 0, 0, 0.7);
  color: #3B82F6;
  font-size: 0.75rem;
  padding: 2px 8px;
  border-radius: 4px;
  z-index: 1;
}

/* Button Hover Effects */
.button-primary {
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.button-primary::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 5px;
  height: 5px;
  background: rgba(255, 255, 255, 0.5);
  opacity: 0;
  border-radius: 100%;
  transform: scale(1, 1) translate(-50%);
  transform-origin: 50% 50%;
}

.button-primary:hover::after {
  animation: ripple 1s ease-out;
}

@keyframes ripple {
  0% {
    transform: scale(0, 0);
    opacity: 0.5;
  }

  100% {
    transform: scale(20, 20);
    opacity: 0;
  }
}
</style>