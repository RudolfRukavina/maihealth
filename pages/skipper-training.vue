<template>
  <TaxiHero></TaxiHero>
  <Map></Map>
  <Aboutus></Aboutus>
  <CTA></CTA>
</template>

<script setup>
useHead({
  title: 'Skipper Training | Poseidon Marine | Learn to Sail in Croatia',
  meta: [
    {
      name: 'description',
      content: 'Earn your Croatian skipper license with Poseidon Marine\'s training in Poreč. No experience required.'
    },
    {
      name: 'keywords',
      content: 'skipper training Croatia, boat license Poreč, learn to sail Croatia, Category B license, Category C license, sailing Istria, boat handling skills, navigation training, maritime education'
    },
    {
      property: 'og:title',
      content: 'Skipper Training | Poseidon Marine | Sail Croatia with Confidence'
    },
    {
      property: 'og:description',
      content: 'Obtain your official Croatian skipper license with our expert instructors. Comprehensive covering navigation, safety, meteorology and practical boat handling in the beautiful waters of Istria. From beginners to experienced sailors.'
    },
    {
      property: 'og:image',
      content: 'https://taxiboatposeidon.com/images/skipper-training-poseidon.jpg'
    },
    {
      property: 'og:url',
      content: 'https://taxiboatposeidon.com/skipper-training'
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
      content: 'Learn to Sail | Skipper Training in Poreč'
    },
    {
      name: 'twitter:description',
      content: 'Transform from novice to confident skipper with our tailored training programs. Obtain internationally recognized Croatian licenses while exploring the beautiful Istrian coastline.'
    },
    {
      name: 'twitter:image',
      content: 'https://taxiboatposeidon.com/images/skipper-training-poseidon.jpg'
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
      href: 'https://taxiboatposeidon.com/skipper-training'
    },
    {
      rel: 'alternate',
      hreflang: 'en',
      href: 'https://taxiboatposeidon.com/skipper-training'
    },
    {
      rel: 'alternate',
      hreflang: 'hr',
      href: 'https://taxiboatposeidon.com/hr/skipper-training'
    },
    {
      rel: 'alternate',
      hreflang: 'de',
      href: 'https://taxiboatposeidon.com/de/skipper-training'
    },
    {
      rel: 'alternate',
      hreflang: 'it',
      href: 'https://taxiboatposeidon.com/it/skipper-training'
    }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Course",
        "name": "Poseidon Marine Skipper Training",
        "description": "Skipper training providing both theoretical and practical instruction to obtain official Croatian skipper licenses (Category B and C).",
        "provider": {
          "@type": "Organization",
          "name": "Poseidon Marine",
          "sameAs": "https://taxiboatposeidon.com",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Poreč",
            "addressRegion": "Istria",
            "postalCode": "52440",
            "addressCountry": "HR"
          },
          "telephone": "+385921696002"
        },
        "courseCode": "SKP-HR",
        "coursePrerequisites": "No prior experience required for beginner. Advanced may require basic sailing knowledge.",
        "occupationalCategory": "Skipper, Boat Operator",
        "educationalCredentialAwarded": "Croatian Boat Leader's License (Category B or C)",
        "offers": [
          {
            "@type": "Offer",
            "name": "Category B License Course (3-Day)",
            "description": "Obtain your Croatian Category B skipper license allowing you to operate boats up to 12 nautical miles from the coast in Croatian waters.",
            "price": "495",
            "priceCurrency": "EUR",
            "availability": "https://schema.org/InStock",
            "url": "https://taxiboatposeidon.com/skipper-training/category-b"
          },
          {
            "@type": "Offer",
            "name": "Category C License Course (6-Day)",
            "description": "Comprehensive skipper training for the Category C license, allowing you to operate yachts up to 30GT for both private and commercial purposes.",
            "price": "895",
            "priceCurrency": "EUR",
            "availability": "https://schema.org/InStock",
            "url": "https://taxiboatposeidon.com/skipper-training/category-c"
          },
          {
            "@type": "Offer",
            "name": "Practical Boat Handling Course (2-Day)",
            "description": "Hands-on training for those who already have theoretical knowledge but need practical experience with boat handling, docking, and navigation.",
            "price": "345",
            "priceCurrency": "EUR",
            "availability": "https://schema.org/InStock",
            "url": "https://taxiboatposeidon.com/skipper-training/practical"
          }
        ],
        "hasCourseInstance": [
          {
            "@type": "CourseInstance",
            "name": "May 2025 Category B Training",
            "startDate": "2025-05-15",
            "endDate": "2025-05-18",
            "location": {
              "@type": "Place",
              "name": "Poseidon Marine Base",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Poreč",
                "addressRegion": "Istria",
                "addressCountry": "HR"
              }
            }
          },
          {
            "@type": "CourseInstance",
            "name": "June 2025 Category C Training",
            "startDate": "2025-06-10",
            "endDate": "2025-06-16",
            "location": {
              "@type": "Place",
              "name": "Poseidon Marine Base",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Poreč",
                "addressRegion": "Istria",
                "addressCountry": "HR"
              }
            }
          }
        ],
        "courseWorkload": "30-45 hours (depending on course)",
        "learningResourceType": "Practical training, Theoretical instruction",
        "teaches": [
          "Navigation",
          "Meteorology",
          "Safety procedures",
          "Maritime law",
          "Boat handling and maneuvering",
          "Collision avoidance",
          "Radio communication",
          "Emergency procedures"
        ],
        "image": "https://taxiboatposeidon.com/images/skipper-training-poseidon.jpg",
        "url": "https://taxiboatposeidon.com/skipper-training",
        "keywords": "skipper training, Croatian boat license, sailing, Category B license, Category C license, maritime education"
      })
    }
  ]
});
</script>


<style scoped>
/* You can include additional styles for scoped components here */
</style>
