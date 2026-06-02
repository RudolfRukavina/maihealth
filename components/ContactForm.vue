<template>
  <section :id="sectionId" class="section-padding" :class="bgClass">
    <div class="container-narrow">
      <div :class="fullWidth ? '' : 'max-w-3xl mx-auto'">
        <div :class="fullWidth ? 'grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20' : ''">

          <!-- Info column (full-width mode) -->
          <div v-if="fullWidth" class="lg:sticky lg:top-32 lg:self-start">
            <span class="section-label">{{ $t('contact.label') }}</span>
            <h2 class="section-title mb-3 sm:mb-4">{{ $t('contact.title') }}</h2>
            <p class="section-subtitle mt-0 mb-8 sm:mb-10">{{ $t('contact.subtitle') }}</p>

            <div class="space-y-5 sm:space-y-6">
              <div class="flex items-start gap-3.5 sm:gap-4">
                <div class="icon-box bg-sage/10 flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11">
                  <i class="fa-solid fa-location-dot text-sage text-sm"></i>
                </div>
                <div>
                  <h4 class="text-sm font-semibold text-charcoal mb-1">{{ $t('contact.info.address_label') }}</h4>
                  <p class="text-sm text-body/70">Address coming soon</p>
                </div>
              </div>

              <div class="flex items-start gap-3.5 sm:gap-4">
                <div class="icon-box bg-sage/10 flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11">
                  <i class="fa-solid fa-envelope text-sage text-sm"></i>
                </div>
                <div>
                  <h4 class="text-sm font-semibold text-charcoal mb-1">{{ $t('contact.info.email_label') }}</h4>
                  <p class="text-sm text-body/70">hello@maijimenez.com</p>
                </div>
              </div>

              <div class="flex items-start gap-3.5 sm:gap-4">
                <div class="icon-box bg-sage/10 flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11">
                  <i class="fa-regular fa-clock text-sage text-sm"></i>
                </div>
                <div>
                  <h4 class="text-sm font-semibold text-charcoal mb-1">{{ $t('contact.info.hours_label') }}</h4>
                  <p class="text-sm text-body/70">{{ $t('contact.info.hours_practice') }}</p>
                  <p class="text-xs text-muted mt-1">{{ $t('contact.info.hours_note') }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Heading (non-full-width mode) -->
          <div v-if="!fullWidth" class="text-center mb-10 sm:mb-12">
            <span class="section-label">{{ $t('contact.label') }}</span>
            <h2 class="section-title">{{ $t('contact.title') }}</h2>
            <p class="section-subtitle mx-auto">{{ $t('contact.subtitle') }}</p>
          </div>

          <!-- Form -->
          <form @submit.prevent="handleSubmit" class="space-y-4 sm:space-y-5">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <div>
                <label class="block text-xs font-medium text-charcoal/80 mb-1.5 sm:mb-2 tracking-wide">{{ $t('contact.form.first_name') }} *</label>
                <input
                  v-model="form.firstName"
                  type="text"
                  required
                  class="w-full px-4 py-3 sm:py-3.5 bg-white rounded-xl border border-stone/40 text-sm text-charcoal placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-sage/15 focus:border-sage/30 transition-all duration-150"
                />
              </div>
              <div>
                <label class="block text-xs font-medium text-charcoal/80 mb-1.5 sm:mb-2 tracking-wide">{{ $t('contact.form.last_name') }} *</label>
                <input
                  v-model="form.lastName"
                  type="text"
                  required
                  class="w-full px-4 py-3 sm:py-3.5 bg-white rounded-xl border border-stone/40 text-sm text-charcoal placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-sage/15 focus:border-sage/30 transition-all duration-150"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <div>
                <label class="block text-xs font-medium text-charcoal/80 mb-1.5 sm:mb-2 tracking-wide">{{ $t('contact.form.email') }} *</label>
                <input
                  v-model="form.email"
                  type="email"
                  required
                  class="w-full px-4 py-3 sm:py-3.5 bg-white rounded-xl border border-stone/40 text-sm text-charcoal placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-sage/15 focus:border-sage/30 transition-all duration-150"
                />
              </div>
              <div>
                <label class="block text-xs font-medium text-charcoal/80 mb-1.5 sm:mb-2 tracking-wide">{{ $t('contact.form.phone') }}</label>
                <input
                  v-model="form.phone"
                  type="tel"
                  class="w-full px-4 py-3 sm:py-3.5 bg-white rounded-xl border border-stone/40 text-sm text-charcoal placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-sage/15 focus:border-sage/30 transition-all duration-150"
                />
              </div>
            </div>

            <div>
              <label class="block text-xs font-medium text-charcoal/80 mb-1.5 sm:mb-2 tracking-wide">{{ $t('contact.form.message') }} *</label>
              <textarea
                v-model="form.message"
                required
                rows="4"
                class="w-full px-4 py-3 sm:py-3.5 bg-white rounded-xl border border-stone/40 text-sm text-charcoal placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-sage/15 focus:border-sage/30 transition-all duration-150 resize-none"
              />
            </div>

            <button type="submit" class="btn-primary w-full sm:w-auto">
              {{ $t('contact.form.submit') }}
              <i class="fa-solid fa-paper-plane text-xs"></i>
            </button>

            <Transition
              enter-active-class="transition duration-150 ease-out"
              enter-from-class="opacity-0 translate-y-2"
              enter-to-class="opacity-100 translate-y-0"
            >
              <p v-if="submitted" class="text-sm text-sage font-medium flex items-center gap-2">
                <i class="fa-solid fa-circle-check"></i>
                {{ $t('contact.form.success') }}
              </p>
            </Transition>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  fullWidth: { type: Boolean, default: false },
  bgClass: { type: String, default: '' },
  sectionId: { type: String, default: 'contact' },
})

const form = reactive({ firstName: '', lastName: '', email: '', phone: '', message: '' })
const submitted = ref(false)

const handleSubmit = () => {
  submitted.value = true
  setTimeout(() => { submitted.value = false }, 5000)
  Object.assign(form, { firstName: '', lastName: '', email: '', phone: '', message: '' })
}
</script>
