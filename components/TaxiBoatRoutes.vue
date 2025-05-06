<template>
  <section class="py-0 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden" id='excursionRoutes'>
    <!-- Background elements -->
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,0,0,0.05)_0%,transparent_60%)]"></div>
    <div class="absolute inset-0 bg-noise opacity-[0.02] mix-blend-overlay pointer-events-none"></div>

    <!-- Particles (simplified) -->
    <ClientOnly>
      <div class="absolute inset-0">
        <div v-for="i in 12" :key="`p-${i}`" class="particle absolute rounded-full" :class="{
          [`particle-${i % 3 === 0 ? 'slow' : i % 3 === 1 ? 'medium' : 'fast'}`]: true,
          [`particle-${i <= 6 ? 'tiny' : i <= 9 ? 'small' : 'normal'}`]: true
        }" :style="{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: 0.05 + (Math.random() * 0.1),
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${20 + Math.random() * 20}s`
          }">
        </div>
      </div>
    </ClientOnly>

    <div class="container mx-auto px-6 relative z-10">
      <!-- Section heading -->
      <ClientOnly>
        <div class="text-center mb-12" v-motion :initial="{ opacity: 0, y: 40 }"
          :enter="{ opacity: 1, y: 0, duration: 800 }">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Taxi Boat by Poseidon</h2>
          <div class="w-24 h-1 bg-gradient-to-r from-red-600 to-red-500 mx-auto"></div>
          <p class="mt-6 text-gray-300 max-w-2xl mx-auto">
            Experience the Adriatic Sea in style with our premium Poseidon boat transfer service.
          </p>
        </div>
      </ClientOnly>

      <!-- Transfer selector card -->
      <ClientOnly>
        <div class="max-w-4xl mx-auto" v-motion :initial="{ opacity: 0, y: 30 }"
          :enter="{ opacity: 1, y: 0, delay: 200, duration: 600 }">
          <div
            class="rounded-xl overflow-hidden backdrop-blur-sm border border-white/10 bg-white/5 group-hover:bg-white/10 group-hover:border-white/20 group-hover:shadow-xl group-hover:shadow-red-500/5">
            <!-- Header with boat image -->
            <div class="h-56 relative overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
              <img :src="boatImage" alt="Poseidon Boat" class="w-full h-full object-cover">
              <!-- Boat details badge - REMOVED duration from here -->
              <div
                class="absolute bottom-4 left-4 z-10 bg-black/60 text-white px-4 py-2 rounded-lg flex items-center text-sm">
                <span>Up to 8 passengers</span>
              </div>
            </div>

            <!-- Location selector -->
            <div class="p-6">
              <h3 class="text-xl font-bold text-white mb-6">Select Your Transfer Route</h3>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <!-- From/To Locations -->
                <div v-for="(label, idx) in ['Departure Point', 'Destination']" :key="label">
                  <label class="block text-gray-400 mb-2 text-sm">{{ label }}</label>
                  <div class="relative">
                    <select :value="idx === 0 ? fromLocation : toLocation"
                      @input="idx === 0 ? fromLocation = $event.target.value : toLocation = $event.target.value"
                      class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-red-500">
                      <option v-for="location in idx === 0 ? fromOptions : toOptions" :key="location.id"
                        :value="location.id">
                        {{ location.name }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <!-- Route visualization - MODIFIED with duration where the nm are -->
              <div class="flex items-center justify-between mb-12 px-4">
                <div class="text-center">
                  <div
                    class="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-2">
                    <svg class="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clip-rule="evenodd"></path>
                    </svg>
                  </div>
                  <div class="text-white font-medium">{{ selectedFromName }}</div>
                </div>

                <div class="flex-1 flex items-center justify-center px-4">
                  <div class="h-0.5 bg-gradient-to-r from-red-600 to-red-500 flex-1 relative">
                    <div class="absolute -top-2 left-1/2 transform -translate-x-1/2">
                    </div>
                    <!-- IMPORTANT CHANGE: Added duration to route visualization -->
                    <div class="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-center whitespace-nowrap">
                      <span class="text-xs text-gray-400 block">{{ calculateDistance }}</span>
                      <span class="text-sm text-red-500 font-medium block mt-1">{{ calculateDuration }}</span>
                    </div>
                  </div>
                </div>

                <div class="text-center">
                  <div
                    class="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-2">
                    <svg class="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clip-rule="evenodd"></path>
                    </svg>
                  </div>
                  <div class="text-white font-medium">{{ selectedToName }}</div>
                </div>
              </div>

              <!-- Pricing section -->
              <div class="p-5 mb-6 rounded-lg bg-white/5 border border-white/10">
                <div class="flex justify-between items-center">
                  <div>
                    <h4 class="text-white font-bold mb-1">Transfer Price</h4>
                    <p class="text-sm text-gray-400">Includes skipper & complimentary water</p>
                  </div>
                  <div class="text-2xl font-bold text-red-500">€{{ calculatePrice }}</div>
                </div>

                <!-- Features list -->
                <div class="mt-4 grid grid-cols-2 gap-2">
                  <div
                    v-for="feature in ['Professional skipper', 'Premium speedboat', 'Bottled water', 'Up to 8 passengers']"
                    :key="feature" class="flex items-center text-sm text-gray-300">
                    <svg class="w-4 h-4 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"></path>
                    </svg>
                    {{ feature }}
                  </div>
                </div>
              </div>

              <!-- Book now button -->
              <a :href="getMailtoLink"
                class="w-full py-4 bg-gradient-to-r from-red-600 to-red-500 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-red-500/25 flex items-center justify-center group no-underline">
                <span>Book Now</span>
                <svg class="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                  fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </ClientOnly>

      <!-- Custom request section -->
      <ClientOnly>
        <div class="mt-12 text-center p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm" v-motion
          :initial="{ opacity: 0 }" :enter="{ opacity: 1, delay: 400, duration: 800 }">
          <h3 class="text-xl md:text-2xl font-bold text-white mb-3">Need a Custom Boat Route?</h3>
          <p class="text-gray-300 mb-6 max-w-2xl mx-auto">
            Don't see your desired route? We offer boat transfers to all destinations along the Istrian coast and
            islands. Contact us for a personalized quote.
          </p>
          <a href="mailto:poseidon@gmail.com?subject=Custom%20Boat%20Transfer%20Quote%20Request"
            class="px-8 py-4 bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/15 hover:border-white/30 text-white font-medium rounded-lg transition-all duration-300 flex items-center justify-center mx-auto no-underline">
            <span>Request Custom Quote</span>
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
import { ref, computed } from 'vue';

// Boat image
const boatImage = "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/ca/cb/3a/photo1jpg.jpg?w=1400&h=-1&s=1";

// Locations data - simplified structure
const locations = [
  { id: 'porec', name: 'Poreč', coordinates: [0, 0] },
  { id: 'rovinj', name: 'Rovinj', coordinates: [12, 0], distance: 12 },
  { id: 'umag', name: 'Umag', coordinates: [10, 5], distance: 10 },
  { id: 'pula', name: 'Pula', coordinates: [22, -5], distance: 22 },
  { id: 'novigrad', name: 'Novigrad', coordinates: [7, 3], distance: 7 },
  { id: 'vrsar', name: 'Vrsar', coordinates: [6, -2], distance: 6 },
  { id: 'brijuni', name: 'Brijuni Islands', coordinates: [20, -3], distance: 20 },
  { id: 'venice', name: 'Venice', coordinates: [65, 10], distance: 65 },
  { id: 'lim', name: 'Lim Fjord', coordinates: [8, -1], distance: 8 },
  { id: 'red-island', name: 'Red Island', coordinates: [3, 0], distance: 3 }
];

// Form state
const fromLocation = ref('porec');
const toLocation = ref('rovinj');

// Computed properties
const fromOptions = computed(() => locations.filter(loc => loc.id !== toLocation.value));
const toOptions = computed(() => locations.filter(loc => loc.id !== fromLocation.value));
const selectedFromName = computed(() => locations.find(loc => loc.id === fromLocation.value)?.name || '');
const selectedToName = computed(() => locations.find(loc => loc.id === toLocation.value)?.name || '');

// Calculate distance between locations
const calculateDistance = computed(() => {
  const from = locations.find(loc => loc.id === fromLocation.value);
  const to = locations.find(loc => loc.id === toLocation.value);
  if (!from || !to) return '0 nm';

  // Use predefined distances if available
  if (from.id === 'porec') return `${to.distance} nm`;
  if (to.id === 'porec') return `${from.distance} nm`;

  // Calculate approximate distance
  const dx = to.coordinates[0] - from.coordinates[0];
  const dy = to.coordinates[1] - from.coordinates[1];
  return `${Math.round(Math.sqrt(dx * dx + dy * dy))} nm`;
});

// Calculate duration based on distance
const calculateDuration = computed(() => {
  const distance = parseInt(calculateDistance.value);
  if (isNaN(distance)) return '30 min';

  if (distance <= 5) return '15-25 min';
  if (distance <= 10) return '30-40 min';
  if (distance <= 20) return '50-70 min';
  if (distance <= 30) return '1h 30min';
  return '2h+';
});

// Calculate price based on distance
const calculatePrice = computed(() => {
  const distance = parseInt(calculateDistance.value);
  if (isNaN(distance)) return 100;

  const prices = [
    [5, 80],
    [10, 120],
    [15, 160],
    [25, 220],
    [40, 350]
  ];

  for (const [maxDist, price] of prices) {
    if (distance <= maxDist) return price;
  }
  return 650;
});

// Generate mailto link
const getMailtoLink = computed(() => {
  const subject = encodeURIComponent(`Poseidon Boat Transfer: ${selectedFromName.value} to ${selectedToName.value}`);
  const body = encodeURIComponent(`Hello,

I'd like to book the Poseidon Boat for a transfer from ${selectedFromName.value} to ${selectedToName.value}.

Here are my details:
Name:
Surname:
Date:
Time:
Number of passengers:

Price: €${calculatePrice.value}

Could you please confirm availability?

Thank you!`);

  return `mailto:poseidon@gmail.com?subject=${subject}&body=${body}`;
});
</script>

<style scoped>
/* Particles animation - consolidated animations */
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
  animation: float 30s infinite ease-in-out;
}

.particle-medium {
  animation: float 25s infinite ease-in-out;
}

.particle-fast {
  animation: float 20s infinite ease-in-out;
}

@keyframes float {

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

/* Form styles */
input[type="date"],
input[type="time"] {
  color-scheme: dark;
}

input[type="date"]::-webkit-calendar-picker-indicator,
input[type="time"]::-webkit-calendar-picker-indicator {
  filter: invert(1);
  opacity: 0.5;
}
</style>