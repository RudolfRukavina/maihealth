<template>
  <section class="py-0 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden" id='excursionRoutes'>
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
      <!-- Section heading -->
      <ClientOnly>
        <div class="text-center mb-16" v-motion :initial="{ opacity: 0, y: 40 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 800 } }">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Design Your Perfect Journey</h2>
          <div class="w-24 h-1 bg-gradient-to-r from-red-600 to-red-700 mx-auto"></div>
          <p class="mt-6 text-gray-300 max-w-2xl mx-auto">
            Create your own custom boat excursion or choose from our popular routes.
            Simply select destinations on the map to build your perfect Adriatic adventure.
          </p>
        </div>
      </ClientOnly>

      <!-- Journey Builder Card -->
      <ClientOnly>
        <div class="max-w-6xl mx-auto" v-motion :initial="{ opacity: 0, y: 30 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: 200, duration: 600 } }">

          <div class="rounded-xl overflow-hidden backdrop-blur-sm border border-white/10 bg-white/5">

            <!-- Mode Selection Tabs -->
            <div class="p-6 border-b border-white/10">
              <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div class="flex bg-white/5 backdrop-blur-sm rounded-lg p-1">
                  <button @click="mode = 'custom'"
                    class="px-4 py-2 text-sm font-medium rounded-md transition-all duration-300"
                    :class="mode === 'custom' ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg' : 'text-gray-300 hover:text-white'">
                    Custom Journey
                  </button>
                  <button @click="mode = 'preset'"
                    class="px-4 py-2 text-sm font-medium rounded-md transition-all duration-300"
                    :class="mode === 'preset' ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg' : 'text-gray-300 hover:text-white'">
                    Popular Routes
                  </button>
                </div>

                <!-- Journey Info -->
                <div class="flex items-center gap-4 text-sm">
                  <div class="flex items-center text-gray-300">
                    <svg class="w-4 h-4 mr-1 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clip-rule="evenodd"></path>
                    </svg>
                    {{ estimatedDuration }}
                  </div>
                  <div class="text-lg font-bold text-red-500">€{{ totalPrice }}</div>
                </div>
              </div>

              <!-- Preset Routes Selection -->
              <div v-if="mode === 'preset'" class="mt-4">
                <div class="flex overflow-x-auto pb-2 scrollbar-hide gap-2">
                  <button v-for="preset in presetRoutes" :key="preset.id" @click="selectPresetRoute(preset)"
                    class="px-4 py-2 text-sm whitespace-nowrap rounded-lg transition-all duration-300 flex-shrink-0"
                    :class="selectedPreset?.id === preset.id ?
                      'bg-gradient-to-r from-red-600 to-red-700 text-white font-medium' :
                      'bg-white/5 text-gray-300 hover:bg-white/10'">
                    {{ preset.name }}
                  </button>
                </div>
              </div>
            </div>

            <div class="grid lg:grid-cols-2 gap-0">

              <!-- Interactive Map Section -->
              <div class="relative bg-white/5 p-6">
                <h3 class="text-white font-semibold mb-4 flex items-center">
                  <svg class="w-5 h-5 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z">
                    </path>
                  </svg>
                  {{ mode === 'custom' ? 'Select Your Destinations' : 'Your Route' }}
                </h3>

                <!-- Leaflet Map Container -->
                <div class="relative rounded-lg overflow-hidden shadow-lg" style="aspect-ratio: 4/3; height: 400px;">
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
                    <button v-if="mode === 'custom' && selectedDestinations.length > 1" @click="clearCustomRoute"
                      class="px-3 py-1 bg-black/70 hover:bg-black/90 text-white text-xs rounded-lg transition-all duration-300 backdrop-blur-sm">
                      Clear Route
                    </button>
                  </div>
                </div>

                <!-- Instructions -->
                <div class="mt-4 text-sm">
                  <p v-if="mode === 'custom'" class="text-gray-400">
                    Click on destinations on the map to add them to your journey. Minimum 2 destinations required.
                  </p>
                  <p v-else class="text-gray-400">
                    Select a popular route above to see it highlighted on the map.
                  </p>
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
                      <button v-if="mode === 'custom' && dest.id !== 'porec'" @click="removeDestination(dest.id)"
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
                      <span>€{{ basePrice }}</span>
                    </div>
                    <div v-if="extraDestinationsCost > 0" class="flex justify-between text-gray-300">
                      <span>Additional destinations ({{ currentJourneyDestinations.length - 2 }})</span>
                      <span>€{{ extraDestinationsCost }}</span>
                    </div>
                    <div class="border-t border-white/10 pt-2 flex justify-between font-medium text-white">
                      <span>Total per person</span>
                      <span class="text-red-500">€{{ totalPrice }}</span>
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
                <button v-if="canBook" @click="bookJourney"
                  class="w-full py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-red-500/25 flex items-center justify-center group">
                  <span>Book Your Journey</span>
                  <svg class="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                    fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clip-rule="evenodd"></path>
                  </svg>
                </button>

                <div v-else class="text-center p-4 bg-white/5 rounded-lg">
                  <p class="text-gray-400 text-sm">
                    {{ mode === 'custom' ? 'Select at least 2 destinations to book your journey' : 'Choose a route to get started' }}
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

  // Mode selection: 'custom' or 'preset'
  const mode = ref('custom');

  // Base pricing
  const basePrice = 45;
  const extraDestinationPrice = 15;

  // Map loading state and refs
  const isMapLoading = ref(true);
  const mapContainer = ref(null);
  let map = null;
  let markers = [];
  let routePolyline = null;

  // Leaflet coordinates for Istrian destinations
  const destinations = [
    {
      id: 'porec',
      name: 'Poreč',
      lat: 45.2271,
      lng: 13.5947,
      type: 'start',
      description: 'Starting point - Historic coastal town'
    },
    {
      id: 'vrsar',
      name: 'Vrsar',
      lat: 45.2097,
      lng: 13.6078,
      type: 'coastal',
      description: 'Charming fishing village'
    },
    {
      id: 'rovinj',
      name: 'Rovinj',
      lat: 45.0811,
      lng: 13.6400,
      type: 'coastal',
      description: 'Romantic old town on peninsula'
    },
    {
      id: 'lim-fjord',
      name: 'Lim Fjord',
      lat: 45.1333,
      lng: 13.7167,
      type: 'natural',
      description: 'Spectacular natural reserve'
    },
    {
      id: 'sv-nikola',
      name: 'Sv. Nikola Island',
      lat: 45.2175,
      lng: 13.5736,
      type: 'island',
      description: 'Green island near Poreč'
    },
    {
      id: 'brijuni',
      name: 'Brijuni Islands',
      lat: 44.9167,
      lng: 13.7667,
      type: 'island',
      description: 'National park islands'
    },
    {
      id: 'novigrad',
      name: 'Novigrad',
      lat: 45.3167,
      lng: 13.5667,
      type: 'coastal',
      description: 'Venetian town with rich history'
    },
    {
      id: 'motovun',
      name: 'Motovun Coast',
      lat: 45.3367,
      lng: 13.8289,
      type: 'coastal',
      description: 'Coastal views of hilltop town'
    }
  ];

  // Selected destinations for custom journey
  const selectedDestinations = ref(['porec']); // Start with Poreč

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
      destinations: ['porec', 'sv-nikola', 'brijuni', 'rovinj'],
      price: 70,
      duration: '7-8 hours',
      highlights: [
        'Visit St. Nicholas Island pine forests',
        'Explore Brijuni National Park',
        'Snorkeling in pristine waters',
        'Fresh seafood lunch on board',
        'Wildlife spotting opportunities'
      ]
    },
    {
      id: 'hidden-gems',
      name: 'Hidden Gems & Secret Beaches',
      destinations: ['porec', 'sv-nikola', 'lim-fjord'],
      price: 65,
      duration: '5-6 hours',
      highlights: [
        'Secluded beaches away from crowds',
        'Explore hidden caves and coves',
        'Snorkeling equipment provided',
        'Local specialties picnic lunch',
        'Personalized local skipper experience'
      ]
    },
    {
      id: 'sunset-dolphins',
      name: 'Sunset & Dolphin Watching',
      destinations: ['porec', 'vrsar', 'lim-fjord'],
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
      destinations: ['porec', 'novigrad', 'motovun'],
      price: 50,
      duration: '5-6 hours',
      highlights: [
        'Historic Venetian architecture',
        'Coastal views of Motovun hilltop',
        'Traditional Istrian cuisine tasting',
        'Photo opportunities at scenic viewpoints',
        'Cultural insights from local guide'
      ]
    }
  ];

  // Selected preset route
  const selectedPreset = ref(null);

  // Load Leaflet resources dynamically (matching your existing approach)
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

  // Initialize Leaflet map
  const initMap = () => {
    // Check if Leaflet is loaded and mapContainer exists
    if (!window.L || !mapContainer.value) {
      console.error('Leaflet or map container not available');
      isMapLoading.value = false;
      return;
    }

    // Initialize map centered on Poreč
    map = window.L.map(mapContainer.value).setView([45.2271, 13.5947], 10);

    // Add OpenStreetMap tiles
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add custom markers for each destination
    addDestinationMarkers();

    // Update route when destinations change
    updateRoute();

    // Hide the loading indicator
    isMapLoading.value = false;
  };

  // Add markers for all destinations
  const addDestinationMarkers = () => {
    destinations.forEach(destination => {
      const isSelected = isDestinationSelected(destination.id);
      const isStart = destination.id === 'porec';

      // Create custom icon based on selection state
      const iconOptions = {
        iconSize: [30, 30],
        iconAnchor: [15, 15],
        popupAnchor: [0, -15]
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
      <div class="text-center p-2">
        <h3 class="font-bold text-gray-800 mb-1">${destination.name}</h3>
        <p class="text-sm text-gray-600 mb-2">${destination.description}</p>
        ${destination.id !== 'porec' && mode.value === 'custom' ?
            `<button onclick="window.toggleDestinationFromMap('${destination.id}')"
           class="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 transition-colors">
           ${isSelected ? 'Remove from route' : 'Add to route'}
          </button>` : ''
          }
      </div>
    `, {
          maxWidth: 200,
          className: 'custom-popup'
        })
        .addTo(map);

      // Add click handler for custom mode
      if (mode.value === 'custom' && destination.id !== 'porec') {
        marker.on('click', () => {
          toggleDestination(destination.id);
        });
      }

      markers.push(marker);
    });
  };

  // Update route polyline on map
  const updateRoute = () => {
    // Remove existing route
    if (routePolyline) {
      map.removeLayer(routePolyline);
    }

    if (currentJourneyDestinations.value.length < 2) return;

    // Create route coordinates
    const routeCoords = currentJourneyDestinations.value.map(dest => [dest.lat, dest.lng]);

    // Add polyline for the route
    routePolyline = window.L.polyline(routeCoords, {
      color: '#dc2626',
      weight: 4,
      opacity: 0.8,
      dashArray: '10, 5'
    }).addTo(map);

    // Fit map to show entire route with padding
    if (routeCoords.length > 1) {
      const bounds = window.L.latLngBounds(routeCoords);
      map.fitBounds(bounds, { padding: [30, 30] });
    }
  };

  // Refresh markers when selections change
  const refreshMarkers = () => {
    // Clear existing markers
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];

    // Add new markers with updated states
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
    if (mode.value === 'preset' && selectedPreset.value) {
      return selectedPreset.value.destinations.map(id =>
        destinations.find(dest => dest.id === id)
      ).filter(Boolean);
    }
    return selectedDestinations.value.map(id =>
      destinations.find(dest => dest.id === id)
    ).filter(Boolean);
  });

  const totalPrice = computed(() => {
    if (mode.value === 'preset' && selectedPreset.value) {
      return selectedPreset.value.price;
    }

    const extraDestinations = Math.max(0, currentJourneyDestinations.value.length - 2);
    return basePrice + (extraDestinations * extraDestinationPrice);
  });

  const extraDestinationsCost = computed(() => {
    if (mode.value === 'preset') return 0;
    const extraDestinations = Math.max(0, currentJourneyDestinations.value.length - 2);
    return extraDestinations * extraDestinationPrice;
  });

  const estimatedDuration = computed(() => {
    if (mode.value === 'preset' && selectedPreset.value) {
      return selectedPreset.value.duration;
    }

    const destCount = currentJourneyDestinations.value.length;
    if (destCount <= 2) return '3-4 hours';
    if (destCount <= 4) return '5-6 hours';
    return '7-8 hours';
  });

  const currentHighlights = computed(() => {
    if (mode.value === 'preset' && selectedPreset.value) {
      return selectedPreset.value.highlights;
    }

    // Generate highlights based on selected destinations
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
    if (mode.value === 'preset') {
      return selectedPreset.value !== null;
    }
    return currentJourneyDestinations.value.length >= 2;
  });

  // Methods
  const toggleDestination = (destinationId) => {
    if (mode.value !== 'custom') return;

    if (destinationId === 'porec') return; // Can't remove starting point

    const index = selectedDestinations.value.indexOf(destinationId);
    if (index > -1) {
      selectedDestinations.value.splice(index, 1);
    } else {
      selectedDestinations.value.push(destinationId);
    }

    // Refresh map markers
    nextTick(() => {
      if (map) refreshMarkers();
    });
  };

  const removeDestination = (destinationId) => {
    if (destinationId === 'porec') return; // Can't remove starting point
    const index = selectedDestinations.value.indexOf(destinationId);
    if (index > -1) {
      selectedDestinations.value.splice(index, 1);
      nextTick(() => {
        if (map) refreshMarkers();
      });
    }
  };

  const selectPresetRoute = (preset) => {
    selectedPreset.value = preset;
    nextTick(() => {
      if (map) refreshMarkers();
    });
  };

  const isDestinationSelected = (destinationId) => {
    if (mode.value === 'preset' && selectedPreset.value) {
      return selectedPreset.value.destinations.includes(destinationId);
    }
    return selectedDestinations.value.includes(destinationId);
  };

  const bookJourney = () => {
    if (!canBook.value) return;

    let journeyName = '';
    let destinationNames = [];

    if (mode.value === 'preset' && selectedPreset.value) {
      journeyName = selectedPreset.value.name;
      destinationNames = selectedPreset.value.destinations.map(id =>
        destinations.find(dest => dest.id === id)?.name || id
      );
    } else {
      journeyName = 'Custom Journey';
      destinationNames = currentJourneyDestinations.value.map(dest => dest.name);
    }

    const subject = encodeURIComponent(`Boat Journey Booking: ${journeyName}`);
    const body = encodeURIComponent(
      `Hello,\n\n` +
      `I'd like to book a boat journey with Poseidon.\n\n` +
      `Journey Details:\n` +
      `- Route: ${journeyName}\n` +
      `- Destinations: ${destinationNames.join(' → ')}\n` +
      `- Duration: ${estimatedDuration.value}\n` +
      `- Price: €${totalPrice.value} per person\n\n` +
      `My details:\n` +
      `Name: \n` +
      `Phone Number: \n` +
      `Preferred Date: \n` +
      `Number of passengers: \n` +
      `Accommodation/Pickup Location: \n\n` +
      `Could you please confirm availability and let me know if you need any additional information?\n\n` +
      `Thank you!`
    );

    window.location.href = `mailto:poseidon@gmail.hr?subject=${subject}&body=${body}`;
  };

  // Watch for mode changes to reset selections and refresh map
  watch(mode, (newMode) => {
    if (newMode === 'custom') {
      selectedPreset.value = null;
      selectedDestinations.value = ['porec'];
    } else {
      selectedDestinations.value = ['porec'];
    }

    nextTick(() => {
      if (map) refreshMarkers();
    });
  });

  // Mount and unmount handlers (matching your existing approach)
  onMounted(() => {
    // Load Leaflet resources dynamically
    loadLeafletResources().then(() => {
      nextTick(() => {
        initMap();
      });
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

  /* Particles animation (matching your hero component) */
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
</style>