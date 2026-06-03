<template>
  <div>
    <!-- Hero -->
    <section class="pt-32 md:pt-40 pb-16 md:pb-20">
      <div class="container-narrow">
        <div class="max-w-3xl">
          <span class="section-label">{{ $t('services.label') }}</span>
          <h1 class="text-4xl md:text-display-sm font-serif font-semibold text-charcoal mb-5">
            {{ $t('services.title') }}
          </h1>
          <p class="text-base md:text-lg text-body/80 leading-relaxed">
            {{ $t('services.subtitle') }}
          </p>
        </div>
      </div>
    </section>

    <!-- Service Pathways -->
    <section class="pb-20 md:pb-28">
      <div class="container-narrow">
        <div class="space-y-6">
          <div
            v-for="(service, index) in services"
            :key="service.key"
            class="bg-white rounded-2xl border border-stone/30 p-8 md:p-12 transition-all duration-300 hover:shadow-lg hover:shadow-charcoal/[0.03]"
          >
            <div class="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 items-start">
              <div>
                <span class="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-sage/10 text-sage font-serif font-bold text-lg mb-4">
                  {{ index + 1 }}
                </span>
                <h2 class="text-xl md:text-2xl font-serif font-semibold text-charcoal">
                  {{ service.title }}
                </h2>
              </div>
              <div>
                <p class="text-body/75 leading-relaxed mb-6">{{ service.description }}</p>
                <ul class="space-y-2">
                  <li v-for="detail in service.details" :key="detail" class="flex items-start gap-3 text-sm text-body/70">
                    <i class="fa-solid fa-check text-sage text-xs mt-1 flex-shrink-0"></i>
                    {{ detail }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <WaveDivider fromColor="#F5F1EC" toColor="#FFFFFF" :variant="1" />

    <!-- Patient Journey -->
    <section class="section-padding bg-white">
      <div class="container-narrow">
        <div class="text-center mb-14">
          <span class="section-label">{{ $t('focus.label') }}</span>
          <h2 class="section-title">{{ phases_title }}</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div v-for="(phase, index) in phases" :key="phase.title" class="text-center relative">
            <div class="w-14 h-14 rounded-2xl bg-cream flex items-center justify-center mx-auto mb-5 border border-stone/30">
              <i :class="phase.icon" class="text-lg text-gold"></i>
            </div>
            <h3 class="text-base font-serif font-semibold text-charcoal mb-2">{{ phase.title }}</h3>
            <p class="text-xs text-body/60 leading-relaxed">{{ phase.description }}</p>
            <div v-if="index < 3" class="hidden md:block absolute top-7 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-[1px] bg-stone/40" />
          </div>
        </div>
      </div>
    </section>

    <WaveDivider fromColor="#FFFFFF" toColor="#F5F1EC" :variant="3" />

    <!-- Focus Areas -->
    <FocusGrid />

    <WaveDivider fromColor="#F5F1EC" toColor="#FFFFFF" :variant="2" />

    <!-- Diagnostics & Treatment -->
    <section class="section-padding bg-white">
      <div class="container-narrow">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          <div>
            <h3 class="text-xs font-semibold tracking-[0.15em] uppercase text-gold mb-6">{{ diagnostics_label }}</h3>
            <div class="space-y-3">
              <div v-for="item in diagnostics" :key="item" class="flex items-start gap-3 p-3 rounded-lg hover:bg-cream transition-colors">
                <i class="fa-solid fa-flask text-sage text-sm flex-shrink-0 mt-0.5"></i>
                <span class="text-sm text-body">{{ item }}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 class="text-xs font-semibold tracking-[0.15em] uppercase text-gold mb-6">{{ treatments_label }}</h3>
            <div class="space-y-3">
              <div v-for="item in treatments" :key="item" class="flex items-start gap-3 p-3 rounded-lg hover:bg-cream transition-colors">
                <i class="fa-solid fa-heart text-mauve text-sm flex-shrink-0 mt-0.5"></i>
                <span class="text-sm text-body">{{ item }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <WaveDivider fromColor="#FFFFFF" toColor="#F5F1EC" :variant="4" />

    <!-- Insurance Note -->
    <section class="py-12">
      <div class="container-narrow">
        <div class="max-w-2xl mx-auto bg-cream-dark/60 rounded-2xl p-6 md:p-8 border border-stone/20">
          <h3 class="text-sm font-semibold text-charcoal mb-2">{{ insurance_title }}</h3>
          <p class="text-sm text-body/70 leading-relaxed">{{ insurance_text }}</p>
        </div>
      </div>
    </section>

    <WaveDivider fromColor="#F5F1EC" toColor="#EEF1EA" :variant="1" />

    <FinalCTA />
  </div>
</template>

<script setup>
const { t, locale } = useI18n()

useHead({
  title: 'Praxis & Leistungen — MaiHealth | Dr. med. Mai Wald',
  meta: [
    { name: 'description', content: 'Darm-Diagnostik, Mikrobiom-Analyse & laufende Betreuung. Individuelle Therapiepläne für Reizdarm, SIBO und Darmgesundheit.' },
    { property: 'og:title', content: 'Praxis & Leistungen — MaiHealth' },
    { property: 'og:description', content: 'Darm-Diagnostik, Mikrobiom-Analyse & laufende Betreuung bei Dr. med. Mai Wald.' },
  ],
})

const services = computed(() => [
  {
    key: 'diagnostics',
    title: t('services.cards.diagnostics.title'),
    description: t('services.cards.diagnostics.description'),
    details: locale.value === 'de' ? [
      'Umfassende Stuhldiagnostik & Mikrobiom-Analyse',
      'Atemtests auf SIBO (Dünndarm-Fehlbesiedlung)',
      'Nahrungsmittelunverträglichkeits-Tests',
      'Darmpermeabilitäts-Beurteilung',
      'Personalisierter Therapieplan',
    ] : locale.value === 'hr' ? [
      'Sveobuhvatna dijagnostika stolice i mikrobioma',
      'Testovi daha za SIBO',
      'Testovi netolerancije na hranu',
      'Procjena crijevne propusnosti',
      'Personalizirani plan terapije',
    ] : locale.value === 'it' ? [
      'Diagnostica completa delle feci e del microbioma',
      'Breath test per SIBO',
      'Test di intolleranza alimentare',
      'Valutazione della permeabilità intestinale',
      'Piano terapeutico personalizzato',
    ] : [
      'Comprehensive stool diagnostics & microbiome analysis',
      'SIBO breath testing',
      'Food intolerance and reactivity panels',
      'Intestinal permeability assessment',
      'Personalized therapy plan',
    ],
  },
  {
    key: 'analysis',
    title: t('services.cards.analysis.title'),
    description: t('services.cards.analysis.description'),
    details: locale.value === 'de' ? [
      'Auswertung aktueller und früherer Befunde',
      'Persönliche Einzelkonsultation',
      'Individueller Darmgesundheitsplan',
      'Vor Ort oder per Telemedizin verfügbar',
    ] : locale.value === 'hr' ? [
      'Pregled aktualnih i prethodnih nalaza',
      'Osobna konzultacija',
      'Individualni plan zdravlja probave',
      'Dostupno uživo ili putem telemedicine',
    ] : locale.value === 'it' ? [
      'Revisione dei risultati attuali e precedenti',
      'Consulenza individuale',
      'Piano personalizzato per la salute intestinale',
      'Disponibile di persona o in telemedicina',
    ] : [
      'Review of current and previous results',
      'One-on-one consultation',
      'Individualized gut health plan',
      'Available in-person or via telemedicine',
    ],
  },
  {
    key: 'coaching',
    title: t('services.cards.coaching.title'),
    description: t('services.cards.coaching.description'),
    details: locale.value === 'de' ? [
      'Monatliche Fortschritts-Konsultationen',
      'Laufende Protokollanpassungen',
      'Ernährungs- und Lebensstilberatung',
      'Symptom-Monitoring und Tracking',
      'Bundesweit per Telemedizin verfügbar',
    ] : locale.value === 'hr' ? [
      'Mjesečne konzultacije o napretku',
      'Kontinuirane prilagodbe protokola',
      'Savjetovanje o prehrani i životnom stilu',
      'Praćenje simptoma',
      'Dostupno putem telemedicine',
    ] : locale.value === 'it' ? [
      'Consulenze mensili sui progressi',
      'Adeguamenti continui del protocollo',
      'Consulenza nutrizionale e sullo stile di vita',
      'Monitoraggio dei sintomi',
      'Disponibile in telemedicina',
    ] : [
      'Monthly progress consultations',
      'Ongoing protocol adjustments',
      'Nutrition and lifestyle coaching',
      'Symptom monitoring and tracking',
      'Nationwide telemedicine available',
    ],
  },
])

const phases_title = computed(() => ({
  de: 'Vier Schritte zu besserer Darmgesundheit',
  hr: 'Četiri koraka do boljeg zdravlja probave',
  it: 'Quattro passi verso una migliore salute intestinale',
  en: 'Four steps to better gut health',
})[locale.value] || 'Four steps to better gut health')

const phases = computed(() => ({
  de: [
    { title: 'Erstgespräch', description: 'Ausführliche Anamnese Ihrer Darmbeschwerden — persönlich oder per Telemedizin.', icon: 'fa-solid fa-comments' },
    { title: 'Gezielte Diagnostik', description: 'Stuhlanalyse, Mikrobiom-Tests und weitere auf Ihre Situation abgestimmte Untersuchungen.', icon: 'fa-solid fa-microscope' },
    { title: 'Therapieplan', description: 'Individueller, evidenzbasierter Behandlungsplan für Ihre Darmgesundheit.', icon: 'fa-solid fa-clipboard-list' },
    { title: 'Begleitung', description: 'Fortlaufendes Monitoring mit Anpassungen für nachhaltige Besserung.', icon: 'fa-solid fa-chart-line' },
  ],
  hr: [
    { title: 'Inicijalni razgovor', description: 'Detaljna anamneza vaših probavnih tegoba — osobno ili putem telemedicine.', icon: 'fa-solid fa-comments' },
    { title: 'Ciljana dijagnostika', description: 'Analiza stolice, testovi mikrobioma i druge pretrage prilagođene vašoj situaciji.', icon: 'fa-solid fa-microscope' },
    { title: 'Plan terapije', description: 'Individualni, na dokazima utemeljen plan liječenja za zdravlje probave.', icon: 'fa-solid fa-clipboard-list' },
    { title: 'Praćenje', description: 'Kontinuirano praćenje s prilagodbama za trajno poboljšanje.', icon: 'fa-solid fa-chart-line' },
  ],
  it: [
    { title: 'Primo colloquio', description: 'Anamnesi dettagliata dei disturbi digestivi — di persona o in telemedicina.', icon: 'fa-solid fa-comments' },
    { title: 'Diagnostica mirata', description: 'Analisi delle feci, test del microbioma e altri esami adattati alla situazione.', icon: 'fa-solid fa-microscope' },
    { title: 'Piano terapeutico', description: 'Piano di trattamento individualizzato e basato sulle evidenze per la salute intestinale.', icon: 'fa-solid fa-clipboard-list' },
    { title: 'Accompagnamento', description: 'Monitoraggio continuo con adeguamenti per un miglioramento sostenibile.', icon: 'fa-solid fa-chart-line' },
  ],
  en: [
    { title: 'Initial Consultation', description: 'Comprehensive history of your gut symptoms — in-person or via telemedicine.', icon: 'fa-solid fa-comments' },
    { title: 'Targeted Diagnostics', description: 'Stool analysis, microbiome tests, and further assessments tailored to your situation.', icon: 'fa-solid fa-microscope' },
    { title: 'Therapy Plan', description: 'Individualized, evidence-based treatment plan for your gut health.', icon: 'fa-solid fa-clipboard-list' },
    { title: 'Ongoing Support', description: 'Continuous monitoring with adjustments for sustainable improvement.', icon: 'fa-solid fa-chart-line' },
  ],
})[locale.value] || [])

const diagnostics_label = computed(() => ({
  de: 'Diagnostische Methoden', hr: 'Dijagnostičke metode', it: 'Metodi diagnostici', en: 'Diagnostic Methods',
})[locale.value])

const diagnostics = computed(() => ({
  de: [
    'Umfassende Stuhldiagnostik',
    'Mikrobiom-Sequenzierung',
    'SIBO-Atemtests (H2/CH4)',
    'Nahrungsmittelunverträglichkeits-Panels',
    'Zonulin & Darmpermeabilitäts-Marker',
    'Entzündungsmarker (Calprotectin)',
    'Ausführliche Anamnese',
  ],
  hr: [
    'Sveobuhvatna dijagnostika stolice',
    'Sekvenciranje mikrobioma',
    'SIBO testovi daha (H2/CH4)',
    'Paneli netolerancija na hranu',
    'Zonulin i markeri crijevne propusnosti',
    'Markeri upale (kalprotektin)',
    'Detaljna anamneza',
  ],
  it: [
    'Diagnostica completa delle feci',
    'Sequenziamento del microbioma',
    'Breath test SIBO (H2/CH4)',
    'Pannelli di intolleranza alimentare',
    'Zonulina e marcatori di permeabilità',
    'Marcatori infiammatori (calprotectina)',
    'Anamnesi dettagliata',
  ],
  en: [
    'Comprehensive stool diagnostics',
    'Microbiome sequencing',
    'SIBO breath tests (H2/CH4)',
    'Food intolerance panels',
    'Zonulin & intestinal permeability markers',
    'Inflammatory markers (calprotectin)',
    'Detailed patient history',
  ],
})[locale.value] || [])

const treatments_label = computed(() => ({
  de: 'Behandlungskomponenten', hr: 'Komponente liječenja', it: 'Componenti del trattamento', en: 'Treatment Components',
})[locale.value])

const treatments = computed(() => ({
  de: [
    'Personalisierte Ernährungsberatung',
    'Eliminationsdiät-Begleitung',
    'Gezielte Probiotika-Protokolle',
    'Darmbarriere-Wiederherstellung',
    'Stressmanagement & Darm-Hirn-Achse',
    'Gezielte Supplementierung',
  ],
  hr: [
    'Personalizirano savjetovanje o prehrani',
    'Praćenje eliminacijske dijete',
    'Ciljani protokoli probiotika',
    'Obnova crijevne barijere',
    'Upravljanje stresom i os crijevo-mozak',
    'Ciljana suplementacija',
  ],
  it: [
    'Consulenza nutrizionale personalizzata',
    'Accompagnamento dieta di eliminazione',
    'Protocolli probiotici mirati',
    'Ripristino della barriera intestinale',
    'Gestione dello stress e asse intestino-cervello',
    'Integrazione mirata',
  ],
  en: [
    'Personalized nutrition counseling',
    'Elimination diet guidance',
    'Targeted probiotic protocols',
    'Gut barrier restoration',
    'Stress management & gut-brain axis',
    'Targeted supplementation',
  ],
})[locale.value] || [])

const insurance_title = computed(() => ({
  de: 'Versicherung & Bezahlung', hr: 'Osiguranje i plaćanje', it: 'Assicurazione e pagamento', en: 'Insurance & Payment',
})[locale.value])

const insurance_text = computed(() => ({
  de: 'Die Leistungen werden in der Regel nicht von der gesetzlichen Krankenversicherung übernommen. Einige private Krankenversicherungen bieten je nach Vertragsbedingungen eine teilweise Kostenübernahme an. Die meisten Patienten sind Selbstzahler. Detaillierte Rechnungen werden für mögliche Erstattungsanträge bereitgestellt.',
  hr: 'Usluge obično nisu pokrivene obveznim zdravstvenim osiguranjem. Neka privatna osiguranja mogu ponuditi djelomično pokriće ovisno o uvjetima polise. Većina pacijenata su samoplatiše. Detaljni računi se izdaju za moguće zahtjeve za povrat troškova.',
  it: 'I servizi in genere non sono coperti dall\'assicurazione sanitaria obbligatoria. Alcune assicurazioni private possono offrire una copertura parziale. La maggior parte dei pazienti paga privatamente. Vengono fornite fatture dettagliate per eventuali richieste di rimborso.',
  en: 'Services are typically not covered by statutory health insurance. Some private insurance plans may offer partial coverage depending on your policy terms. Most patients are self-paying. Detailed invoices are provided for potential reimbursement claims.',
})[locale.value])
</script>
