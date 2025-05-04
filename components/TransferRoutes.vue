<template>
  <section class="py-0 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden" id='excursionRoutes'>
    <!-- Background elements -->
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,0,0,0.05)_0%,transparent_60%)]">
    </div>
    <div class="absolute inset-0 bg-noise opacity-[0.02] mix-blend-overlay pointer-events-none"></div>

    <!-- Subtle particles -->
    <ClientOnly>
      <div class="absolute inset-0 z-0">
        <div v-for="i in 20" :key="`particle-route-${i}`" class="particle absolute rounded-full" :class="{
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
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Taxi Boat by Poseidon</h2>
          <div class="w-24 h-1 bg-gradient-to-r from-red-600 to-red-500 mx-auto"></div>
          <p class="mt-6 text-gray-300 max-w-2xl mx-auto">
            Experience the Adriatic Sea in style with our premium Poseidon boat transfer service.
            Choose your departure and destination points for a seamless coastal journey.
          </p>
        </div>
      </ClientOnly>

      <!-- Transfer selector card -->
      <ClientOnly>
        <div class="max-w-4xl mx-auto" v-motion :initial="{ opacity: 0, y: 30 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: 200, duration: 600 } }">

          <div class="rounded-xl overflow-hidden backdrop-blur-sm transition-all duration-300
                   border border-white/10 bg-white/5 group-hover:bg-white/10 group-hover:border-white/20
                   group-hover:shadow-xl group-hover:shadow-red-500/5">

            <!-- Header with boat image -->
            <div class="h-56 relative overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
              <img :src="boatImage" alt="Poseidon Boat"
                class="w-full h-full object-cover transition-transform duration-700">

              <!-- Boat details badge -->
              <div
                class="absolute bottom-4 left-4 z-10 bg-black/60 text-white px-4 py-2 rounded-lg flex items-center text-sm">
                <span class="mr-3">Up to 8 passengers</span>
                <span class="flex items-center">
                  <svg class="w-4 h-4 mr-1 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clip-rule="evenodd"></path>
                  </svg>
                  {{ calculateDuration }} average duration
                </span>
              </div>
            </div>

            <!-- Location selector -->
            <div class="p-6">
              <h3 class="text-xl font-bold text-white mb-6">Select Your Transfer Route</h3>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <!-- From location -->
                <div>
                  <label class="block text-gray-400 mb-2 text-sm">Departure Point</label>
                  <div class="relative">
                    <select v-model="fromLocation"
                      class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300">
                      <option v-for="location in fromOptions" :key="location.id" :value="location.id">{{ location.name
                        }}</option>
                    </select>
                    <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg class="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clip-rule="evenodd"></path>
                      </svg>
                    </div>
                  </div>
                </div>

                <!-- To location -->
                <div>
                  <label class="block text-gray-400 mb-2 text-sm">Destination</label>
                  <div class="relative">
                    <select v-model="toLocation"
                      class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300">
                      <option v-for="location in toOptions" :key="location.id" :value="location.id">{{ location.name }}
                      </option>
                    </select>
                    <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg class="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clip-rule="evenodd"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Route visualization -->
              <div class="flex items-center justify-between mb-8 px-4">
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
                      <svg class="w-4 h-4 text-red-500 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                          clip-rule="evenodd"></path>
                      </svg>
                    </div>
                    <div class="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                      <span class="text-xs text-gray-400">{{ calculateDistance }}</span>
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
                  <div class="flex items-center text-sm text-gray-300">
                    <svg class="w-4 h-4 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"></path>
                    </svg>
                    Professional skipper
                  </div>
                  <div class="flex items-center text-sm text-gray-300">
                    <svg class="w-4 h-4 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"></path>
                    </svg>
                    Premium speedboat
                  </div>
                  <div class="flex items-center text-sm text-gray-300">
                    <svg class="w-4 h-4 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"></path>
                    </svg>
                    Bottled water
                  </div>
                  <div class="flex items-center text-sm text-gray-300">
                    <svg class="w-4 h-4 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"></path>
                    </svg>
                    Up to 8 passengers
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
        <div class="mt-16 text-center p-8 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm" v-motion
          :initial="{ opacity: 0 }" :enter="{ opacity: 1, transition: { delay: 400, duration: 800 } }">
          <h3 class="text-xl md:text-2xl font-bold text-white mb-3">Need a Custom Boat Route?</h3>
          <p class="text-gray-300 mb-6 max-w-2xl mx-auto">
            Don't see your desired route? We offer boat transfers to all destinations along the Istrian coast and
            islands. Contact us for a personalized quote.
          </p>
          <a href="mailto:poseidon@gmail.com?subject=Custom%20Boat%20Transfer%20Quote%20Request&body=Hello%2C%0A%0AI%27d%20like%20to%20request%20a%20quote%20for%20a%20custom%20boat%20transfer.%0A%0AHere%20are%20my%20details%3A%0AFrom%3A%20%0ATo%3A%20%0AName%3A%20%0ASurname%3A%20%0ADate%3A%20%0ATime%3A%20%0A%0ACould%20you%20please%20provide%20a%20quote%20for%20this%20journey%3F%0A%0AThank%20you!"
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

// Locations data
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
const transferDate = ref('');
const transferTime = ref('');

// Computed properties for location options
const fromOptions = computed(() => {
  return locations.filter(loc => loc.id !== toLocation.value);
});

const toOptions = computed(() => {
  return locations.filter(loc => loc.id !== fromLocation.value);
});

// Get location names based on selected IDs
const selectedFromName = computed(() => {
  const location = locations.find(loc => loc.id === fromLocation.value);
  return location ? location.name : '';
});

const selectedToName = computed(() => {
  const location = locations.find(loc => loc.id === toLocation.value);
  return location ? location.name : '';
});

// Calculate distance between locations
const calculateDistance = computed(() => {
  const from = locations.find(loc => loc.id === fromLocation.value);
  const to = locations.find(loc => loc.id === toLocation.value);

  if (!from || !to) return '0 nm';

  // Use predefined distances if available
  if (from.id === 'porec') {
    return `${to.distance} nm`;
  } else if (to.id === 'porec') {
    return `${from.distance} nm`;
  }

  // Calculate approximate distance for other combinations
  const dx = to.coordinates[0] - from.coordinates[0];
  const dy = to.coordinates[1] - from.coordinates[1];
  const distance = Math.round(Math.sqrt(dx * dx + dy * dy));

  return `${distance} nm`;
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

  if (distance <= 5) return 80;
  if (distance <= 10) return 120;
  if (distance <= 15) return 160;
  if (distance <= 25) return 220;
  if (distance <= 40) return 350;
  return 650;
});

// Generate mailto link
const getMailtoLink = computed(() => {
  const subject = encodeURIComponent(`Poseidon Boat Transfer: ${selectedFromName.value} to ${selectedToName.value}`);

  let body = `Hello,\n\n`;
  body += `I'd like to book the Poseidon Boat for a transfer from ${selectedFromName.value} to ${selectedToName.value}.\n\n`;
  body += `Here are my details:\n`;
  body += `Name: \n`;
  body += `Surname: \n`;

  if (transferDate.value) {
    body += `Date: ${transferDate.value}\n`;
  } else {
    body += `Date: \n`;
  }

  if (transferTime.value) {
    body += `Time: ${transferTime.value}\n`;
  } else {
    body += `Time: \n`;
  }

  body += `\nNumber of passengers: \n\n`;
  body += `Price: €${calculatePrice.value}\n\n`;
  body += `Could you please confirm availability and let me know if you need any additional information?\n\n`;
  body += `Thank you!`;

  return `mailto:poseidon@gmail.com?subject=${subject}&body=${encodeURIComponent(body)}`;
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

/* Custom form styles */
input[type="date"],
input[type="time"] {
  color-scheme: dark;
}

input[type="date"]::-webkit-calendar-picker-indicator,
input[type="time"]::-webkit-calendar-picker-indicator {
  filter: invert(1);
  opacity: 0.5;
}

input[type="date"]:hover::-webkit-calendar-picker-indicator,
input[type="time"]:hover::-webkit-calendar-picker-indicator {
  opacity: 0.8;
}
</style>