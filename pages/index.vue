<template>
  <Hero></Hero>
  <Popup></Popup>
  <Services></Services>
  <Aboutus></Aboutus>
  <Testimonial></Testimonial>
  <CTA></CTA>
  <!-- <Faq></Faq> -->
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// Set the page head metadata
useHead({
  title: 'Taxi Boat Poseidon | Premium Sea Transfers & Excursions | Poreč, Croatia',
  meta: [
    {
      name: 'description',
      content: 'Experience premium sea transportation in Poreč with Taxi Boat Poseidon. Enjoy coastal excursions, island hopping, sunset cruises, and private boat transfers along the beautiful Istrian coast of Croatia.'
    },
    {
      name: 'keywords',
      content: 'taxi boat Poreč, boat excursions Croatia, Istria sea transfers, island hopping Poreč, boat taxi Croatia, Adriatic sea tours, Poreč coastal transportation, private boat hire, Poseidon boat service, Croatia boat tours'
    },
    {
      property: 'og:title',
      content: 'Taxi Boat Poseidon | Premium Sea Transfers & Excursions | Poreč'
    },
    {
      property: 'og:description',
      content: 'Premium boat taxi and sea excursion services in Poreč featuring comfortable vessels, experienced skippers, and tailored Adriatic experiences including island tours and coastal transfers.'
    },
    {
      property: 'og:image',
      content: 'https://taxiboatposeidon.com/images/hero-boat.jpg' // You'll need a high-quality boat image here
    },
    {
      property: 'og:url',
      content: 'https://taxiboatposeidon.com'
    },
    {
      property: 'og:type',
      content: 'website'
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image'
    },
    {
      name: 'twitter:title',
      content: 'Taxi Boat Poseidon | Premium Sea Transfers & Excursions | Poreč'
    },
    {
      name: 'twitter:description',
      content: 'Explore the stunning Istrian coastline with our premium boat taxi services. Island hopping, coastal excursions, and private transfers with expert local skippers.'
    },
    {
      name: 'twitter:image',
      content: 'https://taxiboatposeidon.com/images/hero-boat.jpg' // Same image as og:image
    },
    {
      name: 'robots',
      content: 'index, follow'
    },
    {
      name: 'geo.region',
      content: 'HR-18'
    },
    {
      name: 'geo.placename',
      content: 'Poreč'
    },
    {
      name: 'geo.position',
      content: '45.2271;13.5947' // Coordinates for Poreč
    },
    {
      name: 'ICBM',
      content: '45.2271, 13.5947' // Coordinates in another format
    },
    {
      name: 'language',
      content: 'en-US'
    },
    {
      name: 'author',
      content: 'Taxi Boat Poseidon'
    },
    {
      name: 'format-detection',
      content: 'telephone=no'
    }
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    },
    {
      rel: 'canonical',
      href: 'https://taxiboatposeidon.com'
    },
    {
      rel: 'alternate',
      hreflang: 'en',
      href: 'https://taxiboatposeidon.com'
    },
    {
      rel: 'alternate',
      hreflang: 'hr',
      href: 'https://taxiboatposeidon.com/hr'
    },
    {
      rel: 'alternate',
      hreflang: 'de',
      href: 'https://taxiboatposeidon.com/de'
    },
    {
      rel: 'alternate',
      hreflang: 'it',
      href: 'https://taxiboatposeidon.com/it'
    }
  ]
});
</script>

<style scoped>
/* Fade transition for hero images */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Generic animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>