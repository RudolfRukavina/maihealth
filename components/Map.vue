<template>
  <section class="py-0 bg-black z-10">
    <div class="container mx-auto px-6">
      <!-- Section Header -->
      <div class="max-w-3xl mx-auto text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Rent a Boat with Skipper</h2>
        <p class="text-lg text-gray-300">
          Experience the beauty of the Adriatic with our premium boat rental. The Taxi Boat Poseidon is available for
          daily cruises around Poreč and surrounding areas.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <!-- Map Area - Keeping original styling since map should stay unchanged -->
        <div class="lg:col-span-3 rounded-xl overflow-hidden shadow-lg bg-white h-[500px] relative">
          <!-- Map Container -->
          <ClientOnly>
            <div ref="mapContainer" class="h-full w-full"></div>
          </ClientOnly>

          <!-- Loading Indicator -->
          <div v-if="isMapLoading" class="absolute inset-0 bg-white/80 flex items-center justify-center">
            <div class="flex flex-col items-center">
              <div class="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
              <div class="mt-3 text-gray-600">Loading map...</div>
            </div>
          </div>
        </div>

        <!-- Boat Information -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Boat Details -->
          <div class="bg-gray-800 p-6 rounded-xl shadow-lg">
            <h3 class="text-xl font-bold text-white mb-4">Taxi Boat Poseidon</h3>

            <div class="space-y-3">
              <div class="flex items-start">
                <div class="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center mr-3 shrink-0">
                  <span class="text-xs text-white font-bold">1</span>
                </div>
                <div>
                  <div class="font-medium text-white">Flyer with Honda Engine</div>
                  <div class="text-sm text-gray-300">Powerful and reliable Honda outboard motor for smooth sailing</div>
                </div>
              </div>

              <div class="flex items-start">
                <div class="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center mr-3 shrink-0">
                  <span class="text-xs text-white font-bold">2</span>
                </div>
                <div>
                  <div class="font-medium text-white">Capacity</div>
                  <div class="text-sm text-gray-300">Comfortable seating for up to 8 passengers</div>
                </div>
              </div>

              <div class="flex items-start">
                <div class="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center mr-3 shrink-0">
                  <span class="text-xs text-white font-bold">3</span>
                </div>
                <div>
                  <div class="font-medium text-white">Features</div>
                  <div class="text-sm text-gray-300">Sun canopy, swimming ladder, cooler, and safety equipment</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Pricing Information -->
          <div class="bg-gray-800 p-6 rounded-xl shadow-lg">
            <h3 class="text-xl font-bold text-white mb-4">Rental Information</h3>

            <div class="space-y-4">
              <div class="border-b border-gray-600 pb-3">
                <div class="font-medium text-white">Daily Rates</div>
                <div class="flex justify-between mt-1">
                  <span class="text-sm text-gray-300">Half Day (4 hours)</span>
                  <span class="text-sm font-medium text-white">150€</span>
                </div>
                <div class="flex justify-between mt-1">
                  <span class="text-sm text-gray-300">Full Day (8 hours)</span>
                  <span class="text-sm font-medium text-white">250€</span>
                </div>
              </div>

              <div>
                <div class="flex justify-between text-sm mt-1">
                  <span class="text-gray-300">Fuel</span>
                  <span class="font-medium text-white">Included</span>
                </div>
              </div>
            </div>
          </div>
          <!-- Call to Action -->
          <div class="bg-red-600 p-6 rounded-xl shadow-lg">
            <h3 class="text-xl font-bold text-white mb-3">Ready for an Adventure?</h3>
            <p class="text-sm text-gray-100 mb-4">Call us to reserve the Taxi Boat Poseidon for your perfect day on the
              water</p>
            <a href="tel:+385921696002"
              class="block w-full py-3 bg-black text-white font-bold rounded-lg text-center hover:bg-gray-800 transition duration-300">
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

// Boating areas definitions
const boatingAreas = [
  {
    name: "Coastal Waters",
    description: "Explore the beautiful coastline of Poreč with stunning views.",
    color: "red"
  },
  {
    name: "Island Excursions",
    description: "Visit nearby islands including Sveti Nikola Island.",
    color: "red"
  },
  {
    name: "Blue Lagoon",
    description: "Crystal clear waters perfect for swimming and snorkeling.",
    color: "red"
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

  // Add boating areas
  // Main marina and starting point
  window.L.marker([45.2271, 13.5919])
    .addTo(map)
    .bindPopup("Taxi Boat Poseidon - Pickup Point")
    .openPopup();

  // Popular boating routes
  // Coastal route
  const coastalRoute = [
    [45.2271, 13.5947], // Marina/Starting point
    [45.2200, 13.5900], // Along coast south
    [45.2150, 13.5850], // Further south
    [45.2100, 13.5830]  // End point south
  ];


  // Blue Lagoon area


  // Hide the loading indicator
  isMapLoading.value = false;
};
</script>

<style>
.leaflet-container {
  z-index: 1 !important;
}
</style>