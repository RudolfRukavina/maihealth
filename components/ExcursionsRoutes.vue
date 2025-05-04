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
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Popular Boat Excursions</h2>
          <div class="w-24 h-1 bg-gradient-to-r from-red-600 to-red-700 mx-auto"></div>
          <p class="mt-6 text-gray-300 max-w-2xl mx-auto">
            Discover the breathtaking Adriatic coastline with our premium boat excursions from Poreč.
            All prices include comfortable transportation, refreshments, and expert guidance.
          </p>
        </div>
      </ClientOnly>

      <!-- Mobile tabs for excursion categories -->
      <div class="md:hidden mb-8">
        <div class="flex overflow-x-auto pb-2 scrollbar-hide gap-2">
          <button v-for="(category, index) in categories" :key="category.id" @click="activeCategory = category.id"
            class="px-4 py-2 text-sm whitespace-nowrap rounded-lg transition-all duration-300" :class="activeCategory === category.id ?
              'bg-gradient-to-r from-red-600 to-red-700 text-white font-medium' :
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
              'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg' :
              'text-gray-300 hover:text-white'">
            {{ category.name }}
          </button>
        </div>
      </div>

      <!-- Excursion routes cards grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        <ClientOnly>
          <div v-for="(excursion, index) in filteredExcursions" :key="excursion.id" class="group relative" v-motion
            :initial="{ opacity: 0, y: 30 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 200 + (index * 100), duration: 600 } }">

            <!-- Card with hover effects -->
            <div class="h-full rounded-xl overflow-hidden backdrop-blur-sm transition-all duration-300
                     border border-white/10 bg-white/5 group-hover:bg-white/10 group-hover:border-white/20
                     group-hover:shadow-xl group-hover:shadow-red-500/5">

              <!-- Excursion image with overlay -->
              <div class="h-40 relative overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
                <img :src="excursion.image" :alt="excursion.name"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">

                <!-- Duration indicator -->
                <div
                  class="absolute bottom-3 left-3 z-10 flex items-center text-xs text-gray-300 bg-black/40 rounded-full px-3 py-1">
                  <svg class="w-3 h-3 mr-1 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clip-rule="evenodd"></path>
                  </svg>
                  {{ excursion.duration }}
                </div>

                <!-- Price indicator -->
                <div
                  class="absolute bottom-3 right-3 z-10 flex items-center text-xs font-bold text-white bg-red-600/80 rounded-full px-3 py-1">
                  From €{{ excursion.startPrice }}
                </div>
              </div>

              <!-- Content section -->
              <div class="p-5">
                <h3 class="text-xl font-bold text-white mb-2">{{ excursion.name }}</h3>
                <p class="text-gray-400 text-sm mb-4">{{ excursion.description }}</p>

                <div class="space-y-2 mb-4">
                  <div class="flex items-center text-gray-300 text-sm">
                    <svg class="w-4 h-4 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clip-rule="evenodd"></path>
                    </svg>
                    <span>{{ excursion.route }}</span>
                  </div>
                  <div class="flex items-center text-gray-300 text-sm">
                    <svg class="w-4 h-4 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z">
                      </path>
                    </svg>
                    <span>{{ excursion.suitability }}</span>
                  </div>
                </div>

                <!-- Highlights -->
                <div class="mb-4">
                  <h4 class="text-white font-medium mb-2">Highlights:</h4>
                  <ul class="space-y-1">
                    <li v-for="(highlight, hIndex) in excursion.highlights" :key="hIndex"
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

                <!-- Boat options -->
                <div class="space-y-3">
                  <div v-for="boat in excursion.boats" :key="`${excursion.id}-${boat.type}`"
                    @click="selectBoat(excursion, boat)"
                    class="flex justify-between items-center py-2 border-b border-white/10 last:border-0 cursor-pointer transition-all duration-300 px-2 rounded-lg"
                    :class="isBoatSelected(excursion.id, boat.type) ?
                      'bg-red-600/20 border-red-600/30' :
                      'hover:bg-white/5'">
                    <div class="flex items-center">
                      <component :is="boatIcons[boat.type]" class="w-5 h-5 text-gray-400 mr-3"
                        :class="isBoatSelected(excursion.id, boat.type) ? 'text-red-500' : ''" />
                      <div>
                        <div class="text-white text-sm"
                          :class="isBoatSelected(excursion.id, boat.type) ? 'font-medium' : ''">{{
                            boatNames[boat.type] }}</div>
                        <div class="text-gray-400 text-xs">{{ boat.capacity }}</div>
                      </div>
                    </div>
                    <div class="text-lg font-bold"
                      :class="isBoatSelected(excursion.id, boat.type) ? 'text-red-500' : 'text-red-500/80'">
                      €{{ boat.price }}</div>
                  </div>
                </div>
              </div>

              <!-- Book now button -->
              <div class="p-5 pt-0">
                <a :href="getMailtoLink(excursion)"
                  class="w-full py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-red-500/25 flex items-center justify-center group no-underline">
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
          <h3 class="text-xl md:text-2xl font-bold text-white mb-3">Need a Private Boat Charter?</h3>
          <p class="text-gray-300 mb-6 max-w-2xl mx-auto">
            Looking for a more exclusive experience? We offer private boat charters tailored to your preferences.
            Contact us to create your perfect day on the Adriatic.
          </p>
          <a href="mailto:info@poseidon.hr?subject=Private%20Boat%20Charter%20Request&body=Hello%2C%0A%0AI%27d%20like%20to%20inquire%20about%20a%20private%20boat%20charter.%0A%0AHere%20are%20my%20details%3A%0APreferred%20date(s)%3A%20%0ANumber%20of%20people%3A%20%0ADestinations%20of%20interest%3A%20%0ASpecial%20requests%3A%20%0A%0ACould%20you%20please%20provide%20options%20and%20pricing%20for%20this%20private%20charter%3F%0A%0AThank%20you!"
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
import { ref, computed, defineComponent, h } from 'vue';

// Updated categories for filtering excursions
const categories = [
  { id: 'all', name: 'All Excursions' },
  { id: 'scenic', name: 'Scenic Cruises' },
  { id: 'adventure', name: 'Dolphin Adventures' },
  { id: 'destinations', name: 'Destinations' }
];

// Active category for filtering
const activeCategory = ref('all');

// Selected boats map (excursionId -> boatType)
const selectedBoats = ref({});

// Boat icon components
const StandardIcon = defineComponent({
  render: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
    h('path', { d: 'M3,13.5L2,13L11,4L21.5,13.5L20.5,14L19,12.8V20H5V12.8L3,13.5M10,20H14V15H10V20M19,9.13V7H16V4H14V6.1L11,3.5L5,8.5V10.25L11,5L19,11.5V9.13H19Z' })
  ])
});

const SpeedIcon = defineComponent({
  render: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
    h('path', { d: 'M3 18C3.26 13.79 5.94 10.27 9.88 9.13C10.21 9 10.55 9.04 10.84 9.19C11.13 9.34 11.36 9.59 11.5 9.88C11.56 10.04 11.6 10.19 11.6 10.35C11.17 10.55 10.77 10.84 10.43 11.18C10.05 11.56 9.76 12.03 9.58 12.56C9.39 13.09 9.31 13.65 9.34 14.22C9.35 15.23 9.8 16.19 10.57 16.88C11.35 17.57 12.37 17.89 13.39 17.77C14.37 17.66 15.43 17.23 16.15 16.53C16.83 15.83 17.28 14.96 17.45 14L21.56 16.89C21.76 17.08 21.99 17.28 22.1 17.53C22.22 17.8 22.24 18.09 22.16 18.38C20.75 18.83 19.25 19.17 17.68 19.39C16.07 19.62 14.43 19.72 12.8 19.7C11.18 19.68 9.55 19.53 7.96 19.26C6.38 18.99 4.86 18.61 3.41 18.08C3.28 18.03 3.14 17.97 3 17.91V18Z' })
  ])
});

const LuxuryIcon = defineComponent({
  render: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
    h('path', { d: 'M21,13.5V18H19.5V13.5C19.5,11.84 17.16,10.5 15.5,10.5V18H14V10.5C12.32,10.5 10,11.84 10,13.5V14.5H3V8.25C3,8.25 3,8 3.25,8H4.12L6.12,5.25C6.12,5.25 6.38,5 6.62,5H17.5C17.75,5 18,5.25 18,5.25L20,8H20.75C21,8 21,8.25 21,8.25V10.5C21,10.5 21,10.75 20.75,10.75H19.5C20.5,11.5 21,12.5 21,13.5M5,10.5H8V12H5V10.5Z' })
  ])
});

// Boat icons mapping
const boatIcons = {
  Standard: StandardIcon,
  Speedboat: SpeedIcon,
  Luxury: LuxuryIcon
};

// Boat names mapping
const boatNames = {
  Standard: 'Traditional Wooden Boat',
  Speedboat: 'Speed Boat',
  Luxury: 'Luxury Yacht'
};

// Updated excursion data with boat excursions from Poreč
const excursions = [
  {
    id: 'rovinj-lim',
    name: 'Rovinj & Lim Fjord Cruise',
    categories: ['scenic', 'destinations'],
    image: 'https://www.venezialines.com/wp-content/uploads/2021/01/01-ISTRA-Rt-Kamenjak-DJI_0184-Pano_ACR-aleksandar-gospic.jpg',
    duration: 'Full day (7-8 hours)',
    route: 'Poreč → Lim Fjord → Rovinj → Vrsar → Poreč',
    startPrice: 46,
    suitability: 'All ages, great for families',
    description: 'Discover the breathtaking Istrian coastline on this full-day wooden boat cruise to the romantic old town of Rovinj and the stunning Lim Fjord.',
    highlights: [
      'Free time to explore the charming Rovinj old town',
      'Cruise through the impressive Lim Fjord',
      'Visit to the Pirate Cave',
      'Swimming break in crystal clear waters',
      'On-board lunch with drinks included'
    ],
    boats: [
      { type: 'Standard', capacity: 'Up to 40 passengers', price: 46 },
      { type: 'Speedboat', capacity: 'Up to 12 passengers', price: 85 },
      { type: 'Luxury', capacity: 'Up to 10 passengers', price: 130 }
    ]
  },
  {
    id: 'dolphin-sunset',
    name: 'Dolphin Watching & Sunset Cruise',
    categories: ['adventure', 'scenic'],
    image: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/10/61/37/73.jpg',
    duration: '2-3 hours (Evening)',
    route: 'Poreč → Vrsar coast → Lim Channel area → Poreč',
    startPrice: 35,
    suitability: 'All ages, wildlife enthusiasts',
    description: 'Experience the magical Adriatic sunset while searching for dolphins in their natural habitat on this unforgettable evening cruise.',
    highlights: [
      'Professional guidance to find wild dolphins',
      'Breathtaking sunset views over the Adriatic',
      'Complimentary drinks on board',
      'Small group experience',
      'Educational commentary about marine life'
    ],
    boats: [
      { type: 'Standard', capacity: 'Up to 40 passengers', price: 35 },
      { type: 'Speedboat', capacity: 'Up to 12 passengers', price: 63 },
      { type: 'Luxury', capacity: 'Up to 10 passengers', price: 120 }
    ]
  },
  {
    id: 'panoramic-coastal',
    name: 'Panoramic Coastal Cruise',
    categories: ['scenic'],
    image: 'https://www.otiumyachts.com/img/db/news-media/41dc0780b2983a21b18f4c341d4969d7.png',
    duration: '2 hours',
    route: 'Poreč → St. Nicholas Island → Coastal islets → Poreč',
    startPrice: 24,
    suitability: 'All ages, perfect for photography',
    description: 'Enjoy a relaxing short cruise along the picturesque Poreč coastline with stunning views of the historic city, St. Nicholas Island, and numerous small islets.',
    highlights: [
      'Beautiful panoramic views of Poreč',
      'Cruise around St. Nicholas Island',
      'Journey through 20 picturesque islets',
      'Complimentary welcome drink and refreshments',
      'Perfect for stunning photos'
    ],
    boats: [
      { type: 'Standard', capacity: 'Up to 40 passengers', price: 24 },
      { type: 'Speedboat', capacity: 'Up to 12 passengers', price: 45 },
      { type: 'Luxury', capacity: 'Up to 10 passengers', price: 80 }
    ]
  },
  {
    id: 'fish-picnic',
    name: 'Traditional Fish Picnic Cruise',
    categories: ['scenic', 'destinations'],
    image: 'https://lp-cms-production.imgix.net/2019-06/fceaf2deb10be426656b6b5915dd2565-bled-island.jpg',
    duration: 'Full day (6-7 hours)',
    route: 'Poreč → Vrsar → Swimming spots → Poreč',
    startPrice: 55,
    suitability: 'All ages, food enthusiasts',
    description: 'Combine sightseeing with culinary delights on this traditional fish picnic cruise along the beautiful Istrian coastline.',
    highlights: [
      'Visit to the charming town of Vrsar',
      'Swimming and snorkeling in secluded bays',
      'Freshly prepared fish lunch on board',
      'Unlimited drinks (wine, juice, water)',
      'Relaxed atmosphere with beautiful scenery'
    ],
    boats: [
      { type: 'Standard', capacity: 'Up to 40 passengers', price: 55 },
      { type: 'Luxury', capacity: 'Up to 10 passengers', price: 120 }
    ]
  },
  {
    id: 'evening-romantic',
    name: 'Evening Romantic Cruise',
    categories: ['scenic'],
    image: 'https://np-plitvicka-jezera.hr/wp-content/uploads/2023/09/S-view-2-1.jpg',
    duration: '2-3 hours (Evening)',
    route: 'Poreč → Coastal cruise → Sunset viewing → Poreč',
    startPrice: 39,
    suitability: 'Adults, couples, romantic experience',
    description: 'Create unforgettable memories with your loved one on this romantic evening cruise along the stunning Istrian coastline as the sun sets over the Adriatic.',
    highlights: [
      'Breathtaking sunset views',
      'Complimentary glass of champagne',
      'Romantic music',
      'Light refreshments included',
      'Intimate atmosphere'
    ],
    boats: [
      { type: 'Standard', capacity: 'Up to 40 passengers', price: 39 },
      { type: 'Luxury', capacity: 'Up to 10 passengers', price: 95 }
    ]
  },
  {
    id: 'private-yacht',
    name: 'Private Yacht Experience',
    categories: ['adventure', 'destinations'],
    image: 'https://www.campinginparks.eu/attachment/thumbnail/5c582663081be/pp-ucka-stipesurac.jpg',
    duration: 'Flexible (4-8 hours)',
    route: 'Customizable itinerary',
    startPrice: 450,
    suitability: 'All ages, luxury experience seekers',
    description: 'Indulge in the ultimate Adriatic experience with a private yacht charter, allowing you to design your perfect day on the water with a professional skipper.',
    highlights: [
      'Fully customizable itinerary',
      'Professional skipper',
      'Access to secluded beaches and coves',
      'Premium refreshments included',
      'Water sports equipment available'
    ],
    boats: [
      { type: 'Luxury', capacity: 'Up to 10 passengers', price: 450 }
    ]
  }
];

// Filtered excursions based on active category
const filteredExcursions = computed(() => {
  if (activeCategory.value === 'all') {
    return excursions;
  }
  return excursions.filter(excursion => excursion.categories.includes(activeCategory.value));
});

// Check if boat is selected
const isBoatSelected = (excursionId, boatType) => {
  return selectedBoats.value[excursionId] === boatType;
};

// Select boat for an excursion
const selectBoat = (excursion, boat) => {
  selectedBoats.value[excursion.id] = boat.type;
};

// Generate mailto link for booking
const getMailtoLink = (excursion) => {
  const selectedBoat = selectedBoats.value[excursion.id]
    ? excursion.boats.find(b => b.type === selectedBoats.value[excursion.id])
    : excursion.boats[0];

  const subject = encodeURIComponent(`Boat Excursion Booking: ${excursion.name}`);
  const boatInfo = selectedBoat
    ? `${boatNames[selectedBoat.type]} (${selectedBoat.capacity}, €${selectedBoat.price})`
    : 'Not specified';

  const body = encodeURIComponent(
    `Hello,\n\n` +
    `I'd like to book the ${excursion.name} boat excursion.\n\n` +
    `Here are my details:\n` +
    `Name: \n` +
    `Phone Number: \n` +
    `Preferred Date: \n` +
    `Number of passengers: \n\n` +
    `I've selected the ${boatInfo} option.\n\n` +
    `Could you please confirm availability and let me know if you need any additional information?\n\n` +
    `Thank you!`
  );

  return `mailto:info@poseidon.hr?subject=${subject}&body=${body}`;
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