<template>
  <section class="py-0 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden" id='transferRoutes'>
    <!-- Background elements -->
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(253,224,71,0.05)_0%,transparent_60%)]">
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
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Popular Transfer Routes</h2>
          <div class="w-24 h-1 bg-gradient-to-r from-yellow-400 to-amber-500 mx-auto"></div>
          <p class="mt-6 text-gray-300 max-w-2xl mx-auto">
            Discover our most requested transfer routes with transparent, fixed pricing.
            All prices include professional driver, comfortable vehicle, and complimentary water.
          </p>
        </div>
      </ClientOnly>

      <!-- Mobile tabs for route categories -->
      <div class="md:hidden mb-8">
        <div class="flex overflow-x-auto pb-2 scrollbar-hide gap-2">
          <button v-for="(category, index) in categories" :key="category.id" @click="activeCategory = category.id"
            class="px-4 py-2 text-sm whitespace-nowrap rounded-lg transition-all duration-300" :class="activeCategory === category.id ?
              'bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-medium' :
              'bg-white/5 text-gray-300 hover:bg-white/10'">
            {{ category.name }}
          </button>
        </div>
      </div>

      <!-- Desktop category tabs -->
      <div class="hidden md:flex justify-center mb-12">
        <div class="inline-flex bg-white/5 backdrop-blur-sm rounded-xl p-1">
          <button v-for="(category, index) in categories" :key="category.id" @click="activeCategory = category.id"
            class="px-6 py-3 text-sm font-medium rounded-lg transition-all duration-300" :class="activeCategory === category.id ?
              'bg-gradient-to-r from-yellow-400 to-amber-500 text-black shadow-lg' :
              'text-gray-300 hover:text-white'">
            {{ category.name }}
          </button>
        </div>
      </div>

      <!-- Transfer routes cards grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        <ClientOnly>
          <div v-for="(route, index) in filteredRoutes" :key="route.id" class="group relative" v-motion
            :initial="{ opacity: 0, y: 30 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 200 + (index * 100), duration: 600 } }">

            <!-- Card with hover effects -->
            <div class="h-full rounded-xl overflow-hidden backdrop-blur-sm transition-all duration-300
                     border border-white/10 bg-white/5 group-hover:bg-white/10 group-hover:border-white/20
                     group-hover:shadow-xl group-hover:shadow-amber-500/5">

              <!-- Route image with overlay -->
              <div class="h-40 relative overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
                <img :src="route.image" :alt="route.name"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">

                <!-- Distance indicator -->
                <div
                  class="absolute bottom-3 left-3 z-10 flex items-center text-xs text-gray-300 bg-black/40 rounded-full px-3 py-1">
                  <svg class="w-3 h-3 mr-1 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clip-rule="evenodd"></path>
                  </svg>
                  {{ route.distance }}
                </div>

                <!-- Duration indicator -->
                <div
                  class="absolute bottom-3 right-3 z-10 flex items-center text-xs text-gray-300 bg-black/40 rounded-full px-3 py-1">
                  <svg class="w-3 h-3 mr-1 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clip-rule="evenodd"></path>
                  </svg>
                  {{ route.duration }}
                </div>
              </div>

              <!-- Content section -->
              <div class="p-5">
                <h3 class="text-xl font-bold text-white mb-2 flex items-center">
                  <span>
                    {{ route.category === 'airport' && routeDirections[route.id] === 'to' ? route.to : route.from }}
                  </span>

                  <svg class="w-7 mx-2" viewBox="0 0 24.000001 24.000001" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                      <filter id="a" color-interpolation-filters="sRGB" height="1.798065" width="1.31919" x="-.159595"
                        y="-.399032">
                        <feGaussianBlur stdDeviation="1.3302515"></feGaussianBlur>
                      </filter>
                      <g transform="matrix(.90944794 0 0 .90944794 -259.0175 -817.2446)">
                        <path
                          d="m300.84375 908.875c-.35929.0633-.67275.33918-.78125.6875l-.625 1.8125h-10.4375c-.52358.00005-.99995.47642-1 1v1c.00005.52358.47642.99995 1 1h10.4375l.625 1.8125c.17584.53611.8642.83335 1.375.59375l6-3c.36721-.17625.60257-.59466.5625-1 .001-.0312.001-.0625 0-.0937-.0597-.31022-.27572-.58621-.5625-.71875l-6-3c-.1822-.0907-.39248-.12385-.59375-.0937z"
                          filter="url(#a)" opacity=".2"></path>
                        <path
                          d="m308 911.67377a1.0001 1.0001 0 0 0 -.5625-.71875l-6-3a1.0001 1.0001 0 0 0 -1.375.59375l-.625 1.8125h-10.4375a1.0001 1.0001 0 0 0 -1 1v1a1.0001 1.0001 0 0 0 1 1h10.4375l.625 1.8125a1.0001 1.0001 0 0 0 1.375.59375l6-3a1.0001 1.0001 0 0 0 .5625-1 1.0001 1.0001 0 0 0 0-.0937z">
                        </path>
                        <path d="m307 911.86127-6-3-.84375 2.5h-11.15625v1h11.15625l.84375 2.5z" fill="#e3a008"></path>
                      </g>
                    </g>
                  </svg>
                  <span>
                    {{ route.category === 'airport' && routeDirections[route.id] === 'to' ? route.from : route.to }}
                  </span>
                </h3>

                <div v-if="route.category === 'airport'" class="flex justify-start mt-2 mb-4">
                  <div class="inline-flex bg-white/10 rounded-lg p-1">
                    <button class="text-xs px-3 py-1 rounded-md transition-all duration-300"
                      :class="routeDirections[route.id] === 'to' ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-medium' : 'text-gray-300'"
                      @click="toggleDirection(route.id, 'to')">
                      To Airport
                    </button>
                    <button class="text-xs px-3 py-1 rounded-md transition-all duration-300"
                      :class="routeDirections[route.id] === 'from' ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-medium' : 'text-gray-300'"
                      @click="toggleDirection(route.id, 'from')">
                      From Airport
                    </button>
                  </div>
                </div>

                <!-- Vehicle options -->
                <div class="space-y-3">
                  <div v-for="vehicle in route.vehicles" :key="`${route.id}-${vehicle.type}`"
                    @click="selectVehicle(route, vehicle)"
                    class="flex justify-between items-center py-2 border-b border-white/10 last:border-0 cursor-pointer transition-all duration-300 px-2 rounded-lg"
                    :class="isVehicleSelected(route.id, vehicle.type) ?
                    'bg-yellow-400/20 border-yellow-400/30' :
                    'hover:bg-white/5'">
                    <div class="flex items-center">
                      <component :is="vehicleIcons[vehicle.type]" class="w-5 h-5 text-gray-400 mr-3"
                        :class="isVehicleSelected(route.id, vehicle.type) ? 'text-yellow-400' : ''" />
                      <div>
                        <div class="text-white text-sm"
                          :class="isVehicleSelected(route.id, vehicle.type) ? 'font-medium' : ''">{{
                          vehicleNames[vehicle.type] }}</div>
                        <div class="text-gray-400 text-xs">{{ vehicle.capacity }}</div>
                      </div>
                    </div>
                    <div class="text-lg font-bold"
                      :class="isVehicleSelected(route.id, vehicle.type) ? 'text-yellow-400' : 'text-yellow-400/80'">€{{
                      vehicle.price }}</div>
                  </div>
                </div>
              </div>

              <!-- Book now button -->
              <div class="p-5 pt-0">
                <a :href="getMailtoLink(route)"
                  class="w-full py-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-yellow-400/25 flex items-center justify-center group no-underline">
                  <span>Book Now</span>
                  <svg class="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
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
      </div>

      <!-- Custom request section -->
      <ClientOnly>
        <div class="mt-16 text-center p-8 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm" v-motion
          :initial="{ opacity: 0 }" :enter="{ opacity: 1, transition: { delay: 400, duration: 800 } }">
          <h3 class="text-xl md:text-2xl font-bold text-white mb-3">Need a Custom Route?</h3>
          <p class="text-gray-300 mb-6 max-w-2xl mx-auto">
            Don't see your desired route? We offer transfers to all destinations in Istria and beyond.
            Contact us for a personalized quote.
          </p>
          <a href="mailto:poseidon@gmail.com?subject=Custom%20Transfer%20Quote%20Request&body=Hello%2C%0A%0AI%27d%20like%20to%20request%20a%20quote%20for%20a%20custom%20transfer.%0A%0AHere%20are%20my%20details%3A%0AFrom%3A%20%0ATo%3A%20%0AName%3A%20%0ASurname%3A%20%0ADate%3A%20%0ATime%3A%20%0A%0ACould%20you%20please%20provide%20a%20quote%20for%20this%20journey%3F%0A%0AThank%20you!"
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
import { ref, computed, defineComponent, h } from 'vue';

// Vehicle icon components
const SedanIcon = defineComponent({
  render: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
    h('path', { d: 'M5 13l1.5-4.5h11L19 13m-1.5 5a1.5 1.5 0 0 1-1.5-1.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5c0 .83-.67 1.5-1.5 1.5m-11 0A1.5 1.5 0 0 1 5 16.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5c0 .83-.67 1.5-1.5 1.5M18.92 8c-.2-.58-.76-1-1.42-1h-11c-.66 0-1.22.42-1.42 1L3 14v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-6z' })
  ])
});

const MinibusIcon = defineComponent({
  render: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
    h('path', { d: 'M17 20c0 .55-.45 1-1 1s-1-.45-1-1h-4c0 .55-.45 1-1 1s-1-.45-1-1H6c-.55 0-1-.45-1-1v-1h13v1c0 .55-.45 1-1 1zM5 9V5c0-1.66 1.34-3 3-3h8c1.66 0 3 1.34 3 3v4h-2V5c0-.55-.45-1-1-1H8c-.55 0-1 .45-1 1v4H5zm5 1v4h4v-4h-4zm2 3c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm7-3v7H5v-7h2v4c0 .55.45 1 1 1h8c.55 0 1-.45 1-1v-4h2z' })
  ])
});

const LuxuryIcon = defineComponent({
  render: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
    h('path', { d: 'M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.08 3.11H5.77L6.85 7zM19 17H5v-5h14v5z' }),
    h('circle', { cx: '7.5', cy: '14.5', r: '1.5' }),
    h('circle', { cx: '16.5', cy: '14.5', r: '1.5' })
  ])
});

// Vehicle icons mapping
const vehicleIcons = {
  standard: SedanIcon,
  minibus: MinibusIcon,
  luxury: LuxuryIcon
};

// Vehicle type display names
const vehicleNames = {
  standard: 'Standard',
  minibus: 'Minibus',
  luxury: 'Luxury Vehicle'
};

// Category definitions
const categories = [
  { id: 'all', name: 'All Routes' },
  { id: 'airport', name: 'Airport Transfers' },
  { id: 'cities', name: 'Poseidon' },
];

// Active category state
const activeCategory = ref('all');

// Selected vehicles state
const selectedVehicles = ref({});

// Route data
const routes = [
  // Airport transfers
  {
    id: 1,
    category: 'airport',
    from: 'Pula Airport',
    to: 'Poreč',
    distance: '60 km',
    duration: '45 min',
    image: "https://airport-pula.hr/wp-content/uploads/2017/09/Untitled-2.jpg",
    vehicles: [
      { type: 'standard', name: 'Renault Trafic', capacity: 'Up to 8 passengers', price: 80 },
      { type: 'luxury', name: 'Mercedes V-Class', capacity: 'Up to 7 passengers', price: 120 },
      { type: 'minibus', name: 'Mercedes Sprinter', capacity: 'Up to 19 passengers', price: 200 }
    ]
  },
  {
    id: 2,
    category: 'airport',
    from: 'Trieste Airport',
    to: 'Poreč',
    distance: '92 km',
    duration: '1h 15min',
    image: "https://triesteairport.it/media/images/_TED4827.original.jpg",
    vehicles: [
      { type: 'standard', name: 'Renault Trafic', capacity: 'Up to 8 passengers', price: 170 },
      { type: 'luxury', name: 'Mercedes V-Class', capacity: 'Up to 7 passengers', price: 220 },
      { type: 'minibus', name: 'Mercedes Sprinter', capacity: 'Up to 19 passengers', price: 380 }
    ]
  },
  {
    id: 3,
    category: 'airport',
    from: 'Venice Airport',
    to: 'Poreč',
    distance: '210 km',
    duration: '2h 30min',
    image: "https://d2bgjx2gb489de.cloudfront.net/gbb-blogs/wp-content/uploads/2016/10/04123015/Venice-airport.jpg",
    vehicles: [
      { type: 'standard', name: 'Renault Trafic', capacity: 'Up to 8 passengers', price: 340 },
      { type: 'luxury', name: 'Mercedes V-Class', capacity: 'Up to 7 passengers', price: 440 },
      { type: 'minibus', name: 'Mercedes Sprinter', capacity: 'Up to 19 passengers', price: 600 }
    ]
  },
  {
    id: 4,
    category: 'airport',
    from: 'Ljubljana Airport',
    to: 'Poreč',
    distance: '190 km',
    duration: '2h 15min',
    image: "https://www.lju-airport.si/assets/News-photos/IRP_7805__ScaleMaxWidthWzEzNzBd.jpg",
    vehicles: [
      { type: 'standard', name: 'Renault Trafic', capacity: 'Up to 8 passengers', price: 330 },
      { type: 'luxury', name: 'Mercedes V-Class', capacity: 'Up to 7 passengers', price: 400 },
      { type: 'minibus', name: 'Mercedes Sprinter', capacity: 'Up to 19 passengers', price: 540 }
    ]
  },
  {
    id: 5,
    category: 'airport',
    from: 'Zagreb Airport',
    to: 'Poreč',
    distance: '250 km',
    duration: '3h',
    image: "https://www.zagreb-airport.hr/UserDocsImages//kategorije/from-to.jpg",
    vehicles: [
      { type: 'standard', name: 'Renault Trafic', capacity: 'Up to 8 passengers', price: 350 },
      { type: 'luxury', name: 'Mercedes V-Class', capacity: 'Up to 7 passengers', price: 450 },
      { type: 'minibus', name: 'Mercedes Sprinter', capacity: 'Up to 19 passengers', price: 740 }
    ]
  },
  {
    id: 6,
    category: 'airport',
    from: 'Krk Airport (Rijeka)',
    to: 'Poreč',
    distance: '120 km',
    duration: '1h 40min',
    image: "https://rijeka-airport.hr/img/aerodrom/aerodrom-rijeka-5-2.jpg",
    vehicles: [
      { type: 'standard', name: 'Renault Trafic', capacity: 'Up to 8 passengers', price: 165 },
      { type: 'luxury', name: 'Mercedes V-Class', capacity: 'Up to 7 passengers', price: 230 },
      { type: 'minibus', name: 'Mercedes Sprinter', capacity: 'Up to 19 passengers', price: 380 }
    ]
  },

  // Poseidon
  {
    id: 7,
    category: 'cities',
    from: 'Poreč',
    to: 'Rovinj',
    distance: '35 km',
    duration: '30 min',
    image: "https://www.rovinj-rovigno.hr/wp-content/uploads/2019/11/rovinjcroatia-1-1200x800.jpg",
    vehicles: [
      { type: 'standard', name: 'Renault Trafic', capacity: 'Up to 8 passengers', price: 65 },
      { type: 'luxury', name: 'Mercedes V-Class', capacity: 'Up to 7 passengers', price: 95 },
      { type: 'minibus', name: 'Mercedes Sprinter', capacity: 'Up to 19 passengers', price: 140 }
    ]
  },
  {
    id: 8,
    category: 'cities',
    from: 'Poreč',
    to: 'Pula',
    distance: '60 km',
    duration: '45 min',
    image: "https://www.visit-croatia.hr/photos/districts/thumbs/Pula-i-okolica-618bdc2611c82175679156_huge.jpg",
    vehicles: [
      { type: 'standard', name: 'Renault Trafic', capacity: 'Up to 8 passengers', price: 80 },
      { type: 'luxury', name: 'Mercedes V-Class', capacity: 'Up to 7 passengers', price: 120 },
      { type: 'minibus', name: 'Mercedes Sprinter', capacity: 'Up to 19 passengers', price: 200 }
    ]
  },
  {
    id: 9,
    category: 'cities',
    from: 'Poreč',
    to: 'Umag',
    distance: '30 km',
    duration: '25 min',
    image: "https://www.visit-croatia.hr/photos/districts/thumbs/Umag-Rivijera-618d45a3ed5f2434611082_huge.jpg",
    vehicles: [
      { type: 'standard', name: 'Renault Trafic', capacity: 'Up to 8 passengers', price: 60 },
      { type: 'luxury', name: 'Mercedes V-Class', capacity: 'Up to 7 passengers', price: 90 },
      { type: 'minibus', name: 'Mercedes Sprinter', capacity: 'Up to 19 passengers', price: 140 }
    ]
  },
  {
    id: 10,
    category: 'cities',
    from: 'Poreč',
    to: 'Motovun',
    distance: '35 km',
    duration: '35 min',
    image: "https://www.tz-motovun.hr/media/img/header/2022/01/1._Misty_Motovun_from_air_-_David_Matkovic%CC%81.jpg",
    vehicles: [
      { type: 'standard', name: 'Renault Trafic', capacity: 'Up to 8 passengers', price: 60 },
      { type: 'luxury', name: 'Mercedes V-Class', capacity: 'Up to 7 passengers', price: 95 },
      { type: 'minibus', name: 'Mercedes Sprinter', capacity: 'Up to 19 passengers', price: 140 }
    ]
  }
];

// Add this to the existing refs at the top of the script
const routeDirections = ref({});

// Initialize all airport routes to "to" direction by default
routes.forEach(route => {
  if (route.category === 'airport') {
    routeDirections.value[route.id] = 'to';
  }
});

// Add this function to toggle directions
const toggleDirection = (routeId, direction) => {
  routeDirections.value[routeId] = direction;

  // Reset any selected vehicle for this route when direction changes
  if (selectedVehicles.value[routeId]) {
    delete selectedVehicles.value[routeId];
  }
};

// Filtered routes based on active category
const filteredRoutes = computed(() => {
  if (activeCategory.value === 'all') {
    return routes;
  }
  return routes.filter(route => route.category === activeCategory.value);
});

// Function to select a vehicle
const selectVehicle = (route, vehicle) => {
  // Store the selection
  selectedVehicles.value[route.id] = {
    routeId: route.id,
    routeFrom: route.from,
    routeTo: route.to,
    vehicleType: vehicle.type,
    vehicleName: vehicleNames[vehicle.type],
    capacity: vehicle.capacity,
    price: vehicle.price,
    distance: route.distance,
    duration: route.duration
  };
};

// Function to check if a vehicle is selected
const isVehicleSelected = (routeId, vehicleType) => {
  return selectedVehicles.value[routeId] &&
    selectedVehicles.value[routeId].vehicleType === vehicleType;
};

// Function to generate mailto link
const getMailtoLink = (route) => {
  // Check if a vehicle is selected for this route
  const selectedVehicle = selectedVehicles.value[route.id];

  // Determine the correct from/to based on direction
  const from = route.category === 'airport' && routeDirections.value[route.id] === 'to' ? route.to : route.from;
  const to = route.category === 'airport' && routeDirections.value[route.id] === 'to' ? route.from : route.to;

  if (!selectedVehicle) {
    // Default email if no vehicle selected
    return `mailto:poseidon@gmail.com?subject=Transfer Inquiry: ${from} to ${to}&body=Hello,%0A%0AI'm interested in booking a transfer from ${from} to ${to}.%0A%0APlease provide more information.%0A%0AThank you.`;
  }

  // Update the subject and body to use the correct direction
  const subject = encodeURIComponent(`Transfer Booking: ${from} to ${to}`);
  const body = encodeURIComponent(
    `Hello,\n\n` +
    `I'd like to book a transfer from ${from} to ${to}.\n\n` +
    `Here are my details:\n` +
    `Name: \n` +
    `Surname: \n` +
    `Date: \n` +
    `Time: \n\n` +
    `I've selected the ${selectedVehicle.vehicleName} option (${selectedVehicle.capacity}).\n\n` +
    `Could you please confirm availability and let me know if you need any additional information?\n\n` +
    `Thank you!`
  );

  return `mailto:poseidon@gmail.com?subject=${subject}&body=${body}`;
};
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
</style>