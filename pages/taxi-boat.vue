<template>
  <TaxiBoatHero></TaxiBoatHero>
  <TaxiBoatRoutes></TaxiBoatRoutes>
  <Aboutus></Aboutus>
  <CTA></CTA>
</template>

<script setup>
useHead({
  title: 'Taxi Boat Poreč | Poseidon Marine | Fast & Reliable Sea Transfers',
  meta: [
    {
      name: 'description',
      content: 'Book premium taxi boat services in Poreč with Poseidon Marine. Fast sea transfers to islands, coastal towns, and secluded beaches. Professional skippers and comfortable boats available 24/7.'
    },
    {
      name: 'keywords',
      content: 'taxi boat Poreč, sea transfer Croatia, boat taxi Istria, island transfer, water taxi Poreč, private boat transfer, Poseidon Marine, Adriatic boat service, coastal transfer, Istria boat taxi'
    },
    {
      property: 'og:title',
      content: 'Taxi Boat Poreč | Poseidon Marine | Sea Transfers & Water Taxi'
    },
    {
      property: 'og:description',
      content: 'Skip the traffic and travel in style with our premium taxi boat services in Poreč. Fast, reliable sea transfers to nearby islands, coastal destinations, and hidden beaches around Istria.'
    },
    {
      property: 'og:image',
      content: 'https://taxiboatposeidon.com/images/taxi-boat-poseidon.jpg'
    },
    {
      property: 'og:url',
      content: 'https://taxiboatposeidon.com/taxi-boat'
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
      content: 'Taxi Boat Services | Efficient Sea Transfers Across Istria'
    },
    {
      name: 'twitter:description',
      content: 'Convenient and scenic water taxi services throughout the Istrian peninsula. Avoid road traffic and enjoy the beautiful Adriatic coastline with our experienced captains.'
    },
    {
      name: 'twitter:image',
      content: 'https://taxiboatposeidon.com/images/taxi-boat-poseidon.jpg'
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
      content: '45.2271;13.5947'
    },
    {
      name: 'ICBM',
      content: '45.2271, 13.5947'
    },
    {
      name: 'language',
      content: 'en-US'
    },
    {
      name: 'author',
      content: 'Poseidon Marine'
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
      href: 'https://taxiboatposeidon.com/taxi-boat'
    },
    {
      rel: 'alternate',
      hreflang: 'en',
      href: 'https://taxiboatposeidon.com/taxi-boat'
    },
    {
      rel: 'alternate',
      hreflang: 'hr',
      href: 'https://taxiboatposeidon.com/hr/taxi-boat'
    },
    {
      rel: 'alternate',
      hreflang: 'de',
      href: 'https://taxiboatposeidon.com/de/taxi-boat'
    },
    {
      rel: 'alternate',
      hreflang: 'it',
      href: 'https://taxiboatposeidon.com/it/taxi-boat'
    }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "TaxiService",
        "serviceType": "Water Taxi",
        "name": "Poseidon Marine Taxi Boat",
        "url": "https://taxiboatposeidon.com/taxi-boat",
        "logo": "https://taxiboatposeidon.com/images/poseidon-logo.png",
        "image": "https://taxiboatposeidon.com/images/taxi-boat-poseidon.jpg",
        "description": "Premium taxi boat services in Poreč, Croatia. Fast and convenient sea transfers to islands and coastal destinations around Istria.",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Poreč",
          "addressRegion": "Istria",
          "postalCode": "52440",
          "addressCountry": "HR"
        },
        "areaServed": {
          "@type": "GeoCircle",
          "geoMidpoint": {
            "@type": "GeoCoordinates",
            "latitude": "45.2271",
            "longitude": "13.5947"
          },
          "geoRadius": "50000"
        },
        "telephone": "+385921696002",
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
            ],
            "opens": "00:00",
            "closes": "23:59"
          }
        ],
        "availableLanguage": ["English", "Croatian", "German", "Italian"],
        "priceRange": "€€",
        "paymentAccepted": "Cash, Credit Card",
        "currenciesAccepted": "EUR, HRK",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Taxi Boat Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Island Transfer",
                "description": "Fast transfers to nearby islands including Sveti Nikola, Červar and more."
              },
              "priceSpecification": {
                "@type": "PriceSpecification",
                "price": "50",
                "priceCurrency": "EUR",
                "unitText": "per boat (up to 6 persons)"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Coastal Resort Transfer",
                "description": "Convenient transfers between coastal resorts and towns along the Istrian peninsula."
              },
              "priceSpecification": {
                "@type": "PriceSpecification",
                "price": "70",
                "priceCurrency": "EUR",
                "unitText": "per boat (up to 6 persons)"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Restaurant Transfer",
                "description": "Evening transfers to seaside restaurants with pickup service available."
              },
              "priceSpecification": {
                "@type": "PriceSpecification",
                "price": "60",
                "priceCurrency": "EUR",
                "unitText": "per boat (up to 6 persons)"
              }
            }
          ]
        },
        "slogan": "The fastest way across the Adriatic",
        "keywords": "taxi boat, water taxi, sea transfer, boat service, Poreč, Croatia, Adriatic, island transfer"
      })
    }
  ]
});
</script>


<style scoped>
/* You can include additional styles for scoped components here */
</style>
