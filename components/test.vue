<template>
  <!-- Recommended Options Section with Premium Design -->
  <section class="py-16 bg-gradient-to-b from-black to-gray-950 relative overflow-hidden" id="recommended">
    <!-- Background decorative elements -->
    <div class="absolute -bottom-20 -left-20 w-64 h-64 bg-red-600 opacity-10 rounded-full">
    </div>
    <div class="absolute top-20 right-0 w-40 h-40 bg-red-600 opacity-5 rounded-full translate-x-1/2">
    </div>

    <div class="container mx-auto px-4 relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-12">
        <p class="text-red-600 font-bold tracking-wider uppercase mb-2">Our Recommendations</p>
        <h2 class="text-4xl font-bold text-white mb-4 leading-tight">
          Most <span class="text-red-600 relative">
            Popular
            <svg class="absolute -bottom-2 left-0 w-full" viewBox="0 0 138 8" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M1 5.5C43.3333 0.333333 89 -1.08 137 5.5" stroke="#DC2626" stroke-width="3"
                stroke-linecap="round" />
            </svg>
          </span> Choices
        </h2>
        <p class="text-lg text-gray-300 max-w-2xl mx-auto">
          Discover the experiences our customers love the most. Perfect for first-time visitors!
        </p>
      </div>

      <!-- Recommended Options Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Card 1 - Most Popular -->
        <div
          class="group relative bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-800">
          <!-- Popularity Badge -->
          <div class="absolute top-4 right-4 z-20">
            <span class="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
              #1 Choice
            </span>
          </div>

          <!-- Card Image -->
          <div class="h-52 overflow-hidden relative">
            <img
              src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/bf/55/d2/wonderfull-time-with.jpg?w=1200&h=-1&s=1"
              alt="Taxi Boat Service"
              class="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110" />

            <!-- Gradient Overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>

            <!-- Price Tag -->
            <div class="absolute bottom-4 right-4">
              <div
                class="bg-black/80 backdrop-blur-sm text-white font-bold py-1 px-3 rounded-lg text-sm border border-gray-700">
                From 45€
              </div>
            </div>
          </div>

          <!-- Card Content -->
          <div class="p-6">
            <div class="flex items-center mb-3">
              <div class="mr-2 text-red-500">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <div class="text-gray-400 text-sm">5.0 (120+ reviews)</div>
            </div>

            <h3 class="text-xl font-bold mb-2 text-white">Taxi Boat Service</h3>

            <p class="text-gray-300 mb-4">
              Fast, comfortable water transport across the coastline. Available 24/7 during summer season.
            </p>

            <!-- Features List -->
            <div class="mb-5 space-y-2">
              <div class="flex items-center">
                <div class="text-red-500 mr-2">✓</div>
                <span class="text-gray-300 text-sm">Quick response time</span>
              </div>
              <div class="flex items-center">
                <div class="text-red-500 mr-2">✓</div>
                <span class="text-gray-300 text-sm">Comfortable seating with sun protection</span>
              </div>
            </div>

            <!-- Button -->
            <NuxtLink to="/taxi-boat"
              class="block w-full py-3 text-center bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors duration-300 relative overflow-hidden group">
              <span class="relative z-10">Book Now</span>
              <span
                class="absolute inset-0 bg-white w-0 group-hover:w-full transition-all duration-300 opacity-10"></span>
            </NuxtLink>
          </div>
        </div>

        <!-- Card 2 - Panorama Boat Ride -->
        <div
          class="group relative bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-800">
          <!-- Recommended Badge -->
          <div class="absolute top-4 right-4 z-20">
            <span class="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
              Recommended
            </span>
          </div>

          <!-- Card Image -->
          <div class="h-52 overflow-hidden relative">
            <img
              src="https://images.sembo.travel/ImageService/ImageHandler.ashx?service=sembo&nameOfImage=176996.jpg&resizeMode=FitOutside&width=2200&height=815&formatSettings=jpeg(quality-90)"
              alt="Panorama Boat Ride"
              class="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110" />

            <!-- Gradient Overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>

            <!-- Price Tag -->
            <div class="absolute bottom-4 right-4">
              <div
                class="bg-black/80 backdrop-blur-sm text-white font-bold py-1 px-3 rounded-lg text-sm border border-gray-700">
                €30 per person
              </div>
            </div>
          </div>

          <!-- Card Content -->
          <div class="p-6">
            <div class="flex items-center mb-3">
              <div class="mr-2 text-red-500">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <div class="text-gray-400 text-sm">4.9 (95+ reviews)</div>
            </div>

            <div class="flex items-center mb-2">
              <svg class="w-4 h-4 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clip-rule="evenodd"></path>
              </svg>
              <span class="text-gray-300 text-sm">1 hour</span>
            </div>

            <h3 class="text-xl font-bold mb-2 text-white">Panorama Boat Ride</h3>

            <p class="text-gray-300 mb-4">
              Experience the beauty of Poreč's coastline with stunning views of the old town and crystal clear waters.
            </p>

            <!-- Features List -->
            <div class="mb-5 space-y-2">
              <div class="flex items-center">
                <div class="text-red-500 mr-2">✓</div>
                <span class="text-gray-300 text-sm">Scenic coastal cruise with photo opportunities</span>
              </div>
              <div class="flex items-center">
                <div class="text-red-500 mr-2">✓</div>
                <span class="text-gray-300 text-sm">Complimentary welcome drink</span>
              </div>
            </div>

            <!-- Button -->
            <NuxtLink to="/panorama-ride"
              class="block w-full py-3 text-center bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors duration-300 relative overflow-hidden group">
              <span class="relative z-10">Reserve Now</span>
              <span
                class="absolute inset-0 bg-white w-0 group-hover:w-full transition-all duration-300 opacity-10"></span>
            </NuxtLink>
          </div>
        </div>

        <!-- Card 3 -->
        <div
          class="group relative bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-800">
          <!-- Card Image -->
          <div class="h-52 overflow-hidden relative">
            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/ca/cb/3a/photo1jpg.jpg?w=1400&h=-1&s=1"
              alt="Full Day Boat Rental"
              class="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110" />

            <!-- Gradient Overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>

            <!-- Price Tag -->
            <div class="absolute bottom-4 right-4">
              <div
                class="bg-black/80 backdrop-blur-sm text-white font-bold py-1 px-3 rounded-lg text-sm border border-gray-700">
                From 200€/day
              </div>
            </div>
          </div>

          <!-- Card Content -->
          <div class="p-6">
            <div class="flex items-center mb-3">
              <div class="mr-2 text-red-500">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <div class="text-gray-400 text-sm">4.8 (65+ reviews)</div>
            </div>

            <h3 class="text-xl font-bold mb-2 text-white">Full Day Boat Rental</h3>

            <p class="text-gray-300 mb-4">
              Explore at your own pace with our premium boat rentals. Skipper included.
            </p>

            <!-- Features List -->
            <div class="mb-5 space-y-2">
              <div class="flex items-center">
                <div class="text-red-500 mr-2">✓</div>
                <span class="text-gray-300 text-sm">Experienced skipper included</span>
              </div>
              <div class="flex items-center">
                <div class="text-red-500 mr-2">✓</div>
                <span class="text-gray-300 text-sm">Fuel included in price</span>
              </div>
            </div>

            <!-- Button -->
            <NuxtLink to="/rent-a-boat"
              class="block w-full py-3 text-center bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors duration-300 relative overflow-hidden group">
              <span class="relative z-10">Rent Now</span>
              <span
                class="absolute inset-0 bg-white w-0 group-hover:w-full transition-all duration-300 opacity-10"></span>
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- "View All Services" Button -->
      <div class="text-center mt-12">
        <button @click="scrollTo('services')"
          class="inline-flex items-center px-8 py-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white font-medium rounded-lg border border-gray-700 hover:border-red-600 transition-all duration-300 group">
          <span>View All Services</span>
          <svg class="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
            fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- Floating elements for visual interest -->
    <div
      class="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent opacity-30">
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

// Using the same scrollTo utility function as your hero component
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
</script>

<style scoped>
/* Add any custom animations or effects */
@keyframes float {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
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
</style>