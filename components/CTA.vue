<template>
  <section id="cta" class="relative py-20 overflow-hidden">
    <!-- Background with wave pattern and overlay -->
    <div class="absolute inset-0 bg-gradient-to-b from-black to-gray-900">
      <div class="absolute inset-0 bg-red-600 opacity-5 pattern-waves"></div>
      <div class="absolute inset-0 bg-gradient-to-b"></div>
    </div>

    <!-- Content container -->
    <div class="container mx-auto px-4 relative z-10">
      <div class="flex flex-col lg:flex-row items-center justify-between">

        <!-- Left side: Boat illustration -->
        <div class="lg:w-2/5 mb-10 lg:mb-0 transform transition-all duration-700 hover:scale-105">
          <div class="relative">
            <div class="absolute -top-6 -left-6 w-24 h-24 bg-red-600 rounded-full opacity-20 animate-pulse"></div>
            <div class="absolute -bottom-4 -right-4 w-16 h-16 bg-red-600 rounded-full opacity-15 animate-pulse"
              style="animation-delay: 1s;"></div>
            <div class="relative z-10 boat-image">
              <svg class="w-full h-auto" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                <!-- Water base -->
                <path d="M0 350 L512 350 L512 450 C512 450 400 420 256 420 C112 420 0 450 0 450 L0 350 Z" fill="#2D82B7" />
                <path d="M0 350 L512 350 L512 380 C512 380 400 360 256 360 C112 360 0 380 0 380 L0 350 Z" fill="#3498DB" />

                <!-- Boat hull -->
                <path d="M128 350 L384 350 C384 350 368 320 320 300 L192 300 C144 320 128 350 128 350 Z" fill="#E74C3C" />
                <path d="M192 300 L320 300 L320 250 L192 250 L192 300 Z" fill="#E74C3C" />

                <!-- Boat deck -->
                <path d="M200 250 L312 250 L312 240 C312 230 302 220 292 220 L220 220 C210 220 200 230 200 240 L200 250 Z" fill="#ECF0F1" />

                <!-- Cabin -->
                <path d="M220 220 L292 220 L292 180 L220 180 L220 220 Z" fill="#3498DB" />
                <path d="M200 180 L312 180 L312 170 C312 160 302 150 292 150 L220 150 C210 150 200 160 200 170 L200 180 Z" fill="#ECF0F1" />

                <!-- Windows -->
                <rect x="230" y="190" width="20" height="20" rx="5" fill="#D6EAF8" />
                <rect x="262" y="190" width="20" height="20" rx="5" fill="#D6EAF8" />

                <!-- Trident/flag -->
                <path d="M256 150 L256 100" stroke="#F1C40F" stroke-width="4" />
                <path d="M256 100 L246 110 L256 105 L266 110 L256 100" fill="#F1C40F" />
                <path d="M246 120 L266 120" stroke="#F1C40F" stroke-width="2" />

                <!-- Trident top -->
                <path d="M256 100 L256 70" stroke="#F1C40F" stroke-width="4" />
                <path d="M246 70 L246 85" stroke="#F1C40F" stroke-width="4" />
                <path d="M266 70 L266 85" stroke="#F1C40F" stroke-width="4" />
                <path d="M236 70 L236 80" stroke="#F1C40F" stroke-width="4" />
                <path d="M276 70 L276 80" stroke="#F1C40F" stroke-width="4" />

                <!-- Water ripples -->
                <path d="M50 370 Q75 360 100 370 Q125 380 150 370" stroke="#5DADE2" stroke-width="2" fill="none" />
                <path d="M350 370 Q375 360 400 370 Q425 380 450 370" stroke="#5DADE2" stroke-width="2" fill="none" />
                <path d="M100 390 Q125 380 150 390 Q175 400 200 390" stroke="#5DADE2" stroke-width="2" fill="none" />
                <path d="M300 390 Q325 380 350 390 Q375 400 400 390" stroke="#5DADE2" stroke-width="2" fill="none" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Right side: CTA content -->
        <div class="lg:w-1/2 text-center lg:text-left">
          <h2 class="text-4xl lg:text-5xl font-bold mb-6 text-white leading-tight">
            Have any more <span class="text-red-500">questions?</span>
          </h2>
          <p class="text-gray-300 text-lg mb-8 max-w-lg mx-auto lg:mx-0">We pride ourselves on offering top-notch
            water taxi service. Feel free to reach out with any questions, and we'll ensure your journey across the water is
            smooth and enjoyable.
          </p>
          <!-- CTA button -->
          <div class="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
            <a href='tel:+385921696002'
              class="px-8 py-4 border-2 border-red-500 text-white font-bold rounded-lg transition-all duration-300 hover:bg-red-500 hover:text-white hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 group">
              <span class="flex items-center justify-center">
                <span>Call us now</span>
              </span>
            </a>
          </div>

          <!-- Trust signals -->
          <div class="mt-10 flex flex-wrap justify-center lg:justify-start items-center gap-4">
            <div class="flex items-center">
              <div class="p-2 bg-gray-800 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <span class="ml-2 text-gray-300 text-sm">Secure Booking</span>
            </div>
            <div class="flex items-center">
              <div class="p-2 bg-gray-800 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span class="ml-2 text-gray-300 text-sm">24/7 Service</span>
            </div>
            <div class="flex items-center">
              <div class="p-2 bg-gray-800 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span class="ml-2 text-gray-300 text-sm">Reliability</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Animated floating elements -->
    <div class="absolute -bottom-10 -left-10 w-64 h-64 bg-red-600 rounded-full opacity-5 blur-3xl"></div>
    <div class="absolute top-20 -right-20 w-80 h-80 bg-red-600 rounded-full opacity-5 blur-3xl"></div>
  </section>
</template>

<script setup>
const { scrollTo } = useScrollTo();

function scrollToBooking() {
  const bookingElement = document.getElementById('booking');
  if (bookingElement) {
    bookingElement.scrollIntoView({ behavior: 'smooth' });
  }
}

function openDownloadModal() {
  // You can implement modal/download logic here
  alert('App download coming soon!');
}
</script>

<style scoped>
.pattern-waves {
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.184 20c.357-.13.72-.264 1.088-.402l1.768-.661C33.64 15.347 39.647 14 50 14c10.271 0 15.362 1.222 24.629 4.928.955.383 1.869.74 2.75 1.072h6.225c-2.51-.73-5.139-1.691-8.233-2.928C65.888 13.278 60.562 12 50 12c-10.626 0-16.855 1.397-26.66 5.063l-1.767.662c-2.475.923-4.66 1.674-6.724 2.275h6.335zm0-20C13.258 2.892 8.077 4 0 4V2c5.744 0 9.951-.574 14.85-2h6.334zM77.38 0C85.239 2.966 90.502 4 100 4V2c-6.842 0-11.386-.542-16.396-2h-6.225zM0 14c8.44 0 13.718-1.21 22.272-4.402l1.768-.661C33.64 5.347 39.647 4 50 4c10.271 0 15.362 1.222 24.629 4.928C84.112 12.722 89.438 14 100 14v-2c-10.271 0-15.362-1.222-24.629-4.928C65.888 3.278 60.562 2 50 2 39.374 2 33.145 3.397 23.34 7.063l-1.767.662C13.223 10.84 8.163 12 0 12v2z' fill='%233498DB' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.boat-image {
  animation: float 6s ease-in-out infinite;
}
</style>