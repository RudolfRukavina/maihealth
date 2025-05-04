<template>
  <div class="bg-white rounded-xl shadow-xl overflow-hidden">
    <!-- Widget Header -->
    <div class="bg-black px-6 py-4">
      <h3 class="text-xl font-bold text-white">Quick <span class="text-yellow-400">Booking</span></h3>
      <p class="text-gray-400 text-sm">Reserve your premium ride in seconds</p>
    </div>

    <!-- Booking Form -->
    <div class="p-6">
      <form @submit.prevent="submitBooking">
        <!-- Location Fields -->
        <div class="space-y-4 mb-6">
          <!-- Pickup Location -->
          <div>
            <label for="pickup" class="block text-sm font-medium text-gray-700 mb-1">Pickup Location</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clip-rule="evenodd" />
                </svg>
              </div>
              <input id="pickup" v-model="booking.pickup" type="text" placeholder="Enter pickup address"
                class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                required />
            </div>
          </div>

          <!-- Destination -->
          <div>
            <label for="destination" class="block text-sm font-medium text-gray-700 mb-1">Destination</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clip-rule="evenodd" />
                </svg>
              </div>
              <input id="destination" v-model="booking.destination" type="text" placeholder="Enter destination address"
                class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                required />
            </div>
          </div>
        </div>

        <!-- Date & Time -->
        <div class="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label for="date" class="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input id="date" v-model="booking.date" type="date"
              class="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
              :min="today" required />
          </div>

          <div>
            <label for="time" class="block text-sm font-medium text-gray-700 mb-1">Time</label>
            <input id="time" v-model="booking.time" type="time"
              class="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
              required />
          </div>
        </div>

        <!-- Service Type -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
          <div class="grid grid-cols-3 gap-2">
            <div v-for="(service, index) in serviceTypes" :key="index" @click="booking.serviceType = service.value"
              class="cursor-pointer p-3 rounded-lg border transition-colors duration-200 flex flex-col items-center justify-center text-center"
              :class="booking.serviceType === service.value ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200 hover:border-gray-300'">
              <svg class="h-6 w-6 mb-1"
                :class="booking.serviceType === service.value ? 'text-yellow-500' : 'text-gray-500'" fill="currentColor"
                viewBox="0 0 20 20">
                <path :d="service.icon" />
              </svg>
              <span class="text-xs font-medium">{{ service.label }}</span>
            </div>
          </div>
        </div>

        <!-- Contact Info -->
        <div class="space-y-4 mb-6">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
            <input id="name" v-model="booking.name" type="text" placeholder="Full name"
              class="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
              required />
          </div>

          <div>
            <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input id="phone" v-model="booking.phone" type="tel" placeholder="Your contact number"
              class="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
              required />
          </div>
        </div>

        <!-- Submit Button -->
        <button type="submit"
          class="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center">
          <span>Book Your Ride</span>
          <svg class="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>

        <!-- Secure Booking Note -->
        <p class="text-xs text-gray-500 text-center mt-4 flex items-center justify-center">
          <svg class="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clip-rule="evenodd" />
          </svg>
          Secure booking · No credit card required
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// Get today's date in YYYY-MM-DD format for min date attribute
const today = computed(() => {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
});

// Service type options
const serviceTypes = [
  {
    label: 'Standard',
    value: 'standard',
    icon: 'M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 005 10a1 1 0 10-2 0 7.986 7.986 0 003.46 6.596A5 5 0 0010 15a5 5 0 004.546-2.084A5.986 5.986 0 0015 10a1 1 0 10-2 0 3.986 3.986 0 01-1.5 3.078A3 3 0 0110 13z'
  },
  {
    label: 'Business',
    value: 'business',
    icon: 'M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z'
  },
  {
    label: 'Luxury',
    value: 'luxury',
    icon: 'M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z'
  }
];

// Booking form data
const booking = ref({
  pickup: '',
  destination: '',
  date: '',
  time: '',
  serviceType: 'business', // Default selection
  name: '',
  phone: ''
});

// Submit handler
const submitBooking = () => {
  console.log('Booking submitted:', booking.value);
  // Here you would typically send this data to your backend
  // For now, we'll just show an alert
  alert('Thank you! Your booking has been received. We will contact you shortly to confirm.');

  // Reset the form
  booking.value = {
    pickup: '',
    destination: '',
    date: '',
    time: '',
    serviceType: 'business',
    name: '',
    phone: ''
  };
};
</script>

<style scoped>
/* Focus styles for better accessibility */
input:focus,
button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(234, 179, 8, 0.2);
}

/* Hover effect for service type selection */
.service-type:hover {
  transform: translateY(-2px);
}
</style>