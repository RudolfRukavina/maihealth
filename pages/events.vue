<template>
<EventsHero />
  <EventsRoutes></EventsRoutes>
  <Aboutus></Aboutus>
  <CTA></CTA>
</template>

<script setup>
useHead({
  title: 'Events | Poreč City Taxi & Transfers | View Upcoming Events',
  meta: [
    {
      name: 'description',
      content: 'Discover Istria\'s vibrant local events and festivals with convenient transportation. From summer concerts and food festivals to cultural celebrations and seasonal events throughout the year.'
    },
    {
      name: 'keywords',
      content: 'Istria events, Poreč festivals, Istrian food festivals, summer concerts Croatia, wine festivals Istria, traditional celebrations, cultural events Croatia, Istria music events, seasonal festivals'
    },
    {
      property: 'og:title',
      content: 'Local Events & Festivals | Poreč City Taxi & Transfers | Experience Istria'
    },
    {
      property: 'og:description',
      content: 'Don\'t miss Istria\'s exciting local events and festivals. Let us handle your transportation to concerts, food & wine celebrations, cultural performances, and seasonal festivities.'
    },
    {
      property: 'og:image',
      content: 'https://citytransfers.hr/images/events.png'
    },
    {
      property: 'og:url',
      content: 'https://citytransfers.hr/events'
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
      content: 'Local Events & Festivals | Poreč City Taxi & Transfers | Experience Istria'
    },
    {
      name: 'twitter:description',
      content: 'Reliable transportation to Istria\'s best events and festivals. From evening concerts to wine festivals, cultural celebrations to local fairs - experience it all with ease.'
    },
    {
      name: 'twitter:image',
      content: 'https://citytransfers.hr/images/events.png'
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
      href: 'https://citytransfers.hr/events'
    }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Event",
        "name": "Istria Local Events and Festivals",
        "url": "https://citytransfers.hr/events",
        "image": "https://citytransfers.hr/images/events.png",
        "description": "Experience vibrant festivals and events across Istria with convenient transportation. From food festivals to concerts and cultural performances, we make attending easy.",
        "startDate": "2025-01-01",  // Adjust to an actual start date or remove if not relevant
        "endDate": "2025-12-31",    // Adjust to an actual end date or remove if not relevant
        "location": {
          "@type": "Place",
          "name": "Poreč, Istria",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Poreč",
            "addressRegion": "Istria",
            "addressCountry": "HR"
          }
        },
        "offers": {
          "@type": "Offer",
          "url": "https://citytransfers.hr/events",
          "priceCurrency": "EUR",
          "price": "Variable", // You can set specific prices or remove if uncertain
          "eligibleRegion": {
            "@type": "Place",
            "name": "Istria"
          }
        },
        "performer": {
          "@type": "Organization",
          "name": "Poreč City Taxi & Transfers"
        },
        "telephone": "+385921696002",
        "eventStatus": "EventScheduled"
      })
    }
  ]
});
</script>


<style scoped>
/* Additional scoped styles can be added here */
</style>
