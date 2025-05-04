<template>
  <section class="py-0 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden" id='bicycleRoutes'>
    <!-- Background elements -->
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(74,222,128,0.05)_0%,transparent_60%)]">
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
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Popular Cycling Routes</h2>
          <div class="w-24 h-1 bg-gradient-to-r from-green-400 to-emerald-500 mx-auto"></div>
          <p class="mt-6 text-gray-300 max-w-2xl mx-auto">
            Explore Istria's most scenic cycling paths with our bicycle transport services.
            All prices include secure bicycle transport and insurance.
          </p>
        </div>
      </ClientOnly>

      <!-- Mobile tabs for route categories -->
      <div class="md:hidden mb-8">
        <div class="flex overflow-x-auto pb-2 scrollbar-hide gap-2">
          <button v-for="(category, index) in categories" :key="category.id" @click="activeCategory = category.id"
            class="px-4 py-2 text-sm whitespace-nowrap rounded-lg transition-all duration-300" :class="activeCategory === category.id ?
              'bg-gradient-to-r from-green-400 to-emerald-500 text-black font-medium' :
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
              'bg-gradient-to-r from-green-400 to-emerald-500 text-black shadow-lg' :
              'text-gray-300 hover:text-white'">
            {{ category.name }}
          </button>
        </div>
      </div>

      <!-- Bicycle routes cards grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        <ClientOnly>
          <div v-for="(route, index) in filteredRoutes" :key="route.id" class="group relative" v-motion
            :initial="{ opacity: 0, y: 30 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 200 + (index * 100), duration: 600 } }">

            <!-- Card with hover effects -->
            <div class="h-full rounded-xl overflow-hidden backdrop-blur-sm transition-all duration-300
                     border border-white/10 bg-white/5 group-hover:bg-white/10 group-hover:border-white/20
                     group-hover:shadow-xl group-hover:shadow-green-500/5">

              <!-- Route image with overlay -->
              <div class="h-40 relative overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
                <img :src="route.image" :alt="route.name"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">

                <!-- Distance indicator -->
                <div
                  class="absolute bottom-3 left-3 z-10 flex items-center text-xs text-gray-300 bg-black/40 rounded-full px-3 py-1">
                  <svg class="w-3 h-3 mr-1 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clip-rule="evenodd"></path>
                  </svg>
                  {{ route.distance }}
                </div>

                <!-- Difficulty indicator -->
                <div
                  class="absolute bottom-3 right-3 z-10 flex items-center text-xs text-gray-300 bg-black/40 rounded-full px-3 py-1">
                  <svg class="w-3 h-3 mr-1 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                      clip-rule="evenodd"></path>
                  </svg>
                  {{ route.difficulty }}
                </div>
              </div>

              <!-- Content section -->
              <div class="p-5">
                <h3 class="text-xl font-bold text-white mb-2 flex items-center">
                  {{ route.name }}
                </h3>

                <p class="text-gray-400 text-sm mb-4">{{ route.description }}</p>

                <!-- Service options -->
                <div class="space-y-3">
                  <div v-for="service in route.services" :key="`${route.id}-${service.type}`"
                    @click="selectService(route, service)"
                    class="flex justify-between items-center py-2 border-b border-white/10 last:border-0 cursor-pointer transition-all duration-300 px-2 rounded-lg"
                    :class="isServiceSelected(route.id, service.type) ?
                      'bg-green-400/20 border-green-400/30' :
                      'hover:bg-white/5'">
                    <div class="flex items-center">
                      <component :is="serviceIcons[service.type]" class="w-5 h-5 text-gray-400 mr-3"
                        :class="isServiceSelected(route.id, service.type) ? 'text-green-400' : ''" />
                      <div>
                        <div class="text-white text-sm"
                          :class="isServiceSelected(route.id, service.type) ? 'font-medium' : ''">{{
                            serviceNames[service.type] }}</div>
                        <div class="text-gray-400 text-xs">{{ service.bikes }}</div>
                      </div>
                    </div>
                    <div class="text-lg font-bold"
                      :class="isServiceSelected(route.id, service.type) ? 'text-green-400' : 'text-green-400/80'">€{{
                        service.price }}</div>
                  </div>
                </div>
              </div>

              <!-- Book now button -->
              <div class="p-5 pt-0">
                <a :href="getMailtoLink(route)"
                  class="w-full py-3 bg-gradient-to-r from-green-400 to-emerald-500 text-black font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-green-400/25 flex items-center justify-center group no-underline">
                  <span>Book Transport</span>
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
          <h3 class="text-xl md:text-2xl font-bold text-white mb-3">Need a Custom Cycling Plan?</h3>
          <p class="text-gray-300 mb-6 max-w-2xl mx-auto">
            Planning a unique cycling adventure? We offer bicycle transport services for custom routes throughout
            Istria.
            Contact us for a personalized quote and expert advice.
          </p>
          <a href="mailto:info@bicycleheroe.hr?subject=Custom%20Bike%20Transport%20Request&body=Hello%2C%0A%0AI%27d%20like%20to%20request%20a%20quote%20for%20bicycle%20transport.%0A%0AHere%20are%20my%20details%3A%0AStart%20location%3A%20%0AEnd%20location%3A%20%0AName%3A%20%0ASurname%3A%20%0ADate%3A%20%0ATime%3A%20%0ANumber%20of%20bicycles%3A%20%0A%0ACould%20you%20please%20provide%20a%20quote%20for%20this%20service%3F%0A%0AThank%20you!"
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

// Service icon components
const StandardIcon = defineComponent({
  render: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
    h('path', { d: 'M19 7h-.82l-1.7-4.54A2 2 0 0 0 14.6 1H12v2h2.6l1.38 3.67h-8.36L9 5.6V3H7v2.6L5.6 9H5c-1.11 0-2 .89-2 2v10a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1h12v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V11c0-1.11-.89-2-2-2M8 13.5a1.5 1.5 0 1 1 .001-3.001A1.5 1.5 0 0 1 8 13.5m8 0a1.5 1.5 0 1 1 .001-3.001A1.5 1.5 0 0 1 16 13.5M19 11H5V9h14' })
  ])
});

const PremiumIcon = defineComponent({
  render: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
    h('path', { d: 'M19 11h-8v2h8v-2m-8-6h8v2h-8V5m-2 12v-2H5v2h4M9 9V7H5v2h4m10-6H5c-1.11 0-2 .89-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.11-.9-2-2-2z' })
  ])
});

const BicycleIcon = defineComponent({
  render: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
    h('path', { d: 'M5,20.5A3.5,3.5 0 0,1 1.5,17A3.5,3.5 0 0,1 5,13.5A3.5,3.5 0 0,1 8.5,17A3.5,3.5 0 0,1 5,20.5M5,12A5,5 0 0,0 0,17A5,5 0 0,0 5,22A5,5 0 0,0 10,17A5,5 0 0,0 5,12M14.8,10H19V8.2H15.8L13.8,4.8C13.5,4.3 12.8,4 12,4C11.2,4 10.5,4.3 10.2,4.8L8,8H5V10H8.2L11,12.8V20H13V11.5L10.2,8.2L11.7,6.3C11.8,6.2 11.9,6.2 12,6.2C12.1,6.2 12.2,6.2 12.3,6.3L14.8,10M19,20.5A3.5,3.5 0 0,1 15.5,17A3.5,3.5 0 0,1 19,13.5A3.5,3.5 0 0,1 22.5,17A3.5,3.5 0 0,1 19,20.5M19,12A5,5 0 0,0 14,17A5,5 0 0,0 19,22A5,5 0 0,0 24,17A5,5 0 0,0 19,12Z' })
  ])
});

const ExpertIcon = defineComponent({
  render: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
    h('path', { d: 'M12,5.5A3.5,3.5 0 0,1 15.5,9A3.5,3.5 0 0,1 12,12.5A3.5,3.5 0 0,1 8.5,9A3.5,3.5 0 0,1 12,5.5M5,8C5.56,8 6.08,8.15 6.53,8.42C6.38,9.85 6.8,11.27 7.66,12.38C7.16,13.34 6.16,14 5,14A3,3 0 0,1 2,11A3,3 0 0,1 5,8M19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14C17.84,14 16.84,13.34 16.34,12.38C17.2,11.27 17.62,9.85 17.47,8.42C17.92,8.15 18.44,8 19,8M5.5,18.25C5.5,16.18 8.41,14.5 12,14.5C15.59,14.5 18.5,16.18 18.5,18.25V20H5.5V18.25M0,20V18.5C0,17.11 1.89,15.94 4.45,15.6C3.86,16.28 3.5,17.22 3.5,18.25V20H0M24,20H20.5V18.25C20.5,17.22 20.14,16.28 19.55,15.6C22.11,15.94 24,17.11 24,18.5V20Z' })
  ])
});

// Service icons mapping
const serviceIcons = {
  standard: BicycleIcon,
  expert: ExpertIcon
};

// Service type display names
const serviceNames = {
  standard: 'Standard Transfer',
  expert: 'Group of 8'
};

// Category definitions
const categories = [
  { id: 'all', name: 'All Routes' },
  { id: 'scenic', name: 'Scenic Routes' },
  { id: 'mountain', name: 'Mountain Trails' },
  { id: 'coastal', name: 'Coastal Routes' }
];

// Active category state
const activeCategory = ref('all');

// Selected services state
const selectedServices = ref({});

// Route data - Removed returnPrice from services
const routes = [
  // Scenic routes
  {
    id: 1,
    category: 'scenic',
    name: 'Parenzana Trail',
    description: 'Historical railway route with panoramic views',
    distance: '78 km',
    difficulty: 'Moderate',
    image: "https://www.parenzana.net/uploads/imgcache/slide-main/slides/1579941526.jpg",
    services: [
      { type: 'standard', bikes: '+ Transport for up to 3 bicycles', price: 55 },
      { type: 'expert', bikes: '+ Transport for up to 8 bicycles', price: 100 }
    ]
  },
  {
    id: 2,
    category: 'scenic',
    name: 'Poreč to Rovinj',
    description: 'Coastal ride with stunning sea views',
    distance: '35 km',
    difficulty: 'Easy',
    image: "https://media.bikemap.net/geonames/3191518/header_image/thumbs/6c704b4a-4166-407a-9e74-b42b1c5da722.jpeg.1600x1200_q80_crop.jpg",
    services: [
      { type: 'standard', bikes: '+ Transport for up to 3 bicycles', price: 75 },
      { type: 'expert', bikes: '+ Transport for up to 8 bicycles', price: 120 }
    ]
  },
  {
    id: 3,
    category: 'scenic',
    name: 'Istrian Wine Road',
    description: 'Cycling through vineyards and olive groves',
    distance: '60 km',
    difficulty: 'Moderate',
    image: "https://shop.visitizola.com/cdn/shop/files/S_kolesom_po_vinski_poti_slovenske_Istre_1.jpg?v=1718899162&width=1946",
    services: [
      { type: 'standard', bikes: '+ Transport for up to 3 bicycles', price: 80 },
      { type: 'expert', bikes: '+ Transport for up to 8 bicycles', price: 140 }
    ]
  },

  // Mountain trails
  {
    id: 4,
    category: 'mountain',
    name: 'Učka Mountain Trail',
    description: 'Challenging climbs with rewarding views',
    distance: '45 km',
    difficulty: 'Hard',
    image: "https://www.pp-ucka.hr/2020/wp-content/uploads/pp_ucka_outdoor_biciklizam_naslovna.jpg",
    services: [
      { type: 'standard', bikes: '+ Transport for up to 3 bicycles', price: 130 },
      { type: 'expert', bikes: '+ Transport for up to 8 bicycles', price: 200 }
    ]
  },

  // Coastal routes
  {
    id: 7,
    category: 'coastal',
    name: 'Cape Kamenjak',
    description: 'Ride along crystal clear bays and beaches',
    distance: '25 km',
    difficulty: 'Easy',
    image: "https://jistra.com/wp-content/uploads/2019/03/e-bike-rental.jpg",
    services: [
      { type: 'standard', bikes: '+ Transport for up to 3 bicycles', price: 110 },
      { type: 'expert', bikes: '+ Transport for up to 8 bicycles', price: 150 }
    ]
  },
];

// Filtered routes based on active category
const filteredRoutes = computed(() => {
  if (activeCategory.value === 'all') {
    return routes;
  }
  return routes.filter(route => route.category === activeCategory.value);
});

// Function to select a service
const selectService = (route, service) => {
  // Store the selection
  selectedServices.value[route.id] = {
    routeId: route.id,
    routeName: route.name,
    serviceType: service.type,
    serviceName: serviceNames[service.type],
    bikes: service.bikes,
    price: service.price,
    distance: route.distance,
    difficulty: route.difficulty
  };
};

// Function to check if a service is selected
const isServiceSelected = (routeId, serviceType) => {
  return selectedServices.value[routeId] &&
    selectedServices.value[routeId].serviceType === serviceType;
};

// Function to generate mailto link
const getMailtoLink = (route) => {
  // Check if a service is selected for this route
  const selectedService = selectedServices.value[route.id];

  if (!selectedService) {
    // Default email if no service selected
    return `mailto:info@bicycleheroe.hr?subject=Bicycle Transport: ${route.name}&body=Hello,%0A%0AI'm interested in booking a bicycle transport for the ${route.name} route.%0A%0APlease provide more information.%0A%0AThank you.`;
  }

  // Create subject and body with selected service
  const subject = encodeURIComponent(`Bicycle Transport Booking: ${route.name}`);
  const body = encodeURIComponent(
    `Hello,\n\n` +
    `I'd like to book a bicycle transport for the ${route.name} route.\n\n` +
    `Here are my details:\n` +
    `Pickup location: \n` +
    `Date: \n` +
    `Time: \n` +
    `Name: \n` +
    `Surname: \n` +
    `Phone number: \n\n` +
    `I've selected the ${selectedService.serviceName} option (${selectedService.bikes}).\n\n` +
    `Could you please confirm availability and let me know if you need any additional information?\n\n` +
    `Thank you!`
  );

  return `mailto:info@bicycleheroe.hr?subject=${subject}&body=${body}`;
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
</style>