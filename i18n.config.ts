export default defineI18nConfig(() => ({
  legacy: false,
  locale: "de",
  messages: {
    en: {
      nav: {
        home: "Home",
        practice: "Practice",
        about: "About",
        contact: "Contact",
        book: "Book Appointment",
      },
      hero: {
        label: "Gut Health & IBS",
        title: "Understand IBS. Change your life.",
        subtitle: "Dr. med. Mai Wald specializes in irritable bowel syndrome and gut health. With functional medicine, targeted diagnostics, and personalized treatment plans, she helps you get to the root of your digestive issues.",
        cta_book: "Book Appointment",
        cta_learn: "Learn More",
      },
      trust: {
        individual: {
          title: "Individual Treatment",
          description: "Tailored to your symptoms and gut health needs.",
        },
        holistic: {
          title: "Holistic Approach",
          description: "Nutrition, microbiome, stress & gut in harmony.",
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
        title: "Your path to better gut health",
        subtitle: "Three pathways tailored to where you are — from initial gut assessment to long-term digestive health management.",
        cards: {
          diagnostics: {
            title: "Comprehensive Gut Diagnostics",
            description: "In-depth analysis of your digestive health including stool testing, microbiome analysis, food reactivity panels, and personalized therapy planning.",
            cta: "Learn More",
          },
          analysis: {
            title: "Analysis of Existing Results",
            description: "Review of your current and previous lab results with one-on-one consultation to develop an individualized gut health plan. Available in-person or virtually.",
            cta: "Learn More",
          },
          coaching: {
            title: "Ongoing Gut Health Coaching",
            description: "Long-term support with monthly consultations tracking your digestive health progress. Dietary guidance, protocol adjustments, and symptom monitoring.",
            cta: "Learn More",
          },
        },
      },
      benefits: {
        label: "Why Functional Gut Medicine",
        title: "Getting to the root of digestive issues",
        subtitle: "Instead of just managing symptoms, we investigate the underlying causes of your gut problems — from microbiome imbalances to food reactions and stress-related dysfunction.",
        items: [
          "Comprehensive stool and microbiome analysis",
          "Identification of food intolerances and sensitivities",
          "SIBO testing and targeted treatment protocols",
          "Gut barrier function assessment (leaky gut)",
          "Gut-brain axis evaluation and stress management",
          "Personalized nutrition and elimination diet plans",
          "Targeted probiotic and supplement protocols",
          "Long-term digestive health optimization",
        ],
      },
      concerns: {
        label: "Common Gut Health Concerns",
        title: "Do these feel familiar?",
        items: {
          energy: {
            title: "Bloating, gas, and abdominal pain after meals",
            description: "These symptoms often point to imbalances in your gut flora, food intolerances, or conditions like SIBO. Targeted diagnostics can identify the exact triggers and a personalized plan brings lasting relief.",
          },
          digestive: {
            title: "Irregular bowel movements, diarrhea, or constipation",
            description: "Whether alternating between diarrhea and constipation or dealing with one consistently — these patterns reveal important clues about your gut health. Functional testing helps us understand what's driving the dysfunction.",
          },
          hormonal: {
            title: "Fatigue, brain fog, and skin problems linked to digestion",
            description: "Your gut influences far more than digestion — from energy levels and mental clarity to skin health. When gut function is impaired, the effects ripple throughout your entire body.",
          },
        },
      },
      focus: {
        label: "Focus Areas",
        title: "Specialized expertise in gut health",
        areas: {
          ibs: {
            title: "Irritable Bowel Syndrome",
            description: "Evidence-based IBS diagnosis and individualized treatment combining dietary, lifestyle, and targeted therapeutic approaches.",
          },
          sibo: {
            title: "SIBO",
            description: "Small intestinal bacterial overgrowth testing, breath tests, and structured eradication and prevention protocols.",
          },
          microbiome: {
            title: "Microbiome Analysis",
            description: "Comprehensive stool diagnostics to assess your gut flora composition and develop targeted restoration strategies.",
          },
          food: {
            title: "Food Intolerances",
            description: "Systematic identification of food triggers through testing and guided elimination diets for lasting symptom control.",
          },
          gutbrain: {
            title: "Gut-Brain Axis",
            description: "Understanding the connection between digestive health, stress, mood, and cognitive function for holistic treatment.",
          },
          leakygut: {
            title: "Intestinal Barrier",
            description: "Assessment and treatment of increased intestinal permeability and its systemic effects on health.",
          },
        },
      },
      about: {
        label: "About",
        title: "Dr. med. Mai Wald",
        subtitle: "Physician specializing in Gut Health & IBS",
        bio: "With a foundation in conventional medicine and advanced training in functional medicine, I focus on understanding and treating digestive disorders at their root. My practice combines evidence-based diagnostics with personalized gut health strategies.",
        philosophy: "Understanding the gut means understanding health. My goal is to help you regain control of your digestion — sustainably, individually, and based on evidence.",
        cta: "More About Me",
        education_label: "Education & Certifications",
        experience_label: "Clinical Experience",
        specializations_label: "Specializations",
      },
      contact: {
        label: "Contact",
        title: "Start your gut health journey",
        subtitle: "Whether you have questions about IBS, gut diagnostics, or are ready to book your first consultation — I look forward to hearing from you.",
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
        title: "Evidence-based insights for better gut health",
        subtitle: "Monthly science-based insights on IBS, microbiome health, and practical strategies for lasting digestive wellness.",
        cta: "Subscribe to Newsletter",
        placeholder: "Your email address",
      },
      faq: {
        label: "FAQ",
        title: "Frequently Asked Questions",
        items: {
          q1: {
            question: "What is irritable bowel syndrome (IBS)?",
            answer: "IBS is a functional gastrointestinal disorder characterized by recurring abdominal pain, bloating, and changes in bowel habits. It affects up to 15% of the population. While conventional medicine often treats symptoms alone, functional medicine investigates the underlying causes — from microbiome imbalances to food sensitivities and stress.",
          },
          q2: {
            question: "How do you diagnose and treat gut issues?",
            answer: "We use comprehensive diagnostics including stool analysis, microbiome testing, breath tests for SIBO, food reactivity panels, and intestinal permeability assessment. Treatment is always individualized and may include dietary modifications, targeted supplementation, stress management, and when necessary, pharmaceutical interventions.",
          },
          q3: {
            question: "How long does it take to see improvement?",
            answer: "Many patients notice initial improvements within 4-6 weeks of starting their personalized protocol. However, sustainable gut health restoration typically requires 3-6 months of consistent work. Complex cases like longstanding IBS or SIBO may take longer. We track progress with regular check-ins and adjust as needed.",
          },
          q4: {
            question: "Are consultations available online?",
            answer: "Yes. Initial consultations, follow-ups, and ongoing gut health coaching are all available via telemedicine. Laboratory testing can be arranged through partner labs in your area, and results are discussed in virtual appointments.",
          },
          q5: {
            question: "Is this covered by insurance?",
            answer: "Services are typically not covered by statutory health insurance. Some private insurance plans may offer partial coverage depending on your policy terms. Most patients are self-paying. Detailed invoices are provided for potential reimbursement claims.",
          },
        },
      },
      final_cta: {
        title: "Your gut health, understood at its root",
        subtitle: "The first step is a conversation. Together, we'll develop a clear picture of your digestive health and a personalized plan forward.",
        cta: "Book Your Consultation",
      },
      footer: {
        description: "Dr. med. Mai Wald — Physician specializing in gut health & IBS. Evidence-based, personalized digestive health care.",
        navigation: "Navigation",
        services: "Focus Areas",
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
        about: "Über mich",
        contact: "Kontakt",
        book: "Termin vereinbaren",
      },
      hero: {
        label: "Darmgesundheit & Reizdarm",
        title: "Reizdarm verstehen. Leben verändern.",
        subtitle: "Dr. med. Mai Wald ist spezialisiert auf Reizdarmsyndrom und Darmgesundheit. Mit funktioneller Medizin, gezielter Diagnostik und individuellen Therapieplänen hilft sie Ihnen, die Ursachen Ihrer Verdauungsbeschwerden zu finden.",
        cta_book: "Termin vereinbaren",
        cta_learn: "Mehr erfahren",
      },
      trust: {
        individual: {
          title: "Individuelle Behandlung",
          description: "Maßgeschneidert auf Ihre Beschwerden und Darmsituation.",
        },
        holistic: {
          title: "Ganzheitlicher Ansatz",
          description: "Ernährung, Mikrobiom, Stress & Darm im Einklang.",
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
        title: "Ihr Weg zu besserer Darmgesundheit",
        subtitle: "Drei Wege, zugeschnitten darauf, wo Sie stehen — von der ersten Darm-Diagnostik bis zur langfristigen Betreuung.",
        cards: {
          diagnostics: {
            title: "Umfassende Darm-Diagnostik",
            description: "Tiefgehende Analyse Ihrer Darmgesundheit inkl. Stuhldiagnostik, Mikrobiom-Analyse, Nahrungsmittel-Reaktivitätspanels und individueller Therapieplanung.",
            cta: "Mehr erfahren",
          },
          analysis: {
            title: "Analyse vorhandener Befunde",
            description: "Auswertung aktueller und früherer Laborergebnisse mit persönlicher Beratung zur Entwicklung eines individuellen Darmgesundheitsplans. Vor Ort oder virtuell.",
            cta: "Mehr erfahren",
          },
          coaching: {
            title: "Laufende Darmgesundheits-Betreuung",
            description: "Langfristige Begleitung mit monatlichen Konsultationen, Ernährungsberatung, Protokollanpassungen und Symptom-Monitoring.",
            cta: "Mehr erfahren",
          },
        },
      },
      benefits: {
        label: "Warum funktionelle Darmmedizin",
        title: "Den Ursachen von Darmproblemen auf den Grund gehen",
        subtitle: "Statt nur Symptome zu managen, untersuchen wir die zugrundeliegenden Ursachen Ihrer Darmprobleme — von Mikrobiom-Dysbiosen bis zu Nahrungsmittelreaktionen und stressbedingten Störungen.",
        items: [
          "Umfassende Stuhl- und Mikrobiom-Analyse",
          "Identifikation von Nahrungsmittelunverträglichkeiten",
          "SIBO-Diagnostik und gezielte Behandlungsprotokolle",
          "Beurteilung der Darmbarriere-Funktion (Leaky Gut)",
          "Darm-Hirn-Achsen-Evaluation und Stressmanagement",
          "Personalisierte Ernährungs- und Eliminationsdiät-Pläne",
          "Gezielte Probiotika- und Supplement-Protokolle",
          "Langfristige Optimierung der Verdauungsgesundheit",
        ],
      },
      concerns: {
        label: "Häufige Darmbeschwerden",
        title: "Kommt Ihnen das bekannt vor?",
        items: {
          energy: {
            title: "Blähungen, Völlegefühl und Bauchschmerzen nach dem Essen",
            description: "Diese Symptome deuten oft auf Ungleichgewichte in der Darmflora, Nahrungsmittelunverträglichkeiten oder Zustände wie SIBO hin. Gezielte Diagnostik identifiziert die genauen Auslöser, und ein individueller Plan bringt nachhaltige Linderung.",
          },
          digestive: {
            title: "Unregelmäßiger Stuhlgang, Durchfall oder Verstopfung",
            description: "Ob wechselnd zwischen Durchfall und Verstopfung oder dauerhaft eines davon — diese Muster liefern wichtige Hinweise auf Ihre Darmgesundheit. Funktionelle Diagnostik hilft uns zu verstehen, was die Störung antreibt.",
          },
          hormonal: {
            title: "Müdigkeit, Brain Fog und Hautprobleme durch den Darm",
            description: "Ihr Darm beeinflusst weit mehr als die Verdauung — von Energielevel und mentaler Klarheit bis zur Hautgesundheit. Wenn die Darmfunktion gestört ist, wirkt sich das auf den gesamten Körper aus.",
          },
        },
      },
      focus: {
        label: "Schwerpunkte",
        title: "Spezialisierte Expertise in Darmgesundheit",
        areas: {
          ibs: {
            title: "Reizdarmsyndrom",
            description: "Evidenzbasierte Reizdarm-Diagnostik und individuelle Behandlung mit Ernährungs-, Lebensstil- und therapeutischen Ansätzen.",
          },
          sibo: {
            title: "SIBO",
            description: "Dünndarm-Fehlbesiedlung: Atemtests, strukturierte Eradikations- und Präventionsprotokolle.",
          },
          microbiome: {
            title: "Mikrobiom-Analyse",
            description: "Umfassende Stuhldiagnostik zur Beurteilung Ihrer Darmflora und Entwicklung gezielter Wiederherstellungsstrategien.",
          },
          food: {
            title: "Nahrungsmittelunverträglichkeiten",
            description: "Systematische Identifikation von Nahrungsmittel-Triggern durch Tests und begleitete Eliminationsdiäten.",
          },
          gutbrain: {
            title: "Darm-Hirn-Achse",
            description: "Verständnis der Verbindung zwischen Darmgesundheit, Stress, Stimmung und kognitiver Funktion.",
          },
          leakygut: {
            title: "Darmbarriere",
            description: "Beurteilung und Behandlung erhöhter Darmpermeabilität und deren systemische Auswirkungen.",
          },
        },
      },
      about: {
        label: "Über mich",
        title: "Dr. med. Mai Wald",
        subtitle: "Ärztin für Darmgesundheit & Reizdarm",
        bio: "Mit einer Grundlage in der Schulmedizin und Weiterbildung in funktioneller Medizin konzentriere ich mich darauf, Verdauungsstörungen an der Wurzel zu verstehen und zu behandeln. Meine Praxis verbindet evidenzbasierte Diagnostik mit personalisierten Darmgesundheitsstrategien.",
        philosophy: "Den Darm verstehen heißt Gesundheit verstehen. Mein Ziel ist es, Ihnen zu helfen, die Kontrolle über Ihre Verdauung zurückzugewinnen — nachhaltig, individuell und evidenzbasiert.",
        cta: "Mehr über mich",
        education_label: "Ausbildung & Zertifizierungen",
        experience_label: "Klinische Erfahrung",
        specializations_label: "Spezialisierungen",
      },
      contact: {
        label: "Kontakt",
        title: "Starten Sie Ihren Weg zu besserer Darmgesundheit",
        subtitle: "Ob Sie Fragen zum Reizdarm, zur Darm-Diagnostik haben oder bereit für Ihre erste Konsultation sind — ich freue mich auf Ihre Nachricht.",
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
        title: "Fundiertes Wissen für bessere Darmgesundheit",
        subtitle: "Monatliche wissenschaftsbasierte Einblicke zu Reizdarm, Mikrobiom und praktische Strategien für nachhaltige Verdauungsgesundheit.",
        cta: "Newsletter abonnieren",
        placeholder: "Ihre E-Mail-Adresse",
      },
      faq: {
        label: "FAQ",
        title: "Häufig gestellte Fragen",
        items: {
          q1: {
            question: "Was ist das Reizdarmsyndrom (RDS)?",
            answer: "Das Reizdarmsyndrom ist eine funktionelle Magen-Darm-Erkrankung mit wiederkehrenden Bauchschmerzen, Blähungen und veränderten Stuhlgewohnheiten. Bis zu 15% der Bevölkerung sind betroffen. Während die Schulmedizin oft nur Symptome behandelt, untersucht die funktionelle Medizin die zugrundeliegenden Ursachen — von Mikrobiom-Ungleichgewichten bis zu Nahrungsmittelreaktionen und Stress.",
          },
          q2: {
            question: "Wie werden Darmprobleme diagnostiziert und behandelt?",
            answer: "Wir nutzen umfassende Diagnostik: Stuhlanalyse, Mikrobiom-Tests, Atemtests auf SIBO, Nahrungsmittel-Reaktivitätspanels und Darmpermeabilitäts-Beurteilung. Die Behandlung ist immer individuell und kann Ernährungsumstellungen, gezielte Supplementierung, Stressmanagement und bei Bedarf medikamentöse Therapie umfassen.",
          },
          q3: {
            question: "Wie schnell kann man Verbesserungen erwarten?",
            answer: "Viele Patienten bemerken erste Verbesserungen innerhalb von 4-6 Wochen nach Beginn ihres personalisierten Protokolls. Nachhaltige Darmgesundheit erfordert jedoch typischerweise 3-6 Monate konsequenter Arbeit. Komplexe Fälle wie langjähriger Reizdarm oder SIBO können länger dauern. Wir verfolgen den Fortschritt mit regelmäßigen Check-ins.",
          },
          q4: {
            question: "Sind Konsultationen auch online verfügbar?",
            answer: "Ja. Erstgespräche, Nachsorge und laufendes Darmgesundheits-Coaching sind per Telemedizin verfügbar. Laboruntersuchungen können über Partnerlabore in Ihrer Nähe organisiert werden, und die Ergebnisse werden in virtuellen Terminen besprochen.",
          },
          q5: {
            question: "Wird das von der Versicherung übernommen?",
            answer: "Die Leistungen werden in der Regel nicht von der gesetzlichen Krankenversicherung übernommen. Einige private Krankenversicherungen bieten je nach Vertragsbedingungen eine teilweise Kostenübernahme an. Die meisten Patienten sind Selbstzahler. Detaillierte Rechnungen werden für mögliche Erstattungsanträge bereitgestellt.",
          },
        },
      },
      final_cta: {
        title: "Ihre Darmgesundheit, an der Wurzel verstanden",
        subtitle: "Der erste Schritt ist ein Gespräch. Gemeinsam entwickeln wir ein klares Bild Ihrer Verdauungsgesundheit und einen personalisierten Plan.",
        cta: "Konsultation buchen",
      },
      footer: {
        description: "Dr. med. Mai Wald — Ärztin für Darmgesundheit & Reizdarm. Evidenzbasierte, personalisierte Betreuung für nachhaltige Verdauungsgesundheit.",
        navigation: "Navigation",
        services: "Schwerpunkte",
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
        about: "O meni",
        contact: "Kontakt",
        book: "Naruči termin",
      },
      hero: {
        label: "Zdravlje probave i IBS",
        title: "Razumjeti sindrom iritabilnog crijeva. Promijeniti život.",
        subtitle: "Dr. med. Mai Wald specijalizirana je za sindrom iritabilnog crijeva i zdravlje probave. Funkcionalnom medicinom, ciljanom dijagnostikom i individualnim planovima liječenja pomaže vam pronaći uzroke vaših probavnih tegoba.",
        cta_book: "Naruči termin",
        cta_learn: "Saznaj više",
      },
      trust: {
        individual: {
          title: "Individualni tretman",
          description: "Prilagođen vašim tegobama i stanju probave.",
        },
        holistic: {
          title: "Holistički pristup",
          description: "Prehrana, mikrobiom, stres i probava u skladu.",
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
        title: "Vaš put do boljeg zdravlja probave",
        subtitle: "Tri pristupa prilagođena tome gdje se nalazite — od inicijalne dijagnostike probave do dugoročne skrbi.",
        cards: {
          diagnostics: {
            title: "Sveobuhvatna dijagnostika probave",
            description: "Detaljna analiza zdravlja probave uključujući analizu stolice, mikrobioma, panele reaktivnosti na hranu i individualno planiranje terapije.",
            cta: "Saznaj više",
          },
          analysis: {
            title: "Analiza postojećih nalaza",
            description: "Pregled vaših trenutnih i prethodnih laboratorijskih rezultata uz osobnu konzultaciju za razvoj individualnog plana zdravlja probave. Uživo ili online.",
            cta: "Saznaj više",
          },
          coaching: {
            title: "Dugoročna skrb za zdravlje probave",
            description: "Dugoročna podrška s mjesečnim konzultacijama, prehrambenim savjetovanjem, prilagodbom protokola i praćenjem simptoma.",
            cta: "Saznaj više",
          },
        },
      },
      benefits: {
        label: "Zašto funkcionalna medicina probave",
        title: "Doći do korijena probavnih problema",
        subtitle: "Umjesto samo upravljanja simptomima, istražujemo temeljne uzroke vaših probavnih problema — od neravnoteže mikrobioma do reakcija na hranu i stresnih poremećaja.",
        items: [
          "Sveobuhvatna analiza stolice i mikrobioma",
          "Identifikacija netolerancija i osjetljivosti na hranu",
          "SIBO dijagnostika i ciljani protokoli liječenja",
          "Procjena funkcije crijevne barijere (leaky gut)",
          "Evaluacija osi crijevo-mozak i upravljanje stresom",
          "Personalizirani planovi prehrane i eliminacijske dijete",
          "Ciljani protokoli probiotika i suplemenata",
          "Dugoročna optimizacija zdravlja probave",
        ],
      },
      concerns: {
        label: "Česti probavni problemi",
        title: "Zvuči li vam ovo poznato?",
        items: {
          energy: {
            title: "Nadutost, plinovi i bolovi u trbuhu nakon jela",
            description: "Ovi simptomi često ukazuju na neravnoteže u crijevnoj flori, netolerancije na hranu ili stanja poput SIBO-a. Ciljana dijagnostika identificira točne okidače, a individualni plan donosi trajno olakšanje.",
          },
          digestive: {
            title: "Neredovita stolica, proljev ili zatvor",
            description: "Bilo da se izmjenjuju proljev i zatvor ili trajno imate jedno od toga — ti obrasci daju važne naznake o zdravlju vaše probave. Funkcionalna dijagnostika pomaže razumjeti što pokreće poremećaj.",
          },
          hormonal: {
            title: "Umor, mentalna magla i kožni problemi povezani s probavom",
            description: "Vaša probava utječe na mnogo više od samog probavljanja — od razine energije i mentalne jasnoće do zdravlja kože. Kad je funkcija crijeva narušena, učinci se šire na cijelo tijelo.",
          },
        },
      },
      focus: {
        label: "Područja rada",
        title: "Specijalizirana ekspertiza u zdravlju probave",
        areas: {
          ibs: {
            title: "Sindrom iritabilnog crijeva",
            description: "Dijagnoza IBS-a temeljena na dokazima i individualizirano liječenje kombinacijom prehrane, životnog stila i terapeutskih pristupa.",
          },
          sibo: {
            title: "SIBO",
            description: "Prekomjerni bakterijski rast u tankom crijevu: testovi daha, strukturirani protokoli eradikacije i prevencije.",
          },
          microbiome: {
            title: "Analiza mikrobioma",
            description: "Sveobuhvatna dijagnostika stolice za procjenu sastava crijevne flore i razvoj ciljanih strategija obnove.",
          },
          food: {
            title: "Netolerancije na hranu",
            description: "Sustavna identifikacija okidača u hrani testiranjem i vođenim eliminacijskim dijetama za trajnu kontrolu simptoma.",
          },
          gutbrain: {
            title: "Os crijevo-mozak",
            description: "Razumijevanje veze između zdravlja probave, stresa, raspoloženja i kognitivne funkcije za cjelovito liječenje.",
          },
          leakygut: {
            title: "Crijevna barijera",
            description: "Procjena i liječenje povećane crijevne propusnosti i njezinih sistemskih učinaka na zdravlje.",
          },
        },
      },
      about: {
        label: "O meni",
        title: "Dr. med. Mai Wald",
        subtitle: "Liječnica specijalizirana za zdravlje probave i IBS",
        bio: "S temeljima u konvencionalnoj medicini i naprednom edukacijom u funkcionalnoj medicini, fokusiram se na razumijevanje i liječenje probavnih poremećaja u njihovom korijenu. Moja praksa spaja dijagnostiku temeljenu na dokazima s personaliziranim strategijama za zdravlje probave.",
        philosophy: "Razumjeti crijevo znači razumjeti zdravlje. Moj cilj je pomoći vam da vratite kontrolu nad svojom probavom — trajno, individualno i temeljeno na dokazima.",
        cta: "Više o meni",
        education_label: "Obrazovanje i certifikati",
        experience_label: "Kliničko iskustvo",
        specializations_label: "Specijalizacije",
      },
      contact: {
        label: "Kontakt",
        title: "Započnite svoj put do boljeg zdravlja probave",
        subtitle: "Bilo da imate pitanja o IBS-u, dijagnostici probave ili ste spremni za prvu konzultaciju — radujem se vašoj poruci.",
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
        title: "Znanje temeljeno na dokazima za bolje zdravlje probave",
        subtitle: "Mjesečni znanstveni uvidi o IBS-u, zdravlju mikrobioma i praktičnim strategijama za trajno zdravlje probave.",
        cta: "Pretplatite se",
        placeholder: "Vaša e-mail adresa",
      },
      faq: {
        label: "Česta pitanja",
        title: "Često postavljana pitanja",
        items: {
          q1: {
            question: "Što je sindrom iritabilnog crijeva (IBS)?",
            answer: "IBS je funkcionalni gastrointestinalni poremećaj karakteriziran ponavljajućim bolovima u trbuhu, nadutošću i promjenama u stolici. Pogađa do 15% populacije. Dok konvencionalna medicina često samo liječi simptome, funkcionalna medicina istražuje temeljne uzroke — od neravnoteže mikrobioma do osjetljivosti na hranu i stresa.",
          },
          q2: {
            question: "Kako se dijagnosticiraju i liječe problemi s probavom?",
            answer: "Koristimo sveobuhvatnu dijagnostiku: analizu stolice, testiranje mikrobioma, testove daha za SIBO, panele reaktivnosti na hranu i procjenu crijevne propusnosti. Liječenje je uvijek individualizirano i može uključivati promjene u prehrani, ciljanu suplementaciju, upravljanje stresom i po potrebi farmakološku terapiju.",
          },
          q3: {
            question: "Koliko brzo se mogu očekivati poboljšanja?",
            answer: "Mnogi pacijenti primijete početna poboljšanja unutar 4-6 tjedana od početka personaliziranog protokola. Međutim, trajno zdravlje probave obično zahtijeva 3-6 mjeseci dosljednog rada. Kompleksni slučajevi poput dugogodišnjeg IBS-a ili SIBO-a mogu trajati dulje. Pratimo napredak redovitim kontrolama.",
          },
          q4: {
            question: "Jesu li konzultacije dostupne online?",
            answer: "Da. Inicijalne konzultacije, kontrole i kontinuirani coaching zdravlja probave dostupni su putem telemedicine. Laboratorijska testiranja mogu se organizirati kroz partnerske laboratorije u vašoj blizini, a rezultati se diskutiraju na virtualnim terminima.",
          },
          q5: {
            question: "Pokriva li to osiguranje?",
            answer: "Usluge obično nisu pokrivene obveznim zdravstvenim osiguranjem. Neka privatna osiguranja mogu ponuditi djelomično pokriće ovisno o uvjetima polise. Većina pacijenata su samoplatiše. Detaljni računi se izdaju za moguće zahtjeve za povrat troškova.",
          },
        },
      },
      final_cta: {
        title: "Vaše zdravlje probave, shvaćeno u korijenu",
        subtitle: "Prvi korak je razgovor. Zajedno ćemo razviti jasnu sliku vašeg zdravlja probave i personalizirani plan naprijed.",
        cta: "Zakažite konzultaciju",
      },
      footer: {
        description: "Dr. med. Mai Wald — Liječnica specijalizirana za zdravlje probave i IBS. Zdravstvena skrb temeljena na dokazima za trajno zdravlje probave.",
        navigation: "Navigacija",
        services: "Područja rada",
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
        about: "Chi sono",
        contact: "Contatti",
        book: "Prenota appuntamento",
      },
      hero: {
        label: "Salute Intestinale & IBS",
        title: "Capire l'intestino irritabile. Cambiare la vita.",
        subtitle: "La Dr.ssa Mai Wald è specializzata nella sindrome dell'intestino irritabile e nella salute intestinale. Con la medicina funzionale, diagnostica mirata e piani di trattamento personalizzati, vi aiuta a trovare le cause dei vostri disturbi digestivi.",
        cta_book: "Prenota appuntamento",
        cta_learn: "Scopri di più",
      },
      trust: {
        individual: {
          title: "Trattamento individuale",
          description: "Su misura per i tuoi disturbi e la tua situazione intestinale.",
        },
        holistic: {
          title: "Approccio olistico",
          description: "Nutrizione, microbioma, stress e intestino in armonia.",
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
        title: "Il tuo percorso verso una migliore salute intestinale",
        subtitle: "Tre percorsi su misura per il punto in cui ti trovi — dalla diagnostica intestinale iniziale alla gestione a lungo termine.",
        cards: {
          diagnostics: {
            title: "Diagnostica intestinale completa",
            description: "Analisi approfondita della salute digestiva inclusi test delle feci, analisi del microbioma, pannelli di reattività alimentare e pianificazione terapeutica personalizzata.",
            cta: "Scopri di più",
          },
          analysis: {
            title: "Analisi dei risultati esistenti",
            description: "Revisione dei risultati di laboratorio attuali e precedenti con consulenza individuale per sviluppare un piano personalizzato per la salute intestinale. Di persona o virtualmente.",
            cta: "Scopri di più",
          },
          coaching: {
            title: "Coaching continuativo per la salute intestinale",
            description: "Supporto a lungo termine con consulenze mensili, guida nutrizionale, adeguamenti del protocollo e monitoraggio dei sintomi.",
            cta: "Scopri di più",
          },
        },
      },
      benefits: {
        label: "Perché la medicina funzionale intestinale",
        title: "Arrivare alla radice dei problemi digestivi",
        subtitle: "Invece di gestire solo i sintomi, indaghiamo le cause sottostanti dei problemi intestinali — dagli squilibri del microbioma alle reazioni alimentari e alle disfunzioni legate allo stress.",
        items: [
          "Analisi completa delle feci e del microbioma",
          "Identificazione di intolleranze e sensibilità alimentari",
          "Diagnostica SIBO e protocolli di trattamento mirati",
          "Valutazione della funzione della barriera intestinale (leaky gut)",
          "Valutazione dell'asse intestino-cervello e gestione dello stress",
          "Piani nutrizionali personalizzati e diete di eliminazione",
          "Protocolli mirati di probiotici e integratori",
          "Ottimizzazione a lungo termine della salute digestiva",
        ],
      },
      concerns: {
        label: "Disturbi digestivi comuni",
        title: "Ti suona familiare?",
        items: {
          energy: {
            title: "Gonfiore, gas e dolore addominale dopo i pasti",
            description: "Questi sintomi spesso indicano squilibri nella flora intestinale, intolleranze alimentari o condizioni come la SIBO. La diagnostica mirata identifica i trigger esatti e un piano personalizzato porta sollievo duraturo.",
          },
          digestive: {
            title: "Movimenti intestinali irregolari, diarrea o stitichezza",
            description: "Che si alterni tra diarrea e stitichezza o si abbia costantemente uno dei due — questi schemi rivelano indizi importanti sulla salute intestinale. I test funzionali ci aiutano a capire cosa guida la disfunzione.",
          },
          hormonal: {
            title: "Stanchezza, nebbia mentale e problemi cutanei legati alla digestione",
            description: "L'intestino influenza molto più della digestione — dai livelli di energia e chiarezza mentale alla salute della pelle. Quando la funzione intestinale è compromessa, gli effetti si ripercuotono su tutto il corpo.",
          },
        },
      },
      focus: {
        label: "Aree di specializzazione",
        title: "Competenza specializzata nella salute intestinale",
        areas: {
          ibs: {
            title: "Sindrome dell'intestino irritabile",
            description: "Diagnosi IBS basata sulle evidenze e trattamento individualizzato combinando approcci dietetici, di stile di vita e terapeutici.",
          },
          sibo: {
            title: "SIBO",
            description: "Sovraccrescita batterica dell'intestino tenue: breath test, protocolli strutturati di eradicazione e prevenzione.",
          },
          microbiome: {
            title: "Analisi del microbioma",
            description: "Diagnostica completa delle feci per valutare la composizione della flora intestinale e sviluppare strategie di ripristino mirate.",
          },
          food: {
            title: "Intolleranze alimentari",
            description: "Identificazione sistematica dei trigger alimentari attraverso test e diete di eliminazione guidate per il controllo duraturo dei sintomi.",
          },
          gutbrain: {
            title: "Asse intestino-cervello",
            description: "Comprensione della connessione tra salute digestiva, stress, umore e funzione cognitiva per un trattamento olistico.",
          },
          leakygut: {
            title: "Barriera intestinale",
            description: "Valutazione e trattamento dell'aumentata permeabilità intestinale e dei suoi effetti sistemici sulla salute.",
          },
        },
      },
      about: {
        label: "Chi sono",
        title: "Dr.ssa Mai Wald",
        subtitle: "Medico specializzata in salute intestinale e IBS",
        bio: "Con una formazione in medicina convenzionale e specializzazione in medicina funzionale, mi concentro sulla comprensione e il trattamento dei disturbi digestivi alla radice. Il mio studio unisce diagnostica basata sulle evidenze con strategie personalizzate per la salute intestinale.",
        philosophy: "Capire l'intestino significa capire la salute. Il mio obiettivo è aiutarti a riprendere il controllo della tua digestione — in modo sostenibile, individuale e basato sulle evidenze.",
        cta: "Scopri di più su di me",
        education_label: "Formazione e Certificazioni",
        experience_label: "Esperienza Clinica",
        specializations_label: "Specializzazioni",
      },
      contact: {
        label: "Contatti",
        title: "Inizia il tuo percorso verso una migliore salute intestinale",
        subtitle: "Che tu abbia domande sull'IBS, sulla diagnostica intestinale o sia pronto per la prima consulenza — non vedo l'ora di sentirti.",
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
        title: "Conoscenze basate sulle evidenze per una migliore salute intestinale",
        subtitle: "Approfondimenti mensili basati sulla scienza su IBS, salute del microbioma e strategie pratiche per un benessere digestivo duraturo.",
        cta: "Iscriviti alla newsletter",
        placeholder: "Il tuo indirizzo email",
      },
      faq: {
        label: "FAQ",
        title: "Domande Frequenti",
        items: {
          q1: {
            question: "Cos'è la sindrome dell'intestino irritabile (IBS)?",
            answer: "L'IBS è un disturbo gastrointestinale funzionale caratterizzato da dolore addominale ricorrente, gonfiore e cambiamenti nelle abitudini intestinali. Colpisce fino al 15% della popolazione. Mentre la medicina convenzionale spesso tratta solo i sintomi, la medicina funzionale indaga le cause sottostanti — dagli squilibri del microbioma alle sensibilità alimentari e allo stress.",
          },
          q2: {
            question: "Come vengono diagnosticati e trattati i problemi intestinali?",
            answer: "Utilizziamo diagnostica completa: analisi delle feci, test del microbioma, breath test per SIBO, pannelli di reattività alimentare e valutazione della permeabilità intestinale. Il trattamento è sempre individualizzato e può includere modifiche dietetiche, integrazione mirata, gestione dello stress e, quando necessario, interventi farmaceutici.",
          },
          q3: {
            question: "Quanto tempo ci vuole per vedere miglioramenti?",
            answer: "Molti pazienti notano miglioramenti iniziali entro 4-6 settimane dall'inizio del protocollo personalizzato. Tuttavia, il ripristino sostenibile della salute intestinale richiede tipicamente 3-6 mesi di lavoro costante. Casi complessi come IBS di lunga data o SIBO possono richiedere più tempo. Monitoriamo i progressi con controlli regolari.",
          },
          q4: {
            question: "Le consulenze sono disponibili online?",
            answer: "Sì. Consulenze iniziali, follow-up e coaching continuativo per la salute intestinale sono disponibili tramite telemedicina. I test di laboratorio possono essere organizzati presso laboratori partner nella tua zona e i risultati vengono discussi in appuntamenti virtuali.",
          },
          q5: {
            question: "È coperto dall'assicurazione?",
            answer: "I servizi in genere non sono coperti dall'assicurazione sanitaria obbligatoria. Alcune assicurazioni private possono offrire una copertura parziale a seconda dei termini della polizza. La maggior parte dei pazienti paga privatamente. Vengono fornite fatture dettagliate per eventuali richieste di rimborso.",
          },
        },
      },
      final_cta: {
        title: "La tua salute intestinale, compresa alla radice",
        subtitle: "Il primo passo è una conversazione. Insieme svilupperemo un quadro chiaro della tua salute digestiva e un piano personalizzato.",
        cta: "Prenota la tua consulenza",
      },
      footer: {
        description: "Dr.ssa Mai Wald — Medico specializzata in salute intestinale e IBS. Assistenza sanitaria personalizzata e basata sulle evidenze per il benessere digestivo.",
        navigation: "Navigazione",
        services: "Aree di specializzazione",
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
