<template>
  <section id="faq" class="py-16 bg-black">
    <div class="container mx-auto px-4">
      <div class="mb-12 text-center">
        <h2 class="text-4xl font-bold mb-3 text-white">
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-500">Frequently Asked
            Questions</span>
        </h2>
        <div class="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
        <p class="text-gray-300 text-lg max-w-2xl mx-auto">
          Everything you need to know about our premium taxi services
        </p>
      </div>

      <div class="max-w-3xl mx-auto">
        <div class="space-y-6">
          <div v-for="(item, index) in faqItems" :key="index"
            class="border border-gray-800 rounded-lg overflow-hidden transform transition-all duration-300 hover:shadow-yellow"
            :class="{ 'shadow-yellow': activeIndex === index }">
            <button @click="toggleAccordion(index)"
              class="w-full px-6 py-5 flex justify-between items-center bg-gray-900 text-left transition-colors duration-300 hover:bg-gray-800"
              :aria-expanded="activeIndex === index" :aria-controls="`faq-content-${index}`">
              <span class="text-xl font-medium text-white">{{ item.question }}</span>
              <span class="text-yellow-400 transition-transform duration-300"
                :class="{ 'rotate-45': activeIndex === index }">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </span>
            </button>
            <div :id="`faq-content-${index}`" v-show="activeIndex === index"
              class="px-6 py-5 bg-gray-900 text-gray-300 leading-relaxed overflow-hidden transition-all duration-500"
              ref="accordionContent">
              <p v-html="item.answer"></p>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-12 text-center">
        <p class="text-gray-400 mb-6">Still have questions?</p>
        <button
          class="px-8 py-3 bg-yellow-400 text-black font-medium rounded-lg transform transition-transform duration-200 hover:scale-105 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-opacity-50">
          Contact Us
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const activeIndex = ref(null);

const toggleAccordion = (index) => {
  activeIndex.value = activeIndex.value === index ? null : index;
};

const faqItems = ref([
  {
    question: "How far in advance should I book my taxi?",
    answer: "For standard rides, we recommend booking at least 2 hours in advance. For airport transfers or special events, we suggest booking 24-48 hours ahead to ensure availability. However, our <strong>premium fleet</strong> is typically available for immediate service as well."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, mobile payments (Apple Pay, Google Pay), cash, and corporate accounts. All vehicles are equipped with secure payment terminals for your convenience."
  },
  {
    question: "Do you provide child seats?",
    answer: "Yes, we provide child seats upon request at no additional charge. Please specify the age and weight of your child when booking so we can provide the appropriate seat type."
  },
  {
    question: "Are your vehicles wheelchair accessible?",
    answer: "Yes, we maintain a fleet of wheelchair-accessible vehicles. Please notify us when booking, and we'll ensure an appropriate vehicle is dispatched to accommodate your needs."
  },
  {
    question: "What areas do you service?",
    answer: "We provide premium taxi services throughout the metropolitan area and surrounding suburbs. We also offer long-distance transfers to neighboring cities and airport services to all regional airports."
  },
  {
    question: "How do I track my taxi?",
    answer: "Once your booking is confirmed, you'll receive a text message with a tracking link. Our <strong>sophisticated GPS system</strong> allows you to monitor your driver's location in real-time through our mobile app or web interface."
  },
  {
    question: "What if my flight is delayed?",
    answer: "For airport pickups, we monitor flight arrivals in real-time. Your driver will adjust their schedule accordingly at no extra charge, ensuring they're there when you arrive regardless of delays."
  }
]);
</script>

<style scoped>
.shadow-yellow {
  box-shadow: 0 0 15px rgba(252, 211, 77, 0.15);
}

/* Smooth height animation for accordion */
.accordion-enter-active,
.accordion-leave-active {
  transition: max-height 0.5s ease-in-out;
  max-height: 1000px;
}

.accordion-enter-from,
.accordion-leave-to {
  max-height: 0;
}
</style>