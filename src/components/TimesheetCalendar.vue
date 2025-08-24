<template>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <h1>Attendance</h1>
      
      <div class="header-controls">
        <div class="month-selector">
          <button class="prev-month" @click="navigateMonth('prev')">
            <svg viewBox="0 0 24 24">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            </svg>
          </button>
          <div class="month-display">{{ currentMonthDisplay }}</div>
          <button class="next-month" @click="navigateMonth('next')">
            <svg viewBox="0 0 24 24">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
            </svg>
          </button>
        </div>
        
        <button class="generate-invoice-btn" @click="generateInvoice" v-if="canGenerateInvoice">
          Generate Invoice
        </button>
      </div>
    </div>

    <!-- Employee Card -->
    <div class="employee-card">
      <div class="employee-info">
        <div class="avatar">
          <img v-if="employee.photo_url" :src="employee.photo_url" :alt="employee.first_name" />
          <span v-else>{{ getInitials(employee.first_name, employee.last_name) }}</span>
        </div>
        <div class="employee-name">{{ employee.first_name }} {{ employee.last_name }}</div>
      </div>
      
      <div class="stats">
        <div class="stat-item">
          <div class="stat-value">{{ formatMinutesToHours(totals.total_minutes) }}</div>
          <div class="stat-label">Total Hours</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">{{ formatMinutesToHours(totals.billable_minutes) }}</div>
          <div class="stat-label">Billable Hours</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">{{ formatMinutesToHours(totals.leave_minutes) }}</div>
          <div class="stat-label">Leave Hours</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">{{ formatMinutesToHours(totals.unpaid_minutes) }}</div>
          <div class="stat-label">Unpaid Breaks</div>
        </div>
      </div>
    </div>

    <!-- Desktop Calendar -->
    <div class="calendar">
      <div class="calendar-header">
        <div class="calendar-day-header">MON</div>
        <div class="calendar-day-header">TUE</div>
        <div class="calendar-day-header">WED</div>
        <div class="calendar-day-header">THUR</div>
        <div class="calendar-day-header">FRI</div>
        <div class="calendar-day-header">SAT</div>
        <div class="calendar-day-header">SUN</div>
      </div>
      
      <div class="calendar-grid">
        <div 
          v-for="day in calendarDays" 
          :key="`${day.date.toISOString()}`"
          :class="getDayClasses(day)"
          class="calendar-day"
        >
          <div class="day-number">{{ day.isCurrentMonth ? day.dayNumber : '' }}</div>
          <div class="day-content" v-if="day.isCurrentMonth">
            <div v-if="day.holiday" class="info-pill holiday-pill">{{ day.holiday.name }}</div>
            <div v-if="day.entry" :class="`info-pill status-pill ${getStatusClass(day.entry.zoho_people_entry_status)}`">
              {{ getStatusDisplay(day.entry.zoho_people_entry_status) }}
            </div>
            <div v-if="day.entry && day.entry.time_start && day.entry.time_end" class="info-pill time-pill">
              Time: {{ formatTime(day.entry.time_start) }} - {{ formatTime(day.entry.time_end) }}
            </div>
            <div v-if="day.entry && day.entry.shift_start && day.entry.shift_end" class="info-pill shift-pill">
              Shift: {{ formatTime(day.entry.shift_start) }} - {{ formatTime(day.entry.shift_end) }}
            </div>
            <div class="minutes-pills">
              <div v-if="day.entry && day.entry.billable_minutes" class="info-pill billable-pill">
                Billable: {{ formatMinutesToHours(day.entry.billable_minutes) }}
              </div>
              <div v-if="day.entry && day.entry.total_minutes" class="info-pill total-pill">
                Total: {{ formatMinutesToHours(day.entry.total_minutes) }}
              </div>
              <div v-if="day.entry && day.entry.unpaid_minutes" class="info-pill unpaid-pill">
                Unpaid: {{ formatMinutesToHours(day.entry.unpaid_minutes) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Calendar -->
    <div class="mobile-calendar">
      <div class="mobile-calendar-grid">
        <div class="mobile-day-header">Mon</div>
        <div class="mobile-day-header">Tue</div>
        <div class="mobile-day-header">Wed</div>
        <div class="mobile-day-header">Thu</div>
        <div class="mobile-day-header">Fri</div>
        <div class="mobile-day-header">Sat</div>
        <div class="mobile-day-header">Sun</div>
        
        <div 
          v-for="day in calendarDays" 
          :key="`mobile-${day.date.toISOString()}`"
          :class="getMobileDayClasses(day)"
          class="mobile-day"
          @click="selectMobileDay(day)"
        >
          <div v-if="day.isCurrentMonth">{{ day.dayNumber }}</div>
          <div 
            v-if="day.isCurrentMonth && day.entry" 
            class="mobile-status"
          >
            {{ getStatusDisplay(day.entry.zoho_people_entry_status) }}
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Events -->
    <div class="mobile-events" v-if="selectedMobileDay">
      <div class="mobile-event-card" v-if="selectedMobileDay.entry">
        <div class="mobile-event-title">{{ getStatusDisplay(selectedMobileDay.entry.zoho_people_entry_status) }}</div>
        <div class="time-info">
          {{ selectedMobileDay.entry.time_start && selectedMobileDay.entry.time_end ? 
            `Actual: ${formatTime(selectedMobileDay.entry.time_start)} - ${formatTime(selectedMobileDay.entry.time_end)}` : 
            'No time data'
          }}
        </div>
        <div class="time-info">
          {{ selectedMobileDay.entry.shift_start && selectedMobileDay.entry.shift_end ? 
            `Shift: ${formatTime(selectedMobileDay.entry.shift_start)} - ${formatTime(selectedMobileDay.entry.shift_end)}` : 
            ''
          }}
        </div>
        <div class="minutes-pills">
            <div v-if="selectedMobileDay.entry && selectedMobileDay.entry.billable_minutes" class="info-pill billable-pill">
              Billable: {{ formatMinutesToHours(selectedMobileDay.entry.billable_minutes) }}
            </div>
            <div v-if="selectedMobileDay.entry && selectedMobileDay.entry.total_minutes" class="info-pill total-pill">
              Total: {{ formatMinutesToHours(selectedMobileDay.entry.total_minutes) }}
            </div>
            <div v-if="selectedMobileDay.entry && selectedMobileDay.entry.unpaid_minutes" class="info-pill unpaid-pill">
              Unpaid: {{ formatMinutesToHours(selectedMobileDay.entry.unpaid_minutes) }}
            </div>
        </div>
      </div>
      <div class="mobile-event-card" v-else>
        <div class="mobile-event-title">No data for this day</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'

dayjs.extend(isoWeek)

// Types
interface Entry {
  id: number
  date: string
  billable_minutes: number
  unpaid_minutes: number
  total_minutes: number
  overtime_minutes: number
  time_start: string | null
  time_end: string | null
  shift_start: string
  shift_end: string
  zoho_people_entry_status: string
  zoho_people_entry_shift_name: string
}

interface Timesheet {
  id: number
  status: "APPROVED" | "PENDING" | "UNDER_DISPUTE"
  approved_by: any
  approved_on: string | null
  start_date: string
  end_date: string
  billable_minutes: number
  unpaid_minutes: number
  total_minutes: number
  overtime_minutes: number
  zoho_employee_id: string
  contract_id: number
  entries: Entry[]
}

interface Employee {
  id: number
  first_name: string
  last_name: string
  photo_url: string | null
  zoho_employee_id: string
}

interface Holiday {
  date: string
  name: string
  type: string
}

interface Totals {
  total_minutes: number
  billable_minutes: number
  unpaid_minutes: number
  leave_minutes: number
}

interface Filters {
  calendar_month: string
  zoho_employee_id: string
}

interface DayData {
  date: Date
  dayNumber: number
  isCurrentMonth: boolean
  isToday: boolean
  entry: Entry | null
  holiday: Holiday | null
}

// Props
const props = defineProps<{
  timesheets: Timesheet[]
  employee: Employee
  totals: Totals
  filters: Filters
  holidays: Holiday[]
  canGenerateInvoice?: boolean
}>()

// Emits
const emit = defineEmits<{
  monthChanged: [month: string]
  generateInvoice: []
}>()

// Reactive state
const currentMonth = ref(dayjs(props.filters.calendar_month).month())
const currentYear = ref(dayjs(props.filters.calendar_month).year())
const selectedMobileDay = ref<DayData | null>(null)

// Computed properties
const currentMonthDisplay = computed(() => {
  return dayjs().month(currentMonth.value).year(currentYear.value).format('MMMM YYYY')
})

const allEntries = computed(() => {
  return props.timesheets.flatMap(timesheet => timesheet.entries)
})

const calendarDays = computed(() => {
  const firstDayOfMonth = dayjs().year(currentYear.value).month(currentMonth.value).startOf('month')
  const lastDayOfMonth = dayjs().year(currentYear.value).month(currentMonth.value).endOf('month')

  const startDate = firstDayOfMonth.startOf('isoWeek')
  const endDate = lastDayOfMonth.endOf('isoWeek')
  
  const daysInGrid = endDate.diff(startDate, 'day') + 1

  const calendar: DayData[] = []
  let currentDate = startDate
  
  // Generate days to fill the grid for the current month's weeks
  for (let i = 0; i < daysInGrid; i++) {
    const dayData: DayData = {
      date: currentDate.toDate(),
      dayNumber: currentDate.date(),
      isCurrentMonth: currentDate.month() === currentMonth.value,
      isToday: currentDate.isSame(dayjs(), 'day'),
      entry: null,
      holiday: null
    }
    
    // Find matching entry
    const dateString = currentDate.format('YYYY-MM-DD')
    const entry = allEntries.value.find(e => dayjs(e.date).format('YYYY-MM-DD') === dateString)
    if (entry) {
      dayData.entry = entry
    }
    
    // Find matching holiday
    const holiday = props.holidays.find(h => h.date === dateString)
    if (holiday) {
      dayData.holiday = holiday
    }
    
    calendar.push(dayData)
    currentDate = currentDate.add(1, 'day')
  }
  
  return calendar
})

// Methods
const formatMinutesToHours = (minutes: number): string => {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${hours}:${mins.toString().padStart(2, '0')}`
}

const formatTime = (timeString: string): string => {
  if (!timeString) return ''
  return dayjs(timeString).format('HH:mm')
}

const getInitials = (firstName: string, lastName: string): string => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
}

const getStatusClass = (status: string): string => {
  if (status.includes('Present')) return 'present'
  if (status.includes('Sick Leave')) return 'sick-leave'
  if (status.includes('Weekend')) return 'weekend'
  return 'partial'
}

const getStatusDisplay = (status: string): string => {
  if (status.includes('Present')) return 'Present'
  if (status.includes('Sick Leave')) return 'Sick Leave'
  if (status.includes('Weekend')) return 'Weekend'
  return status
}

const getDayClasses = (day: DayData): string[] => {
  const classes: string[] = []
  
  if (!day.isCurrentMonth) {
    classes.push('empty')
  }
  
  if (day.entry) {
    classes.push(getStatusClass(day.entry.zoho_people_entry_status))
  }
  
  return classes
}

const getMobileDayClasses = (day: DayData): string[] => {
  const classes: string[] = []
  
  if (!day.isCurrentMonth) {
    classes.push('empty')
  }
  
  if (day.entry) {
    classes.push('has-event', getStatusClass(day.entry.zoho_people_entry_status))
  }
  
  if (selectedMobileDay.value && dayjs(day.date).isSame(dayjs(selectedMobileDay.value.date), 'day')) {
    classes.push('selected')
  }
  
  return classes
}

const navigateMonth = (direction: 'prev' | 'next') => {
  if (direction === 'prev') {
    if (currentMonth.value === 0) {
      currentMonth.value = 11
      currentYear.value--
    } else {
      currentMonth.value--
    }
  } else {
    if (currentMonth.value === 11) {
      currentMonth.value = 0
      currentYear.value++
    } else {
      currentMonth.value++
    }
  }
  
  const newMonth = dayjs().year(currentYear.value).month(currentMonth.value).format('YYYY-MM')
  emit('monthChanged', newMonth)
}

const selectMobileDay = (day: DayData) => {
  if (day.isCurrentMonth) {
    selectedMobileDay.value = day
  }
}

const generateInvoice = () => {
  emit('generateInvoice')
}

// Watch for prop changes
watch(() => props.filters.calendar_month, (newMonth) => {
  const month = dayjs(newMonth)
  currentMonth.value = month.month()
  currentYear.value = month.year()
})
</script>

<style scoped>
.container {
  padding: 65px 88px 88px 88px;
  max-width: 1400px;
  margin: 0 auto;
  box-sizing: border-box;
}

/* Header Section */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  height: 44px;
}

.header h1 {
  font-family: 'DM Sans', sans-serif;
  font-weight: 700;
  font-size: 44px;
  line-height: 52px;
  color: #0a0a0a;
  letter-spacing: -0.88px;
}

.header-controls {
  display: flex;
  align-items: center;
  gap: 23px;
}

.month-selector {
  display: flex;
  align-items: center;
  gap: 23px;
}

.month-selector button {
  background: none;
  border: none;
  cursor: pointer;
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s ease;
}

.month-selector button:hover {
  opacity: 0.7;
}

.month-selector button svg {
  width: 24px;
  height: 24px;
  fill: #0a0a0a;
}

.month-display {
  font-family: 'DM Sans', sans-serif;
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  color: #0a0a0a;
  letter-spacing: -0.2px;
  min-width: 120px;
  text-align: center;
}

.generate-invoice-btn {
  background-color: #014c85;
  color: #ffffff;
  border: none;
  padding: 11px 14px 12px 14px;
  border-radius: 4px;
  font-family: 'DM Sans', sans-serif;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  white-space: nowrap;
  transition: background-color 0.2s ease;
}

.generate-invoice-btn:hover {
  background-color: #013d6b;
}

/* Employee Card */
.employee-card {
  background-color: #ffffff;
  border-radius: 8px;
  border: 1px solid #e8e8e8;
  padding: 16px;
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 118px;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.15);
}

.employee-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.avatar {
  width: 70px;
  height: 70px;
  border-radius: 50px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  color: #666;
  overflow: hidden;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.employee-name {
  font-family: 'DM Sans', sans-serif;
  font-weight: 700;
  font-size: 44px;
  line-height: 52px;
  color: #0a0a0a;
  letter-spacing: -0.88px;
}

.stats {
  display: flex;
  gap: 50px;
  align-items: center;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-family: 'DM Sans', sans-serif;
  font-weight: 600;
  font-size: 18px;
  line-height: 28px;
  color: #0a0a0a;
}

.stat-label {
  font-family: 'DM Sans', sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  color: rgba(10, 10, 10, 0.6);
}

/* Calendar */
.calendar {
  background-color: #ffffff;
  border-radius: 8px;
  border: 1px solid #d0d0d0;
  overflow: hidden;
  box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.18);
}

.calendar-header {
  display: flex;
  background-color: #f9f9f9;
}

.calendar-day-header {
  flex: 1;
  padding: 12px;
  text-align: center;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: #969696;
  border-bottom: 1px solid #d0d0d0;
}

.calendar-day-header:not(:last-child) {
  border-right: 1px solid #d0d0d0;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.calendar-day {
  min-height: 192.6px;
  padding: 12px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border-bottom: 1px solid #d0d0d0;
}
.calendar-day:not(:nth-child(7n)) {
  border-right: 1px solid #d0d0d0;
}

.calendar-grid > .calendar-day:nth-last-child(-n+7) {
    border-bottom: none;
}


.calendar-day.empty {
  background-color: #f8f8f8;
}

.calendar-day.weekend {
  background-color: #f8f9fa;
}

.day-number {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 21px;
  color: #000000;
}

.day-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  margin-top: 8px;
  text-align: left;
}

.info-pill {
  padding: 3px 8px;
  border-radius: 4px;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 12px;
  text-align: left;
}

.status-pill.present {
  background-color: #AEEBCB; /* Mint Green */
  color: #155724;
}

.status-pill.sick-leave {
  background-color: #fff3cd;
  color: #856404;
}

.status-pill.weekend {
  background-color: #e2e3e5;
  color: #6c757d;
}

.status-pill.partial {
  background-color: #f8d7da;
  color: #721c24;
}

.time-pill {
  background-color: #D7CFF5; /* Lavender Mist */
}

.shift-pill {
  background-color: #FFD8B1; /* Soft Peach */
}

.minutes-pills {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 4px;
}

.billable-pill {
  background-color: #B6E3B5; /* Emerald */
}

.total-pill {
  background-color: #F6E2B3; /* Sand */
}

.unpaid-pill {
  background-color: #F7C6C7; /* Rose */
}

.holiday-pill {
  background-color: #A3CBE7; /* Sky Blue */
  color: #0c5460;
}

/* Mobile Calendar Styles */
.mobile-calendar {
  display: none;
  background-color: #ffffff;
  border-radius: 8px;
  border: 1px solid #e8e8e8;
  padding: 20px;
  margin-top: 20px;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.15);
}

.mobile-calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
}

.mobile-day-header {
  text-align: center;
  font-family: 'SF UI Text', sans-serif;
  font-weight: 500;
  font-size: 13px;
  color: #8f9bb3;
  padding: 8px 0;
}

.mobile-day {
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: 10px;
  font-family: 'SF UI Text', sans-serif;
  font-weight: 500;
  font-size: 15px;
  color: #222b45;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.mobile-day.empty {
  color: #8f9bb3;
  cursor: default;
}

.mobile-day.selected {
  background-color: #014c85;
  color: #ffffff;
  font-weight: 700;
}

.mobile-day.has-event .mobile-status {
  font-size: 8px;
  font-weight: 600;
  text-transform: uppercase;
  margin-top: 2px;
  padding: 1px 2px;
  border-radius: 2px;
}

.mobile-day.has-event.present .mobile-status {
  background-color: #AEEBCB;
  color: #155724;
}

.mobile-day.has-event.sick-leave .mobile-status {
  background-color: #fff3cd;
  color: #856404;
}

.mobile-day.has-event.weekend .mobile-status {
  background-color: #e2e3e5;
  color: #6c757d;
}

.mobile-day.has-event.partial .mobile-status {
  background-color: #f8d7da;
  color: #721c24;
}

/* Mobile Event Cards */
.mobile-events {
  display: none;
  margin-top: 20px;
}

.mobile-event-card {
  background-color: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e8e8e8;
  padding: 16px;
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.mobile-event-title {
  font-family: 'SF UI Text', sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: #222b45;
  text-align: center;
  padding: 4px;
  border-radius: 4px;
  background-color: #e9ecef;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .container {
    padding: 40px 20px 60px 20px;
  }
  
  .header {
    flex-direction: column;
    gap: 20px;
    height: auto;
  }
  
  .employee-card {
    flex-direction: column;
    height: auto;
    gap: 20px;
  }
  
  .stats {
    gap: 30px;
  }
  
  .calendar-day {
    min-height: 120px;
    padding: 8px;
  }
  
  .day-number {
    font-size: 16px;
  }
  
  .info-pill {
    font-size: 11px;
    padding: 2px 3px;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 20px 16px 40px 16px;
  }
  
  .header {
    flex-direction: column;
    gap: 16px;
    margin-bottom: 20px;
  }
  
  .header h1 {
    font-size: 30px;
    line-height: 36px;
    letter-spacing: -0.3px;
    text-align: center;
  }
  
  .header-controls {
    flex-direction: column;
    gap: 16px;
    width: 100%;
  }
  
  .month-selector {
    order: 2;
  }
  
  .generate-invoice-btn {
    display: none;
  }
  
  .employee-card {
    flex-direction: column;
    height: auto;
    gap: 16px;
    padding: 12px;
    margin-bottom: 20px;
  }
  
  .employee-info {
    flex-direction: column;
    text-align: center;
    gap: 12px;
  }
  
  .avatar {
    width: 50px;
    height: 50px;
    font-size: 18px;
  }
  
  .employee-name {
    font-size: 30px;
    line-height: 36px;
    letter-spacing: -0.3px;
  }
  
  .stats {
    gap: 16px;
    width: 100%;
    justify-content: space-around;
  }
  
  .stat-item {
    flex: 1;
  }
  
  .stat-value {
    font-size: 18px;
    line-height: 28px;
  }
  
  .stat-label {
    font-size: 16px;
    line-height: 22px;
  }
  
  /* Hide desktop calendar on mobile */
  .calendar {
    display: none;
  }
  
  /* Show mobile calendar */
  .mobile-calendar {
    display: block;
  }
  
  .mobile-calendar-grid {
    gap: 4px;
  }
  
  .mobile-day-header {
    font-size: 13px;
    padding: 6px 0;
  }
  
  .mobile-day {
    font-size: 15px;
    min-height: 40px;
  }
  
  /* Show mobile events for selected day */
  .mobile-events {
    display: block;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 16px 12px 32px 12px;
  }
  
  .header h1 {
    font-size: 28px;
    line-height: 34px;
  }
  
  .employee-name {
    font-size: 28px;
    line-height: 34px;
  }
  
  .stats {
    gap: 12px;
  }
  
  .stat-value {
    font-size: 16px;
    line-height: 24px;
  }
  
  .stat-label {
    font-size: 14px;
    line-height: 20px;
  }
  
  .mobile-calendar {
    padding: 16px;
  }
  
  .mobile-day {
    min-height: 36px;
    font-size: 14px;
  }
  
  .mobile-day-header {
    font-size: 12px;
    padding: 4px 0;
  }
}
</style>
