<template>
  <Teleport to="body">
    <div class="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-charcoal/40 backdrop-blur-sm" @click="close" />

      <!-- Panel -->
      <div class="relative bg-cream w-full max-w-lg rounded-t-3xl sm:rounded-2xl shadow-2xl border border-stone/20 overflow-hidden max-h-[92vh] flex flex-col">
        <!-- Header -->
        <div class="flex items-center justify-between px-6 py-4 border-b border-stone/15 bg-white shrink-0">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-full bg-sage/10 flex items-center justify-center">
              <i class="fa-solid fa-paper-plane text-sage text-xs"></i>
            </div>
            <h3 class="text-base font-serif font-semibold text-charcoal">Compose reply</h3>
          </div>
          <button @click="close" class="w-8 h-8 rounded-full flex items-center justify-center text-muted hover:bg-stone/10 hover:text-charcoal transition-colors">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>

        <!-- Form -->
        <div class="p-6 space-y-4 overflow-y-auto">
          <div>
            <label class="block text-xs font-medium text-charcoal/70 mb-1.5 tracking-wide">To</label>
            <div class="px-4 py-2.5 bg-stone/10 rounded-xl text-sm text-charcoal/80 border border-stone/20 truncate">
              <span v-if="name" class="font-medium">{{ name }}</span>
              <span :class="name ? 'text-muted' : ''">{{ name ? ` · ${to}` : to }}</span>
            </div>
          </div>

          <div>
            <label class="block text-xs font-medium text-charcoal/70 mb-1.5 tracking-wide">Subject</label>
            <input
              v-model="subject"
              type="text"
              class="w-full px-4 py-2.5 bg-white rounded-xl border border-stone/40 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-sage/15 focus:border-sage/30 transition-all"
            />
          </div>

          <div>
            <label class="block text-xs font-medium text-charcoal/70 mb-1.5 tracking-wide">Message</label>
            <textarea
              v-model="message"
              rows="9"
              class="w-full px-4 py-3 bg-white rounded-xl border border-stone/40 text-sm text-charcoal leading-relaxed focus:outline-none focus:ring-2 focus:ring-sage/15 focus:border-sage/30 transition-all resize-none"
            />
            <p class="text-[11px] text-muted mt-1.5 flex items-center gap-1.5">
              <i class="fa-solid fa-wand-magic-sparkles text-sage/70"></i>
              Sent as a branded MaiHealth email — the header and footer are added automatically.
            </p>
          </div>

          <p v-if="error" class="text-sm text-red-600 flex items-center gap-1.5">
            <i class="fa-solid fa-circle-exclamation text-xs"></i>
            {{ error }}
          </p>
        </div>

        <!-- Footer -->
        <div class="flex items-center justify-between gap-3 px-6 py-4 border-t border-stone/15 bg-white shrink-0">
          <a
            :href="mailtoFallback"
            class="text-xs text-muted hover:text-sage transition-colors inline-flex items-center gap-1.5"
            title="Open in your own mail app instead"
          >
            <i class="fa-regular fa-envelope text-[11px]"></i>
            Use my mail app
          </a>
          <div class="flex items-center gap-3">
            <button
              @click="close"
              class="px-4 py-2 rounded-lg border border-stone/40 text-xs font-medium text-charcoal hover:bg-stone/10 transition-colors"
            >
              Cancel
            </button>
            <button
              @click="send"
              :disabled="sending || !message.trim()"
              class="px-5 py-2 rounded-lg bg-sage text-cream text-xs font-medium hover:bg-sage/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
            >
              <i v-if="sending" class="fa-solid fa-spinner fa-spin text-xs"></i>
              <template v-else>
                <i class="fa-solid fa-paper-plane text-xs"></i>
                Send email
              </template>
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
const props = defineProps({
  to: { type: String, required: true },
  name: { type: String, default: '' },
  locale: { type: String, default: '' },
  submissionId: { type: String, default: '' },
})
const emit = defineEmits(['close', 'sent'])

const { getIdToken } = useAuth()

const draft = replyDraft({ name: props.name, locale: props.locale })
const subject = ref(draft.subject)
const message = ref(draft.body)
const sending = ref(false)
const error = ref('')

const mailtoFallback = computed(() =>
  buildReplyMailto({ email: props.to, name: props.name, locale: props.locale, subject: subject.value })
)

const close = () => {
  if (!sending.value) emit('close')
}

const send = async () => {
  if (!message.value.trim()) return
  sending.value = true
  error.value = ''
  try {
    const token = await getIdToken()
    await $fetch('/api/admin/reply', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: {
        to: props.to,
        subject: subject.value,
        message: message.value,
        locale: props.locale,
        submissionId: props.submissionId || undefined,
      },
    })
    emit('sent')
    emit('close')
  } catch (err) {
    error.value = err?.data?.statusMessage || 'Could not send. Please try again.'
  } finally {
    sending.value = false
  }
}

// Close on Escape.
const onKey = (e) => { if (e.key === 'Escape') close() }
onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))
</script>
