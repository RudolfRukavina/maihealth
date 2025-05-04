<template>
  <div>
    <!-- Trigger button -->
    <button @click="isModalOpen = true" class="z-50 fixed w-full bottom-0 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium
        transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-red-500/25
        flex items-center justify-center">
      <span>Recommended: 1h Panorama Ride</span>
      <svg class="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd"
          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
          clip-rule="evenodd"></path>
      </svg>
    </button>

    <!-- Modal Popup -->
    <transition name="modal">
      <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center w-full">
        <!-- Backdrop with blur effect -->
        <div class="absolute inset-0 bg-black bg-opacity-80 backdrop-blur-sm" @click="closeModal"></div>

        <!-- Modal Content -->
        <div
          class="bg-gray-900 rounded-xl overflow-hidden relative z-10 w-full max-w-md mx-4 animate-modal-in border border-white/10">
          <!-- Close button -->
          <button @click="closeModal" class="absolute top-3 right-3 text-black/90 hover:text-black z-20">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Panorama Image -->
          <div class="relative h-48 overflow-hidden">
            <img :src="panoramaRide.image" :alt="panoramaRide.name" class="w-full h-full object-cover">
            <div class="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
            <div class="absolute bottom-0 left-0 right-0 p-4">
              <h3 class="text-2xl font-bold text-white">{{ panoramaRide.name }}</h3>
            </div>
          </div>

          <!-- Content Section -->
          <div class="p-5">
            <!-- Price and Duration -->
            <div class="flex justify-between items-center mb-4">
              <div class="flex items-center bg-red-600/20 rounded-lg px-3 py-1.5">
                <svg class="w-4 h-4 mr-1 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clip-rule="evenodd"></path>
                </svg>
                <span class="text-gray-200 text-sm">{{ panoramaRide.duration }}</span>
              </div>
              <div class="text-2xl font-bold text-red-500">€{{ panoramaRide.price }}</div>
            </div>

            <!-- Description -->
            <p class="text-gray-300 text-sm mb-4">{{ panoramaRide.description }}</p>

            <!-- Highlights -->
            <div class="mb-4">
              <h4 class="text-white font-medium mb-2">Experience includes:</h4>
              <ul class="space-y-1">
                <li v-for="(highlight, index) in panoramaRide.highlights" :key="index"
                  class="text-gray-300 text-sm flex items-start">
                  <svg class="w-4 h-4 mr-2 text-red-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"></path>
                  </svg>
                  <span>{{ highlight }}</span>
                </li>
              </ul>
            </div>

            <!-- Departure info -->
            <div class="bg-white/5 border border-white/10 rounded-lg p-3 mb-5">
              <div class="flex items-start">
                <svg class="w-5 h-5 text-red-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clip-rule="evenodd"></path>
                </svg>
                <div>
                  <div class="text-white text-sm font-medium">Departure Point</div>
                  <div class="text-gray-300 text-sm">{{ panoramaRide.departurePoint }}</div>
                </div>
              </div>
            </div>

            <!-- Boat info -->
            <div class="border-t border-white/10 pt-4 pb-4">
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
            </div>

            <!-- Book now button -->
            <a :href="getMailtoLink()"
              class="w-full py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-red-500/25 flex items-center justify-center no-underline">
              <span>Reserve Now</span>
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
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Modal state
const isModalOpen = ref(false);

// Panorama ride details
const panoramaRide = {
  name: " Panorama Boat Ride",
  image: "https://images.sembo.travel/ImageService/ImageHandler.ashx?service=sembo&nameOfImage=176996.jpg&resizeMode=FitOutside&width=2200&height=815&formatSettings=jpeg(quality-90)", // Update with actual image path
  duration: "1 hour",
  price: 30,
  departurePoint: "Poreč Main Harbor, near the lighthouse",
  description: "Experience the beauty of Poreč's coastline with our  panorama boat ride. Enjoy stunning views of the old town, coastal landmarks, and crystal clear waters of the Adriatic.",
  highlights: [
    "Scenic coastal cruise with photo opportunities",
    "View of Poreč's historic center from the sea",
    "Professional skipper with local knowledge",
    "Complimentary welcome drink",
    "Maximum 12 passengers for a comfortable experience"
  ]
};

// Methods
const closeModal = () => {
  isModalOpen.value = false;
};

// Generate mailto link for booking
const getMailtoLink = () => {
  const subject = encodeURIComponent(`Booking:  Panorama Boat Ride`);

  const body = encodeURIComponent(
    `Hello,\n\n` +
    `I'd like to book the  Panorama Boat Ride with Taxi Boat Poseidon.\n\n` +
    `Here are my details:\n` +
    `Name: \n` +
    `Phone Number: \n` +
    `Preferred Date: \n` +
    `Preferred Time: \n` +
    `Number of passengers: \n` +
    `Accommodation/Pickup Location: \n\n` +
    `Total price: €${panoramaRide.price} per person\n\n` +
    `Could you please confirm availability and let me know if you need any additional information?\n\n` +
    `Thank you!`
  );

  return `mailto:poseidon@gmail.hr?subject=${subject}&body=${body}`;
};
</script>

<style scoped>
/* Modal Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.animate-modal-in {
  animation: modalIn 0.3s ease forwards;
}

@keyframes modalIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Button Hover Effects */
.button-primary {
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.button-primary::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 5px;
  height: 5px;
  background: rgba(255, 255, 255, 0.5);
  opacity: 0;
  border-radius: 100%;
  transform: scale(1, 1) translate(-50%);
  transform-origin: 50% 50%;
}

.button-primary:hover::after {
  animation: ripple 1s ease-out;
}

@keyframes ripple {
  0% {
    transform: scale(0, 0);
    opacity: 0.5;
  }

  100% {
    transform: scale(20, 20);
    opacity: 0;
  }
}
</style>