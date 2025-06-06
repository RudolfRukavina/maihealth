<template>
  <section class="py-0 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden" id='services'>
    <!-- Background elements -->
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(220,38,38,0.05)_0%,transparent_60%)]">
    </div>
    <div class="absolute inset-0 bg-noise opacity-[0.02] mix-blend-overlay pointer-events-none"></div>

    <!-- Subtle particles -->
    <ClientOnly>
      <div class="absolute inset-0 z-0">
        <div v-for="i in 20" :key="`particle-excursion-${i}`" class="particle absolute rounded-full" :class="{
          'particle-slow': i % 3 === 0,
          'particle-medium': i % 3 === 1,
          'particle-fast': i % 3 === 2,
          'particle-tiny': i <= 10,
          'particle-small': i > 10 && i <= 15,
          'particle-normal': i > 15
        }" :style="{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          opacity: 0.05 + (Math.random() * 0.1),
          animationDelay: `${Math.random() * 10}s`,
          animationDuration: `${20 + Math.random() * 30}s`
        }"></div>
      </div>
    </ClientOnly>

    <div class="container mx-auto px-6 relative z-10">


      <!-- Journey Builder Card -->
      <ClientOnly>
        <div class="max-w-6xl mx-auto" v-motion :initial="{ opacity: 0, y: 30 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: 200, duration: 600 } }">

          <div class="rounded-xl overflow-hidden backdrop-blur-sm border border-white/10 bg-white/5">

            <!-- Header with Journey Info -->
            <div class="p-6 border-b border-white/10">
              <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 class="text-xl font-semibold text-white mb-2">Design Your Perfect Journey</h3>
                  <p class="text-gray-300 text-sm">Click destinations on the map or select a popular route below</p>
                </div>
              </div>

              <!-- Popular Routes Selection as Swiper -->
              <div class="mt-10">
                <!-- Route Type Toggle -->
                <div class="flex justify-center mb-6">
                  <div class="inline-flex rounded-md overflow-hidden border border-white/20">
                    <button @click="routeType = 'popular'"
                      class="px-4 py-2 text-sm font-medium transition-colors duration-200"
                      :class="routeType === 'popular' ? 'bg-red-600 text-white' : 'bg-white/5 text-gray-300 hover:bg-white/10'">
                      Popular Excursions
                    </button>
                    <button @click="routeType = 'taxi'"
                      class="px-4 py-2 text-sm font-medium transition-colors duration-200"
                      :class="routeType === 'taxi' ? 'bg-red-600 text-white' : 'bg-white/5 text-gray-300 hover:bg-white/10'">
                      Taxi Boat
                    </button>
                  </div>
                </div>
                <!-- Popular Routes Swiper -->
                <!-- Popular Routes Swiper -->
                <swiper v-if="routeType === 'popular'" :modules="[EffectCoverflow, Pagination, Navigation, Autoplay]"
                  :grabCursor="true" :centeredSlides="true" :loop='false' :slidesPerView="'auto'" :initialSlide='2'
                  :effect="'coverflow'" :coverflowEffect="{
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: false
                  }" :pagination="{
    clickable: true,
    dynamicBullets: true,
    bulletClass: 'custom-bullet',
    bulletActiveClass: 'custom-bullet-active'
  }" :navigation="true" :autoplay="{
    delay: 10000,
    disableOnInteraction: false,
  }" class="w-full route-swiper" @swiper="onRouteSwiperInit">
                  <swiper-slide v-for="preset in presetRoutes" :key="preset.id"
                    class="swiper-slide-center cursor-pointer" @click="selectPresetRoute(preset)">
                    <div
                      class="route-card bg-gray-800/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl transform transition-all duration-300"
                      :class="[
                        selectedPresetId === preset.id
                          ? 'ring-2 ring-red-500 shadow-red-600/30 scale-[1.02] bg-gray-700/90'
                          : 'hover:ring-1 hover:ring-red-500/50 hover:shadow-lg'
                      ]" style="width: 100%; height: 100%;">
                      <div class="relative h-48 overflow-hidden">
                        <img :src="getRouteImage(preset.id)" :alt="preset.name"
                          class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                        <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>

                        <div class="absolute bottom-0 left-0 right-0 p-4">
                          <h4 class="text-white font-bold text-lg">{{ preset.name }}</h4>
                          <div class="flex items-center mt-1">
                            <div class="flex mr-4">
                              <svg class="w-4 h-4 text-red-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                  clip-rule="evenodd"></path>
                              </svg>
                              <span class="text-xs text-gray-300">{{ preset.duration }}</span>
                            </div>
                            <div class="flex">
                              <svg class="w-4 h-4 text-red-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                  clip-rule="evenodd"></path>
                              </svg>
                              <span class="text-xs text-gray-300">{{ preset.destinations.length }} stops</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <!-- Content below image -->
                      <div class="p-4">
                        <!-- Highlights preview -->
                        <div class="text-sm text-gray-300">
                          <p class="line-clamp-2">{{ getPresetDescription(preset) }}</p>
                        </div>

                        <!-- Small destination tags -->
                        <div class="flex flex-wrap gap-1 mt-3">
                          <span v-for="(dest, index) in getPresetDestinationNames(preset).slice(0, 3)" :key="index"
                            class="text-xs bg-white/10 text-gray-300 px-2 py-0.5 rounded-full">
                            {{ dest }}
                          </span>
                          <span v-if="preset.destinations.length > 3"
                            class="text-xs bg-white/10 text-gray-300 px-2 py-0.5 rounded-full">
                            +{{ preset.destinations.length - 3 }} more
                          </span>
                        </div>
                      </div>

                      <!-- Bottom selected indicator -->
                      <div v-if="selectedPresetId === preset.id"
                        class="bg-gradient-to-r from-red-600 to-red-700 py-1.5 px-4 text-center text-xs text-white font-medium">
                        ✓ Currently Selected Route
                      </div>
                    </div>
                  </swiper-slide>
                </swiper>

                <!-- Taxi Routes Swiper -->
                <swiper v-else :modules="[EffectCoverflow, Pagination, Navigation, Autoplay]" :grabCursor="true"
                  :centeredSlides="true" :loop='false' :slidesPerView="'auto'" :initialSlide='2' :effect="'coverflow'"
                  :coverflowEffect="{
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: false
                  }" :pagination="{
    clickable: true,
    dynamicBullets: true,
    bulletClass: 'custom-bullet',
    bulletActiveClass: 'custom-bullet-active'
  }" :navigation="true" :autoplay="{
    delay: 10000,
    disableOnInteraction: false,
  }" class="w-full route-swiper" @swiper="onTaxiSwiperInit">
                  <swiper-slide v-for="taxi in taxiRoutes" :key="taxi.id" class="swiper-slide-center cursor-pointer"
                    @click="selectTaxiRoute(taxi)">
                    <div
                      class="route-card bg-gray-800/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl transform transition-all duration-300"
                      :class="[
                        selectedPresetId === taxi.id
                          ? 'ring-2 ring-red-500 shadow-red-600/30 scale-[1.02] bg-gray-700/90'
                          : 'hover:ring-1 hover:ring-red-500/50 hover:shadow-lg'
                      ]" style="width: 100%; height: 100%;">
                      <div class="relative h-48 overflow-hidden">
                        <img :src="getTaxiImage(taxi.id)" :alt="taxi.name"
                          class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                        <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                        <div class="absolute bottom-0 left-0 right-0 p-4">
                          <h4 class="text-white font-bold text-lg">{{ taxi.name }}</h4>
                          <div class="flex items-center mt-1">
                            <div class="flex mr-4">
                              <svg class="w-4 h-4 text-red-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                  clip-rule="evenodd"></path>
                              </svg>
                              <span class="text-xs text-gray-300">{{ taxi.duration }}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="p-4">
                        <div class="text-sm text-gray-300">
                          <p class="line-clamp-2">{{ getTaxiDescription(taxi) }}</p>
                        </div>

                        <div class="flex flex-wrap gap-1 mt-3">
                          <div class="w-full flex items-center justify-between">
                            <span class="text-xs bg-white/10 text-gray-300 px-2 py-0.5 rounded-full">
                              {{ getTaxiOrigin(taxi) }}
                            </span>
                            <svg class="w-4 h-4 text-red-500 mx-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fill-rule="evenodd"
                                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                clip-rule="evenodd"></path>
                            </svg>
                            <span class="text-xs bg-white/10 text-gray-300 px-2 py-0.5 rounded-full">
                              {{ getTaxiDestination(taxi) }}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div v-if="selectedPresetId === taxi.id"
                        class="bg-gradient-to-r from-red-600 to-red-700 py-1.5 px-4 text-center text-xs text-white font-medium">
                        ✓ Currently Selected Route
                      </div>
                    </div>
                  </swiper-slide>
                </swiper>
              </div>
            </div>

            <div class="grid lg:grid-cols-2 md:grid-cols-1 gap-0">
              <!-- Interactive Map Section -->
              <div class="relative bg-white/5 p-4 md:p-6">
                <h3 class="text-white font-semibold mb-4 flex items-center">
                  <svg class="w-5 h-5 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z">
                    </path>
                  </svg>
                  Select Your Destinations
                </h3>

                <!-- Leaflet Map Container - Improved responsiveness -->
                <div class="relative rounded-lg overflow-hidden shadow-lg w-full" style="height: min(60vh, 450px);">
                  <ClientOnly>
                    <div ref="mapContainer" class="h-full w-full"></div>
                  </ClientOnly>

                  <!-- Loading Indicator -->
                  <div v-if="isMapLoading" class="absolute inset-0 bg-gray-900/80 flex items-center justify-center">
                    <div class="flex flex-col items-center">
                      <div class="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin">
                      </div>
                      <div class="mt-3 text-white text-sm">Loading map...</div>
                    </div>
                  </div>

                  <!-- Map Controls Overlay -->
                  <div class="absolute top-3 right-3 flex flex-col gap-2">
                    <button v-if="selectedDestinations.length > 1" @click="clearCustomRoute"
                      class="px-3 py-1 bg-black/70 hover:bg-black/90 text-white text-xs rounded-lg transition-all duration-300 backdrop-blur-sm">
                      Clear Route
                    </button>
                  </div>
                </div>
              </div>

              <!-- Journey Details Section -->
              <div class="p-6 border-l border-white/10">
                <h3 class="text-white font-semibold mb-4 flex items-center">
                  <svg class="w-5 h-5 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Journey Details
                </h3>

                <!-- Selected destinations list -->
                <div v-if="currentJourneyDestinations.length > 0" class="mb-6">
                  <h4 class="text-gray-300 text-sm font-medium mb-3">Your Route:</h4>
                  <div class="space-y-2">
                    <div v-for="(dest, index) in currentJourneyDestinations" :key="dest.id"
                      class="flex items-center text-sm text-gray-300">
                      <span
                        class="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-xs mr-3 flex-shrink-0">
                        {{ index + 1 }}
                      </span>
                      <span>{{ dest.name }}</span>
                      <button v-if="dest.id !== 'porec'" @click="removeDestination(dest.id)"
                        class="ml-auto text-gray-400 hover:text-red-400 transition-colors">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Journey highlights -->
                <div v-if="currentHighlights.length > 0" class="mb-6">
                  <h4 class="text-gray-300 text-sm font-medium mb-3">Highlights:</h4>
                  <ul class="space-y-2">
                    <li v-for="highlight in currentHighlights" :key="highlight"
                      class="text-gray-300 text-sm flex items-start">
                      <svg class="w-4 h-4 mr-2 text-red-500 mt-0.5 flex-shrink-0" fill="currentColor"
                        viewBox="0 0 20 20">
                        <path fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"></path>
                      </svg>
                      <span>{{ highlight }}</span>
                    </li>
                  </ul>
                </div>

                <!-- Pricing breakdown -->
                <div class="bg-white/5 rounded-lg p-4 mb-6">
                  <h4 class="text-white font-medium mb-3">Pricing</h4>
                  <div class="space-y-2 text-sm">
                    <div class="flex justify-between text-gray-300">
                      <span>Base cruise</span>
                      <span>From €{{ basePrice }}</span>
                    </div>
                    <div v-if="extraDestinationsCost > 0" class="flex justify-between text-gray-300">
                      <span>Additional destinations ({{ currentJourneyDestinations.length - 2 }})</span>
                      <span>From €{{ extraDestinationsCost }}</span>
                    </div>
                    <div class="border-t border-white/10 pt-2 flex justify-between font-medium text-white">
                      <span>Total approximate</span>
                      <span class="text-red-500">From €{{ totalPrice }} per person</span>
                    </div>
                  </div>
                </div>

                <!-- Poseidon Boat info -->
                <div class="border-t border-white/10 pt-4 mb-6">
                  <div class="flex items-center mb-3">
                    <svg class="w-5 h-5 text-red-500 mr-3" fill="currentColor" viewBox="0 0 511.998 511.998">
                      <path
                        d="M510.652,230.062c-1.357-2.116-3.567-3.524-6.05-3.857l-128-17.067c-4.617-0.606-8.96,2.662-9.591,7.33 c-0.631,4.668,2.662,8.969,7.33,9.591l18.193,2.423v21.675l-42.667-4.574v-42.47l15.633-23.45c1.707-2.56,1.903-5.837,0.521-8.576 c-1.391-2.748-4.147-4.54-7.219-4.685l-179.2-8.533c-2.876-0.026-5.666,1.212-7.347,3.567l-42.667,59.733 c-0.171,0.239-0.205,0.529-0.35,0.777L9.438,209.113c-2.423-0.256-4.813,0.521-6.613,2.133C1.033,212.868,0,215.172,0,217.595 c0,75.281,88.047,136.533,196.267,136.533h273.067c3.746,0,7.057-2.441,8.158-6.025l34.133-110.933 C512.358,234.773,512,232.17,510.652,230.062z" />
                    </svg>
                    <div>
                      <div class="text-white text-sm font-medium">Poseidon Boat Experience</div>
                      <div class="text-gray-400 text-xs">Professional skipper & premium service</div>
                    </div>
                  </div>
                </div>

                <!-- Book now button -->
                <!-- Book now button -->
                <button v-if="canBook" @click="bookJourney"
                  class="w-full py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-red-500/25 flex items-center justify-center group">
                  <span>Send Journey Inquiry</span>
                  <svg class="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                    fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clip-rule="evenodd"></path>
                  </svg>
                </button>

                <div v-else class="text-center p-4 bg-white/5 rounded-lg">
                  <p class="text-gray-400 text-sm">
                    Select at least 2 destinations to create your journey
                  </p>
                </div>

                <div v-else class="text-center p-4 bg-white/5 rounded-lg">
                  <p class="text-gray-400 text-sm">
                    Select at least 2 destinations to book your journey
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ClientOnly>

      <!-- Services section -->
      <ClientOnly>
        <div class="mt-16 text-center p-8 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm" v-motion
          :initial="{ opacity: 0 }" :enter="{ opacity: 1, transition: { delay: 400, duration: 800 } }">
          <h3 class="text-xl md:text-2xl font-bold text-white mb-3">Need Something Special?</h3>
          <p class="text-gray-300 mb-6 max-w-2xl mx-auto">
            Looking for a completely custom experience? We offer private boat charters with personalized routes,
            special occasions, and unique destinations not shown on the map.
          </p>
          <a href="mailto:poseidon@gmail.hr?subject=Private%20Boat%20Charter%20Request&body=Hello%2C%0A%0AI%27d%20like%20to%20inquire%20about%20a%20private%20boat%20charter.%0A%0AHere%20are%20my%20details%3A%0APreferred%20date(s)%3A%20%0ANumber%20of%20people%3A%20%0ADestinations%20of%20interest%3A%20%0ASpecial%20requests%3A%20%0A%0ACould%20you%20please%20provide%20options%20and%20pricing%20for%20this%20private%20charter%3F%0A%0AThank%20you!"
            class="px-8 py-4 bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/15 hover:border-white/30 text-white font-medium rounded-lg transition-all duration-300 flex items-center justify-center mx-auto w-auto inline-flex no-underline">
            <span>Request Private Charter</span>
            <svg class="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
            </svg>
          </a>
        </div>
      </ClientOnly>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue';

import { Swiper, SwiperSlide } from 'swiper/vue';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Set up refs and variables
const routeSwiper = ref(null);

// Function to initialize the swiper
const onRouteSwiperInit = (swiper) => {
  routeSwiper.value = swiper;
};

// Base pricing
const basePrice = 45;
const extraDestinationPrice = 15;

// Map loading state and refs
const isMapLoading = ref(true);
const mapContainer = ref(null);
let map = null;
let markers = [];
let routePolyline = null;


// Add this with your other variables
const routeType = ref('popular');
const taxiSwiper = ref(null);

// Function to initialize the taxi swiper
const onTaxiSwiperInit = (swiper) => {
  taxiSwiper.value = swiper;
};

// Taxi routes data
const taxiRoutes = [
  {
    id: 'porec-rovinj',
    name: 'Poreč to Rovinj',
    origin: 'porec',
    destination: 'rovinj',
    price: 90,
    duration: '45 min',
    description: 'Direct speedboat taxi service between Poreč and Rovinj, offering stunning coastal views along the way.'
  },
  {
    id: 'porec-vrsar',
    name: 'Poreč to Vrsar',
    origin: 'porec',
    destination: 'vrsar',
    price: 60,
    duration: '25 min',
    description: 'Quick and convenient water taxi between Poreč and the picturesque fishing town of Vrsar.'
  },
  {
    id: 'porec-novigrad',
    name: 'Poreč to Novigrad',
    origin: 'porec',
    destination: 'novigrad',
    price: 65,
    duration: '30 min',
    description: 'Comfortable sea transfer between Poreč and the historic walled town of Novigrad.'
  },
  {
    id: 'porec-umag',
    name: 'Poreč to Umag',
    origin: 'porec',
    destination: 'umag',
    price: 110,
    duration: '60 min',
    description: 'Speedboat taxi service connecting Poreč with Umag, perfect for day trips or hotel transfers.'
  },
  {
    id: 'rovinj-pula',
    name: 'Rovinj to Pula',
    origin: 'rovinj',
    destination: 'pula',
    price: 120,
    duration: '50 min',
    description: 'Fast sea connection between Rovinj and Pula, bypassing road traffic for a scenic coastal journey.'
  },
  {
    id: 'porec-fazana',
    name: 'Poreč to Fažana',
    origin: 'porec',
    destination: 'fazana',
    price: 150,
    duration: '75 min',
    description: 'Direct sea transfer to Fažana, the gateway to Brijuni National Park.'
  },
  {
    id: 'porec-pula',
    name: 'Poreč to Pula',
    origin: 'porec',
    destination: 'pula',
    price: 180,
    duration: '90 min',
    description: 'The ultimate coastal journey from Poreč to Pula, featuring views of the entire western Istrian coast.'
  }
];

// Helper functions for taxi routes
const getTaxiImage = (taxiId) => {
  const taxiImages = {
    'porec-rovinj': 'https://images.unsplash.com/photo-1555990793-da11153b2473?auto=format&fit=crop&w=600&h=300',
    'porec-vrsar': 'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?auto=format&fit=crop&w=600&h=300',
    'porec-novigrad': 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=600&h=300',
    'porec-umag': 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&h=300',
    'rovinj-pula': 'https://images.unsplash.com/photo-1564889963738-e1d478355a5e?auto=format&fit=crop&w=600&h=300',
    'porec-fazana': 'https://images.unsplash.com/photo-1564889963738-e1d478355a5e?auto=format&fit=crop&w=600&h=300',
    'porec-pula': 'https://images.unsplash.com/photo-1625836014431-79e855c02d01?auto=format&fit=crop&w=600&h=300',
  };

  return taxiImages[taxiId] || 'https://images.unsplash.com/photo-1520342868574-5fa3804e551c?auto=format&fit=crop&w=600&h=300';
};

const getTaxiDescription = (taxi) => {
  return taxi.description || 'Direct speedboat taxi service between coastal destinations.';
};

const getTaxiOrigin = (taxi) => {
  const originDest = destinations.find(d => d.id === taxi.origin);
  return originDest ? originDest.name : taxi.origin;
};

const getTaxiDestination = (taxi) => {
  const destDest = destinations.find(d => d.id === taxi.destination);
  return destDest ? destDest.name : taxi.destination;
};

// Function to select a taxi route
const selectTaxiRoute = (taxi) => {
  selectedPresetId.value = taxi.id;
  selectedDestinations.value = [taxi.origin, taxi.destination];

  nextTick(() => {
    if (map) refreshMarkers();
  });
};

// Leaflet coordinates for Istrian destinations
const destinations = [
  {
    id: 'porec',
    name: 'Poreč',
    lat: 45.2271,
    lng: 13.5947,
    type: 'start',
    description: 'Our starting port with a UNESCO-listed Euphrasian Basilica and charming old town waterfront'
  },
  {
    id: 'vrsar',
    name: 'Vrsar',
    lat: 45.1498,
    lng: 13.6026,
    type: 'coastal',
    description: 'Picturesque fishing harbor with a beautiful marina and panoramic views from the hilltop church'
  },
  {
    id: 'rovinj',
    name: 'Rovinj',
    lat: 45.0811,
    lng: 13.6400,
    type: 'coastal',
    description: 'Romantic Mediterranean town with colorful houses rising directly from the sea and St. Euphemia\'s bell tower'
  },
  {
    id: 'lim-fjord',
    name: 'Lim Fjord',
    lat: 45.1280,
    lng: 13.7144,
    type: 'natural',
    description: 'Spectacular 10km-long natural canal with emerald waters, famous for oyster and mussel farms'
  },
  {
    id: 'sv-nikola',
    name: 'Sv. Nikola Island',
    lat: 45.2175,
    lng: 13.5736,
    type: 'island',
    description: 'Poreč\'s offshore island with lush pine forests, beautiful beaches and a historic lighthouse'
  },
  {
    id: 'brijuni',
    name: 'Brijuni Islands',
    lat: 44.9197,
    lng: 13.7500,
    type: 'island',
    description: 'Former presidential retreat turned national park with Roman ruins, exotic animals and Mediterranean flora'
  },
  {
    id: 'novigrad',
    name: 'Novigrad',
    lat: 45.3167,
    lng: 13.5633,
    type: 'coastal',
    description: 'Charming walled coastal town with Venetian architecture, fishing traditions and seafront promenade'
  },
  {
    id: 'umag',
    name: 'Umag',
    lat: 45.4372,
    lng: 13.5256,
    type: 'coastal',
    description: 'Coastal resort town with Venetian influence, beautiful marina and crystalline waters'
  },
  {
    id: 'pula',
    name: 'Pula',
    lat: 44.8683,
    lng: 13.8458,
    type: 'coastal',
    description: 'Istria\'s largest city featuring a magnificent Roman amphitheater and ancient harbor'
  },
  {
    id: 'cape-kamenjak',
    name: 'Cape Kamenjak',
    lat: 44.7728,
    lng: 13.9103,
    type: 'natural',
    description: 'Istria\'s southernmost point with dramatic cliffs, hidden coves and dinosaur footprints'
  },
  {
    id: 'red-island',
    name: 'Red Island',
    lat: 45.0645,
    lng: 13.6125,
    type: 'island',
    description: 'Twin islands connected by a causeway, offering beaches, pine forests and a historic monastery'
  },
  {
    id: 'fazana',
    name: 'Fažana',
    lat: 44.9283,
    lng: 13.8042,
    type: 'coastal',
    description: 'Traditional fishing village with colorful waterfront and gateway to Brijuni National Park'
  },
  {
    id: 'sv-andrija',
    name: 'Sv. Andrija Island',
    lat: 45.0520,
    lng: 13.6221,
    type: 'island',
    description: 'Remote lighthouse island with spectacular panoramic views and secluded swimming spots'
  },
  {
    id: 'blue-lagoon',
    name: 'Blue Lagoon',
    lat: 45.1942,
    lng: 13.5583,
    type: 'natural',
    description: 'Sheltered bay with incredibly clear turquoise waters, perfect for swimming and snorkeling'
  },
  {
    id: 'vrsar-archipelago',
    name: 'Vrsar Archipelago',
    lat: 45.1483,
    lng: 13.5917,
    type: 'island',
    description: 'Cluster of 18 uninhabited islets with hidden beaches, caves and rich marine life'
  },
  {
    id: 'dolphin-area',
    name: 'Dolphin Watching Area',
    lat: 45.0533,
    lng: 13.5800,
    type: 'natural',
    description: 'Prime location for spotting Adriatic bottlenose dolphins in their natural habitat'
  },
  {
    id: 'veli-brijun',
    name: 'Veli Brijun',
    lat: 44.9156,
    lng: 13.7703,
    type: 'island',
    description: 'Largest Brijuni island with archaeological sites, safari park and historic residences'
  },
  {
    id: 'rt-savudrija',
    name: 'Rt Savudrija',
    lat: 45.4924,
    lng: 13.4988,
    type: 'coastal',
    description: 'Croatia\'s westernmost point with the oldest active lighthouse on the Adriatic coast'
  }
];

// Selected destinations for custom journey (always starts with Poreč)
const selectedDestinations = ref(['porec']);

// Track which preset route is currently selected (if any)
const selectedPresetId = ref(null);

// Preset routes
const presetRoutes = [
  {
    id: 'rovinj-lim',
    name: 'Rovinj & Lim Fjord Classic',
    destinations: ['porec', 'lim-fjord', 'rovinj', 'vrsar'],
    price: 55,
    duration: '7-8 hours',
    highlights: [
      'Explore romantic Rovinj old town',
      'Cruise through Lim Fjord natural reserve',
      'Visit hidden Pirate Cave',
      'Swimming breaks in crystal waters',
      'On-board lunch included'
    ]
  },
  {
    id: 'island-hopping',
    name: 'Island Hopping Adventure',
    destinations: ['porec', 'sv-nikola', 'red-island', 'sv-andrija', 'vrsar-archipelago'],
    price: 70,
    duration: '7-8 hours',
    highlights: [
      'Visit 3 different island groups',
      'Explore untouched island landscapes',
      'Snorkeling in pristine waters',
      'Fresh seafood lunch on board',
      'Photo opportunities at lighthouse island'
    ]
  },
  {
    id: 'hidden-gems',
    name: 'Hidden Gems & Secret Beaches',
    destinations: ['porec', 'blue-lagoon', 'vrsar-archipelago', 'cape-kamenjak'],
    price: 65,
    duration: '5-6 hours',
    highlights: [
      'Secluded beaches away from crowds',
      'Explore hidden caves and coves',
      'Crystal clear Blue Lagoon swimming',
      'Local specialties picnic lunch',
      'Personalized local skipper experience'
    ]
  },
  {
    id: 'sunset-dolphins',
    name: 'Sunset & Dolphin Watching',
    destinations: ['porec', 'dolphin-area', 'vrsar'],
    price: 45,
    duration: '2-3 hours',
    highlights: [
      'Professional dolphin spotting guidance',
      'Breathtaking Adriatic sunset views',
      'Complimentary drinks and snacks',
      'Small group personalized experience',
      'Marine life educational commentary'
    ]
  },
  {
    id: 'northern-coast',
    name: 'Northern Istrian Coast',
    destinations: ['porec', 'novigrad', 'rt-savudrija'],
    price: 50,
    duration: '5-6 hours',
    highlights: [
      'Historic Venetian architecture',
      'Visit Croatia\'s northernmost point',
      'Explore historic lighthouse area',
      'Photo opportunities at scenic viewpoints',
      'Cultural insights from local guide'
    ]
  },
  {
    id: 'southern-adventure',
    name: 'Southern Istria Explorer',
    destinations: ['porec', 'rovinj', 'fazana', 'pula'],
    price: 75,
    duration: '8-9 hours',
    highlights: [
      'Roman amphitheater in Pula',
      'Historic cities of southern Istria',
      'Cultural and historical tour',
      'Traditional Istrian lunch stop',
      'Spectacular coastal views'
    ]
  },
  {
    id: 'national-park',
    name: 'Brijuni National Park',
    destinations: ['porec', 'fazana', 'veli-brijun', 'brijuni'],
    price: 85,
    duration: '9-10 hours',
    highlights: [
      'Explore protected national park islands',
      'Ancient Roman villa ruins',
      'Safari park with exotic animals',
      'Mediterranean botanical gardens',
      'Guided tour of historic sites'
    ]
  }
];

// Get readable destination names for a preset
const getPresetDestinationNames = (preset) => {
  return preset.destinations.map(id => {
    const dest = destinations.find(d => d.id === id);
    return dest ? dest.name : id;
  });
};

// Get image for route based on ID
const getRouteImage = (routeId) => {
  const routeImages = {
    'rovinj-lim': 'https://images.unsplash.com/photo-1555990793-da11153b2473?auto=format&fit=crop&w=600&h=300',
    'island-hopping': 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=600&h=300',
    'hidden-gems': 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=600&h=300',
    'sunset-dolphins': 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=600&h=300',
    'northern-coast': 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=600&h=300',
    'southern-adventure': 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=600&h=300',
    'national-park': 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=600&h=300',
  };

  return routeImages[routeId] || 'https://images.unsplash.com/photo-1520342868574-5fa3804e551c?auto=format&fit=crop&w=600&h=300';
};

// Get descriptive text for each preset route
const getPresetDescription = (preset) => {
  const descriptions = {
    'rovinj-lim': "Experience the jewel of Istria with Rovinj's charming old town and the breathtaking natural beauty of Lim Fjord in one incredible journey.",
    'island-hopping': "Discover the pristine islands of the Adriatic with stops at multiple island paradises, perfect for swimming and exploring untouched nature.",
    'hidden-gems': "Escape the crowds and discover secluded beaches, hidden caves and crystal clear waters known only to locals.",
    'sunset-dolphins': "Witness the magic of an Adriatic sunset while searching for playful dolphins in their natural habitat.",
    'northern-coast': "Explore the historic northern Istrian coast with its Venetian architecture and Croatia's oldest lighthouse.",
    'southern-adventure': "Journey to southern Istria's most impressive sites including Pula's Roman amphitheater and historic coastal towns.",
    'national-park': "Visit the spectacular Brijuni National Park, former presidential retreat with ancient ruins and exotic wildlife.",
  };

  return descriptions[preset.id] || 'Explore the beautiful Istrian coast with this curated journey.';
};

// Load Leaflet resources dynamically
const loadLeafletResources = async () => {
  const leafletCss = document.createElement('link');
  leafletCss.rel = 'stylesheet';
  leafletCss.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css';
  document.head.appendChild(leafletCss);

  return new Promise((resolve, reject) => {
    const leafletScript = document.createElement('script');
    leafletScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js';
    leafletScript.onload = resolve;
    leafletScript.onerror = reject;
    document.head.appendChild(leafletScript);
  });
};

// Initialize Leaflet map
const initMap = () => {
  if (!window.L || !mapContainer.value) {
    console.error('Leaflet or map container not available');
    isMapLoading.value = false;
    return;
  }

  map = window.L.map(mapContainer.value).setView([45.2271, 13.5947], 10);

  window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  addDestinationMarkers();
  updateRoute();
  isMapLoading.value = false;
};

// Add markers for all destinations
const addDestinationMarkers = () => {
  destinations.forEach(destination => {
    const isSelected = selectedDestinations.value.includes(destination.id);
    const isStart = destination.id === 'porec';

    const iconOptions = {
      iconSize: [30, 30],
      iconAnchor: [15, 15],
      popupAnchor: [20, 0]
    };

    let iconUrl;
    if (isStart) {
      iconUrl = 'data:image/svg+xml,' + encodeURIComponent(`
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="15" cy="15" r="14" fill="#dc2626" stroke="#ffffff" stroke-width="2"/>
            <circle cx="15" cy="15" r="5" fill="#ffffff"/>
          </svg>
        `);
    } else if (isSelected) {
      iconUrl = 'data:image/svg+xml,' + encodeURIComponent(`
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="15" cy="15" r="14" fill="#dc2626" stroke="#ffffff" stroke-width="2"/>
            <path d="M10 15.5l4 4 8-8" stroke="#ffffff" stroke-width="2" fill="none"/>
          </svg>
        `);
    } else {
      iconUrl = 'data:image/svg+xml,' + encodeURIComponent(`
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="15" cy="15" r="14" fill="#64748b" stroke="#ffffff" stroke-width="2"/>
          </svg>
        `);
    }

    const customIcon = window.L.icon({
      ...iconOptions,
      iconUrl
    });

    const marker = window.L.marker([destination.lat, destination.lng], {
      icon: customIcon,
      destination: destination.id
    })
      .bindPopup(`
          <div class="google-maps-style-popup">
            <h3 class="popup-title">${destination.name}</h3>
            <p class="popup-description">${destination.description}</p>
            ${destination.id !== 'porec' ?
          `<button onclick="window.toggleDestinationFromMap('${destination.id}')"
                 class="popup-button">
                 ${isSelected ? 'Remove from route' : 'Add to route'}
                </button>` : ''
        }
          </div>
        `, {
        maxWidth: 250,
        className: 'google-maps-popup',
        closeButton: false,
        autoPan: false,
        offset: [15, 0]
      })
      .addTo(map);

    if (destination.id !== 'porec') {
      marker.on('click', () => {
        toggleDestination(destination.id);
      });
    }

    markers.push(marker);
  });
};

// Update route polyline on map
const updateRoute = () => {
  if (routePolyline) {
    map.removeLayer(routePolyline);
  }

  if (currentJourneyDestinations.value.length < 2) return;

  const routeCoords = currentJourneyDestinations.value.map(dest => [dest.lat, dest.lng]);

  routePolyline = window.L.polyline(routeCoords, {
    color: '#dc2626',
    weight: 4,
    opacity: 0.8,
    dashArray: '10, 5'
  }).addTo(map);

  if (routeCoords.length > 1) {
    const bounds = window.L.latLngBounds(routeCoords);
    map.fitBounds(bounds, { padding: [30, 30] });
  }
};

// Refresh markers when selections change
const refreshMarkers = () => {
  markers.forEach(marker => map.removeLayer(marker));
  markers = [];
  addDestinationMarkers();
  updateRoute();
};

// Make toggleDestination available globally for popup buttons
if (typeof window !== 'undefined') {
  window.toggleDestinationFromMap = (destinationId) => {
    toggleDestination(destinationId);
  };
}

// Computed properties
const currentJourneyDestinations = computed(() => {
  return selectedDestinations.value.map(id =>
    destinations.find(dest => dest.id === id)
  ).filter(Boolean);
});

const totalPrice = computed(() => {
  if (routeType.value === 'taxi' && selectedPresetId.value) {
    const selectedTaxi = taxiRoutes.find(t => t.id === selectedPresetId.value);
    return selectedTaxi ? selectedTaxi.price : basePrice;
  } else {
    const extraDestinations = Math.max(0, currentJourneyDestinations.value.length - 2);
    return basePrice + (extraDestinations * extraDestinationPrice);
  }
});

const extraDestinationsCost = computed(() => {
  const extraDestinations = Math.max(0, currentJourneyDestinations.value.length - 2);
  return extraDestinations * extraDestinationPrice;
});

const estimatedDuration = computed(() => {
  const destCount = currentJourneyDestinations.value.length;
  if (destCount <= 2) return '3-4 hours';
  if (destCount <= 4) return '5-6 hours';
  return '7-8 hours';
});

const currentHighlights = computed(() => {
  const highlights = ['Professional skipper and premium boat experience'];
  const destTypes = currentJourneyDestinations.value.map(d => d.type);

  if (destTypes.includes('island')) {
    highlights.push('Island exploration and pristine beaches');
  }
  if (destTypes.includes('natural')) {
    highlights.push('Natural reserves and untouched landscapes');
  }
  if (destTypes.includes('coastal')) {
    highlights.push('Charming coastal towns and local culture');
  }
  if (currentJourneyDestinations.value.length > 3) {
    highlights.push('Multiple swimming and snorkeling stops');
    highlights.push('On-board refreshments and local specialties');
  }

  return highlights;
});

const canBook = computed(() => {
  return currentJourneyDestinations.value.length >= 2;
});

// Methods
const toggleDestination = (destinationId) => {
  if (destinationId === 'porec') return; // Can't remove starting point

  const index = selectedDestinations.value.indexOf(destinationId);
  if (index > -1) {
    selectedDestinations.value.splice(index, 1);
  } else {
    selectedDestinations.value.push(destinationId);
  }

  nextTick(() => {
    if (map) refreshMarkers();
  });
};

const removeDestination = (destinationId) => {
  if (destinationId === 'porec') return;
  const index = selectedDestinations.value.indexOf(destinationId);
  if (index > -1) {
    selectedDestinations.value.splice(index, 1);
    nextTick(() => {
      if (map) refreshMarkers();
    });
  }
};

const clearCustomRoute = () => {
  selectedDestinations.value = ['porec'];
  nextTick(() => {
    if (map) refreshMarkers();
  });
};

// Select preset route and populate custom journey
const selectPresetRoute = (preset) => {
  // Set the selected destinations to match the preset route
  selectedPresetId.value = preset.id;
  selectedDestinations.value = [...preset.destinations];

  // Update map route
  nextTick(() => {
    if (map) refreshMarkers();
  });
};

const bookJourney = () => {
  if (!canBook.value) return;

  const journeyName = 'Custom Journey';
  const destinationNames = currentJourneyDestinations.value.map(dest => dest.name);

  const subject = encodeURIComponent(`Boat Journey Inquiry: ${journeyName}`);
  const body = encodeURIComponent(
    `Hello,\n\n` +
    `I'd like to inquire about a boat journey with Poseidon.\n\n` +
    `Journey Details:\n` +
    `- Route: ${journeyName}\n` +
    `- Destinations: ${destinationNames.join(' → ')}\n` +
    `- Duration: ${estimatedDuration.value}\n\n` +
    `My details:\n` +
    `Name: \n` +
    `Phone Number: \n` +
    `Preferred Date: \n` +
    `Number of passengers: \n` +
    `Accommodation/Pickup Location: \n\n` +
    `Could you please provide pricing information and confirm availability for this journey?\n\n` +
    `Thank you!`
  );

  window.location.href = `mailto:poseidon@gmail.hr?subject=${subject}&body=${body}`;
};

// Add window resize listener to adjust map
const handleResize = () => {
  if (map) {
    map.invalidateSize();
    if (routePolyline) {
      const bounds = routePolyline.getBounds();
      map.fitBounds(bounds, { padding: [30, 30] });
    }
  }
};

// Set up resize listener
onMounted(() => {
  loadLeafletResources().then(() => {
    nextTick(() => {
      initMap();
      window.addEventListener('resize', handleResize);
    });
  }).catch(error => {
    console.error('Failed to load Leaflet:', error);
    isMapLoading.value = false;
  });
});

</script>

<style scoped>
/* Scrollbar hiding for mobile tabs */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Particles animation */
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

/* Leaflet map styling */
:deep(.leaflet-container) {
  background: #1f2937;
  z-index: 1 !important;
}

:deep(.leaflet-control-zoom) {
  border: none !important;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !important;
}

:deep(.leaflet-control-zoom a) {
  background-color: rgba(0, 0, 0, 0.8) !important;
  color: white !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
}

:deep(.leaflet-control-zoom a:hover) {
  background-color: rgba(0, 0, 0, 0.9) !important;
}

:deep(.leaflet-popup-content-wrapper) {
  background: rgba(0, 0, 0, 0.9) !important;
  color: white !important;
  border-radius: 8px !important;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3) !important;
}

:deep(.leaflet-popup-tip) {
  background: rgba(0, 0, 0, 0.9) !important;
}

:deep(.custom-popup .leaflet-popup-content) {
  margin: 8px 12px !important;
}

/* Google Maps style popup */
:deep(.google-maps-popup) {
  margin-left: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  padding: 0;
  min-width: 250px;
}

:deep(.google-maps-popup .leaflet-popup-content-wrapper) {
  background: rgba(255, 255, 255, 0.95) !important;
  color: #333 !important;
  border-radius: 8px !important;
  padding: 0 !important;
  overflow: hidden;
}

:deep(.google-maps-popup .leaflet-popup-content) {
  margin: 0 !important;
  width: 100% !important;
}

:deep(.google-maps-popup .leaflet-popup-tip) {
  background: rgba(255, 255, 255, 0.95) !important;
}

:deep(.google-maps-style-popup) {
  padding: 0;
  width: 100%;
}

:deep(.google-maps-style-popup .popup-title) {
  font-size: 16px;
  font-weight: 600;
  color: #111;
  margin: 0;
  padding: 12px 16px;
  background-color: #f8f9fa;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

:deep(.google-maps-style-popup .popup-description) {
  font-size: 14px;
  color: #333;
  margin: 0;
  padding: 12px 16px;
  line-height: 1.4;
}

:deep(.google-maps-style-popup .popup-button) {
  background-color: #dc2626;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  margin: 0 16px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  width: calc(100% - 32px);
  transition: background-color 0.3s;
}

:deep(.google-maps-style-popup .popup-button:hover) {
  background-color: #b91c1c;
}

/* Swiper styling */
:deep(.route-swiper) {
  width: 100%;
  padding: 1.5rem 0;
  margin-bottom: 1.5rem;
}

:deep(.swiper-slide) {
  display: flex;
  justify-content: center;
  width: 320px !important;
  padding: 20px;
  transition: opacity 0.3s;
}

:deep(.swiper-slide-active) {
  opacity: 1;
}

:deep(.swiper-slide-prev),
:deep(.swiper-slide-next) {
  opacity: 0.7;
}

:deep(.swiper-pagination) {
  position: relative;
  margin-top: 1rem;
}

:deep(.custom-bullet) {
  width: 10px;
  height: 10px;
  display: inline-block;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  margin: 0 4px;
  cursor: pointer;
  transition: all 0.3s;
}

:deep(.custom-bullet-active) {
  background: #dc2626;
  width: 12px;
  height: 12px;
}

:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  color: #dc2626;
  background: rgba(0, 0, 0, 0.5);
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

:deep(.swiper-button-next:after),
:deep(.swiper-button-prev:after) {
  font-size: 1.2rem;
  font-weight: bold;
}

/* Ensure route cards have consistent width */
.route-card {
  width: 320px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* Line clamp for descriptions */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Add these to the <style> section */
:deep(.swiper-slide) {
  display: flex;
  justify-content: center;
  transition: all 0.4s ease;
}

:deep(.swiper-slide-active) {
  opacity: 1;
  z-index: 2;
}

:deep(.swiper-slide-prev),
:deep(.swiper-slide-next) {
  opacity: 0.8;
  transform: scale(0.94);
}

:deep(.swiper-slide:not(.swiper-slide-active):not(.swiper-slide-prev):not(.swiper-slide-next)) {
  opacity: 0.6;
  transform: scale(0.88);
}

/* Responsive card widths */
@media (max-width: 640px) {
  .route-card {
    width: 280px;
  }
}

@media (min-width: 641px) {
  .route-card {
    width: 320px;
  }
}
</style>