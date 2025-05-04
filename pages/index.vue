<template>
  <Hero></Hero>
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
  title: 'Homepage | Poreč City Taxi & Transfers | Premium Transportation Services',
  meta: [
    {
      name: 'description',
      content: 'Experience premium transportation in Poreč with our expert drivers and luxurious fleet. Airport transfers, local taxi, excursions, and bicycle transport services available 24/7.'
    },
    {
      name: 'keywords',
      content: 'Poreč taxi, airport transfers, Istria transportation, luxury taxi, Poreč tours, bicycle transport, Mercedes fleet, Poreč excursions, premium transfer service'
    },
    {
      property: 'og:title',
      content: 'Poreč City Taxi & Transfers | Premium Transportation Services'
    },
    {
      property: 'og:description',
      content: 'Premium taxi and transfer services in Poreč featuring Mercedes vehicles, multilingual drivers, and 24/7 availability for airport transfers, city tours, and excursions.'
    },
    {
      property: 'og:image',
      content: 'https://www.porec.hr/thumbnail.aspx?filename=/cmsmedia/sadrzaj/homepage/96201.jpg&width=1920&height=900&trim=1&save=1&quality=80'
    },
    {
      property: 'og:url',
      content: 'https://citytransfers.hr'
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
      content: 'Poreč City Taxi & Transfers | Premium Transportation Services'
    },
    {
      name: 'twitter:description',
      content: 'Experience premium transportation with our premium fleet, professional multilingual drivers, and tailored services including airport transfers and guided excursions.'
    },
    {
      name: 'twitter:image',
      content: 'https://www.porec.hr/thumbnail.aspx?filename=/cmsmedia/sadrzaj/homepage/96201.jpg&width=1920&height=900&trim=1&save=1&quality=80'
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
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    },
    {
      rel: 'canonical',
      href: 'https://citytransfers.hr'
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