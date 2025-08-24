export interface Entry {
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

export interface Timesheet {
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

export interface Employee {
  id: number
  first_name: string
  last_name: string
  photo_url: string | null
  zoho_employee_id: string
}

export interface Holiday {
  date: string
  name: string
  type: string
}

export interface Totals {
  total_minutes: number
  billable_minutes: number
  unpaid_minutes: number
  leave_minutes: number
}

export interface Filters {
  calendar_month: string
  zoho_employee_id: string
}

export interface DayData {
  date: Date
  dayNumber: number
  isCurrentMonth: boolean
  isToday: boolean
  entry: Entry | null
  holiday: Holiday | null
}