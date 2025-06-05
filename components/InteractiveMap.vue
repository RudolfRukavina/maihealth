<template>
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
      <button v-if="mode === 'custom' && selectedDestinations.length > 1" @click="clearRoute"
        class="px-3 py-1 bg-black/70 hover:bg-black/90 text-white text-xs rounded-lg transition-all duration-300 backdrop-blur-sm">
        Clear Route
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue';

// Props
const props = defineProps({
  mode: {
    type: String,
    required: true,
    default: 'custom'
  },
  selectedDestinations: {
    type: Array,
    required: true,
    default: () => ['porec']
  },
  selectedPreset: {
    type: Object,
    default: null
  },
  destinations: {
    type: Array,
    required: true,
    default: () => []
  }
});

// Emits
const emit = defineEmits(['toggle-destination', 'clear-route']);

// Map loading state and refs
const isMapLoading = ref(true);
const mapContainer = ref(null);
let map = null;
let markers = [];
let routePolyline = null;

// Computed properties
const currentJourneyDestinations = computed(() => {
  if (props.mode === 'preset' && props.selectedPreset) {
    return props.selectedPreset.destinations.map(id =>
      props.destinations.find(dest => dest.id === id)
    ).filter(Boolean);
  }
  return props.selectedDestinations.map(id =>
    props.destinations.find(dest => dest.id === id)
  ).filter(Boolean);
});

// Load Leaflet resources dynamically
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
  props.destinations.forEach(destination => {
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
        ${destination.id !== 'porec' && props.mode === 'custom' ?
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
    if (props.mode === 'custom' && destination.id !== 'porec') {
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

// Toggle destination selection
const toggleDestination = (destinationId) => {
  emit('toggle-destination', destinationId);
};

// Clear route
const clearRoute = () => {
  emit('clear-route');
};

// Check if destination is selected
const isDestinationSelected = (destinationId) => {
  if (props.mode === 'preset' && props.selectedPreset) {
    return props.selectedPreset.destinations.includes(destinationId);
  }
  return props.selectedDestinations.includes(destinationId);
};

// Make toggleDestination available globally for popup buttons
if (typeof window !== 'undefined') {
  window.toggleDestinationFromMap = (destinationId) => {
    toggleDestination(destinationId);
  };
}

// Watch for prop changes to refresh map
watch([() => props.selectedDestinations, () => props.selectedPreset, () => props.mode], () => {
  nextTick(() => {
    if (map) refreshMarkers();
  });
}, { deep: true });

// Mount and unmount handlers
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