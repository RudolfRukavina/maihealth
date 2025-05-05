<template>
  <Popup></Popup>
  <ExcursionsHero></ExcursionsHero>
  <ExcursionsRoutes></ExcursionsRoutes>
  <Aboutus></Aboutus>
  <CTA></CTA>
</template>

<script setup>
import Popup from '~/components/popup.vue';

useHead({
  title: 'Sea Excursions & Boat Tours | Poseidon Marine | Discover Istria\'s Coastline',
  meta: [
    {
      name: 'description',
      content: 'Experience the stunning Istrian coastline with Poseidon\'s boat excursions and sea tours. Discover hidden beaches, secluded coves, Blue Cave, Brijuni National Park, and sunset cruises from Poreč.'
    },
    {
      name: 'keywords',
      content: 'boat excursions Poreč, sea tours Croatia, island hopping Istria, Brijuni boat tour, Blue Cave Croatia, sunset cruise Poreč, Lim Fjord boat trip, private boat tour, swimming spots Istria, dolphins watching Adriatic'
    },
    {
      property: 'og:title',
      content: 'Sea Excursions & Boat Tours | Discover Istria\'s Beautiful Coastline | Poseidon Marine'
    },
    {
      property: 'og:description',
      content: 'Explore the magnificent Istrian peninsula by sea with our professional guided boat excursions. Visit stunning islands, hidden beaches, natural wonders, and enjoy unforgettable swimming in crystal-clear waters.'
    },
    {
      property: 'og:image',
      content: 'https://taxiboatposeidon.com/images/boat-excursion-poseidon.jpg'
    },
    {
      property: 'og:url',
      content: 'https://taxiboatposeidon.com/boat-excursions'
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
      content: 'Sea Excursions & Boat Tours | Discover Istria\'s Beautiful Coastline | Poseidon Marine'
    },
    {
      name: 'twitter:description',
      content: 'Discover the hidden gems of the Adriatic with our boat excursions. Expert skippers, comfortable vessels, and breathtaking destinations along the Istrian coast.'
    },
    {
      name: 'twitter:image',
      content: 'https://taxiboatposeidon.com/images/boat-excursion-poseidon.jpg'
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
      href: 'https://taxiboatposeidon.com/boat-excursions'
    },
    {
      rel: 'alternate',
      hreflang: 'en',
      href: 'https://taxiboatposeidon.com/boat-excursions'
    },
    {
      rel: 'alternate',
      hreflang: 'hr',
      href: 'https://taxiboatposeidon.com/hr/boat-excursions'
    },
    {
      rel: 'alternate',
      hreflang: 'de',
      href: 'https://taxiboatposeidon.com/de/boat-excursions'
    },
    {
      rel: 'alternate',
      hreflang: 'it',
      href: 'https://taxiboatposeidon.com/it/boat-excursions'
    }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "TouristTrip",
        "name": "Poseidon Marine Boat Excursions",
        "url": "https://taxiboatposeidon.com/boat-excursions",
        "image": "https://taxiboatposeidon.com/images/boat-excursion-poseidon.jpg",
        "description": "Guided boat tours and sea excursions in Istria, including Blue Cave, Brijuni National Park, Lim Fjord, sunset cruises, and swimming in secluded coves.",
        "touristType": ["Water activities", "Island tours", "Nature", "Scenic views"],
        "provider": {
          "@type": "TravelAgency",
          "name": "Poseidon Marine",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Poreč",
            "addressRegion": "Istria",
            "postalCode": "52440",
            "addressCountry": "HR"
          },
          "telephone": "+385921696002"
        },
        "offers": [
          {
            "@type": "Offer",
            "name": "Blue Cave Boat Tour",
            "description": "Discover the magical Blue Cave on this half-day excursion with swimming and snorkeling stops.",
            "price": "60",
            "priceCurrency": "EUR",
            "availability": "https://schema.org/InStock",
            "url": "https://taxiboatposeidon.com/boat-excursions/blue-cave"
          },
          {
            "@type": "Offer",
            "name": "Brijuni National Park Tour",
            "description": "Full-day boat trip to the stunning Brijuni National Park with guided island tour.",
            "price": "95",
            "priceCurrency": "EUR",
            "availability": "https://schema.org/InStock",
            "url": "https://taxiboatposeidon.com/boat-excursions/brijuni"
          },
          {
            "@type": "Offer",
            "name": "Sunset Cruise",
            "description": "Romantic evening boat trip along the coast with drinks and spectacular sunset views.",
            "price": "45",
            "priceCurrency": "EUR",
            "availability": "https://schema.org/InStock",
            "url": "https://taxiboatposeidon.com/boat-excursions/sunset"
          },
          {
            "@type": "Offer",
            "name": "Lim Fjord & Rovinj",
            "description": "Explore the impressive Lim Fjord and visit the picturesque town of Rovinj by sea.",
            "price": "85",
            "priceCurrency": "EUR",
            "availability": "https://schema.org/InStock",
            "url": "https://taxiboatposeidon.com/boat-excursions/lim-fjord-rovinj"
          }
        ],
        "itinerary": {
          "@type": "ItemList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "item": {
                "@type": "TouristAttraction",
                "name": "Blue Cave (Plava Špilja)",
                "description": "Natural sea cave with stunning blue light effects"
              }
            },
            {
              "@type": "ListItem",
              "position": 2,
              "item": {
                "@type": "TouristAttraction",
                "name": "Brijuni National Park",
                "description": "Archipelago of 14 islands with rich history and nature"
              }
            },
            {
              "@type": "ListItem",
              "position": 3,
              "item": {
                "@type": "TouristAttraction",
                "name": "Lim Fjord",
                "description": "Stunning 10km long estuary with steep hills on both sides"
              }
            },
            {
              "@type": "ListItem",
              "position": 4,
              "item": {
                "@type": "TouristAttraction",
                "name": "Rovinj",
                "description": "Picturesque coastal town with Venetian architecture"
              }
            }
          ]
        },
        "subjectOf": {
          "@type": "CreativeWork",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "127"
          }
        }
      })
    }
  ]
});
</script>


<style scoped>
/* Additional scoped styles can be added here */
</style>
