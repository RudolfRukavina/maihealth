<template>
  <!-- Services Section with Clean, Reliable Design -->
  <section class="pb-10 bg-gradient-to-b from-black via-gray-950 to-black relative overflow-hidden" id="services">
    <!-- Simple background elements -->
    <div class="absolute bottom-0 right-0 w-96 h-96 bg-red-600 opacity-10 rounded-full translate-x-1/3 translate-y-1/3">
    </div>

    <div class="container mx-auto px-4 relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-20">

        <h2 class="text-5xl font-bold text-white mb-6 leading-tight">
          Our <span class="text-red-600 relative">
            Services
            <svg class="absolute -bottom-2 left-0 w-full" viewBox="0 0 138 8" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M1 5.5C43.3333 0.333333 89 -1.08 137 5.5" stroke="#DC2626" stroke-width="3"
                stroke-linecap="round" />
            </svg>
          </span>
        </h2>

        <p class="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Experience luxury, comfort, and reliability with our premium water taxi services tailored to your needs.
        </p>
      </div>

      <!-- Services Cards - Reliable Grid with Enhanced Design -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="(service, index) in filteredServices" :key="service.title"
          class="group relative bg-gray-900 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-800">

          <!-- Service Status Badge -->
          <div class="absolute top-4 right-4 z-20">
            <span v-if="service.isPopular"
              class="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
              Popular Choice
            </span>
          </div>

          <div class="bg-gray-900 rounded-lg overflow-hidden shadow-lg">
            <!-- Image Container -->
            <div class="h-72 overflow-hidden relative">
              <img :src="service.image" :alt="service.title" class="w-full h-full object-cover object-center" />

              <!-- Simple Gradient Overlay -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

              <!-- Category Tag -->
              <div class="absolute bottom-4 left-4">
                <div class="bg-red-600 text-white font-bold py-1 px-3 rounded-full text-sm">
                  {{ service.tag }}
                </div>
              </div>
            </div>

            <!-- Card Content -->
            <div class="p-6">
              <!-- Title -->
              <h3 class="text-xl font-bold mb-3 text-white flex items-center">
                {{ service.title }}
                <svg v-if="service.isPopular" class="w-4 h-4 ml-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </h3>

              <!-- Description -->
              <p class="text-gray-300 mb-6">
                {{ service.description }}
              </p>

              <!-- Features List -->
              <div class="mb-6">
                <div v-for="(feature, index) in service.features.slice(0, 3)" :key="index"
                  class="flex items-start mb-2">
                  <div class="mr-2 text-red-500">✓</div>
                  <span class="text-gray-300">{{ feature }}</span>
                </div>
              </div>

              <!-- Button -->
              <NuxtLink :to="service.link"
                class="block w-full py-3 text-center bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors duration-300">
                View more
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';

// Category filter state
const selectedCategory = ref('All Services');

// Services data with improved descriptions and reduced to 3 key features per service
const services = ref([
  {
    title: 'Excursions',
    description: 'Explore stunning coastal spots with our guided tours.',
    image: 'https://images.sembo.travel/ImageService/ImageHandler.ashx?service=sembo&nameOfImage=176996.jpg&resizeMode=FitOutside&width=2200&height=815&formatSettings=jpeg(quality-90)',
    link: '/excursions',
    price: 'From 120€',
    tag: 'Excursions',
    isPopular: false,
    features: [
      'Professional guides with local knowledge',
      'Visit hidden beaches and caves',
      'Snorkeling equipment included'
    ]
  },
  {
    title: 'Rent a Boat',
    description: 'Rent a boat and enjoy the freedom of the sea.',
    image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/ca/cb/3a/photo1jpg.jpg?w=1400&h=-1&s=1',
    link: '/rent-a-boat',
    price: 'From 200€/day',
    tag: 'Boat Rental',
    isPopular: false,
    features: [
      'Skipper included',
      'Fuel included in price',
      'Safety equipment and instruction provided'
    ]
  },
  {
    title: 'Taxi Boat',
    description: 'Fast, reliable water transport across the coastline.',
    image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/bf/55/d2/wonderfull-time-with.jpg?w=1200&h=-1&s=1',
    link: '/taxi-boat',
    price: 'From 45€',
    tag: 'Taxi',
    isPopular: true,
    features: [
      'Available 24/7 during summer season',
      'Quick response time',
      'Comfortable seating with sun protection'
    ]
  },
  {
    title: 'Skipper Training',
    description: 'Learn to navigate and operate boats with professional instruction.',
    image: 'https://laguna-nautika.com/wp-content/uploads/2023/08/3.jpg',
    link: '/skipper-training',
    price: 'From 150€',
    tag: 'Training',
    isPopular: false,
    features: [
      'Hands-on practical experience',
      'Safety and navigation fundamentals',
      'Certification options available'
    ]
  }
]);

// Filtered services based on selected category
const filteredServices = computed(() => {
  if (selectedCategory.value === 'All Services') {
    return services.value;
  }
  return services.value.filter(service => service.tag === selectedCategory.value);
});
</script>

<style scoped>
/* Enhanced animations and effects */
@keyframes float {

  0%,
  100% {
    transform: translateY(0) rotate(0);
  }

  50% {
    transform: translateY(-20px) rotate(5deg);
  }
}

@keyframes pulse-glow {

  0%,
  100% {
    box-shadow: 0 0 15px 5px rgba(220, 38, 38, 0.1);
  }

  50% {
    box-shadow: 0 0 25px 10px rgba(220, 38, 38, 0.2);
  }
}

@keyframes float-particle {
  0% {
    transform: translateY(0) translateX(0);
  }

  33% {
    transform: translateY(-50px) translateX(20px);
  }

  66% {
    transform: translateY(30px) translateX(-15px);
  }

  100% {
    transform: translateY(0) translateX(0);
  }
}

.particle {
  animation: float-particle infinite linear;
  opacity: 0.3;
}

/* Custom transition easing */
.ease-out-expo {
  transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
}
</style>