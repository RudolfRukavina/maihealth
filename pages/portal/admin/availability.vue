<template>
  <div>
    <div class="max-w-2xl">
      <h1 class="text-3xl font-serif font-semibold text-charcoal mb-2">{{ $t('admin.availability.title') }}</h1>
      <p class="text-body/60 mb-10">{{ $t('admin.availability.subtitle') }}</p>

      <!-- Slot duration -->
      <section class="bg-white rounded-2xl border border-stone/30 p-6 mb-6">
        <h2 class="text-xs font-semibold tracking-[0.15em] uppercase text-gold mb-4">
          {{ $t('admin.availability.duration_label') }}
        </h2>
        <div class="flex gap-3">
          <button
            v-for="d in [60, 30]"
            :key="d"
            type="button"
            @click="slotDuration = d"
            :class="[
              'px-5 py-2.5 text-xs font-medium rounded-full border transition-all',
              slotDuration === d
                ? 'bg-sage text-cream border-sage'
                : 'border-stone/40 text-body hover:border-sage hover:text-sage',
            ]"
          >
            {{ $t(`admin.availability.duration_${d}`) }}
          </button>
        </div>
      </section>

      <!-- Weekly schedule -->
      <section class="bg-white rounded-2xl border border-stone/30 p-6 mb-6">
        <h2 class="text-xs font-semibold tracking-[0.15em] uppercase text-gold mb-4">
          {{ $t('admin.availability.weekly_title') }}
        </h2>

        <div v-if="!weeklySchedule.length" class="text-sm text-muted mb-4">
          {{ $t('admin.availability.no_schedule') }}
        </div>

        <!-- Schedule rows -->
        <div class="space-y-3 mb-4">
          <div
            v-for="(entry, i) in weeklySchedule"
            :key="i"
            class="flex flex-wrap items-center gap-3"
          >
            <!-- Day selector -->
            <select
              v-model.number="entry.day"
              class="px-3 py-2 bg-cream rounded-lg border border-stone/30 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-sage/15 focus:border-sage/30"
            >
              <option v-for="n in dayOptions" :key="n.value" :value="n.value">{{ n.label }}</option>
            </select>

            <!-- From -->
            <div class="flex items-center gap-2">
              <span class="text-xs text-muted">{{ $t('admin.availability.from_label') }}</span>
              <select
                v-model.number="entry.startHour"
                class="px-3 py-2 bg-cream rounded-lg border border-stone/30 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-sage/15 focus:border-sage/30"
              >
                <option v-for="h in hourOptions" :key="h" :value="h">{{ String(h).padStart(2, '0') }}:00</option>
              </select>
            </div>

            <!-- To -->
            <div class="flex items-center gap-2">
              <span class="text-xs text-muted">{{ $t('admin.availability.to_label') }}</span>
              <select
                v-model.number="entry.endHour"
                class="px-3 py-2 bg-cream rounded-lg border border-stone/30 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-sage/15 focus:border-sage/30"
              >
                <option v-for="h in hourOptions.filter(h => h > entry.startHour)" :key="h" :value="h">
                  {{ String(h).padStart(2, '0') }}:00
                </option>
              </select>
            </div>

            <!-- Remove -->
            <button
              type="button"
              @click="weeklySchedule.splice(i, 1)"
              class="text-xs text-muted hover:text-red-500 transition-colors ml-auto"
            >
              <i class="fa-solid fa-xmark"></i>
              {{ $t('admin.availability.remove') }}
            </button>
          </div>
        </div>

        <!-- Add row -->
        <button
          type="button"
          @click="addScheduleRow"
          class="inline-flex items-center gap-2 text-xs font-medium text-sage hover:text-charcoal transition-colors"
        >
          <i class="fa-solid fa-plus text-[10px]"></i>
          {{ $t('admin.availability.add_slot') }}
        </button>
      </section>

      <!-- Blocked dates -->
      <section class="bg-white rounded-2xl border border-stone/30 p-6 mb-8">
        <h2 class="text-xs font-semibold tracking-[0.15em] uppercase text-gold mb-4">
          {{ $t('admin.availability.blocked_dates_title') }}
        </h2>

        <p v-if="!blockedDates.length" class="text-sm text-muted mb-4">
          {{ $t('admin.availability.no_blocked') }}
        </p>

        <!-- Blocked date chips -->
        <div v-else class="flex flex-wrap gap-2 mb-4">
          <span
            v-for="date in blockedDates"
            :key="date"
            class="inline-flex items-center gap-2 px-3 py-1.5 bg-cream rounded-full text-xs font-medium text-charcoal border border-stone/30"
          >
            {{ formatBlockedDate(date) }}
            <button
              type="button"
              @click="blockedDates.splice(blockedDates.indexOf(date), 1)"
              class="text-muted hover:text-red-500 transition-colors"
            >
              <i class="fa-solid fa-xmark text-[9px]"></i>
            </button>
          </span>
        </div>

        <!-- Add blocked date -->
        <div class="flex items-center gap-3">
          <input
            v-model="newBlockedDate"
            type="date"
            :min="todayIso"
            class="px-4 py-2.5 bg-cream rounded-xl border border-stone/30 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-sage/15 focus:border-sage/30 transition-all"
          />
          <button
            type="button"
            @click="addBlockedDate"
            :disabled="!newBlockedDate"
            class="btn-primary text-xs px-5 py-2.5 disabled:opacity-50"
          >
            {{ $t('admin.availability.add_block_btn') }}
          </button>
        </div>
      </section>

      <!-- Save feedback -->
      <p v-if="saved" class="text-sm text-sage font-medium flex items-center gap-2 mb-4">
        <i class="fa-solid fa-circle-check"></i>
        {{ $t('admin.availability.saved') }}
      </p>
      <p v-if="saveError" class="text-sm text-red-600 font-medium flex items-center gap-2 mb-4">
        <i class="fa-solid fa-circle-exclamation"></i>
        {{ $t('admin.availability.save_error') }}
      </p>

      <!-- Save button -->
      <button @click="handleSave" :disabled="saving" class="btn-primary">
        <i v-if="saving" class="fa-solid fa-spinner fa-spin text-xs"></i>
        <template v-else>
          {{ $t('admin.availability.save_btn') }}
          <i class="fa-solid fa-floppy-disk text-xs"></i>
        </template>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'portal', middleware: ['auth', 'admin'] })

const { t } = useI18n()
const { getIdToken } = useAuth()

// State
const slotDuration = ref(60)
const weeklySchedule = ref<{ day: number; startHour: number; endHour: number }[]>([])
const blockedDates = ref<string[]>([])
const newBlockedDate = ref('')
const saving = ref(false)
const saved = ref(false)
const saveError = ref(false)

const todayIso = new Date().toISOString().split('T')[0]

// Day options (Mon=1 … Sun=0)
const dayOptions = computed(() =>
  [1, 2, 3, 4, 5, 6, 0].map(v => ({
    value: v,
    label: t(`admin.availability.days.${v}`),
  }))
)

const hourOptions = Array.from({ length: 24 }, (_, i) => i)

// Load existing config
onMounted(async () => {
  try {
    const token = await getIdToken()
    const data = await $fetch<{
      weeklySchedule: { day: number; startHour: number; endHour: number }[]
      blockedDates: string[]
      slotDuration: number
    }>('/api/availability/config', {
      headers: { Authorization: `Bearer ${token}` },
    })
    weeklySchedule.value = data.weeklySchedule ?? []
    blockedDates.value = data.blockedDates ?? []
    slotDuration.value = data.slotDuration ?? 60
  } catch {
    // No config yet — start empty
  }
})

const addScheduleRow = () => {
  weeklySchedule.value.push({ day: 2, startHour: 10, endHour: 16 })
}

const addBlockedDate = () => {
  if (!newBlockedDate.value || blockedDates.value.includes(newBlockedDate.value)) return
  blockedDates.value.push(newBlockedDate.value)
  blockedDates.value.sort()
  newBlockedDate.value = ''
}

const handleSave = async () => {
  saving.value = true
  saved.value = false
  saveError.value = false
  try {
    const token = await getIdToken()
    await $fetch('/api/admin/availability', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: {
        weeklySchedule: weeklySchedule.value,
        blockedDates: blockedDates.value,
        slotDuration: slotDuration.value,
      },
    })
    saved.value = true
    setTimeout(() => { saved.value = false }, 3000)
  } catch {
    saveError.value = true
  } finally {
    saving.value = false
  }
}

const formatBlockedDate = (iso: string) =>
  new Date(iso).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })
</script>
