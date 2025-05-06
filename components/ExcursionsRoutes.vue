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
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Premium Boat Experiences</h2>
          <div class="w-24 h-1 bg-gradient-to-r from-red-600 to-red-700 mx-auto"></div>
          <p class="mt-6 text-gray-300 max-w-2xl mx-auto">
            Discover the breathtaking Adriatic coastline with Poseidon's premium boat excursions from Poreč.
            We offer convenient hotel pickups, taxi services, and unforgettable adventures along Croatia's stunning
            shores.
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
                  From €{{ excursion.price }}
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
                <div class="mb-6">
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

                <!-- Poseidon Boat info -->
                <div class="border-t border-white/10 pt-4 pb-2">
                  <div class="flex justify-between items-center">
                    <div class="flex items-center">
                      <svg class="w-5 h-5 text-red-500 mr-3" fill="currentColor" version="1.1" id="Layer_1"
                        xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 511.998 511.998" xml:space="preserve">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                          <g>
                            <g>
                              <path
                                d="M510.652,230.062c-1.357-2.116-3.567-3.524-6.05-3.857l-128-17.067c-4.617-0.606-8.96,2.662-9.591,7.33 c-0.631,4.668,2.662,8.969,7.33,9.591l18.193,2.423v21.675l-42.667-4.574v-42.47l15.633-23.45c1.707-2.56,1.903-5.837,0.521-8.576 c-1.391-2.748-4.147-4.54-7.219-4.685l-179.2-8.533c-2.876-0.026-5.666,1.212-7.347,3.567l-42.667,59.733 c-0.171,0.239-0.205,0.529-0.35,0.777L9.438,209.113c-2.423-0.256-4.813,0.521-6.613,2.133C1.033,212.868,0,215.172,0,217.595 c0,75.281,88.047,136.533,196.267,136.533h273.067c3.746,0,7.057-2.441,8.158-6.025l34.133-110.933 C512.358,234.773,512,232.17,510.652,230.062z M409.6,251.728v-20.975l34.133,4.548v20.335l-34.185-3.661 C409.549,251.891,409.6,251.814,409.6,251.728z M264.047,178.982l78.899,3.755l-8.713,13.056c-0.93,1.399-1.434,3.055-1.434,4.736 v43.23l-76.834-8.235L264.047,178.982z M183.441,175.142l63.479,3.021l-7.902,55.287c-0.009,0.085,0.026,0.171,0.017,0.256 l-90.505-9.694L183.441,175.142z M463.027,337.062H196.267c-75.418,0-140.015-31.258-166.417-75.332l441.267,49.033 L463.027,337.062z M476.228,294.165L21.564,243.647c-1.809-5.385-3.26-10.863-3.925-16.486l463.915,49.698L476.228,294.165z M486.665,260.245l-25.865-2.773V237.58l31.548,4.207L486.665,260.245z">
                              </path>
                            </g>
                          </g>
                        </g>
                      </svg>
                      <div>
                        <div class="text-white text-sm font-medium">Poseidon Boat</div>
                        <div class="text-gray-400 text-xs">Premium experience with skipper</div>
                      </div>
                    </div>
                    <div class="text-lg font-bold text-red-500">€{{ excursion.price }}</div>
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

      <!-- Services section -->
      <ClientOnly>
        <div class="mt-16 text-center p-8 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm" v-motion
          :initial="{ opacity: 0 }" :enter="{ opacity: 1, transition: { delay: 400, duration: 800 } }">
          <h3 class="text-xl md:text-2xl font-bold text-white mb-3">Need a Private Boat Charter?</h3>
          <p class="text-gray-300 mb-6 max-w-2xl mx-auto">
            Looking for a more exclusive experience? We offer private boat charters tailored to your preferences.
            Contact us to create your perfect day on the Adriatic.
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
import { ref, computed, defineComponent, h } from 'vue';

// Updated categories for filtering excursions
const categories = [
  { id: 'all', name: 'All Experiences' },
  { id: 'scenic', name: 'Scenic Cruises' },
  { id: 'adventure', name: 'Dolphin & Water Sports' },
  { id: 'hidden', name: 'Hidden Gems' },
];

// Active category for filtering
const activeCategory = ref('all');

// Updated excursion data with boat excursions from Poreč
const excursions = [
  {
    id: 'rovinj-lim',
    name: 'Rovinj & Lim Fjord Cruise',
    categories: ['scenic', 'hidden'],
    image: 'https://www.venezialines.com/wp-content/uploads/2021/01/01-ISTRA-Rt-Kamenjak-DJI_0184-Pano_ACR-aleksandar-gospic.jpg',
    duration: 'Full day (7-8 hours)',
    route: 'Poreč → Lim Fjord → Rovinj → Vrsar → Poreč',
    price: 55,
    suitability: 'All ages, great for families',
    description: 'Discover the breathtaking Istrian coastline on this full-day cruise to the romantic old town of Rovinj and the stunning Lim Fjord. Hotel pickup available.',
    highlights: [
      'Free time to explore the charming Rovinj old town',
      'Cruise through the impressive Lim Fjord natural reserve',
      'Visit to the hidden Pirate Cave only accessible by boat',
      'Swimming break in crystal clear waters',
      'On-board lunch with drinks included',
      'Hotel pickup service available'
    ]
  },
  {
    id: 'dolphin-sunset',
    name: 'Dolphin Watching & Sunset Cruise',
    categories: ['adventure', 'scenic'],
    image: 'https://wallpapers.com/images/hd/dolphin-sunset-1xvw43odgmraecu1.jpg',
    duration: '2-3 hours (Evening)',
    route: 'Poreč → Vrsar coast → Lim Channel area → Poreč',
    price: 45,
    suitability: 'All ages, wildlife enthusiasts',
    description: 'Experience the magical Adriatic sunset while searching for dolphins in their natural habitat on this unforgettable evening cruise with expert guidance.',
    highlights: [
      'Professional guidance to find wild dolphins in their natural habitat',
      'Breathtaking sunset views over the Adriatic',
      'Complimentary drinks and light snacks on board',
      'Small group experience for personalized attention',
      'Educational commentary about marine life and conservation',
      'Convenient hotel pickup and return service'
    ]
  },
  {
    id: 'hidden-gems',
    name: 'Hidden Coves & Secret Beaches',
    categories: ['hidden', 'adventure'],
    image: 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/0b/a7/ff/90.jpg',
    duration: '5-6 hours',
    route: 'Poreč → Hidden coves → Secluded beaches → Poreč',
    price: 65,
    suitability: 'All ages, adventure seekers',
    description: 'Explore Croatia best kept secrets with our exclusive excursion to hidden coves and pristine beaches that are only accessible by boat.',
highlights: [
  'Visit to secluded beaches away from tourist crowds',
  'Swimming and snorkeling in crystal clear waters',
  'Explore hidden caves and coves along the coast',
  'Snorkeling equipment provided free of charge',
  'Delicious picnic lunch with local specialties',
  'Personalized experience with knowledgeable local skipper'
]
  },
{
  id: 'island-hopping',
    name: 'Island Hopping Adventure',
      categories: ['adventure', 'hidden'],
  image: 'https://alwayscroatia.com/wp-content/uploads/2023/02/shutterstock_1006048579-1-scaled.jpg',
          duration: 'Full day (7-8 hours)',
            route: 'Poreč → Sv. Nikola → Coastal islets → Poreč',
              price: 70,
                suitability: 'All ages, nature lovers',
                  description: 'Jump from island to island around the stunning Poreč archipelago, discovering hidden treasures and enjoying swimming stops at the most beautiful locations.',
                    highlights: [
                      'Visit to St. Nicholas Island with its beautiful pine forests',
                      'Explore multiple small islands and islets in one day',
                      'Several swimming and snorkeling stops in pristine waters',
                      'Fresh seafood lunch served on board',
                      'Water donut rides for the adventurous',
                      'Visit to a hidden lighthouse with panoramic views'
                    ]
},
];

// Filtered excursions based on active category
const filteredExcursions = computed(() => {
  if (activeCategory.value === 'all') {
    return excursions;
  }
  return excursions.filter(excursion => excursion.categories.includes(activeCategory.value));
});

// Generate mailto link for booking
const getMailtoLink = (excursion) => {
  const subject = encodeURIComponent(`Boat Excursion Booking: ${excursion.name}`);

  const body = encodeURIComponent(
    `Hello,\n\n` +
    `I'd like to book the ${excursion.name} boat excursion with Poseidon.\n\n` +
    `Here are my details:\n` +
    `Name: \n` +
    `Phone Number: \n` +
    `Preferred Date: \n` +
    `Number of passengers: \n` +
    `Accommodation/Pickup Location: \n\n` +
    `Total price: €${excursion.price} per person\n\n` +
    `Could you please confirm availability and let me know if you need any additional information?\n\n` +
    `Thank you!`
  );

  return `mailto:poseidon@gmail.hr?subject=${subject}&body=${body}`;
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