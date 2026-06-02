export default defineI18nConfig(() => ({
  legacy: false,
  locale: "en",
  messages: {
    en: {
      nav: {
        home: "Home",
        practice: "Practice",
        corporate: "Corporate Health",
        about: "About",
        contact: "Contact",
        book: "Book Appointment",
      },
      hero: {
        label: "Functional Medicine & Longevity",
        title: "Understand the root causes — with evidence-based medicine.",
        subtitle: "Dr. med. Mai Wald combines conventional medicine, functional medicine, and naturopathy to examine how metabolism, hormones, the gut, and the nervous system work together for long-term health stability.",
        cta_book: "Book Appointment",
        cta_learn: "Learn More",
      },
      trust: {
        individual: {
          title: "Individual Treatment",
          description: "Tailored to your symptoms and needs.",
        },
        holistic: {
          title: "Holistic Approach",
          description: "Body, nutrition, stress & gut in harmony.",
        },
        knowledge: {
          title: "Knowledge That Helps",
          description: "Clearly explained. Truly applicable.",
        },
        heart: {
          title: "Care With Heart",
          description: "Time, listening, and real partnership at eye level.",
        },
      },
      services: {
        label: "Services",
        title: "Personalized care for your health journey",
        subtitle: "Three distinct pathways tailored to where you are in your health journey — from initial diagnostics to long-term optimization.",
        cards: {
          diagnostics: {
            title: "Functional & Longevity Diagnostics",
            description: "Comprehensive health analysis with extended blood work, personalized therapy plan covering nutrition, sleep, movement, and stress management.",
            cta: "Learn More",
          },
          analysis: {
            title: "Analysis of Existing Lab Values",
            description: "Review of your current and previous lab results with one-on-one consultations to develop individualized health plans. Available in-person or virtually.",
            cta: "Learn More",
          },
          coaching: {
            title: "Ongoing Health Management",
            description: "Long-term, evidence-based health coaching with monthly consultations tracking progress toward your health goals. In-person or via telemedicine.",
            cta: "Learn More",
          },
        },
      },
      benefits: {
        label: "Why Functional Medicine",
        title: "A medicine that looks at the whole picture",
        subtitle: "Instead of treating isolated symptoms, functional medicine examines the connections between all body systems to find and address root causes.",
        items: [
          "Early detection before symptoms become chronic conditions",
          "Hormone balance evaluation and targeted optimization",
          "Gut health assessment and microbiome optimization",
          "Cardiovascular risk prevention with advanced biomarkers",
          "Performance enhancement for executives and athletes",
          "Personalized nutrition and micronutrient protocols",
          "Sleep quality analysis and improvement strategies",
          "Stress resilience and nervous system regulation",
        ],
      },
      concerns: {
        label: "Common Health Concerns",
        title: "Do these feel familiar?",
        items: {
          energy: {
            title: "Low energy, weight gain, difficulty concentrating",
            description: "These symptoms often point to metabolic imbalances, nutrient deficiencies, or hormonal shifts. A thorough functional assessment can identify the root cause and create a path to restored vitality.",
          },
          digestive: {
            title: "Digestive complaints, skin problems, bloating",
            description: "Gut health is foundational to overall wellbeing. Through targeted diagnostics and personalized protocols, we address the underlying causes of digestive discomfort and related symptoms.",
          },
          hormonal: {
            title: "Hormonal imbalances, sleep disorders, chronic stress",
            description: "The interplay between hormones, sleep, and stress forms a critical triangle. Comprehensive testing reveals the imbalances, and evidence-based interventions restore equilibrium.",
          },
        },
      },
      focus: {
        label: "Focus Areas",
        title: "Specialized expertise across key health domains",
        areas: {
          cardiovascular: {
            title: "Cardiovascular Prevention",
            description: "Advanced biomarker analysis and risk stratification for heart health optimization.",
          },
          womens: {
            title: "Women's Health & Fertility",
            description: "Hormonal balance, fertility support, and specialized care through all life stages.",
          },
          gut: {
            title: "Gut Health",
            description: "Microbiome analysis, food sensitivity testing, and targeted restoration protocols.",
          },
          autoimmune: {
            title: "Autoimmune & Inflammation",
            description: "Root-cause investigation and management of autoimmune conditions and chronic inflammation.",
          },
          performance: {
            title: "Performance Optimization",
            description: "Evidence-based protocols for executives and athletes seeking peak physical and mental performance.",
          },
          nutrition: {
            title: "Nutrition & Metabolics",
            description: "Personalized dietary strategies, micronutrient optimization, and metabolic health assessment.",
          },
        },
      },
      about: {
        label: "About",
        title: "Dr. med. Mai Wald",
        subtitle: "Physician for Functional Medicine & Longevity",
        bio: "With a foundation in conventional medicine and advanced training in functional and longevity medicine, I take a comprehensive approach to understanding each patient's unique health picture. My practice bridges evidence-based diagnostics with personalized treatment strategies.",
        philosophy: "Preventing diseases before they develop, and strengthening health sustainably — long-term, measurable, and individualized.",
        cta: "More About Me",
        education_label: "Education & Certifications",
        experience_label: "Clinical Experience",
        specializations_label: "Specializations",
      },
      corporate: {
        label: "Corporate Health",
        title: "Investing in the health of your team",
        subtitle: "Workplace wellness programs designed for companies seeking to establish a preventive health culture among employees and leadership.",
        services: {
          coaching: {
            title: "Employee Health Coaching",
            description: "Coaching on nutrition, regeneration, stress management, and sleep for employees.",
          },
          executive: {
            title: "Executive Health Programs",
            description: "Performance-focused wellbeing consulting for managers and leadership teams.",
          },
          screening: {
            title: "Preventive Screenings",
            description: "Early detection through blood testing, health questionnaires, and consultations.",
          },
          longterm: {
            title: "Long-Term Health Coaching",
            description: "Sustained behavioral change programs within the workplace.",
          },
        },
        values: [
          "Mental health treated as a medical priority",
          "Development of a health-conscious organizational culture",
          "Healthier, more motivated, less-absent employees",
          "Resilient leadership managing stress proactively",
          "Financial gains through improved performance and retention",
        ],
        cta: "Get in Touch",
      },
      contact: {
        label: "Contact",
        title: "Start your health journey",
        subtitle: "Whether you have questions or are ready to book your first consultation — I look forward to hearing from you.",
        form: {
          first_name: "First Name",
          last_name: "Last Name",
          email: "Email",
          phone: "Phone (optional)",
          message: "Your Message",
          submit: "Send Message",
          success: "Thank you! Your message has been sent successfully.",
        },
        info: {
          address_label: "Address",
          phone_label: "Phone",
          email_label: "Email",
          hours_label: "Office Hours",
          hours_practice: "Monday – Friday, 8:00 AM – 5:00 PM",
          hours_online: "Online consultations by appointment",
          hours_note: "By appointment only",
        },
      },
      newsletter: {
        title: "Evidence-based insights for more healthy years",
        subtitle: "Monthly science-based insights on functional medicine, longevity, and practical health optimization strategies.",
        cta: "Subscribe to Newsletter",
        placeholder: "Your email address",
      },
      faq: {
        label: "FAQ",
        title: "Frequently Asked Questions",
        items: {
          q1: {
            question: "What is functional medicine?",
            answer: "Functional medicine is a systems-based approach that focuses on identifying and addressing the root causes of disease. Rather than treating symptoms in isolation, it examines how different body systems — metabolism, hormones, gut health, immune function — interact and influence overall health.",
          },
          q2: {
            question: "How is this different from conventional medicine?",
            answer: "Conventional medicine excels at acute care and diagnosis. Functional medicine builds on this foundation by diving deeper into the 'why' behind symptoms. It uses advanced diagnostics, personalized nutrition, lifestyle modifications, and targeted supplementation alongside conventional treatments when needed.",
          },
          q3: {
            question: "Who benefits from functional medicine?",
            answer: "Anyone seeking to understand their health at a deeper level — whether you're dealing with chronic symptoms that haven't been resolved, want to optimize your performance, or are proactively investing in long-term health and disease prevention.",
          },
          q4: {
            question: "Are consultations available online?",
            answer: "Yes. Initial consultations, follow-ups, and ongoing health coaching are all available via telemedicine. Laboratory testing can be arranged through partner labs in your area, and results are discussed in virtual appointments.",
          },
          q5: {
            question: "Is this covered by insurance?",
            answer: "Services are typically not covered by statutory health insurance. Some private insurance plans may offer partial coverage depending on your policy terms. Most patients are self-paying. Detailed invoices are provided for potential reimbursement claims.",
          },
        },
      },
      final_cta: {
        title: "Your health, understood at its foundation",
        subtitle: "The first step is a conversation. Together, we'll develop a clear picture of your health and a personalized plan forward.",
        cta: "Book Your Consultation",
      },
      footer: {
        description: "Dr. med. Mai Wald — Physician for Functional Medicine & Longevity. Evidence-based, personalized health care for long-term wellbeing.",
        navigation: "Navigation",
        services: "Services",
        legal: "Legal",
        follow: "Follow",
        impressum: "Impressum",
        privacy: "Privacy Policy",
        cookie: "Cookie Policy",
        hours_label: "Practice Hours",
        hours: "Mon – Fri: 8:00 – 17:00",
        hours_note: "By appointment",
        rights: "All rights reserved.",
      },
    },

    de: {
      nav: {
        home: "Startseite",
        practice: "Praxis",
        corporate: "Corporate Health",
        about: "Über mich",
        contact: "Kontakt",
        book: "Termin vereinbaren",
      },
      hero: {
        label: "Funktionelle Medizin & Longevity",
        title: "Ursachen verstehen — mit evidenzbasierter Medizin.",
        subtitle: "Dr. med. Mai Wald verbindet Schulmedizin, funktionelle Medizin und Naturheilkunde, um zu untersuchen, wie Stoffwechsel, Hormone, Darm und Nervensystem für langfristige Gesundheitsstabilität zusammenwirken.",
        cta_book: "Termin vereinbaren",
        cta_learn: "Mehr erfahren",
      },
      trust: {
        individual: {
          title: "Individuelle Behandlung",
          description: "Maßgeschneidert auf deine Beschwerden und Bedürfnisse.",
        },
        holistic: {
          title: "Ganzheitlicher Ansatz",
          description: "Körper, Ernährung, Stress & Darm im Einklang.",
        },
        knowledge: {
          title: "Wissen, das hilft",
          description: "Verständlich erklärt. Wirklich anwendbar.",
        },
        heart: {
          title: "Begleitung mit Herz",
          description: "Zeit, Zuhören und echte Partnerschaft auf Augenhöhe.",
        },
      },
      services: {
        label: "Leistungen",
        title: "Individuelle Betreuung für Ihren Gesundheitsweg",
        subtitle: "Drei Wege, zugeschnitten darauf, wo Sie auf Ihrem Gesundheitsweg stehen — von der ersten Diagnostik bis zur langfristigen Optimierung.",
        cards: {
          diagnostics: {
            title: "Funktionelle & Longevity Diagnostik",
            description: "Umfassende Gesundheitsanalyse mit erweitertem Blutbild, personalisierter Therapieplan für Ernährung, Schlaf, Bewegung und Stressmanagement.",
            cta: "Mehr erfahren",
          },
          analysis: {
            title: "Analyse vorhandener Laborwerte",
            description: "Auswertung aktueller und früherer Laborergebnisse mit persönlicher Beratung zur Entwicklung individueller Gesundheitspläne. Vor Ort oder virtuell.",
            cta: "Mehr erfahren",
          },
          coaching: {
            title: "Laufende Gesundheitsbetreuung",
            description: "Langfristige, evidenzbasierte Gesundheitsbegleitung mit monatlichen Konsultationen zur Verfolgung Ihrer Gesundheitsziele. Vor Ort oder per Telemedizin.",
            cta: "Mehr erfahren",
          },
        },
      },
      benefits: {
        label: "Warum funktionelle Medizin",
        title: "Eine Medizin, die das ganze Bild betrachtet",
        subtitle: "Statt isolierte Symptome zu behandeln, untersucht die funktionelle Medizin die Zusammenhänge zwischen allen Körpersystemen, um Ursachen zu finden und zu behandeln.",
        items: [
          "Früherkennung, bevor Symptome chronisch werden",
          "Hormonelle Bewertung und gezielte Optimierung",
          "Darmgesundheitsanalyse und Mikrobiom-Optimierung",
          "Kardiovaskuläre Risikoprävention mit erweiterten Biomarkern",
          "Leistungssteigerung für Führungskräfte und Sportler",
          "Personalisierte Ernährungs- und Mikronährstoffprotokolle",
          "Schlafqualitätsanalyse und Verbesserungsstrategien",
          "Stressresilienz und Regulation des Nervensystems",
        ],
      },
      concerns: {
        label: "Häufige Gesundheitsbeschwerden",
        title: "Kommt Ihnen das bekannt vor?",
        items: {
          energy: {
            title: "Energiemangel, Gewichtszunahme, Konzentrationsschwierigkeiten",
            description: "Diese Symptome deuten oft auf metabolische Ungleichgewichte, Nährstoffmängel oder hormonelle Veränderungen hin. Eine gründliche funktionelle Analyse kann die Ursache identifizieren und einen Weg zu neuer Vitalität schaffen.",
          },
          digestive: {
            title: "Verdauungsbeschwerden, Hautprobleme, Blähungen",
            description: "Die Darmgesundheit ist fundamental für das Wohlbefinden. Durch gezielte Diagnostik und personalisierte Protokolle behandeln wir die zugrundeliegenden Ursachen von Verdauungsbeschwerden und damit verbundenen Symptomen.",
          },
          hormonal: {
            title: "Hormonelle Dysbalancen, Schlafstörungen, chronischer Stress",
            description: "Das Zusammenspiel von Hormonen, Schlaf und Stress bildet ein kritisches Dreieck. Umfassende Tests decken die Ungleichgewichte auf, und evidenzbasierte Interventionen stellen das Gleichgewicht wieder her.",
          },
        },
      },
      focus: {
        label: "Schwerpunkte",
        title: "Spezialisierte Expertise in zentralen Gesundheitsbereichen",
        areas: {
          cardiovascular: {
            title: "Kardiovaskuläre Prävention",
            description: "Erweiterte Biomarker-Analyse und Risikostratifizierung zur Optimierung der Herzgesundheit.",
          },
          womens: {
            title: "Frauengesundheit & Fertilität",
            description: "Hormonelle Balance, Kinderwunschbegleitung und spezialisierte Betreuung in allen Lebensphasen.",
          },
          gut: {
            title: "Darmgesundheit",
            description: "Mikrobiom-Analyse, Nahrungsmittelunverträglichkeitstests und gezielte Wiederherstellungsprotokolle.",
          },
          autoimmune: {
            title: "Autoimmun & Entzündung",
            description: "Ursachenforschung und Management von Autoimmunerkrankungen und chronischen Entzündungen.",
          },
          performance: {
            title: "Leistungsoptimierung",
            description: "Evidenzbasierte Protokolle für Führungskräfte und Sportler auf der Suche nach Höchstleistung.",
          },
          nutrition: {
            title: "Ernährung & Stoffwechsel",
            description: "Personalisierte Ernährungsstrategien, Mikronährstoff-Optimierung und Stoffwechselanalyse.",
          },
        },
      },
      about: {
        label: "Über mich",
        title: "Dr. med. Mai Wald",
        subtitle: "Ärztin für Funktionelle Medizin & Longevity",
        bio: "Mit einer Grundlage in der Schulmedizin und Weiterbildung in funktioneller Medizin und Longevity verfolge ich einen ganzheitlichen Ansatz, um das individuelle Gesundheitsbild jedes Patienten zu verstehen. Meine Praxis verbindet evidenzbasierte Diagnostik mit personalisierten Behandlungsstrategien.",
        philosophy: "Krankheiten verhindern, bevor sie entstehen, und Gesundheit nachhaltig stärken — langfristig, messbar und individuell.",
        cta: "Mehr über mich",
        education_label: "Ausbildung & Zertifizierungen",
        experience_label: "Klinische Erfahrung",
        specializations_label: "Spezialisierungen",
      },
      corporate: {
        label: "Corporate Health",
        title: "In die Gesundheit Ihres Teams investieren",
        subtitle: "Betriebliche Gesundheitsprogramme für Unternehmen, die eine präventive Gesundheitskultur unter Mitarbeitern und Führungskräften etablieren möchten.",
        services: {
          coaching: {
            title: "Mitarbeiter-Gesundheitscoaching",
            description: "Coaching zu Ernährung, Regeneration, Stressmanagement und Schlaf für Mitarbeiter.",
          },
          executive: {
            title: "Executive Health Programme",
            description: "Leistungsorientierte Gesundheitsberatung für Manager und Führungsteams.",
          },
          screening: {
            title: "Präventive Screenings",
            description: "Früherkennung durch Bluttests, Gesundheitsfragebögen und Konsultationen.",
          },
          longterm: {
            title: "Langfristiges Gesundheitscoaching",
            description: "Nachhaltige Verhaltensänderungsprogramme am Arbeitsplatz.",
          },
        },
        values: [
          "Psychische Gesundheit als medizinische Priorität",
          "Aufbau einer gesundheitsbewussten Unternehmenskultur",
          "Gesündere, motiviertere Mitarbeiter mit weniger Fehltagen",
          "Resiliente Führungskräfte mit proaktivem Stressmanagement",
          "Finanzielle Vorteile durch verbesserte Leistung und Mitarbeiterbindung",
        ],
        cta: "Kontakt aufnehmen",
      },
      contact: {
        label: "Kontakt",
        title: "Beginnen Sie Ihren Gesundheitsweg",
        subtitle: "Ob Sie Fragen haben oder bereit für Ihre erste Konsultation sind — ich freue mich auf Ihre Nachricht.",
        form: {
          first_name: "Vorname",
          last_name: "Nachname",
          email: "E-Mail",
          phone: "Telefon (optional)",
          message: "Ihre Nachricht",
          submit: "Nachricht senden",
          success: "Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet.",
        },
        info: {
          address_label: "Adresse",
          phone_label: "Telefon",
          email_label: "E-Mail",
          hours_label: "Sprechzeiten",
          hours_practice: "Montag – Freitag, 08:00 – 17:00 Uhr",
          hours_online: "Online-Konsultationen nach Vereinbarung",
          hours_note: "Nur nach Terminvereinbarung",
        },
      },
      newsletter: {
        title: "Fundiertes Wissen für mehr gesunde Lebensjahre",
        subtitle: "Monatliche wissenschaftsbasierte Einblicke in funktionelle Medizin, Longevity und praktische Gesundheitsoptimierung.",
        cta: "Newsletter abonnieren",
        placeholder: "Ihre E-Mail-Adresse",
      },
      faq: {
        label: "FAQ",
        title: "Häufig gestellte Fragen",
        items: {
          q1: {
            question: "Was ist funktionelle Medizin?",
            answer: "Funktionelle Medizin ist ein systembasierter Ansatz, der darauf abzielt, die Grundursachen von Krankheiten zu identifizieren und zu behandeln. Statt Symptome isoliert zu behandeln, untersucht sie, wie verschiedene Körpersysteme — Stoffwechsel, Hormone, Darmgesundheit, Immunfunktion — zusammenwirken und die Gesamtgesundheit beeinflussen.",
          },
          q2: {
            question: "Wie unterscheidet sich das von der Schulmedizin?",
            answer: "Die Schulmedizin ist hervorragend in der Akutversorgung und Diagnostik. Funktionelle Medizin baut auf dieser Grundlage auf, indem sie tiefer nach dem 'Warum' hinter den Symptomen fragt. Sie nutzt erweiterte Diagnostik, personalisierte Ernährung, Lebensstilanpassungen und gezielte Supplementierung neben konventionellen Behandlungen.",
          },
          q3: {
            question: "Wer profitiert von funktioneller Medizin?",
            answer: "Jeder, der seine Gesundheit auf einer tieferen Ebene verstehen möchte — ob Sie mit chronischen Symptomen zu kämpfen haben, Ihre Leistung optimieren oder proaktiv in langfristige Gesundheit und Krankheitsprävention investieren möchten.",
          },
          q4: {
            question: "Sind Konsultationen auch online verfügbar?",
            answer: "Ja. Erstgespräche, Nachsorge und laufendes Gesundheitscoaching sind per Telemedizin verfügbar. Laboruntersuchungen können über Partnerlabore in Ihrer Nähe organisiert werden, und die Ergebnisse werden in virtuellen Terminen besprochen.",
          },
          q5: {
            question: "Wird das von der Versicherung übernommen?",
            answer: "Die Leistungen werden in der Regel nicht von der gesetzlichen Krankenversicherung übernommen. Einige private Krankenversicherungen bieten je nach Vertragsbedingungen eine teilweise Kostenübernahme an. Die meisten Patienten sind Selbstzahler. Detaillierte Rechnungen werden für mögliche Erstattungsanträge bereitgestellt.",
          },
        },
      },
      final_cta: {
        title: "Ihre Gesundheit, an der Wurzel verstanden",
        subtitle: "Der erste Schritt ist ein Gespräch. Gemeinsam entwickeln wir ein klares Bild Ihrer Gesundheit und einen personalisierten Plan.",
        cta: "Konsultation buchen",
      },
      footer: {
        description: "Dr. med. Mai Wald — Ärztin für Funktionelle Medizin & Longevity. Evidenzbasierte, personalisierte Gesundheitsversorgung für langfristiges Wohlbefinden.",
        navigation: "Navigation",
        services: "Leistungen",
        legal: "Rechtliches",
        follow: "Folgen",
        impressum: "Impressum",
        privacy: "Datenschutz",
        cookie: "Cookie-Richtlinie",
        hours_label: "Sprechzeiten",
        hours: "Mo – Fr: 8:00 – 17:00",
        hours_note: "Nach Vereinbarung",
        rights: "Alle Rechte vorbehalten.",
      },
    },

    hr: {
      nav: {
        home: "Početna",
        practice: "Ordinacija",
        corporate: "Korporativno zdravlje",
        about: "O meni",
        contact: "Kontakt",
        book: "Naruči termin",
      },
      hero: {
        label: "Funkcionalna medicina i dugovječnost",
        title: "Razumjeti uzroke — uz medicinu temeljenu na dokazima.",
        subtitle: "Dr. med. Mai Wald spaja konvencionalnu medicinu, funkcionalnu medicinu i prirodnu medicinu kako bi istražila kako metabolizam, hormoni, probava i živčani sustav zajedno djeluju na dugoročnu stabilnost zdravlja.",
        cta_book: "Naruči termin",
        cta_learn: "Saznaj više",
      },
      trust: {
        individual: {
          title: "Individualni tretman",
          description: "Prilagođen tvojim tegobama i potrebama.",
        },
        holistic: {
          title: "Holistički pristup",
          description: "Tijelo, prehrana, stres i probava u skladu.",
        },
        knowledge: {
          title: "Znanje koje pomaže",
          description: "Razumljivo objašnjeno. Stvarno primjenjivo.",
        },
        heart: {
          title: "Pratnja sa srcem",
          description: "Vrijeme, slušanje i pravo partnerstvo na jednakoj razini.",
        },
      },
      services: {
        label: "Usluge",
        title: "Personalizirana skrb za vaš put do zdravlja",
        subtitle: "Tri pristupa prilagođena tome gdje se nalazite na svom zdravstvenom putu — od inicijalne dijagnostike do dugoročne optimizacije.",
        cards: {
          diagnostics: {
            title: "Funkcionalna i Longevity dijagnostika",
            description: "Sveobuhvatna zdravstvena analiza s proširenim laboratorijskim nalazima, personalizirani plan terapije za prehranu, san, kretanje i upravljanje stresom.",
            cta: "Saznaj više",
          },
          analysis: {
            title: "Analiza postojećih laboratorijskih nalaza",
            description: "Pregled vaših trenutnih i prethodnih laboratorijskih rezultata uz individualne konzultacije za razvoj personaliziranih zdravstvenih planova. Uživo ili online.",
            cta: "Saznaj više",
          },
          coaching: {
            title: "Dugoročno zdravstveno praćenje",
            description: "Dugoročno zdravstveno praćenje temeljeno na dokazima s mjesečnim konzultacijama i praćenjem napretka prema vašim zdravstvenim ciljevima.",
            cta: "Saznaj više",
          },
        },
      },
      benefits: {
        label: "Zašto funkcionalna medicina",
        title: "Medicina koja gleda cjelokupnu sliku",
        subtitle: "Umjesto liječenja izoliranih simptoma, funkcionalna medicina ispituje povezanosti između svih tjelesnih sustava kako bi pronašla i otklonila uzroke.",
        items: [
          "Rano otkrivanje prije nego simptomi postanu kronični",
          "Procjena hormonalne ravnoteže i ciljana optimizacija",
          "Analiza zdravlja probave i optimizacija mikrobioma",
          "Kardiovaskularna prevencija s naprednim biomarkerima",
          "Poboljšanje performansi za rukovoditelje i sportaše",
          "Personalizirani protokoli prehrane i mikronutrijenata",
          "Analiza kvalitete sna i strategije poboljšanja",
          "Otpornost na stres i regulacija živčanog sustava",
        ],
      },
      concerns: {
        label: "Česti zdravstveni problemi",
        title: "Zvuči li vam ovo poznato?",
        items: {
          energy: {
            title: "Nedostatak energije, debljanje, poteškoće s koncentracijom",
            description: "Ovi simptomi često ukazuju na metaboličke neravnoteže, nedostatke nutrijenata ili hormonalne promjene. Temeljita funkcionalna procjena može identificirati uzrok i stvoriti put do obnovljene vitalnosti.",
          },
          digestive: {
            title: "Probavne tegobe, problemi s kožom, nadutost",
            description: "Zdravlje probavnog sustava temelj je cjelokupnog blagostanja. Ciljanom dijagnostikom i personaliziranim protokolima rješavamo temeljne uzroke probavnih tegoba i povezanih simptoma.",
          },
          hormonal: {
            title: "Hormonalne neravnoteže, poremećaji sna, kronični stres",
            description: "Međusobno djelovanje hormona, sna i stresa čini kritični trokut. Sveobuhvatno testiranje otkriva neravnoteže, a intervencije temeljene na dokazima vraćaju ravnotežu.",
          },
        },
      },
      focus: {
        label: "Područja rada",
        title: "Specijalizirana ekspertiza u ključnim zdravstvenim područjima",
        areas: {
          cardiovascular: {
            title: "Kardiovaskularna prevencija",
            description: "Napredna analiza biomarkera i stratifikacija rizika za optimizaciju zdravlja srca.",
          },
          womens: {
            title: "Žensko zdravlje i fertilitet",
            description: "Hormonalna ravnoteža, podrška plodnosti i specijalizirana skrb kroz sve životne faze.",
          },
          gut: {
            title: "Zdravlje probave",
            description: "Analiza mikrobioma, testiranje osjetljivosti na hranu i ciljani protokoli obnove.",
          },
          autoimmune: {
            title: "Autoimune bolesti i upale",
            description: "Istraživanje uzroka i upravljanje autoimunim stanjima i kroničnim upalama.",
          },
          performance: {
            title: "Optimizacija performansi",
            description: "Protokoli temeljeni na dokazima za rukovoditelje i sportaše koji teže vrhunskim performansama.",
          },
          nutrition: {
            title: "Prehrana i metabolizam",
            description: "Personalizirane prehrambene strategije, optimizacija mikronutrijenata i procjena metaboličkog zdravlja.",
          },
        },
      },
      about: {
        label: "O meni",
        title: "Dr. med. Mai Wald",
        subtitle: "Liječnica za funkcionalnu medicinu i dugovječnost",
        bio: "S temeljima u konvencionalnoj medicini i naprednom edukacijom u funkcionalnoj medicini i dugovječnosti, primjenjujem sveobuhvatan pristup razumijevanju jedinstvene zdravstvene slike svakog pacijenta. Moja praksa spaja dijagnostiku temeljenu na dokazima s personaliziranim strategijama liječenja.",
        philosophy: "Spriječiti bolesti prije nego se razviju i trajno ojačati zdravlje — dugoročno, mjerljivo i individualno.",
        cta: "Više o meni",
        education_label: "Obrazovanje i certifikati",
        experience_label: "Kliničko iskustvo",
        specializations_label: "Specijalizacije",
      },
      corporate: {
        label: "Korporativno zdravlje",
        title: "Ulaganje u zdravlje vašeg tima",
        subtitle: "Programi zdravlja na radnom mjestu za tvrtke koje žele uspostaviti preventivnu zdravstvenu kulturu među zaposlenicima i vodstvom.",
        services: {
          coaching: {
            title: "Zdravstveni coaching za zaposlenike",
            description: "Coaching o prehrani, regeneraciji, upravljanju stresom i snu za zaposlenike.",
          },
          executive: {
            title: "Executive Health programi",
            description: "Savjetovanje o zdravlju usmjereno na performanse za menadžere i vodstvene timove.",
          },
          screening: {
            title: "Preventivni pregledi",
            description: "Rano otkrivanje kroz krvne pretrage, zdravstvene upitnike i konzultacije.",
          },
          longterm: {
            title: "Dugoročni zdravstveni coaching",
            description: "Održivi programi promjene ponašanja na radnom mjestu.",
          },
        },
        values: [
          "Mentalno zdravlje kao medicinski prioritet",
          "Razvoj zdravstveno osviještene organizacijske kulture",
          "Zdraviji, motiviraniji zaposlenici s manje izostanaka",
          "Otporno vodstvo koje proaktivno upravlja stresom",
          "Financijski dobici kroz poboljšane performanse i zadržavanje zaposlenika",
        ],
        cta: "Kontaktirajte nas",
      },
      contact: {
        label: "Kontakt",
        title: "Započnite svoj put do zdravlja",
        subtitle: "Bilo da imate pitanja ili ste spremni za prvu konzultaciju — radujem se vašoj poruci.",
        form: {
          first_name: "Ime",
          last_name: "Prezime",
          email: "E-mail",
          phone: "Telefon (neobavezno)",
          message: "Vaša poruka",
          submit: "Pošalji poruku",
          success: "Hvala! Vaša poruka je uspješno poslana.",
        },
        info: {
          address_label: "Adresa",
          phone_label: "Telefon",
          email_label: "E-mail",
          hours_label: "Radno vrijeme",
          hours_practice: "Ponedjeljak – Petak, 08:00 – 17:00",
          hours_online: "Online konzultacije po dogovoru",
          hours_note: "Samo uz prethodnu najavu",
        },
      },
      newsletter: {
        title: "Znanje temeljeno na dokazima za više zdravih godina",
        subtitle: "Mjesečni znanstveni uvidi o funkcionalnoj medicini, dugovječnosti i praktičnim strategijama optimizacije zdravlja.",
        cta: "Pretplatite se",
        placeholder: "Vaša e-mail adresa",
      },
      faq: {
        label: "Česta pitanja",
        title: "Često postavljana pitanja",
        items: {
          q1: {
            question: "Što je funkcionalna medicina?",
            answer: "Funkcionalna medicina je sustavni pristup koji se fokusira na identificiranje i rješavanje temeljnih uzroka bolesti. Umjesto izoliranog liječenja simptoma, ispituje kako različiti tjelesni sustavi — metabolizam, hormoni, zdravlje probave, imunološka funkcija — međusobno djeluju i utječu na cjelokupno zdravlje.",
          },
          q2: {
            question: "Kako se to razlikuje od konvencionalne medicine?",
            answer: "Konvencionalna medicina izvrsna je u akutnoj skrbi i dijagnostici. Funkcionalna medicina nadograđuje taj temelj dublje istražujući 'zašto' iza simptoma. Koristi naprednu dijagnostiku, personaliziranu prehranu, prilagodbe životnog stila i ciljanu suplementaciju uz konvencionalne tretmane.",
          },
          q3: {
            question: "Tko ima koristi od funkcionalne medicine?",
            answer: "Svatko tko želi razumjeti svoje zdravlje na dubljoj razini — bilo da se nosite s kroničnim simptomima, želite optimizirati performanse ili proaktivno ulažete u dugoročno zdravlje i prevenciju bolesti.",
          },
          q4: {
            question: "Jesu li konzultacije dostupne online?",
            answer: "Da. Inicijalne konzultacije, kontrole i kontinuirani zdravstveni coaching dostupni su putem telemedicine. Laboratorijska testiranja mogu se organizirati kroz partnerske laboratorije u vašoj blizini, a rezultati se diskutiraju na virtualnim terminima.",
          },
          q5: {
            question: "Pokriva li to osiguranje?",
            answer: "Usluge obično nisu pokrivene obveznim zdravstvenim osiguranjem. Neka privatna osiguranja mogu ponuditi djelomično pokriće ovisno o uvjetima polise. Većina pacijenata su samoplatiše. Detaljni računi se izdaju za moguće zahtjeve za povrat troškova.",
          },
        },
      },
      final_cta: {
        title: "Vaše zdravlje, shvaćeno u korijenu",
        subtitle: "Prvi korak je razgovor. Zajedno ćemo razviti jasnu sliku vašeg zdravlja i personalizirani plan naprijed.",
        cta: "Zakažite konzultaciju",
      },
      footer: {
        description: "Dr. med. Mai Wald — Liječnica za funkcionalnu medicinu i dugovječnost. Zdravstvena skrb temeljena na dokazima za dugoročno blagostanje.",
        navigation: "Navigacija",
        services: "Usluge",
        legal: "Pravno",
        follow: "Pratite nas",
        impressum: "Impressum",
        privacy: "Privatnost",
        cookie: "Kolačići",
        hours_label: "Radno vrijeme",
        hours: "Pon – Pet: 8:00 – 17:00",
        hours_note: "Po dogovoru",
        rights: "Sva prava pridržana.",
      },
    },

    it: {
      nav: {
        home: "Home",
        practice: "Studio",
        corporate: "Corporate Health",
        about: "Chi sono",
        contact: "Contatti",
        book: "Prenota appuntamento",
      },
      hero: {
        label: "Medicina Funzionale & Longevity",
        title: "Comprendere le cause — con la medicina basata sulle evidenze.",
        subtitle: "La Dr.ssa Mai Wald combina medicina convenzionale, medicina funzionale e naturopatia per esaminare come metabolismo, ormoni, intestino e sistema nervoso collaborano per la stabilità della salute a lungo termine.",
        cta_book: "Prenota appuntamento",
        cta_learn: "Scopri di più",
      },
      trust: {
        individual: {
          title: "Trattamento individuale",
          description: "Su misura per i tuoi disturbi e le tue esigenze.",
        },
        holistic: {
          title: "Approccio olistico",
          description: "Corpo, nutrizione, stress e intestino in armonia.",
        },
        knowledge: {
          title: "Conoscenza che aiuta",
          description: "Spiegata chiaramente. Davvero applicabile.",
        },
        heart: {
          title: "Cura con il cuore",
          description: "Tempo, ascolto e vera partnership alla pari.",
        },
      },
      services: {
        label: "Servizi",
        title: "Cure personalizzate per il tuo percorso di salute",
        subtitle: "Tre percorsi distinti su misura per il punto in cui ti trovi nel tuo percorso di salute — dalla diagnostica iniziale all'ottimizzazione a lungo termine.",
        cards: {
          diagnostics: {
            title: "Diagnostica Funzionale & Longevity",
            description: "Analisi sanitaria completa con esami del sangue approfonditi, piano terapeutico personalizzato per nutrizione, sonno, movimento e gestione dello stress.",
            cta: "Scopri di più",
          },
          analysis: {
            title: "Analisi dei valori di laboratorio esistenti",
            description: "Revisione dei risultati di laboratorio attuali e precedenti con consulenze individuali per sviluppare piani sanitari personalizzati. Di persona o virtualmente.",
            cta: "Scopri di più",
          },
          coaching: {
            title: "Gestione sanitaria continuativa",
            description: "Coaching sanitario a lungo termine basato sulle evidenze con consulenze mensili per monitorare i progressi verso i tuoi obiettivi di salute.",
            cta: "Scopri di più",
          },
        },
      },
      benefits: {
        label: "Perché la medicina funzionale",
        title: "Una medicina che guarda il quadro completo",
        subtitle: "Invece di trattare sintomi isolati, la medicina funzionale esamina le connessioni tra tutti i sistemi corporei per trovare e affrontare le cause profonde.",
        items: [
          "Rilevamento precoce prima che i sintomi diventino cronici",
          "Valutazione dell'equilibrio ormonale e ottimizzazione mirata",
          "Analisi della salute intestinale e ottimizzazione del microbioma",
          "Prevenzione del rischio cardiovascolare con biomarcatori avanzati",
          "Miglioramento delle prestazioni per dirigenti e atleti",
          "Protocolli personalizzati di nutrizione e micronutrienti",
          "Analisi della qualità del sonno e strategie di miglioramento",
          "Resilienza allo stress e regolazione del sistema nervoso",
        ],
      },
      concerns: {
        label: "Problemi di salute comuni",
        title: "Ti suona familiare?",
        items: {
          energy: {
            title: "Poca energia, aumento di peso, difficoltà di concentrazione",
            description: "Questi sintomi spesso indicano squilibri metabolici, carenze nutrizionali o cambiamenti ormonali. Una valutazione funzionale approfondita può identificare la causa e creare un percorso verso una vitalità rinnovata.",
          },
          digestive: {
            title: "Disturbi digestivi, problemi cutanei, gonfiore",
            description: "La salute intestinale è fondamentale per il benessere generale. Attraverso diagnostica mirata e protocolli personalizzati, affrontiamo le cause sottostanti dei disturbi digestivi e dei sintomi correlati.",
          },
          hormonal: {
            title: "Squilibri ormonali, disturbi del sonno, stress cronico",
            description: "L'interazione tra ormoni, sonno e stress forma un triangolo critico. Test completi rivelano gli squilibri e interventi basati sulle evidenze ripristinano l'equilibrio.",
          },
        },
      },
      focus: {
        label: "Aree di specializzazione",
        title: "Competenza specializzata nei principali ambiti della salute",
        areas: {
          cardiovascular: {
            title: "Prevenzione Cardiovascolare",
            description: "Analisi avanzata dei biomarcatori e stratificazione del rischio per l'ottimizzazione della salute cardiaca.",
          },
          womens: {
            title: "Salute Femminile & Fertilità",
            description: "Equilibrio ormonale, supporto alla fertilità e cure specializzate in tutte le fasi della vita.",
          },
          gut: {
            title: "Salute Intestinale",
            description: "Analisi del microbioma, test di sensibilità alimentare e protocolli di ripristino mirati.",
          },
          autoimmune: {
            title: "Autoimmunità & Infiammazione",
            description: "Indagine sulle cause profonde e gestione delle condizioni autoimmuni e dell'infiammazione cronica.",
          },
          performance: {
            title: "Ottimizzazione delle Prestazioni",
            description: "Protocolli basati sulle evidenze per dirigenti e atleti che cercano prestazioni fisiche e mentali ottimali.",
          },
          nutrition: {
            title: "Nutrizione & Metabolismo",
            description: "Strategie dietetiche personalizzate, ottimizzazione dei micronutrienti e valutazione della salute metabolica.",
          },
        },
      },
      about: {
        label: "Chi sono",
        title: "Dr.ssa Mai Wald",
        subtitle: "Medico di Medicina Funzionale & Longevity",
        bio: "Con una formazione in medicina convenzionale e specializzazione in medicina funzionale e longevity, adotto un approccio completo per comprendere il quadro sanitario unico di ogni paziente. Il mio studio unisce diagnostica basata sulle evidenze con strategie di trattamento personalizzate.",
        philosophy: "Prevenire le malattie prima che si sviluppino e rafforzare la salute in modo sostenibile — a lungo termine, misurabile e individualizzato.",
        cta: "Scopri di più su di me",
        education_label: "Formazione e Certificazioni",
        experience_label: "Esperienza Clinica",
        specializations_label: "Specializzazioni",
      },
      corporate: {
        label: "Corporate Health",
        title: "Investire nella salute del tuo team",
        subtitle: "Programmi di benessere aziendale per aziende che vogliono stabilire una cultura della salute preventiva tra dipendenti e dirigenti.",
        services: {
          coaching: {
            title: "Coaching Salute Dipendenti",
            description: "Coaching su nutrizione, rigenerazione, gestione dello stress e sonno per i dipendenti.",
          },
          executive: {
            title: "Programmi Executive Health",
            description: "Consulenza benessere orientata alle prestazioni per manager e team dirigenziali.",
          },
          screening: {
            title: "Screening Preventivi",
            description: "Rilevamento precoce attraverso esami del sangue, questionari sanitari e consulenze.",
          },
          longterm: {
            title: "Coaching Sanitario a Lungo Termine",
            description: "Programmi sostenibili di cambiamento comportamentale sul posto di lavoro.",
          },
        },
        values: [
          "Salute mentale trattata come priorità medica",
          "Sviluppo di una cultura organizzativa attenta alla salute",
          "Dipendenti più sani, motivati e meno assenti",
          "Leadership resiliente con gestione proattiva dello stress",
          "Vantaggi finanziari attraverso prestazioni migliori e fidelizzazione",
        ],
        cta: "Contattaci",
      },
      contact: {
        label: "Contatti",
        title: "Inizia il tuo percorso di salute",
        subtitle: "Che tu abbia domande o sia pronto per la tua prima consulenza — non vedo l'ora di sentirti.",
        form: {
          first_name: "Nome",
          last_name: "Cognome",
          email: "Email",
          phone: "Telefono (opzionale)",
          message: "Il tuo messaggio",
          submit: "Invia messaggio",
          success: "Grazie! Il tuo messaggio è stato inviato con successo.",
        },
        info: {
          address_label: "Indirizzo",
          phone_label: "Telefono",
          email_label: "Email",
          hours_label: "Orari di apertura",
          hours_practice: "Lunedì – Venerdì, 08:00 – 17:00",
          hours_online: "Consulenze online su appuntamento",
          hours_note: "Solo su appuntamento",
        },
      },
      newsletter: {
        title: "Conoscenze basate sulle evidenze per più anni di vita sana",
        subtitle: "Approfondimenti mensili basati sulla scienza su medicina funzionale, longevity e strategie pratiche di ottimizzazione della salute.",
        cta: "Iscriviti alla newsletter",
        placeholder: "Il tuo indirizzo email",
      },
      faq: {
        label: "FAQ",
        title: "Domande Frequenti",
        items: {
          q1: {
            question: "Cos'è la medicina funzionale?",
            answer: "La medicina funzionale è un approccio sistemico che si concentra sull'identificazione e il trattamento delle cause profonde delle malattie. Invece di trattare i sintomi isolatamente, esamina come i diversi sistemi corporei — metabolismo, ormoni, salute intestinale, funzione immunitaria — interagiscono e influenzano la salute generale.",
          },
          q2: {
            question: "In cosa si differenzia dalla medicina convenzionale?",
            answer: "La medicina convenzionale eccelle nella cura acuta e nella diagnosi. La medicina funzionale si basa su questa base approfondendo il 'perché' dietro i sintomi. Utilizza diagnostica avanzata, nutrizione personalizzata, modifiche dello stile di vita e integrazione mirata insieme ai trattamenti convenzionali.",
          },
          q3: {
            question: "Chi beneficia della medicina funzionale?",
            answer: "Chiunque cerchi di comprendere la propria salute a un livello più profondo — che tu stia affrontando sintomi cronici irrisolti, voglia ottimizzare le tue prestazioni o stia investendo proattivamente nella salute a lungo termine e nella prevenzione delle malattie.",
          },
          q4: {
            question: "Le consulenze sono disponibili online?",
            answer: "Sì. Consulenze iniziali, follow-up e coaching sanitario continuativo sono disponibili tramite telemedicina. I test di laboratorio possono essere organizzati presso laboratori partner nella tua zona e i risultati vengono discussi in appuntamenti virtuali.",
          },
          q5: {
            question: "È coperto dall'assicurazione?",
            answer: "I servizi in genere non sono coperti dall'assicurazione sanitaria obbligatoria. Alcune assicurazioni private possono offrire una copertura parziale a seconda dei termini della polizza. La maggior parte dei pazienti paga privatamente. Vengono fornite fatture dettagliate per eventuali richieste di rimborso.",
          },
        },
      },
      final_cta: {
        title: "La tua salute, compresa alla radice",
        subtitle: "Il primo passo è una conversazione. Insieme svilupperemo un quadro chiaro della tua salute e un piano personalizzato.",
        cta: "Prenota la tua consulenza",
      },
      footer: {
        description: "Dr.ssa Mai Wald — Medico di Medicina Funzionale & Longevity. Assistenza sanitaria personalizzata e basata sulle evidenze per il benessere a lungo termine.",
        navigation: "Navigazione",
        services: "Servizi",
        legal: "Legale",
        follow: "Seguici",
        impressum: "Impressum",
        privacy: "Privacy",
        cookie: "Cookie Policy",
        hours_label: "Orari dello studio",
        hours: "Lun – Ven: 8:00 – 17:00",
        hours_note: "Su appuntamento",
        rights: "Tutti i diritti riservati.",
      },
    },
  },
}));
