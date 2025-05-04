<template>
  <TransfersHero></TransfersHero>
  <TransferRoutes></TransferRoutes>
  <Aboutus></Aboutus>
  <CTA></CTA>
</template>

<script setup>
useHead({
  title: 'Airport & Poseidon | PCTT | View Prices & Book now ',
  meta: [
    {
      name: 'description',
      content: 'Book reliable airport and private transfers throughout Istria with our premium fleet. Door-to-door service from Pula, Zagreb, Trieste, Venice, and Ljubljana airports.'
    },
    {
      name: 'keywords',
      content: 'Poreč airport transfers, Pula airport shuttle, private transfers Istria, Venice airport to Poreč, Ljubljana airport transfer, Trieste airport service, Zagreb airport to Poreč, door-to-door transfers'
    },
    {
      property: 'og:title',
      content: 'Airport & Private Transfers | Poreč City Taxi & Transfers | Istria Transportation'
    },
    {
      property: 'og:description',
      content: 'Premium door-to-door transfer services between Poreč and all major airports including Pula, Zagreb, Venice, Trieste, and Ljubljana with fixed rates and professional drivers.'
    },
    {
      property: 'og:image',
      content: 'https://taxiboatposeidon.com/images/transfers.png'
    },
    {
      property: 'og:url',
      content: 'https://taxiboatposeidon.com/transfers'
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
      content: 'Airport & Private Transfers | Poreč City Taxi & Transfers | Istria Transportation'
    },
    {
      name: 'twitter:description',
      content: 'Seamless airport and private transfers between Poreč and major airports. Enjoy fixed rates, comfortable vehicles, and professional multilingual drivers.'
    },
    {
      name: 'twitter:image',
      content: 'https://taxiboatposeidon.com/images/transfers.png'
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
      href: 'https://taxiboatposeidon.com/transfers'
    }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "TaxiService",
        "name": "Poreč City Taxi & Transfers",
        "url": "https://taxiboatposeidon.com/transfers",
        "logo": "https://taxiboatposeidon.com/images/transfers.png",
        "image": "https://taxiboatposeidon.com/images/transfers.png",
        "description": "Premium door-to-door transfer services between Poreč and all major airports including Pula, Zagreb, Venice, Trieste, and Ljubljana with fixed rates and professional drivers.",
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
        "telephone": "+385921696002", // Replace with the actual phone number
        "offers": {
          "@type": "Offer",
          "priceCurrency": "EUR",
          "price": "Variable", // Or you can set a specific price if fixed
          "eligibleRegion": {
            "@type": "Place",
            "name": "Istria"
          },
          "url": "https://taxiboatposeidon.com/transfers"
        },
        "openingHours": "Mo-Su 00:00-23:59"
      })
    }
  ]
});
</script>


<style scoped>
/* You can include additional styles for scoped components here */
</style>
