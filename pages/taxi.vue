<template>
    <TaxiHero></TaxiHero>
    <Map></Map>
    <Aboutus></Aboutus>
    <CTA></CTA>
</template>

<script setup>
useHead({
  title: 'Taxi Poreč | PCTT | Need a ride? Call us now',
  meta: [
    {
      name: 'description',
      content: 'Book premium taxi services in Poreč with our professional drivers and luxury Mercedes fleet. Available 24/7 for local transportation, city tours, and short-distance trips.'
    },
    {
      name: 'keywords',
      content: 'Poreč taxi service, local transportation, city taxi, Istria taxi, Mercedes taxi, premium transportation, Poreč city tours, 24/7 taxi Poreč'
    },
    {
      property: 'og:title',
      content: 'Taxi Services | Poreč City Taxi & Transfers | 24/7 Local Transportation'
    },
    {
      property: 'og:description',
      content: 'Reliable and premium taxi services in Poreč featuring professional drivers, luxury vehicles, and 24/7 availability for all your local transportation needs.'
    },
    {
      property: 'og:image',
      content: 'https://citytransfers.hr/images/taxi.png'
    },
    {
      property: 'og:url',
      content: 'https://citytransfers.hr/taxi'
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
      content: 'Taxi Services | Poreč City Taxi & Transfers | 24/7 Local Transportation'
    },
    {
      name: 'twitter:description',
      content: 'Professional taxi services in Poreč with multilingual drivers, fixed rates, and comfortable Mercedes vehicles for city tours and local trips.'
    },
    {
      name: 'twitter:image',
      content: 'https://citytransfers.hr/images/taxi.png'
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
      href: 'https://citytransfers.hr/taxi'
    }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "TaxiService",
        "name": "Poreč City Taxi & Transfers",
        "url": "https://citytransfers.hr/taxi",
        "logo": "https://citytransfers.hr/images/taxi.png",
        "image": "https://citytransfers.hr/images/taxi.png",
        "description": "Premium taxi services in Poreč with Mercedes vehicles and 24/7 availability.",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Poreč",
          "addressRegion": "Istria",
          "addressCountry": "HR"
        },
        "areaServed": {
          "@type": "Place",
          "name": "Poreč"
        },
        "telephone": "+385921696002", // Replace with real number
        "openingHours": "Mo-Su 00:00-23:59"
      })
    }
  ]
});
</script>


<style scoped>
/* You can include additional styles for scoped components here */
</style>
