<template>
  <section class="pt-24 bg-black text-white" id='aboutUs'>
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <!-- Left Column - Text Content -->
        <div>
          <h3 class="text-4xl font-bold mb-6" v-html="$t('about_us.about_our_company')">
          </h3>

          <div class="space-y-6">
            <p class="text-lg text-gray-300">
              {{ $t('about_us.company_history') }}
            </p>

            <p class="text-lg text-gray-300">
              {{ $t('about_us.mission') }}
            </p>

            <!-- Company Values -->
            <div class="mt-8 space-y-4">
              <h3 class="text-2xl font-bold text-red-600">{{ $t('about_us.our_values') }}</h3>

              <div class="flex items-start space-x-4">
                <div class="flex-shrink-0 mt-1 bg-red-600 rounded-full p-1">
                  <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="font-bold">{{ $t('about_us.safety_reliability') }}</h4>
                  <p class="text-gray-400">{{ $t('about_us.safety_description') }}</p>
                </div>
              </div>

              <div class="flex items-start space-x-4">
                <div class="flex-shrink-0 mt-1 bg-red-600 rounded-full p-1">
                  <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="font-bold">{{ $t('about_us.customer_excellence') }}</h4>
                  <p class="text-gray-400">{{ $t('about_us.customer_description') }}</p>
                </div>
              </div>

              <div class="flex items-start space-x-4">
                <div class="flex-shrink-0 mt-1 bg-red-600 rounded-full p-1">
                  <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="font-bold">{{ $t('about_us.innovation') }}</h4>
                  <p class="text-gray-400">{{ $t('about_us.innovation_description') }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Stats Overlay -->
          <h3 class="mt-5 text-2xl font-bold text-red-600">{{ $t('about_us.our_mission') }}</h3>

          <div class="mt-5 bg-red-600 text-white p-6 rounded-xl shadow-xl">
            <div class="grid grid-cols-1 gap-6">
              <div class="text-center">
                <div class="text-4xl font-bold">100%</div>
                <div class="text-sm font-medium mt-1">{{ $t('about_us.satisfaction') }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column - Images/Stats -->
        <VehicleFleet />
      </div>
    </div>
  </section>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, EffectCoverflow, Autoplay, Zoom } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import 'swiper/css/zoom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

gsap.registerPlugin(ScrollTrigger);

// Vehicle data with expanded information
const vehicleCategories = ref([
  {
    id: 'luxury',
    title: 'Luxury Cars',
    icon: 'car',
    description: 'Elegant sedans and premium vehicles for executive travel and special occasions.',
    longDescription: 'Experience unparalleled comfort and style with our fleet of high-end luxury vehicles. Perfect for business meetings, airport transfers, or special events where you want to make an impression.',
    vehicles: [
      {
        id: 'mercedes-s-class',
        name: 'Mercedes S-Class',
        image: '/api/placeholder/500/300',
        alt: 'Mercedes S-Class sedan',
        caption: 'Mercedes S-Class - Ultimate Luxury',
        passengers: 4,
        luggage: 3,
        features: ['Leather seats', 'WiFi', 'Premium sound system', 'Complimentary refreshments'],
        pricePerHour: 120
      },
      {
        id: 'bmw-7',
        name: 'BMW 7 Series',
        image: '/api/placeholder/500/300',
        alt: 'BMW 7 Series sedan',
        caption: 'BMW 7 Series - Executive Travel',
        passengers: 4,
        luggage: 3,
        features: ['Climate control', 'Privacy glass', 'In-car entertainment', 'Extended legroom'],
        pricePerHour: 110
      },
      {
        id: 'audi-a8',
        name: 'Audi A8',
        image: '/api/placeholder/500/300',
        alt: 'Audi A8 sedan',
        caption: 'Audi A8 - Sophisticated Elegance',
        passengers: 4,
        luggage: 3,
        features: ['Massage seats', 'Ambient lighting', 'Digital assistant', 'Noise insulation'],
        pricePerHour: 115
      }
    ]
  },
  {
    id: 'vans',
    title: 'Spacious Vans',
    icon: 'van',
    description: 'Comfortable vans with ample space for luggage and small groups up to 8 passengers.',
    longDescription: 'Our premium vans offer the perfect balance of comfort and practicality for small groups. Ideal for family trips, airport transfers, or group excursions with plenty of luggage space.',
    vehicles: [
      {
        id: 'mercedes-vito',
        name: 'Mercedes Vito',
        image: '/api/placeholder/500/300',
        alt: 'Mercedes Vito van',
        caption: 'Mercedes Vito - Comfort for Groups',
        passengers: 8,
        luggage: 8,
        features: ['Reclining seats', 'Individual AC controls', 'USB charging ports', 'Panoramic roof'],
        pricePerHour: 95
      },
      {
        id: 'vw-transporter',
        name: 'VW Transporter',
        image: '/api/placeholder/500/300',
        alt: 'VW Transporter van',
        caption: 'VW Transporter - Spacious & Reliable',
        passengers: 8,
        luggage: 7,
        features: ['Configurable seating', 'Ample legroom', 'Bluetooth audio', 'Extra luggage space'],
        pricePerHour: 90
      },
      {
        id: 'ford-transit',
        name: 'Ford Transit Custom',
        image: '/api/placeholder/500/300',
        alt: 'Ford Transit Custom van',
        caption: 'Ford Transit Custom - Versatile Transport',
        passengers: 8,
        luggage: 8,
        features: ['Premium audio', 'Comfortable seating', 'Tinted windows', 'Reading lights'],
        pricePerHour: 85
      }
    ]
  },
  {
    id: 'minibus',
    title: 'Minibuses',
    icon: 'bus',
    description: 'Ideal for larger groups, events, and airport transfers with capacity for up to 16 passengers.',
    longDescription: 'Perfect solution for larger groups traveling together. Our minibuses combine comfort with practicality, offering ample space for passengers and luggage for corporate events, tours, or large family gatherings.',
    vehicles: [
      {
        id: 'mercedes-sprinter',
        name: 'Mercedes Sprinter',
        image: '/api/placeholder/500/300',
        alt: 'Mercedes Sprinter minibus',
        caption: 'Mercedes Sprinter - Premium Group Travel',
        passengers: 16,
        luggage: 16,
        features: ['High roof', 'Premium audio/video', 'Individual AC vents', 'Comfortable seating'],
        pricePerHour: 150
      },
      {
        id: 'iveco-daily',
        name: 'Iveco Daily',
        image: '/api/placeholder/500/300',
        alt: 'Iveco Daily minibus',
        caption: 'Iveco Daily - Spacious & Modern',
        passengers: 16,
        luggage: 16,
        features: ['Overhead storage', 'USB charging', 'PA system', 'Configurable seating'],
        pricePerHour: 140
      },
      {
        id: 'ford-transit-minibus',
        name: 'Ford Transit Minibus',
        image: '/api/placeholder/500/300',
        alt: 'Ford Transit Minibus',
        caption: 'Ford Transit - Efficient Group Transport',
        passengers: 14,
        luggage: 14,
        features: ['Leather seats', 'Reading lights', 'Extra-wide doors', 'Wheelchair accessible'],
        pricePerHour: 130
      }
    ]
  }
]);

// UI State Management
const activeCategory = ref(vehicleCategories.value[0].id);
const selectedVehicle = ref(null);
const isModalOpen = ref(false);
const isBookingFormOpen = ref(false);
const bookingDate = ref('');
const bookingHours = ref(4);
const bookingPickup = ref('');
const bookingDropoff = ref('');
const bookingPassengers = ref(1);

// Computed properties
const currentCategory = computed(() =>
  vehicleCategories.value.find(category => category.id === activeCategory.value)
);

// Swiper options
const swiperOptions = {
  modules: [Navigation, Pagination, EffectCoverflow, Autoplay, Zoom],
  slidesPerView: 'auto',
  spaceBetween: 30,
  centeredSlides: true,
  loop: true,
  effect: 'coverflow',
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  navigation: true,
  pagination: {
    clickable: true,
    dynamicBullets: true,
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 10
    },
    640: {
      slidesPerView: 1.5,
      spaceBetween: 20
    },
    1024: {
      slidesPerView: 2,
      spaceBetween: 30
    }
  }
};

// Methods
const setActiveCategory = (categoryId) => {
  activeCategory.value = categoryId;
};

const openVehicleDetails = (vehicle) => {
  selectedVehicle.value = vehicle;
  isModalOpen.value = true;
  document.body.classList.add('overflow-hidden');
};

const closeModal = () => {
  isModalOpen.value = false;
  document.body.classList.remove('overflow-hidden');
  setTimeout(() => {
    if (!isBookingFormOpen.value) {
      selectedVehicle.value = null;
    }
  }, 300);
};

const openBookingForm = () => {
  isBookingFormOpen.value = true;
};

const closeBookingForm = () => {
  isBookingFormOpen.value = false;
};

const submitBooking = () => {
  // Simulated booking submission
  console.log('Booking submitted:', {
    vehicle: selectedVehicle.value?.name,
    date: bookingDate.value,
    hours: bookingHours.value,
    pickup: bookingPickup.value,
    dropoff: bookingDropoff.value,
    passengers: bookingPassengers.value,
    totalPrice: calculatePrice()
  });

  // Show confirmation and reset
  alert('Booking request received! We will contact you shortly to confirm details.');
  isBookingFormOpen.value = false;
  isModalOpen.value = false;
  selectedVehicle.value = null;
  resetBookingForm();
};

const resetBookingForm = () => {
  bookingDate.value = '';
  bookingHours.value = 4;
  bookingPickup.value = '';
  bookingDropoff.value = '';
  bookingPassengers.value = 1;
};

const calculatePrice = () => {
  return selectedVehicle.value ? selectedVehicle.value.pricePerHour * bookingHours.value : 0;
};

// Icon components
const icons = {
  car: `<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"></path>
          <path d="M3 4h3.5l1 4h11l1 7H6m2-7h7"></path>
        </svg>`,
  van: `<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"></path>
          <path d="M2 5h3l1 5h8l1 5H5m3-5h5"></path>
        </svg>`,
  bus: `<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"></path>
          <path d="M2 4h16v8H2zm1 8v3h14v-3"></path>
        </svg>`,
  users: `<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
          </svg>`,
  luggage: `<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3-2a1 1 0 00-1 1v1h4V4a1 1 0 00-1-1H7zM6 7v8h8V7H6z"></path>
            </svg>`,
  feature: `<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
            </svg>`,
  close: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>`,
};

// Animation setup
onMounted(() => {
  // Animate category headers when they come into view
  gsap.utils.toArray('.category-header').forEach(header => {
    gsap.from(header, {
      scrollTrigger: {
        trigger: header,
        start: "top bottom",
        toggleActions: "play none none reset"
      },
      y: 50,
      opacity: 0,
      duration: 0.8
    });
  });

  // Animate vehicle cards with stagger
  vehicleCategories.value.forEach(category => {
    const sectionSelector = `#${category.id}-section`;
    gsap.from(`${sectionSelector} .vehicle-card`, {
      scrollTrigger: {
        trigger: sectionSelector,
        start: "top bottom-=100px",
        toggleActions: "play none none reset"
      },
      y: 100,
      opacity: 0,
      duration: 0.6,
      stagger: 0.2
    });
  });
});

const vehicles = ref([
  {
    image: "/images/PHOTO-2025-01-25-12-17-38.jpg",
    alt: "Luxury sedan",
    caption: "Elegant sedans for executive travel and special occasions.",
  },
  {
    image: "/images/PHOTO-2025-02-16-10-20-40.jpg",
    alt: "Premium car",
    caption: "Premium vehicles offering ultimate comfort and luxury.",
  },
  {
    image: "/images/PHOTO-2025-02-16-10-20-40 2.jpg",
    alt: "Luxury van",
    caption: "Spacious vans for small groups and extra luggage.",
  },
  {
    image: "/images/PHOTO-2025-01-25-12-17-38.jpg",
    alt: "Minibus",
    caption: "Ideal for airport transfers and larger groups.",
  },
]);
</script>

<style>
.vehicle-swiper {
  width: 100%;
  max-width: 500px;
}

.swiper-pagination-bullet-active {
  background-color: #dc2626 !important;
}

.swiper-button-next,
.swiper-button-prev {
  color: #dc2626 !important;
}
</style>