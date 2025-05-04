<template>
  <section class="py-0 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden" id='eventsRoutes'>
    <!-- Background elements -->
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(253,224,71,0.05)_0%,transparent_60%)]">
    </div>
    <div class="absolute inset-0 bg-noise opacity-[0.02] mix-blend-overlay pointer-events-none"></div>

    <!-- Subtle particles -->
    <ClientOnly>
      <div class="absolute inset-0 z-0">
        <div v-for="i in 20" :key="`particle-event-${i}`" class="particle absolute rounded-full" :class="{
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
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Popular Event Transfers</h2>
          <div class="w-24 h-1 bg-gradient-to-r from-yellow-400 to-amber-500 mx-auto"></div>
          <p class="mt-6 text-gray-300 max-w-2xl mx-auto">
            Arrive in style at Poreč's most popular events with our premium transportation services.
            All services include professional chauffeur, luxury vehicle, and VIP treatment.
          </p>
        </div>
      </ClientOnly>

      <!-- Mobile tabs for event categories -->
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

      <!-- Event routes cards grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        <ClientOnly>
          <div v-for="(event, index) in filteredEvents" :key="event.id" class="group relative" v-motion
            :initial="{ opacity: 0, y: 30 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 200 + (index * 100), duration: 600 } }">

            <!-- Card with hover effects -->
            <div class="h-full rounded-xl overflow-hidden backdrop-blur-sm transition-all duration-300
                     border border-white/10 bg-white/5 group-hover:bg-white/10 group-hover:border-white/20
                     group-hover:shadow-xl group-hover:shadow-amber-500/5">

              <!-- Event image with overlay -->
              <div class="h-40 relative overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
                <img :src="event.image" :alt="event.name"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">

                <!-- Category indicator -->
                <div
                  class="absolute top-3 left-3 z-10 flex items-center text-xs text-gray-300 bg-black/60 rounded-full px-3 py-1">
                  <svg class="w-3 h-3 mr-1 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clip-rule="evenodd"></path>
                  </svg>
                  {{ event.category === 'concerts' ? 'Concert' : event.category === 'festivals' ? 'Festival' :
                    'Corporate'
                  }}
                </div>

                <!-- Date indicator -->
                <div
                  class="absolute bottom-3 left-3 z-10 flex items-center text-xs text-gray-300 bg-black/40 rounded-full px-3 py-1">
                  <svg class="w-3 h-3 mr-1 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clip-rule="evenodd"></path>
                  </svg>
                  {{ event.date }}
                </div>

                <!-- Location indicator -->
                <div
                  class="absolute bottom-3 right-3 z-10 flex items-center text-xs text-gray-300 bg-black/40 rounded-full px-3 py-1">
                  <svg class="w-3 h-3 mr-1 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clip-rule="evenodd"></path>
                  </svg>
                  {{ event.location }}
                </div>
              </div>

              <!-- Content section -->
              <div class="p-5">
                <h3 class="text-xl font-bold text-white mb-2">{{ event.name }}</h3>
                <p class="text-gray-400 text-sm mb-4">{{ event.description }}</p>

                <!-- Vehicle options -->
                <div class="space-y-3">
                  <div v-for="service in event.services" :key="`${event.id}-${service.type}`"
                    @click="selectService(event, service)"
                    class="flex justify-between items-center py-2 border-b border-white/10 last:border-0 cursor-pointer transition-all duration-300 px-2 rounded-lg"
                    :class="isServiceSelected(event.id, service.type) ?
                      'bg-yellow-400/20 border-yellow-400/30' :
                      'hover:bg-white/5'">
                    <div class="flex items-center">
                      <component :is="serviceIcons[service.type]" class="w-5 h-5 text-gray-400 mr-3"
                        :class="isServiceSelected(event.id, service.type) ? 'text-yellow-400' : ''" />
                      <div>
                        <div class="text-white text-sm"
                          :class="isServiceSelected(event.id, service.type) ? 'font-medium' : ''">{{
                            serviceNames[service.type] }}</div>
                        <div class="text-gray-400 text-xs">{{ service.capacity }}</div>
                      </div>
                    </div>
                    <div class="text-sm font-medium"
                      :class="isServiceSelected(event.id, service.type) ? 'text-yellow-400' : 'text-yellow-400/80'">
                      Price on request
                    </div>
                  </div>
                </div>
              </div>

              <!-- Book now button -->
              <div class="p-5 pt-0">
                <a :href="getMailtoLink(event)"
                  class="w-full py-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-yellow-400/25 flex items-center justify-center group no-underline">
                  <span>Request Quote</span>
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
          <h3 class="text-xl md:text-2xl font-bold text-white mb-3">Planning a Private Event?</h3>
          <p class="text-gray-300 mb-6 max-w-2xl mx-auto">
            Need transportation for your wedding, corporate event, or special occasion?
            Our team can arrange custom event transportation solutions for any group size.
          </p>
          <a href="mailto:poseidon@gmail.com?subject=Custom%20Event%20Transportation%20Request&body=Hello%2C%0A%0AI%27d%20like%20to%20request%20a%20quote%20for%20event%20transportation.%0A%0AHere%20are%20my%20details%3A%0AEvent%20Type%3A%20%0AEvent%20Location%3A%20%0ADate%3A%20%0ATime%3A%20%0ANumber%20of%20Guests%3A%20%0APickup%20Location%3A%20%0A%0AAdditional%20Requirements%3A%0A%0AThank%20you!"
            class="px-8 py-4 bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/15 hover:border-white/30 text-white font-medium rounded-lg transition-all duration-300 flex items-center justify-center mx-auto no-underline">
            <span>Request Custom Event Quote</span>
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
    h('path', { d: 'M5 13l1.5-4.5h11L19 13m-1.5 5a1.5 1.5 0 0 1-1.5-1.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5c0 .83-.67 1.5-1.5 1.5m-11 0A1.5 1.5 0 0 1 5 16.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5c0 .83-.67 1.5-1.5 1.5M18.92 8c-.2-.58-.76-1-1.42-1h-11c-.66 0-1.22.42-1.42 1L3 14v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-6z' })
  ])
});

const PremiumIcon = defineComponent({
  render: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
    h('path', { d: 'M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.08 3.11H5.77L6.85 7zM19 17H5v-5h14v5z' }),
    h('circle', { cx: '7.5', cy: '14.5', r: '1.5' }),
    h('circle', { cx: '16.5', cy: '14.5', r: '1.5' })
  ])
});

const GroupIcon = defineComponent({
  render: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
    h('path', { d: 'M17 20c0 .55-.45 1-1 1s-1-.45-1-1h-4c0 .55-.45 1-1 1s-1-.45-1-1H6c-.55 0-1-.45-1-1v-1h13v1c0 .55-.45 1-1 1zM5 9V5c0-1.66 1.34-3 3-3h8c1.66 0 3 1.34 3 3v4h-2V5c0-.55-.45-1-1-1H8c-.55 0-1 .45-1 1v4H5zm5 1v4h4v-4h-4zm2 3c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm7-3v7H5v-7h2v4c0 .55.45 1 1 1h8c.55 0 1-.45 1-1v-4h2z' })
  ])
});

// Service icons mapping
const serviceIcons = {
  standard: StandardIcon,
  premium: PremiumIcon,
  group: GroupIcon
};

// Service type display names
const serviceNames = {
  standard: 'Standard',
  premium: 'Luxury',
  group: 'Minibus'
};

// Category definitions
const categories = [
  { id: 'all', name: 'All Events' },
  { id: 'concerts', name: 'Concerts' },
  { id: 'festivals', name: 'Festivals' },
  { id: 'sports', name: 'Sports' },
];

// Active category state
const activeCategory = ref('all');

// Selected services state
const selectedServices = ref({});

// Events data
const events = [
  // Festivals
  {
    id: 1,
    category: 'festivals',
    name: 'Sea Star Festival',
    description: 'Major music festival held at the Stella Maris resort in Umag, featuring international and regional electronic, pop and rock artists.',
    location: 'Stella Maris Resort, Umag',
    date: 'May 22-25',
    image: "https://cdn.entr.io/cdn-cgi/image/width=1200/images/events/campaigns/organizer_uploads/194/19443_marketing_banner_1522x682_1719224536.png?v=1720507531?",
    services: [
      { type: 'standard', capacity: 'Up to 8 passengers' },
      { type: 'premium', capacity: 'Up to 7 passengers' },
      { type: 'group', capacity: 'Up to 19 passengers' }
    ]
  },
  {
    id: 2,
    category: 'festivals',
    name: 'Zrće Beach Parties',
    description: 'World-famous beach parties and club events at Zrće Beach in Novalja on the island of Pag.',
    location: 'Zrće, Novalja, Island of Pag',
    date: 'June - September',
    image: "https://zrce.eu/wp-content/uploads/2018/10/Was_Ist_Zrce_06.jpg",
    services: [
      { type: 'standard', capacity: 'Up to 8 passengers' },
      { type: 'premium', capacity: 'Up to 7 passengers' },
      { type: 'group', capacity: 'Up to 19 passengers' }
    ]
  },
  {
    id: 3,
    category: 'festivals',
    name: 'INmusic Festival',
    description: 'Croatia\'s biggest international open-air festival, featuring major global rock and alternative acts.',
    location: 'Lake Jarun, Zagreb',
    date: 'June 23-25',
    image: "https://www.jambase.com/wp-content/uploads/2025/01/inmusic-2025-featured-1480x832.jpg",
    services: [
      { type: 'standard', capacity: 'Up to 8 passengers' },
      { type: 'premium', capacity: 'Up to 7 passengers' },
      { type: 'group', capacity: 'Up to 19 passengers' }
    ]
  },

  // Concerts
  {
    id: 4,
    category: 'concerts',
    name: 'Zagreb Arena Concerts',
    description: 'Major international artists performing at Zagreb\'s largest indoor venue.',
    location: 'Arena Zagreb',
    date: 'Various dates throughout 2025',
    image: "https://www.meetinzagreb.hr/documents/ArenaZagreb-Colic_koncert.jpg",
    services: [
      { type: 'standard', capacity: 'Up to 8 passengers' },
      { type: 'premium', capacity: 'Up to 7 passengers' },
      { type: 'group', capacity: 'Up to 19 passengers' }
    ]
  },
  {
    id: 6,
    category: 'concerts',
    name: 'Pula Arena Concerts',
    description: 'Spectacular concert series in the ancient Roman amphitheater in Pula.',
    location: 'Pula Arena',
    date: 'July - August 2025',
    image: "https://www.pula.hr/media/uploads/posts/posts/images/Dino_Merlin_Arena_Pula_foto_Adria_Summer_Festival_2023_11.jpg",
    services: [
      { type: 'standard', capacity: 'Up to 8 passengers' },
      { type: 'premium', capacity: 'Up to 7 passengers' },
      { type: 'group', capacity: 'Up to 19 passengers' }
    ]
  },

  // Additional Regional Events
  {
    id: 7,
    category: 'festivals',
    name: 'Ultra Europe',
    description: 'Massive electronic music festival featuring the world\'s top DJs and producers.',
    location: 'Park Mladeži, Split',
    date: 'July 11-13, 2025',
    image: "https://production-bookitbee-app.s3.amazonaws.com/media/sharing/ro2wicqa_X7RFI67.png",
    services: [
      { type: 'standard', capacity: 'Up to 8 passengers' },
      { type: 'premium', capacity: 'Up to 7 passengers' },
      { type: 'group', capacity: 'Up to 19 passengers' }
    ]
  },
  {
    id: 8,
    category: 'festivals',
    name: 'Outlook Origins Festival',
    description: 'Underground bass music and sound system culture festival in Tisno.',
    location: 'The Garden Resort, Tisno',
    date: 'July 24-28',
    image: "https://cdn.entr.io/images/events/213/21357_poster_900x1200.png?v=1730127712",
    services: [
      { type: 'standard', capacity: 'Up to 8 passengers' },
      { type: 'premium', capacity: 'Up to 7 passengers' },
      { type: 'group', capacity: 'Up to 19 passengers' }
    ]
  },
  {
    id: 9,
    category: 'sports',
    name: 'Formula 1 Italian Grand Prix',
    description: 'Experience the thrill of Formula 1 at the historic Monza circuit. Our transfer services make it easy to travel from Croatia to this iconic racing event.',
    location: 'Autodromo Nazionale Monza, Italy',
    date: 'September 5-7',
    image: "https://www.cassidytravel.ie/images/2504",
    services: [
      { type: 'standard', capacity: 'Up to 8 passengers' },
      { type: 'premium', capacity: 'Up to 7 passengers' },
      { type: 'group', capacity: 'Up to 19 passengers' }
    ]
  }
];

// Filtered events based on active category
const filteredEvents = computed(() => {
  if (activeCategory.value === 'all') {
    return events;
  }
  return events.filter(event => event.category === activeCategory.value);
});

// Function to select a service
const selectService = (event, service) => {
  // Store the selection
  selectedServices.value[event.id] = {
    eventId: event.id,
    eventName: event.name,
    eventLocation: event.location,
    eventDate: event.date,
    serviceType: service.type,
    serviceName: serviceNames[service.type],
    capacity: service.capacity
  };
};

// Function to check if a service is selected
const isServiceSelected = (eventId, serviceType) => {
  return selectedServices.value[eventId] &&
    selectedServices.value[eventId].serviceType === serviceType;
};

// Function to generate mailto link
const getMailtoLink = (event) => {
  // Check if a service is selected for this event
  const selectedService = selectedServices.value[event.id];

  if (!selectedService) {
    // Default email if no service selected
    return `mailto:poseidon@gmail.com?subject=Event Transfer Inquiry: ${event.name}&body=Hello,%0A%0AI'm interested in booking transportation for the ${event.name} event at ${event.location} on ${event.date}.%0A%0APlease provide pricing information for available services.%0A%0AThank you.`;
  }

  // Custom email with selected service details
  const subject = encodeURIComponent(`Event Transfer Quote Request: ${event.name}`);
  const body = encodeURIComponent(
    `Hello,\n\n` +
    `I'd like to request a quote for transportation to the ${event.name} event at ${event.location} on ${event.date}.\n\n` +
    `Here are my details:\n` +
    `Name: \n` +
    `Surname: \n` +
    `Number of passengers: \n` +
    `Pickup location: \n` +
    `Pickup time: \n\n` +
    `I'm interested in the ${selectedService.serviceName} option (${selectedService.capacity}).\n\n` +
    `Do you also provide return transfers after the event? If so, please include this in your quote.\n\n` +
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