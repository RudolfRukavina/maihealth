<template>
  <section id="cta" class="relative py-20 overflow-hidden">
    <!-- Background with diagonal pattern and overlay -->
    <div class="absolute inset-0 bg-gradient-to-b from-black to-gray-900">
      <div class="absolute inset-0 bg-red-600 opacity-5 pattern-diagonal"></div>
      <div class="absolute inset-0 bg-gradient-to-b"></div>
    </div>

    <!-- Content container -->
    <div class="container mx-auto px-4 relative z-10">
      <div class="flex flex-col lg:flex-row items-center justify-between">

        <!-- Left side: Taxi illustration -->
        <div class="lg:w-2/5 mb-10 lg:mb-0 transform transition-all duration-700 hover:scale-105">
          <div class="relative">
            <div class="absolute -top-6 -left-6 w-24 h-24 bg-red-600 rounded-full opacity-20 animate-pulse"></div>
            <div class="absolute -bottom-4 -right-4 w-16 h-16 bg-red-600 rounded-full opacity-15 animate-pulse"
              style="animation-delay: 1s;"></div>
            <div class="relative z-10 taxi-image">
              <svg class='w-full h-auto' version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512.002 512.002" xml:space="preserve"
                fill="#000000">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <circle style="fill:#B97850;" cx="256.001" cy="256" r="256"></circle>
                  <path style="fill:#935635;"
                    d="M376.288,482.02C457.036,438.955,512.001,353.902,512.001,256c0-4.53-0.121-9.032-0.353-13.503 L361.08,91.929L197.207,224.444l-40.932,20.618l43.844,43.844l-4.894,2.808l43.761,43.761l0,0L376.288,482.02z">
                  </path>
                  <path style="fill:#E6F3FF;"
                    d="M420.848,369.778h-16.803c-18.923,0-34.264-15.341-34.264-34.264V204.933 c0-18.923,15.341-34.264,34.264-34.264h16.803c18.923,0,34.264,15.341,34.264,34.264v130.581 C455.114,354.437,439.773,369.778,420.848,369.778z">
                  </path>
                  <path style="fill:#CFDBE6;"
                    d="M420.848,170.667h-10.269v199.111h10.269c18.923,0,34.264-15.341,34.264-34.264V204.933 C455.114,186.008,439.773,170.667,420.848,170.667z">
                  </path>
                  <path style="fill:#FED8B2;"
                    d="M281.091,319.538v-27.822h-50.176v27.822c0,2.22-1.8,4.02-4.02,4.02h-34.576v96.011h127.371v-96.011 h-34.576C282.89,323.558,281.091,321.758,281.091,319.538z">
                  </path>
                  <path style="fill:#EABE96;"
                    d="M319.687,323.558h-34.576c-2.22,0-4.02-1.8-4.02-4.02v-27.822h-25.662v127.853h64.26v-96.011H319.687 z">
                  </path>
                  <path style="fill:#324A5E;"
                    d="M211.407,323.558H184.71c-32.153,0-58.218,26.065-58.218,58.218v95.075 c37.841,22.238,81.894,35.035,128.934,35.138V354.256C232.209,354.138,211.407,346.815,211.407,323.558z">
                  </path>
                  <path style="fill:#2B3B4E;"
                    d="M323.018,323.558h-26.696c0,23.449-16.872,30.704-40.32,30.704c-0.191,0-0.381-0.005-0.574-0.005 v157.734c0.191,0,0.381,0.01,0.574,0.01c45.496,0,88.211-11.883,125.235-32.692v-97.533 C381.236,349.624,355.17,323.558,323.018,323.558z">
                  </path>
                  <path style="fill:#E6F3FF;"
                    d="M238.762,455.111h34.478l36.676-131.553h-13.595c0,23.449-16.872,30.704-40.32,30.704 s-44.594-7.256-44.594-30.704h-9.319L238.762,455.111z">
                  </path>
                  <path style="fill:#B5F1F4;"
                    d="M249.969,352.401V511.9c2.008,0.047,4.013,0.1,6.034,0.1c2.02,0,4.025-0.053,6.034-0.1V352.401 c-1.972,0.093-3.984,0.138-6.034,0.138S251.939,352.494,249.969,352.401z">
                  </path>
                  <path style="fill:#84DBFF;"
                    d="M256.003,352.539c-0.195,0-0.379-0.012-0.574-0.014V511.99c0.191,0.002,0.381,0.009,0.574,0.009 c2.02,0,4.025-0.053,6.034-0.1V352.401C260.064,352.494,258.051,352.539,256.003,352.539z">
                  </path>
                  <polygon style="fill:#B5F1F4;"
                    points="227.558,323.558 256.001,352.539 227.558,380.983 199.114,323.558 "></polygon>
                  <polygon style="fill:#84DBFF;"
                    points="284.445,323.558 256.003,352.539 284.445,380.983 312.89,323.558 "></polygon>
                  <path style="fill:#233444;"
                    d="M256.003,417.185V512c4.863,0,9.69-0.166,14.484-0.462l42.403-93.874l-22.411-13.888l22.411-18.198 V322.37h-28.444L256.003,417.185z">
                  </path>
                  <path style="fill:#2B3B4E;"
                    d="M227.558,322.37h-28.444v63.21l22.411,18.198l-22.411,13.888l42.403,93.874 c4.796,0.297,9.623,0.462,14.484,0.462v-94.815L227.558,322.37z">
                  </path>
                  <circle style="fill:#FED8B2;" cx="172.598" cy="233.417" r="20.052"></circle>
                  <circle style="fill:#EABE96;" cx="335.128" cy="233.417" r="20.052"></circle>
                  <path style="fill:#F4E3C3;"
                    d="M256.123,316.926h-4.518c-41.796,0-75.678-33.882-75.678-75.678v-69.096 c0-41.796,33.882-75.678,75.678-75.678h4.518c41.796,0,75.678,33.882,75.678,75.678v69.096 C331.801,283.045,297.919,316.926,256.123,316.926z">
                  </path>
                  <path style="fill:#FED8B2;"
                    d="M256.123,96.475h-0.696v220.451h0.696c41.796,0,75.678-33.882,75.678-75.678v-69.096 C331.801,130.357,297.919,96.475,256.123,96.475z">
                  </path>
                  <path style="fill:#F9B54C;"
                    d="M323.593,122.051c-14.862-21.171-39.445-35.023-67.277-35.023h-4.906 c-45.378,0-82.165,36.786-82.165,82.165v6.354v57.877h12.062v-33.942c-0.002,0-0.005,0-0.007,0 c36.605-3.718,72.597-10.899,104.145-26.671c11.352,13.036,24.462,24.678,38.934,34.121v26.491h14.102v-43.268v-20.963 C338.481,151.645,332.965,135.397,323.593,122.051z">
                  </path>
                  <path style="fill:#F4A200;"
                    d="M323.593,122.051c-14.862-21.171-39.445-35.023-67.277-35.023h-0.89v97.957 c10.345-3.358,20.39-7.363,30.018-12.176c11.352,13.038,24.462,24.678,38.934,34.121v26.491h14.102v-43.268v-20.963 C338.481,151.645,332.965,135.397,323.593,122.051z">
                  </path>
                  <circle style="fill:#59595B;" cx="217.127" cy="224.521" r="7.794"></circle>
                  <circle style="fill:#272525;" cx="290.6" cy="224.521" r="7.794"></circle>
                  <path style="fill:#FD8469;"
                    d="M275.019,258.617c-2.381,0-4.31,1.929-4.31,4.31c0,8.761-6.725,15.974-15.281,16.767 c-0.515,0.048-1.036,0.079-1.564,0.079c-9.288,0-16.844-7.558-16.844-16.844c0-2.381-1.929-4.31-4.31-4.31s-4.31,1.929-4.31,4.31 c0,14.043,11.423,25.464,25.464,25.464c0.528,0,1.045-0.048,1.564-0.079c13.312-0.815,23.9-11.871,23.9-25.386 C279.329,260.546,277.4,258.617,275.019,258.617z">
                  </path>
                  <path style="fill:#FC6F58;"
                    d="M279.329,262.927c0-2.381-1.929-4.31-4.31-4.31s-4.31,1.929-4.31,4.31 c0,8.761-6.725,15.974-15.281,16.767v8.62C268.741,287.497,279.329,276.44,279.329,262.927z">
                  </path>
                  <ellipse style="fill:#324A5E;" cx="256.001" cy="113.778" rx="113.778" ry="56.889"></ellipse>
                  <path style="fill:#2B3B4E;"
                    d="M256.003,56.889c-0.193,0-0.381,0.007-0.574,0.007V170.66c0.193,0,0.381,0.007,0.574,0.007 c62.838,0,113.778-25.471,113.778-56.889S318.839,56.889,256.003,56.889z">
                  </path>
                  <path style="fill:#FFD15D;"
                    d="M337.026,149.406c1.241-8.723,0.759-9.688,2-18.411c-55.072-7.839-110.976-7.839-166.048,0 c1.241,8.723,1.334,9.545,2.576,18.268L337.026,149.406z">
                  </path>
                  <path style="fill:#F9B54C;"
                    d="M339.026,130.993c-27.726-3.946-55.663-5.901-83.597-5.873v24.212l81.598,0.072 C338.267,140.681,337.785,139.716,339.026,130.993z">
                  </path>
                  <path style="fill:#2B3B4E;"
                    d="M337.026,149.406c0,14.915-36.276,27.008-81.024,27.008s-81.024-12.091-81.024-27.008H337.026z">
                  </path>
                  <path style="fill:#20303F;"
                    d="M255.427,149.406v27.003c0.193,0,0.381,0.005,0.574,0.005c44.747,0,81.024-12.091,81.024-27.008 H255.427z">
                  </path>
                  <circle style="fill:#FC6F58;" cx="411.152" cy="209.455" r="28.444"></circle>
                  <circle style="fill:#FFD15D;" cx="411.152" cy="269.791" r="28.444"></circle>
                  <circle style="fill:#90DFAA;" cx="411.152" cy="330.128" r="28.444"></circle>
                  <path style="fill:#F1543F;"
                    d="M411.154,181.01c-0.193,0-0.381,0.026-0.574,0.029v56.83c0.193,0.003,0.381,0.029,0.574,0.029 c15.71,0,28.444-12.734,28.444-28.444S426.862,181.01,411.154,181.01z">
                  </path>
                  <path style="fill:#F9B54C;"
                    d="M411.154,241.347c-0.193,0-0.381,0.026-0.574,0.029v56.83c0.193,0.003,0.381,0.029,0.574,0.029 c15.71,0,28.444-12.734,28.444-28.444S426.862,241.347,411.154,241.347z">
                  </path>
                  <path style="fill:#7AC48F;"
                    d="M411.154,301.684c-0.193,0-0.381,0.026-0.574,0.029v56.83c0.193,0.003,0.381,0.029,0.574,0.029 c15.71,0,28.444-12.734,28.444-28.444S426.862,301.684,411.154,301.684z">
                  </path>
                </g>
              </svg>
            </div>
          </div>
        </div>

        <!-- Right side: CTA content -->
        <div class="lg:w-1/2 text-center lg:text-left">
          <h2 class="text-4xl lg:text-5xl font-bold mb-6 text-white leading-tight">
            Have any more <span class="text-red-600">questions?</span>
          </h2>
          <p class="text-gray-300 text-lg mb-8 max-w-lg mx-auto lg:mx-0">We pride ourselves on offering top-notch
            customer service. Feel free to reach out with any questions, and we'll do our best to make your experience
            smooth and enjoyable.
          </p>
          <!-- CTA button -->
          <div class="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
            <a href='tel:+385921696002'
              class="px-8 py-4 border-2 border-red-600 text-white font-bold rounded-lg transition-all duration-300 hover:bg-red-600 hover:text-white hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 group">
              <span class="flex items-center justify-center">
                <span>Call us now</span>
              </span>
            </a>
          </div>

          <!-- Trust signals -->
          <div class="mt-10 flex flex-wrap justify-center lg:justify-start items-center gap-4">
            <div class="flex items-center">
              <div class="p-2 bg-gray-800 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <span class="ml-2 text-gray-300 text-sm">Secure Booking</span>
            </div>
            <div class="flex items-center">
              <div class="p-2 bg-gray-800 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span class="ml-2 text-gray-300 text-sm">24/7 Service</span>
            </div>
            <div class="flex items-center">
              <div class="p-2 bg-gray-800 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span class="ml-2 text-gray-300 text-sm">Punctuality</span>
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
.pattern-diagonal {
  background-image: linear-gradient(45deg, rgba(220, 38, 38, 0.1) 25%, transparent 25%, transparent 50%, rgba(220, 38, 38, 0.1) 50%, rgba(220, 38, 38, 0.1) 75%, transparent 75%, transparent);
  background-size: 10px 10px;
}

@keyframes float {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }
}

.taxi-image {
  animation: float 6s ease-in-out infinite;
}
</style>