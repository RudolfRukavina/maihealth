<template>
  <section class="py-0 bg-black z-10">
    <div class="container mx-auto px-6">
      <!-- Section Header -->
      <div class="max-w-3xl mx-auto text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Coverage Area</h2>
        <p class="text-lg text-gray-300">
          We provide taxi services throughout Poreč and surrounding areas. Below you can see our primary service zones
          and pricing information.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <!-- Map Area - Keeping original styling since map should stay unchanged -->
        <div class="lg:col-span-3 rounded-xl overflow-hidden shadow-lg bg-white h-[500px] relative">
          <!-- Map Container -->
          <ClientOnly>
            <div ref="mapContainer" class="h-full w-full"></div>
          </ClientOnly>
          <!-- Map Legend -->
          <div class="absolute bottom-4 right-4 bg-white p-3 rounded-lg shadow-md z-10">
            <div class="flex items-center mb-1">
              <div class="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
            </div>


          </div>

          <!-- Loading Indicator -->
          <div v-if="isMapLoading" class="absolute inset-0 bg-white/80 flex items-center justify-center">
            <div class="flex flex-col items-center">
              <div class="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
              <div class="mt-3 text-gray-600">Loading map...</div>
            </div>
          </div>
        </div>

        <!-- Coverage Information -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Service Highlights -->
          <div class="bg-gray-800 p-6 rounded-xl shadow-lg">
            <h3 class="text-xl font-bold text-white mb-4">Our Service Areas</h3>

            <div class="space-y-3">
              <div v-for="(area, index) in serviceAreas" :key="index" class="flex items-start">
                <div
                  :class="`w-6 h-6 rounded-full bg-${area.color}-500 flex items-center justify-center mr-3 shrink-0`">
                  <span class="text-xs text-white font-bold">{{ index + 1 }}</span>
                </div>
                <div>
                  <div class="font-medium text-white">{{ area.name }}</div>
                  <div class="text-sm text-gray-300">{{ area.description }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Pricing Information -->
          <div class="bg-gray-800 p-6 rounded-xl shadow-lg">
            <h3 class="text-xl font-bold text-white mb-4">Fare Information</h3>

            <div class="space-y-4">
              <div class="border-b border-gray-600 pb-3">
                <div class="font-medium text-white">Base Fare</div>
                <div class="flex justify-between mt-1">
                  <span class="text-sm text-gray-300">Starting price</span>
                  <span class="text-sm font-medium text-white">5€</span>
                </div>
                <div class="flex justify-between mt-1">
                  <span class="text-sm text-gray-300">Price per km</span>
                  <span class="text-sm font-medium text-white">2.00€</span>
                </div>
              </div>

              <div>
                <div class="font-medium text-white mb-2">Special Rates</div>
                <div class="flex justify-between text-sm mt-1">
                  <span class="text-gray-300">Night Fare (22:00-06:00)</span>
                  <span class="font-medium text-white">+20%</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Call to Action -->
          <div class="bg-yellow-400 p-6 rounded-xl shadow-lg">
            <h3 class="text-xl font-bold text-black mb-3">Need a Taxi Now?</h3>
            <p class="text-sm text-gray-800 mb-4">Call us for immediate pickup anywhere in Poreč and surroundings</p>
            <a href="tel:+385921696002"
              class="block w-full py-3 bg-black text-white font-bold rounded-lg text-center hover:bg-gray-700 transition duration-300">
              Call +385 92 169 6002
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// Map loading state
const isMapLoading = ref(true);
const mapContainer = ref(null);
let map = null;

// Service areas definitions
const serviceAreas = [
  {
    name: "Poreč City Center",
    description: "Immediate pickup available 24/7. Standard rates apply.",
    color: "green"
  },
  {
    name: "Suburban Areas",
    description: "Includes Červar-Porat, Varvari, Fuškulin, and nearby hotels.",
    color: "green"
  },
  {
    name: "Extended Coverage",
    description: "Vrsar, Funtana, Nova Vas, and surrounding villages.",
    color: "yellow"
  }
];

onMounted(() => {
  // Load Leaflet resources dynamically
  loadLeafletResources().then(() => {
    initMap();
  }).catch(error => {
    console.error('Failed to load Leaflet:', error);
    isMapLoading.value = false;
  });
});

onUnmounted(() => {
  // Cleanup map instance if needed
  if (map && map.remove) {
    map.remove();
  }
});

const loadLeafletResources = async () => {
  // Load Leaflet CSS
  const leafletCss = document.createElement('link');
  leafletCss.rel = 'stylesheet';
  leafletCss.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css';
  document.head.appendChild(leafletCss);

  // Load Leaflet JS
  return new Promise((resolve, reject) => {
    const leafletScript = document.createElement('script');
    leafletScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js';
    leafletScript.onload = resolve;
    leafletScript.onerror = reject;
    document.head.appendChild(leafletScript);
  });
};

const initMap = () => {
  // Check if Leaflet is loaded and mapContainer exists
  if (!window.L || !mapContainer.value) {
    console.error('Leaflet or map container not available');
    isMapLoading.value = false;
    return;
  }

  // Create the map focused on Poreč, Croatia
  map = window.L.map(mapContainer.value).setView([45.2271, 13.5947], 12);

  // Add the OpenStreetMap tile layer
  window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // Add the coverage zones as concentric circles
  // Zone 1 - City Center (3km radius)
  window.L.circle([45.2271, 13.5947], {
    color: 'green',
    fillColor: 'green',
    fillOpacity: 0.2,
    radius: 3000
  }).addTo(map);

  // Zone 2 - Suburban Areas (6km radius)
  window.L.circle([45.2271, 13.5947], {
    color: 'yellow',
    fillColor: 'yellow',
    fillOpacity: 0.2,
    radius: 6000
  }).addTo(map);

  // Zone 3 - Extended Coverage (10km radius)
  window.L.circle([45.2271, 13.5947], {
    color: 'orange',
    fillColor: 'orange',
    fillOpacity: 0.2,
    radius: 10000
  }).addTo(map);

  // Add a marker for the taxi headquarters
  window.L.marker([45.2271, 13.5947])
    .addTo(map)

    .openPopup();

  // Hide the loading indicator
  isMapLoading.value = false;
};
</script>

<style>

.leaflet-container {
  z-index: 1 !important;
}

</style>