<template>
    <TaxiHero></TaxiHero>
    <Map></Map>
    <Aboutus></Aboutus>
    <CTA></CTA>
</template>

<script setup>
useHead({
  title: 'Rent a Boat Poreč | Poseidon Marine | Explore Istria Your Way',
  meta: [
    {
      name: 'description',
      content: 'Rent premium boats in Poreč with Poseidon Marine. Explore hidden bays, visit islands, and enjoy the crystal-clear Adriatic at your own pace. No license needed for smaller boats. Book now!'
    },
    {
      name: 'keywords',
      content: 'boat rental Poreč, rent a boat Croatia, Istria boat hire, Poseidon Marine, no license boat rental, speedboat rental, Adriatic Sea exploration, Poreč island hopping, private boat rental Croatia'
    },
    {
      property: 'og:title',
      content: 'Rent a Boat Poreč | Poseidon Marine | Explore the Adriatic Sea'
    },
    {
      property: 'og:description',
      content: 'Premium boat rentals in Poreč, Croatia. Choose from our fleet of well-maintained vessels for the perfect day at sea. Explore secluded beaches, stunning islands, and coastal wonders at your own pace.'
    },
    {
      property: 'og:image',
      content: 'https://taxiboatposeidon.com/images/rent-boat-poseidon.jpg'
    },
    {
      property: 'og:url',
      content: 'https://taxiboatposeidon.com/rent-a-boat'
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
      content: 'Rent a Boat in Poreč | Explore Croatia at Your Own Pace'
    },
    {
      name: 'twitter:description',
      content: 'Discover the beauty of the Istrian coastline with our premium boat rental service. No license required for smaller boats, fuel-efficient engines, and full safety equipment included.'
    },
    {
      name: 'twitter:image',
      content: 'https://taxiboatposeidon.com/images/rent-boat-poseidon.jpg'
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
      href: 'https://taxiboatposeidon.com/rent-a-boat'
    },
    {
      rel: 'alternate',
      hreflang: 'en',
      href: 'https://taxiboatposeidon.com/rent-a-boat'
    },
    {
      rel: 'alternate',
      hreflang: 'hr',
      href: 'https://taxiboatposeidon.com/hr/rent-a-boat'
    },
    {
      rel: 'alternate',
      hreflang: 'de',
      href: 'https://taxiboatposeidon.com/de/rent-a-boat'
    },
    {
      rel: 'alternate',
      hreflang: 'it',
      href: 'https://taxiboatposeidon.com/it/rent-a-boat'
    }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "RentalService",
        "name": "Poseidon Marine Boat Rentals",
        "url": "https://taxiboatposeidon.com/rent-a-boat",
        "logo": "https://taxiboatposeidon.com/images/poseidon-logo.png",
        "image": "https://taxiboatposeidon.com/images/rent-boat-poseidon.jpg",
        "description": "Premium boat rental services in Poreč, Croatia. Explore the Adriatic Sea with our well-maintained fleet.",
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
            "opens": "08:00",
            "closes": "20:00"
          }
        ],
        "offers": {
          "@type": "Offer",
          "description": "Boat rentals starting from €80/day. No license required for boats under 30HP.",
          "availability": "https://schema.org/InStock",
          "priceSpecification": {
            "@type": "PriceSpecification",
            "price": "80",
            "priceCurrency": "EUR",
            "unitText": "DAY"
          }
        },
        "keywords": "boat rental, speedboat, Poreč, Croatia, Adriatic Sea, island hopping, no license boats"
      })
    }
  ]
});
</script>


<style scoped>
/* You can include additional styles for scoped components here */
</style>
