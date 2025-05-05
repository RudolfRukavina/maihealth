<template>
  <!-- Simplified Testimonial Section with Colors Matching Hero -->
  <section class="relative py-16 bg-gradient-to-b from-black to-black overflow-hidden">
    <!-- Simple Background Elements -->
    <div class="absolute inset-0 pointer-events-none">
      <!-- Gradient Orbs (Simplified) -->
      <div
        class="absolute rounded-full blur-3xl opacity-20 bg-gradient-to-br from-red-600/30 to-red-700/20 w-96 h-96 -top-20 -left-20">
      </div>
      <div
        class="absolute rounded-full blur-3xl opacity-20 bg-gradient-to-br from-red-700/30 to-red-600/20 w-[30rem] h-[30rem] top-1/2 -right-32">
      </div>

      <!-- Subtle Grid Pattern -->
      <div class="absolute inset-0 bg-grid-pattern opacity-5"></div>
    </div>

    <div class="container relative z-10 mx-auto px-6">
      <!-- Section Header -->
      <div class="max-w-2xl mx-auto text-center mb-12">
        <div class="flex items-center justify-center mb-4">
          <span class="text-xs font-bold tracking-widest uppercase text-red-600 mr-2">Testimonials</span>
          <div class="h-px w-12 bg-gradient-to-r from-red-600 to-red-700"></div>
        </div>
        <h2
          class="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-200">
          What Our Clients Say
        </h2>
        <p class="text-gray-400 text-lg max-w-2xl mx-auto">
          Discover why our customers choose Taxi Boat Poseidon for premium sea transportation, excursions, and boat
          services across Poreč and beyond.
        </p>
      </div>

      <!-- Simplified Testimonial Carousel -->
      <div class="relative mx-auto max-w-6xl">
        <!-- Controls -->
        <div class="absolute top-1/2 -left-4 md:-left-12 z-10 transform -translate-y-1/2">
          <button @click="prevTestimonial"
            class="w-12 h-12 rounded-full bg-black/30 border border-red-600/20 hover:bg-red-600/10 hover:border-red-600/30 flex items-center justify-center transition-all duration-300 shadow-lg">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
        </div>

        <div class="absolute top-1/2 -right-4 md:-right-12 z-10 transform -translate-y-1/2">
          <button @click="nextTestimonial"
            class="w-12 h-12 rounded-full bg-black/30 border border-red-600/20 hover:bg-red-600/10 hover:border-red-600/30 flex items-center justify-center transition-all duration-300 shadow-lg">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>

        <!-- Testimonial Cards -->
        <div class="flex overflow-hidden justify-center">
          <div v-for="(testimonial, index) in visibleTestimonials" :key="testimonial.id"
            class="w-full max-w-lg mx-2 md:mx-4"
            :class="{ 'hidden md:block md:opacity-70': index !== 1 && windowWidth > 768 }">

            <!-- Card Design -->
            <div
              class="h-full rounded-2xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-red-600/10 p-8 shadow-xl transition-all duration-300 hover:border-red-600/30">
              <!-- Quote Icon -->
              <div class="mb-6">
                <svg class="w-10 h-10 text-red-600/40" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5 3.871 3.871 0 01-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5 3.871 3.871 0 01-2.748-1.179z">
                  </path>
                </svg>
              </div>

              <!-- Testimonial Text -->
              <div class="mb-6">
                <p class="text-gray-300 leading-relaxed italic">
                  "{{ testimonial.text }}"
                </p>
              </div>

              <!-- Author Section -->
              <div class="flex items-center">
                <div>
                  <h4 class="font-bold text-white">{{ testimonial.name }}</h4>
                  <div class="flex items-center">
                    <p class="text-gray-400 text-sm">{{ testimonial.location }}</p>
                    <div class="mx-2 w-1 h-1 rounded-full bg-gray-500"></div>
                    <div class="flex">
                      <div class="flex">
                        <svg v-for="i in 5" :key="`star-${i}`" class="w-4 h-4"
                          :class="i <= testimonial.rating ? 'text-red-500' : 'text-gray-600'" fill="currentColor"
                          viewBox="0 0 24 24">
                          <path
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z">
                          </path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination Indicators -->
        <div class="flex justify-center mt-8 space-x-2">
          <button v-for="(_, index) in testimonials" :key="`dot-${index}`" @click="currentIndex = index"
            class="w-2.5 h-2.5 rounded-full transition-all duration-300"
            :class="currentIndex === index ? 'bg-red-600 w-8' : 'bg-gray-600 hover:bg-gray-400'">
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

// Testimonial data
const testimonials = ref([
  {
    id: 1,
    name: "Marko Šimić",
    location: "Poreč, Croatia",
    rating: 5,
    text: "The best taxi boat service in Poreč! Captain Ivica was extremely professional and knowledgeable about the coastline. The boat was immaculately clean and comfortable. We visited several hidden beaches that would have been impossible to reach by land. Will definitely use Taxi Boat Poseidon again on our next visit!",
  },
  {
    id: 2,
    name: "Stefan Müller",
    location: "Munich, Germany",
    rating: 5,
    text: "We used their boat transfer service from Poreč to Rovinj and were absolutely delighted. Despite rough seas, the captain navigated safely and comfortably. The boat was spacious and luxurious, and the views of the Istrian coastline were breathtaking. An unforgettable experience for a reasonable price!",
  },
  {
    id: 3,
    name: "Ana Jurić",
    location: "Rijeka, Croatia",
    rating: 5,
    text: "We booked a full-day excursion around the islands and it was the highlight of our vacation. Captain Mateo was extremely knowledgeable about the local marine life and history. We visited the Brijuni Islands, stunning sea caves, and even spotted dolphins! Their Excursions service offers a perfect blend of adventure and relaxation.",
  },
  {
    id: 4,
    name: "Janez Novak",
    location: "Ljubljana, Slovenia",
    rating: 5,
    text: "The 'Rent a Boat' service from Poseidon saved our family holiday! The boat was in perfect condition with all safety equipment. The staff thoroughly explained everything before we set off. We spent a magical day exploring secluded coves and snorkeling in crystal clear waters. Worth every euro for the freedom to explore at our own pace.",
  },
  {
    id: 5,
    name: "Ivan Matić",
    location: "Rijeka, Croatia",
    rating: 5,
    text: "I completed their Skipper Training course and couldn't be more satisfied! The instructors were patient and thorough, making complex navigation concepts easy to understand. The practical training was extensive, covering everything from basic maneuvers to emergency procedures. Now I feel confident renting boats anywhere along the Adriatic coast. Highly recommended for anyone serious about boating!",
  }
]);

// State variables
const currentIndex = ref(0);
const windowWidth = ref(1024); // Default to desktop view

// Calculate visible testimonials - fixed for proper mobile display
const visibleTestimonials = computed(() => {
  const result = [];
  const count = testimonials.value.length;
  const visibleCount = windowWidth.value > 768 ? 3 : 1;

  for (let i = 0; i < visibleCount; i++) {
    const index = (currentIndex.value + i) % count;
    result.push(testimonials.value[index]);
  }

  return result;
});

// Navigation functions
const nextTestimonial = () => {
  currentIndex.value = (currentIndex.value + 1) % testimonials.value.length;
};

const prevTestimonial = () => {
  currentIndex.value = (currentIndex.value - 1 + testimonials.value.length) % testimonials.value.length;
};

// Auto-rotate testimonials
let autoplayInterval = null;

onMounted(() => {
  // Set actual window width
  if (typeof window !== 'undefined') {
    windowWidth.value = window.innerWidth;

    // Add resize listener
    window.addEventListener('resize', handleResize);
  }

  autoplayInterval = setInterval(() => {
    nextTestimonial();
  }, 6000);
});

onUnmounted(() => {
  if (autoplayInterval) clearInterval(autoplayInterval);
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', handleResize);
  }
});

const handleResize = () => {
  windowWidth.value = window.innerWidth;
};
</script>

<style scoped>
/* Grid pattern background */
.bg-grid-pattern {
  background-size: 40px 40px;
  background-image:
    linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
}
</style>