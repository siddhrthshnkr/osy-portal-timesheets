<template>
  <div id="app">
    <TimesheetCalendar 
      :timesheets="timesheets"
      :employee="employee"
      :totals="totals"
      :filters="filters"
      :holidays="holidays"
      :can-generate-invoice="true"
      @month-changed="handleMonthChanged"
      @generate-invoice="handleGenerateInvoice"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import TimesheetCalendar from './components/TimesheetCalendar.vue'
import { 
  sampleTimesheets, 
  sampleEmployee, 
  sampleHolidays, 
  sampleTotals, 
  sampleFilters 
} from './data/sampleData'
import type { Timesheet, Employee, Holiday, Totals, Filters } from './types'

// Reactive data
const timesheets = ref<Timesheet[]>([])
const employee = ref<Employee>({} as Employee)
const holidays = ref<Holiday[]>([])
const totals = ref<Totals>({} as Totals)
const filters = ref<Filters>({} as Filters)

// Event handlers
const handleMonthChanged = (month: string) => {
  console.log('Month changed to:', month)
  // In a real app, this would trigger API calls to fetch new data
  filters.value.calendar_month = month
}

const handleGenerateInvoice = () => {
  console.log('Generate invoice clicked')
  alert('Invoice generation functionality would be implemented here.')
}

// Load sample data (in a real app, this would come from API)
onMounted(() => {
  timesheets.value = sampleTimesheets
  employee.value = sampleEmployee
  holidays.value = sampleHolidays
  totals.value = sampleTotals
  filters.value = sampleFilters
})
</script>

<style>
/* Import Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  min-height: 100vh;
  background-color: #ffffff;
}

body {
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
</style>