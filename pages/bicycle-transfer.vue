<template>
  <BicycleHero></BicycleHero>
  <BicycleRoutes></BicycleRoutes>
  <Aboutus></Aboutus>
  <CTA></CTA>
</template>

<script setup>
useHead({
  title: 'Best in Bicycle Transport | PCTT | View Cycling Locations',
  meta: [
    {
      name: 'description',
      content: 'Seamless bicycle transport solutions across Istria. We move your bikes so you can focus on the ride. Professional bike transfer service for cyclists exploring Poreč and Istria.'
    },
    {
      name: 'keywords',
      content: 'bicycle transport Istria, bike transfer Poreč, cycling Locations Croatia, bike shuttle service, cycling logistics Istria, bike delivery service, Istria cycling routes, sports equipment transport, bike transport Croatia'
    },
    {
      property: 'og:title',
      content: 'Bicycle Transport & Cycling Locations | Poreč City Taxi & Transfers | Istria Cycling'
    },
    {
      property: 'og:description',
      content: 'Reliable bicycle transportation across Istria. Let us handle your bike transfers while you enjoy the best cycling routes and experiences that Istria has to offer.'
    },
    {
      property: 'og:image',
      content: 'https://taxiboatposeidon.com/images/cycling.png'
    },
    {
      property: 'og:url',
      content: 'https://taxiboatposeidon.com/bicycle-transfer'
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
      content: 'Bicycle Transport & Cycling Locations | Poreč City Taxi & Transfers | Istria Cycling'
    },
    {
      name: 'twitter:description',
      content: 'Professional bicycle transport service in Istria. Safe handling, flexible scheduling, and convenient solutions for cyclists exploring the beautiful Istrian peninsula.'
    },
    {
      name: 'twitter:image',
      content: 'https://taxiboatposeidon.com/images/cycling.png'
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
      href: 'https://taxiboatposeidon.com/bicycle-transfer'
    }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Bicycle Transport Services in Istria",
        "url": "https://taxiboatposeidon.com/bicycle-transfer",
        "logo": "https://taxiboatposeidon.com/images/cycling.png",
        "image": "https://taxiboatposeidon.com/images/cycling.png",
        "description": "We provide reliable bicycle transport services for cyclists in Istria. From Poreč and across the peninsula, we offer flexible scheduling and safe handling of your bicycles.",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Poreč",
          "addressRegion": "Istria",
          "addressCountry": "HR"
        },
        "areaServed": {
          "@type": "Place",
          "name": "Istria"
        },
        "telephone": "+385921696002", // Update with your phone number
        "offers": {
          "@type": "Offer",
          "priceCurrency": "HRK",
          "price": "Variable", // You can set specific prices or remove if uncertain
          "eligibleRegion": {
            "@type": "Place",
            "name": "Istria"
          },
          "url": "https://taxiboatposeidon.com/bicycle-transfer"
        },
        "openingHours": "Mo-Su 00:00-23:59",
        "serviceType": "Bicycle Transfer" // This could be customized if there are specific types of transfers
      })
    }
  ]
});
</script>


<style scoped>
/* Additional scoped styles can be added here */
</style>
