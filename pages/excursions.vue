<template>
  <ExcursionsHero></ExcursionsHero>
  <ExcursionsRoutes></ExcursionsRoutes>
  <Aboutus></Aboutus>
  <CTA></CTA>
</template>

<script setup>
useHead({
  title: 'Guided Tours & Day Excursions | PCTT | Discover the best of Istria',
  meta: [
    {
      name: 'description',
      content: 'Experience the best of Istria with our guided tours and day excursions. Discover hidden beaches, vineyard tours, truffle hunting, historical sites, and custom itineraries.'
    },
    {
      name: 'keywords',
      content: 'Istria tours, Poreč excursions, guided tours Croatia, wine tasting Istria, truffle hunting, Rovinj day trip, Motovun tour, Plitvice Lakes excursion, custom Istria tours'
    },
    {
      property: 'og:title',
      content: 'Guided Tours & Day Excursions | Poreč City Taxi & Transfers | Discover Istria'
    },
    {
      property: 'og:description',
      content: 'Explore the beauty of Istria with our professional guided tours and day excursions. Visit historic towns, pristine beaches, award-winning wineries, and more.'
    },
    {
      property: 'og:image',
      content: 'https://citytransfers.hr/images/excursions.png'
    },
    {
      property: 'og:url',
      content: 'https://citytransfers.hr/excursions'
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
      content: 'Guided Tours & Day Excursions | Poreč City Taxi & Transfers | Discover Istria'
    },
    {
      name: 'twitter:description',
      content: 'Discover the hidden gems of Istria with our private tours and excursions. Knowledgeable local guides, comfortable vehicles, and customizable itineraries.'
    },
    {
      name: 'twitter:image',
      content: 'https://citytransfers.hr/images/excursions.png'
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
      href: 'https://citytransfers.hr/excursions'
    }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "TouristAttraction",
        "name": "Poreč City Taxi & Transfers Guided Tours",
        "url": "https://citytransfers.hr/excursions",
        "logo": "https://citytransfers.hr/images/excursions.png",
        "image": "https://citytransfers.hr/images/excursions.png",
        "description": "Guided tours and day excursions in Istria, including visits to vineyards, truffle hunting, historic sites, and more.",
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
        "telephone": "+385921696002", // Updated phone number
        "offers": {
          "@type": "Offer",
          "priceCurrency": "EUR",
          "price": "Variable", // Update with specific prices for tours if available
          "eligibleRegion": {
            "@type": "Place",
            "name": "Istria"
          },
          "url": "https://citytransfers.hr/excursions"
        },
        "openingHours": "Mo-Su 00:00-23:59",
        "touristType": "GroupTour" // Optional: Change based on tour type (Group, Private, etc.)
      })
    }
  ]
});
</script>


<style scoped>
/* Additional scoped styles can be added here */
</style>
