<template>
  <div class="relative z-20 mt-8 lg:mt-0" id="vehicleFleet">
    <!-- Section Title with animated underline -->
    <div class="mb-10 relative">
      <h2 class="text-4xl font-bold mb-5" v-html="$t('fleet.title')"></h2>
      <p class="text-gray-300 mt-4 max-w-md">
        {{ $t('fleet.description') }}
      </p>
    </div>

    <!-- Category Tabs with glowing active state -->
    <div class="flex overflow-x-auto hide-scrollbar pb-3">
      <button v-for="category in vehicleCategories" :key="category.id" @click="setActiveCategory(category.id)" :class="[
        'px-5 py-2.5 rounded-full whitespace-nowrap mr-3 font-medium transition-all duration-300 flex items-center',
        activeCategory === category.id
          ? 'bg-red-600 text-white shadow-glow-red'
          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
      ]">
        {{ $t(`fleet.categories.${category.id}.title`) }}
      </button>
    </div>

    <!-- Main Content with Vehicle Display -->
    <div class="relative mx-5 flex justify-start">
      <!-- Vehicle Showcase with 3D coverflow effect -->
      <div class="vehicle-showcase mb-10">
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
              slidesPerView: 1.5,
            },
            1024: {
              slidesPerView: 2,
            }
          }" class="w-full vehicle-swiper" @slideChange="onSlideChange" @swiper="onSwiperInit">
          <swiper-slide v-for="vehicle in vehicles" :key="vehicle.id" class="cursor-pointer"
            @click="openVehicleDetails(vehicle)">
            <div
              class="vehicle-card md:mt-14 bg-gray-800 rounded-xl overflow-hidden shadow-xl transform transition-transform duration-500 hover:scale-105 hover:shadow-red-600/20">
              <div class="relative h-72 overflow-hidden">
                <img :src="vehicle.images[0]" :alt="$t(`fleet.vehicles.${vehicle.id}.alt`)"
                  class="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
                <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                <div class="absolute bottom-0 left-0 right-0 p-4">
                  <h4 class="text-white font-bold text-lg">{{ $t(`fleet.vehicles.${vehicle.id}.name`) }}</h4>
                  <div class="flex items-center text-red-500 mt-1">
                    <div class="flex mr-4">
                      <span v-html="icons.users" class="mr-1"></span>
                      <span class="text-xs text-gray-300">{{ vehicle.passengers }}</span>
                    </div>
                    <div class="flex">
                      <span v-html="icons.luggage" class="mr-1"></span>
                      <span class="text-xs text-gray-300">{{ vehicle.luggage }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>

    <!-- Vehicle Detail Modal -->
    <transition name="modal">
      <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center w-full">
        <div class="absolute inset-0 bg-black bg-opacity-80 backdrop-blur-sm" @click="closeModal"></div>
        <div class="bg-gray-900 rounded-xl overflow-hidden relative z-10 w-full max-w-3xl mx-4 animate-modal-in">
          <!-- Modal Header -->
          <div class="flex justify-between items-center p-4 bg-gray-800">
            <h3 class="text-xl font-bold text-white">{{ selectedVehicle ?
              $t(`fleet.vehicles.${selectedVehicle.id}.name`) : '' }}</h3>
            <button @click="closeModal" class="text-gray-300 hover:text-white">
              <span v-html="icons.close"></span>
            </button>
          </div>

          <!-- Modal Body -->
          <div v-if="selectedVehicle" class="p-0">
            <!-- Vehicle Images Slider -->
            <div class="relative h-64">
              <swiper :modules="[Pagination, Navigation]" :pagination="false" :navigation="true" class="w-full h-full">
                <swiper-slide v-for="(image, index) in selectedVehicle.images" :key="index">
                  <img :src="image"
                    :alt="`${$t(`fleet.vehicles.${selectedVehicle.id}.name`)} ${$t('fleet.view')} ${index + 1}`"
                    class="w-full h-full object-contain" />
                </swiper-slide>
              </swiper>
            </div>

            <!-- Vehicle Details -->
            <div class="p-6 space-y-4">
              <!-- Specifications -->
              <div>
                <h4 class="text-lg font-semibold text-red-600 mb-2">{{ $t('fleet.specifications') }}</h4>
                <div class="grid grid-cols-2 gap-4">
                  <div class="flex items-center bg-gray-800 p-3 rounded-lg">
                    <span v-html="icons.users" class="mr-3 text-red-500"></span>
                    <div>
                      <div class="text-xs text-gray-400">{{ $t('fleet.passengers') }}</div>
                      <div class="text-white font-medium">{{ selectedVehicle.passengers }}</div>
                    </div>
                  </div>
                  <div class="flex items-center bg-gray-800 p-3 rounded-lg">
                    <span v-html="icons.luggage" class="mr-3 text-red-500"></span>
                    <div>
                      <div class="text-xs text-gray-400">{{ $t('fleet.luggage') }}</div>
                      <div class="text-white font-medium">{{ selectedVehicle.luggage }} {{ $t('fleet.pieces') }}</div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Description -->
              <div>
                <h4 class="text-lg font-semibold text-red-600 mb-2">{{ $t('Description') }}</h4>
                <p class="text-gray-300">{{ $t(`fleet.vehicles.${selectedVehicle.id}.description`) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
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
  luggage: `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
    <path fill-rule="evenodd" d="M5 5a3 3 0 015.584-1.489 3 3 0 015.584 1.489H5zm5-2a2 2 0 00-2 2h4a2 2 0 00-2-2zm7 0a3 3 0 00-3 3h1a2 2 0 012-2V3z" clip-rule="evenodd" />
    <path fill-rule="evenodd" d="M4 7a1 1 0 011-1h10a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1V7zm4 6h8V8h-8v5z" clip-rule="evenodd" />
  </svg>`,
  luxury: `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
    <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd" />
  </svg>`,
  sedan: `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
    <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
    <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H11a1 1 0 001-1v-1h3.05a2.5 2.5 0 014.9 0H19a1 1 0 001-1v-2a4 4 0 00-4-4h-4.05l-1.2-3A1 1 0 0010 3H4a1 1 0 00-1 1z" />
  </svg>`,
  van: `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
    <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
    <path d="M2 4a1 1 0 011-1h5a1 1 0 01.707.293l7 7a1 1 0 01.293.707V15a1 1 0 01-1 1h-1.05a2.5 2.5 0 01-4.9 0H5.05a2.5 2.5 0 01-4.9 0H4a1 1 0 01-1-1V4z" />
  </svg>`,
  close: `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
  </svg>`,
  feature: `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
  </svg>`,
};

// Vehicle categories
const vehicleCategories = [
  {
    id: 'luxury',
    title: 'Cars',
    icon: 'luxury',
    longDescription: 'Our luxury sedans combine elegance, comfort, and superior performance for an unparalleled executive travel experience. Perfect for business meetings, airport transfers, and special occasions.',
  },
  {
    id: 'van',
    title: 'Passenger Vans',
    icon: 'van',
    longDescription: 'Spacious and comfortable premium vans offering superior legroom, ample luggage space, and elevated seating position. Ideal for families, small groups, or clients who prefer a more commanding view of the road.',
  },
  {
    id: 'minibus',
    title: 'Minibus',
    icon: 'users',
    longDescription: 'Our executive minibuss provide the ultimate in group transportation, with spacious interiors, comfortable seating, and premium amenities. Perfect for corporate teams, airport transfers, and special event groups.',
  },
];

// Vehicle data with multiple images for each vehicle
const vehicles = [
  {
    id: 'mercedes_e_class',
    categoryId: 'luxury',
    name: 'Mercedes E-Class',
    images: [
      '/images/merccar1.jpeg',
      '/images/merccar2.jpeg',
      '/images/merccar3.jpeg',
    ],
    alt: 'Mercedes E-class Car',
    passengers: 3,
    luggage: 3,
    features: ['Leather Interior', 'WiFi', 'Canton Sound System', 'Adaptive Cruise Control'],
    description: 'The Škoda Superb delivers exceptional comfort and spaciousness in an elegant package. This flagship sedan offers remarkable interior room, sophisticated technology, and European refinement at a competitive price point.',
  },
  {
    id: 'mercedes_v_class',
    categoryId: 'van',
    name: 'Mercedes V-Class',
    images: [
      '/images/vclass10.jpeg',
      '/images/vclass1.jpeg',
      '/images/vclass3.jpeg',
      '/images/vclass4.jpeg'
    ],
    alt: 'Mercedes V-Class van',
    passengers: 7,
    luggage: 6,
    features: ['Electric Sliding Doors', 'Luxury Seating', 'Ambient Lighting', 'MBUX Infotainment', 'Three-Zone Climate Control'],
    description: 'The Mercedes V-Class combines spacious versatility with premium luxury. This sophisticated MPV offers outstanding comfort, flexible seating arrangements, and Mercedes-Benz quality for executive transport.',
  },
  {
    id: 'renault_trafic',
    categoryId: 'van',
    name: 'Renault Trafic',
    images: [
      '/images/renault1.jpg',
      '/images/renaultt2.jpeg',
      '/images/renaultt3.jpeg',
      '/images/renaultt4.jpeg',
      '/images/renaultt6.jpeg',
      '/images/renaultt7.jpeg'
    ],
    alt: 'Renault Trafic passenger van',
    passengers: 8,
    luggage: 5,
    features: ['Modular Seating', 'Hands-Free Sliding Door', 'R-Link Multimedia', 'LED Headlights', 'Cruise Control'],
    description: 'The Renault Trafic delivers practical versatility with modern comfort features. This efficient passenger van offers excellent fuel economy, clever storage solutions, and a comfortable ride for group transportation.',
  },
  {
    id: 'mercedes_sprinter',
    categoryId: 'minibus',
    name: 'Mercedes Benz Sprinter Minibus',
    images: [
      '/images/minibus10.jpeg',
      '/images/minibus11.jpeg',
      '/images/minibus12.jpeg',
      '/images/minibus13.jpeg',
      '/images/minibus14.jpeg',
      '/images/minibus2.jpg',
      '/images/minibus3.jpg',
      '/images/minibus4.jpg',
      '/images/minibus5.jpg',
      '/images/minibus6.jpg',
      '/images/minibus8.jpg',
    ],
    alt: 'Mercedes Benz Sprinter Minibus',
    passengers: 19,
    luggage: 16,
    features: ['Professional Driver', 'Air Suspension', 'High-Quality Audio', 'USB Charging Ports', 'Comfortable Seating'],
    description: 'The Mercedes Benz Sprinter Minibus provides reliable group transportation with superior comfort and safety features. Perfect for corporate events, airport transfers, and tour groups requiring spacious accommodation.',
  },
];

// State management
const activeCategory = ref('luxury');
const isModalOpen = ref(false);
const selectedVehicle = ref(null);
const swiperInstance = ref(null);

// Methods
const setActiveCategory = (categoryId) => {
  activeCategory.value = categoryId;

  // Find the first slide index that has a vehicle of this category
  if (swiperInstance.value) {
    const slideIndex = vehicles.findIndex(vehicle => vehicle.categoryId === categoryId);
    if (slideIndex >= 0) {
      swiperInstance.value.slideTo(slideIndex);
    }
  }
};

const openVehicleDetails = (vehicle) => {
  selectedVehicle.value = vehicle;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  setTimeout(() => {
    selectedVehicle.value = null;
  }, 300);
};

// This function will keep track of swiper slides
const onSwiperInit = (swiper) => {
  swiperInstance.value = swiper;
};

// This function will be called when the slide changes
const onSlideChange = (swiper) => {
  const activeSlideIndex = swiper.activeIndex;
  const activeVehicle = vehicles[activeSlideIndex];

  if (activeVehicle) {
    activeCategory.value = activeVehicle.categoryId;
  }
};

// Lifecycle hooks
onMounted(() => {
  // Initialize with the first category selected
  activeCategory.value = vehicleCategories[0].id;
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
  background-color: #DC2626;
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
.vehicle-swiper {
  width: 100%;
  max-width: 100%;
  padding: 20px 0;
}

.swiper-slide {
  width: 340px;
  transition: transform 0.3s ease;
}

.swiper-slide-active {
  transform: scale(1.05);
}

/* Swiper navigation buttons */
.swiper-button-next,
.swiper-button-prev {
  color: #DC2626;
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
.vehicle-card {
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.vehicle-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(220, 38, 38, 0.2);
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

.animate-spotlight {
  animation: spotlight 5s linear infinite;
}

@keyframes spotlight {
  0% {
    transform: translateX(-100%) skewX(-12deg);
  }

  100% {
    transform: translateX(200%) skewX(-12deg);
  }
}

/* Shadow Effects */
.shadow-glow-red {
  box-shadow: 0 0 15px rgba(220, 38, 38, 0.6);
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
  .swiper-slide {
    width: 280px;
  }

  .vehicle-showcase {
    margin-left: -16px;
    margin-right: -16px;
    width: calc(100% + 32px);
  }
}

/* Additional Vehicle Card Styling */
.vehicle-card .features-tag {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: rgba(0, 0, 0, 0.7);
  color: #DC2626;
  font-size: 0.75rem;
  padding: 2px 8px;
  border-radius: 4px;
  z-index: 1;
}

/* Tier Chart */
.tier-chart-row {
  transition: background-color 0.3s ease;
}

.tier-chart-row:hover {
  background-color: rgba(220, 38, 38, 0.1);
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