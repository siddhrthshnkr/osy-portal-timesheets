import type { Timesheet, Employee, Holiday, Totals, Filters } from '../types'

// Sample timesheet data based on time-sheet-v2.json
export const sampleTimesheets: Timesheet[] = [
  {
    "id": 12743,
    "status": "APPROVED",
    "approved_by": {
      "id": 1,
      "hubspot_user_id": "70099409",
      "invited_by": null,
      "firstname": "",
      "lastname": "Admin",
      "email": "siddharth+portal@firstpage.com.au",
      "phone": "Not Set",
      "email_verified_at": "2025-02-17T00:24:27.000000Z",
      "two_factor_secret": null,
      "two_factor_recovery_codes": null,
      "two_factor_confirmed_at": null,
      "company_name": null,
      "title": "Super Admin",
      "created_at": "2025-02-17T00:24:27.000000Z",
      "updated_at": "2025-08-19T03:41:13.000000Z",
      "active": 1,
      "billing_name": null,
      "billing_address": null,
      "tax_number": null,
      "office_id": 1,
      "billing_office": 1,
      "position": null,
      "company_id": null,
      "hiring_manager": false,
      "timesheet_approver": false,
      "job_order_id": null
    },
    "approved_on": "2025-07-31T00:00:00.000000Z",
    "start_date": "2025-07-28T00:00:00.000000Z",
    "end_date": "2025-08-03T00:00:00.000000Z",
    "billable_minutes": 2160,
    "unpaid_minutes": 240,
    "total_minutes": 2220,
    "overtime_minutes": 9,
    "zoho_employee_id": "0054",
    "contract_id": 1015,
    "entries": [
      {
        "id": 53205,
        "date": "2025-07-28T00:00:00.000000Z",
        "billable_minutes": 480,
        "unpaid_minutes": 60,
        "total_minutes": 499,
        "overtime_minutes": 0,
        "time_start": "2025-07-28T05:53:00.000000Z",
        "time_end": "2025-07-28T15:12:00.000000Z",
        "shift_start": "2025-07-28T06:00:00.000000Z",
        "shift_end": "2025-07-28T15:00:00.000000Z",
        "zoho_people_entry_status": "Present",
        "zoho_people_entry_shift_name": "AM6 x FT9"
      },
      {
        "id": 53450,
        "date": "2025-07-29T00:00:00.000000Z",
        "billable_minutes": 480,
        "unpaid_minutes": 60,
        "total_minutes": 497,
        "overtime_minutes": 0,
        "time_start": "2025-07-29T05:51:00.000000Z",
        "time_end": "2025-07-29T15:08:00.000000Z",
        "shift_start": "2025-07-29T06:00:00.000000Z",
        "shift_end": "2025-07-29T15:00:00.000000Z",
        "zoho_people_entry_status": "Present",
        "zoho_people_entry_shift_name": "AM6 x FT9"
      },
      {
        "id": 53700,
        "date": "2025-07-30T00:00:00.000000Z",
        "billable_minutes": 480,
        "unpaid_minutes": 60,
        "total_minutes": 491,
        "overtime_minutes": 0,
        "time_start": "2025-07-30T05:53:00.000000Z",
        "time_end": "2025-07-30T15:04:00.000000Z",
        "shift_start": "2025-07-30T06:00:00.000000Z",
        "shift_end": "2025-07-30T15:00:00.000000Z",
        "zoho_people_entry_status": "Present",
        "zoho_people_entry_shift_name": "AM6 x FT9"
      },
      {
        "id": 53966,
        "date": "2025-07-31T00:00:00.000000Z",
        "billable_minutes": 480,
        "unpaid_minutes": 60,
        "total_minutes": 484,
        "overtime_minutes": 0,
        "time_start": "2025-07-31T05:58:00.000000Z",
        "time_end": "2025-07-31T15:02:00.000000Z",
        "shift_start": "2025-07-31T06:00:00.000000Z",
        "shift_end": "2025-07-31T15:00:00.000000Z",
        "zoho_people_entry_status": "Present",
        "zoho_people_entry_shift_name": "AM6 x FT9"
      },
      {
        "id": 54462,
        "date": "2025-08-01T00:00:00.000000Z",
        "billable_minutes": 240,
        "unpaid_minutes": 0,
        "total_minutes": 249,
        "overtime_minutes": 9,
        "time_start": "2025-08-01T11:01:00.000000Z",
        "time_end": "2025-08-01T15:10:00.000000Z",
        "shift_start": "2025-08-01T06:00:00.000000Z",
        "shift_end": "2025-08-01T15:00:00.000000Z",
        "zoho_people_entry_status": "Sick Leave(First Half), 0.5 day Present",
        "zoho_people_entry_shift_name": "AM6 x FT9"
      }
    ]
  },
  {
    "id": 13114,
    "status": "APPROVED",
    "approved_by": {
      "id": 1,
      "hubspot_user_id": "70099409",
      "invited_by": null,
      "firstname": "",
      "lastname": "Admin",
      "email": "siddharth+portal@firstpage.com.au",
      "phone": "Not Set",
      "email_verified_at": "2025-02-17T00:24:27.000000Z",
      "two_factor_secret": null,
      "two_factor_recovery_codes": null,
      "two_factor_confirmed_at": null,
      "company_name": null,
      "title": "Super Admin",
      "created_at": "2025-02-17T00:24:27.000000Z",
      "updated_at": "2025-08-19T03:41:13.000000Z",
      "active": 1,
      "billing_name": null,
      "billing_address": null,
      "tax_number": null,
      "office_id": 1,
      "billing_office": 1,
      "position": null,
      "company_id": null,
      "hiring_manager": false,
      "timesheet_approver": false,
      "job_order_id": null
    },
    "approved_on": "2025-08-07T00:00:00.000000Z",
    "start_date": "2025-08-04T00:00:00.000000Z",
    "end_date": "2025-08-10T00:00:00.000000Z",
    "billable_minutes": 2400,
    "unpaid_minutes": 300,
    "total_minutes": 2499,
    "overtime_minutes": 99,
    "zoho_employee_id": "0054",
    "contract_id": 1015,
    "entries": [
      {
        "id": 54488,
        "date": "2025-08-04T00:00:00.000000Z",
        "billable_minutes": 480,
        "unpaid_minutes": 60,
        "total_minutes": 494,
        "overtime_minutes": 14,
        "time_start": "2025-08-04T05:54:00.000000Z",
        "time_end": "2025-08-04T15:08:00.000000Z",
        "shift_start": "2025-08-04T06:00:00.000000Z",
        "shift_end": "2025-08-04T15:00:00.000000Z",
        "zoho_people_entry_status": "Present",
        "zoho_people_entry_shift_name": "AM6 x FT9"
      },
      {
        "id": 54720,
        "date": "2025-08-05T00:00:00.000000Z",
        "billable_minutes": 480,
        "unpaid_minutes": 60,
        "total_minutes": 519,
        "overtime_minutes": 39,
        "time_start": "2025-08-05T05:52:00.000000Z",
        "time_end": "2025-08-05T15:31:00.000000Z",
        "shift_start": "2025-08-05T06:00:00.000000Z",
        "shift_end": "2025-08-05T15:00:00.000000Z",
        "zoho_people_entry_status": "Present",
        "zoho_people_entry_shift_name": "AM6 x FT9"
      },
      {
        "id": 54969,
        "date": "2025-08-06T00:00:00.000000Z",
        "billable_minutes": 480,
        "unpaid_minutes": 60,
        "total_minutes": 497,
        "overtime_minutes": 17,
        "time_start": "2025-08-06T05:53:00.000000Z",
        "time_end": "2025-08-06T15:10:00.000000Z",
        "shift_start": "2025-08-06T06:00:00.000000Z",
        "shift_end": "2025-08-06T15:00:00.000000Z",
        "zoho_people_entry_status": "Present",
        "zoho_people_entry_shift_name": "AM6 x FT9"
      },
      {
        "id": 55199,
        "date": "2025-08-07T00:00:00.000000Z",
        "billable_minutes": 480,
        "unpaid_minutes": 60,
        "total_minutes": 501,
        "overtime_minutes": 21,
        "time_start": "2025-08-07T05:49:00.000000Z",
        "time_end": "2025-08-07T15:10:00.000000Z",
        "shift_start": "2025-08-07T06:00:00.000000Z",
        "shift_end": "2025-08-07T15:00:00.000000Z",
        "zoho_people_entry_status": "Present",
        "zoho_people_entry_shift_name": "AM6 x FT9"
      },
      {
        "id": 55449,
        "date": "2025-08-08T00:00:00.000000Z",
        "billable_minutes": 480,
        "unpaid_minutes": 60,
        "total_minutes": 488,
        "overtime_minutes": 8,
        "time_start": "2025-08-08T05:55:00.000000Z",
        "time_end": "2025-08-08T15:03:00.000000Z",
        "shift_start": "2025-08-08T06:00:00.000000Z",
        "shift_end": "2025-08-08T15:00:00.000000Z",
        "zoho_people_entry_status": "Present",
        "zoho_people_entry_shift_name": "AM6 x FT9"
      },
      {
        "id": 67228,
        "date": "2025-08-10T00:00:00.000000Z",
        "billable_minutes": 0,
        "unpaid_minutes": 0,
        "total_minutes": 0,
        "overtime_minutes": 0,
        "time_start": null,
        "time_end": null,
        "shift_start": "2025-08-10T06:00:00.000000Z",
        "shift_end": "2025-08-10T15:00:00.000000Z",
        "zoho_people_entry_status": "Weekend",
        "zoho_people_entry_shift_name": "AM6 x FT9"
      }
    ]
  },
  {
    "id": 13468,
    "status": "PENDING",
    "approved_by": null,
    "approved_on": null,
    "start_date": "2025-08-11T00:00:00.000000Z",
    "end_date": "2025-08-17T00:00:00.000000Z",
    "billable_minutes": 1920,
    "unpaid_minutes": 240,
    "total_minutes": 2017,
    "overtime_minutes": 90,
    "zoho_employee_id": "0054",
    "contract_id": 1015,
    "entries": [
      {
        "id": 55801,
        "date": "2025-08-11T00:00:00.000000Z",
        "billable_minutes": 480,
        "unpaid_minutes": 60,
        "total_minutes": 493,
        "overtime_minutes": 13,
        "time_start": "2025-08-11T05:53:00.000000Z",
        "time_end": "2025-08-11T15:06:00.000000Z",
        "shift_start": "2025-08-11T06:00:00.000000Z",
        "shift_end": "2025-08-11T15:00:00.000000Z",
        "zoho_people_entry_status": "Present",
        "zoho_people_entry_shift_name": "AM6 x FT9"
      },
      {
        "id": 67222,
        "date": "2025-08-12T00:00:00.000000Z",
        "billable_minutes": 480,
        "unpaid_minutes": 60,
        "total_minutes": 547,
        "overtime_minutes": 60,
        "time_start": "2025-08-12T05:56:00.000000Z",
        "time_end": "2025-08-12T16:03:00.000000Z",
        "shift_start": "2025-08-12T06:00:00.000000Z",
        "shift_end": "2025-08-12T15:00:00.000000Z",
        "zoho_people_entry_status": "Present",
        "zoho_people_entry_shift_name": "AM6 x FT9"
      },
      {
        "id": 67223,
        "date": "2025-08-13T00:00:00.000000Z",
        "billable_minutes": 0,
        "unpaid_minutes": 0,
        "total_minutes": 0,
        "overtime_minutes": 0,
        "time_start": null,
        "time_end": null,
        "shift_start": "2025-08-13T06:00:00.000000Z",
        "shift_end": "2025-08-13T15:00:00.000000Z",
        "zoho_people_entry_status": "Sick Leave",
        "zoho_people_entry_shift_name": "AM6 x FT9"
      },
      {
        "id": 67224,
        "date": "2025-08-16T00:00:00.000000Z",
        "billable_minutes": 0,
        "unpaid_minutes": 0,
        "total_minutes": 0,
        "overtime_minutes": 0,
        "time_start": null,
        "time_end": null,
        "shift_start": "2025-08-16T06:00:00.000000Z",
        "shift_end": "2025-08-16T15:00:00.000000Z",
        "zoho_people_entry_status": "Weekend",
        "zoho_people_entry_shift_name": "AM6 x FT9"
      },
      {
        "id": 67225,
        "date": "2025-08-17T00:00:00.000000Z",
        "billable_minutes": 0,
        "unpaid_minutes": 0,
        "total_minutes": 0,
        "overtime_minutes": 0,
        "time_start": null,
        "time_end": null,
        "shift_start": "2025-08-17T06:00:00.000000Z",
        "shift_end": "2025-08-17T15:00:00.000000Z",
        "zoho_people_entry_status": "Weekend",
        "zoho_people_entry_shift_name": "AM6 x FT9"
      },
      {
        "id": 67226,
        "date": "2025-08-14T00:00:00.000000Z",
        "billable_minutes": 480,
        "unpaid_minutes": 60,
        "total_minutes": 489,
        "overtime_minutes": 9,
        "time_start": "2025-08-14T05:53:00.000000Z",
        "time_end": "2025-08-14T15:02:00.000000Z",
        "shift_start": "2025-08-14T06:00:00.000000Z",
        "shift_end": "2025-08-14T15:00:00.000000Z",
        "zoho_people_entry_status": "Present",
        "zoho_people_entry_shift_name": "AM6 x FT9"
      },
      {
        "id": 67227,
        "date": "2025-08-15T00:00:00.000000Z",
        "billable_minutes": 480,
        "unpaid_minutes": 60,
        "total_minutes": 488,
        "overtime_minutes": 8,
        "time_start": "2025-08-15T05:55:00.000000Z",
        "time_end": "2025-08-15T15:03:00.000000Z",
        "shift_start": "2025-08-15T06:00:00.000000Z",
        "shift_end": "2025-08-15T15:00:00.000000Z",
        "zoho_people_entry_status": "Present",
        "zoho_people_entry_shift_name": "AM6 x FT9"
      }
    ]
  }
]

// Sample employee data
export const sampleEmployee: Employee = {
  id: 1,
  first_name: "Siddharth",
  last_name: "Shankar",
  photo_url: null,
  zoho_employee_id: "0054"
}

// Sample holiday data
export const sampleHolidays: Holiday[] = [
  {
    date: "2025-08-01",
    name: "National Day",
    type: "public"
  },
  {
    date: "2025-08-15",
    name: "Independence Day",
    type: "public"
  }
]

// Calculate totals from timesheet data
const calculateTotals = (): Totals => {
  const totalBillable = sampleTimesheets.reduce((sum, timesheet) => sum + timesheet.billable_minutes, 0)
  const totalUnpaid = sampleTimesheets.reduce((sum, timesheet) => sum + timesheet.unpaid_minutes, 0)
  const totalMinutes = sampleTimesheets.reduce((sum, timesheet) => sum + timesheet.total_minutes, 0)
  
  // Calculate leave hours (sick leave and partial days)
  let leaveMinutes = 0
  sampleTimesheets.forEach(timesheet => {
    timesheet.entries.forEach(entry => {
      if (entry.zoho_people_entry_status.includes('Sick Leave')) {
        if (entry.zoho_people_entry_status.includes('0.5 day')) {
          leaveMinutes += 4 * 60 // Half day = 4 hours
        } else {
          leaveMinutes += 8 * 60 // Full day = 8 hours
        }
      }
    })
  })

  return {
    total_minutes: totalMinutes,
    billable_minutes: totalBillable,
    unpaid_minutes: totalUnpaid,
    leave_minutes: leaveMinutes
  }
}

export const sampleTotals: Totals = calculateTotals()

// Sample filters
export const sampleFilters: Filters = {
  calendar_month: "2025-08",
  zoho_employee_id: "0054"
}