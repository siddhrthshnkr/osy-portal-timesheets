# Timesheet Calendar Vue Component - v4

A comprehensive Vue 3 timesheet calendar component for Outsourcey Portal that displays monthly attendance data in a responsive dashboard format.

## Features

- **Monthly Calendar View**: 42-day grid (6 weeks) starting Monday (ISO week standard)
- **Employee Information Card**: Avatar, name, and 4-stat display (Total Hours, Billable Hours, Leave Hours, Unpaid Breaks)
- **Comprehensive Day Details**: Each calendar day shows:
  - Holiday badges (if public holiday exists)
  - Status tags (Present/Sick Leave/Weekend/Partial) 
  - Actual time range (clock in/out)
  - Shift time range (scheduled)
  - Minutes breakdown (Billable/Total/Unpaid)
- **Mobile Responsive Design**: 
  - Desktop: Full calendar grid with detailed information
  - Mobile: Compact calendar with click interaction and detailed event cards
- **Month Navigation**: Previous/Next buttons with synchronized desktop/mobile displays
- **Generate Invoice**: Admin functionality button (hidden on mobile)

## Tech Stack

- **Vue 3** with TypeScript and Composition API
- **DayJS** for date manipulation
- **Vite** for build tooling
- **CSS3** with responsive design (no external CSS framework dependencies)

## Project Structure

```
osy-calendar-v4/
├── src/
│   ├── components/
│   │   └── TimesheetCalendar.vue    # Main calendar component
│   ├── data/
│   │   └── sampleData.ts            # Sample data based on API structure
│   ├── types/
│   │   └── index.ts                 # TypeScript interfaces
│   ├── App.vue                      # Main application wrapper
│   └── main.ts                      # Application entry point
├── public/
│   └── vite.svg                     # Application icon
├── index.html                       # HTML template
├── package.json                     # Dependencies and scripts
├── tsconfig.json                    # TypeScript configuration
├── vite.config.ts                   # Vite configuration
└── README.md                        # This file
```

## Installation & Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Preview production build**:
   ```bash
   npm run preview
   ```

## Component Usage

```vue
<template>
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
</template>

<script setup>
import TimesheetCalendar from './components/TimesheetCalendar.vue'

// Event handlers
const handleMonthChanged = (month) => {
  console.log('Month changed to:', month)
  // Fetch new data for the selected month
}

const handleGenerateInvoice = () => {
  console.log('Generate invoice clicked')
  // Handle invoice generation
}
</script>
```

## Props Interface

```typescript
interface Props {
  timesheets: Timesheet[]        // Monthly timesheet data with entries
  employee: Employee             // Employee information with photo
  totals: Totals                // Pre-calculated totals
  filters: Filters              // Current month and employee filters
  holidays: Holiday[]           // Holiday data for the month
  canGenerateInvoice?: boolean  // Show/hide generate invoice button
}
```

## Data Structure

The component expects data in the following format:

### Timesheet Object
```typescript
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
```

### Entry Object
```typescript
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
```

## Design Specifications

### Typography
- **Primary Font**: 'DM Sans' (headers, stats, controls)
- **Secondary Font**: 'Inter' (calendar content)
- **Mobile Font**: 'SF UI Text'

### Color Scheme
- **Background**: #ffffff
- **Primary Text**: #0a0a0a
- **Secondary Text**: rgba(10, 10, 10, 0.6)
- **Primary Button**: #014c85
- **Present Status**: #d4edda (bg), #155724 (text)
- **Sick Leave Status**: #fff3cd (bg), #856404 (text)
- **Weekend Status**: #e2e3e5 (bg), #6c757d (text)
- **Partial Status**: #f8d7da (bg), #721c24 (text)

### Responsive Breakpoints
- **Desktop (>1200px)**: Full calendar grid, 4 stats, Generate Invoice visible
- **Tablet (768-1200px)**: Stacked header, reduced calendar height
- **Mobile (<768px)**: Mobile calendar, hidden Generate Invoice, event cards

## Calendar Behavior

### Month Display Logic
- Shows only current month days with numbers and data
- Previous/next month cells are empty and greyed out
- Calendar grid always shows 6 weeks (42 cells) for consistency
- Starts calendar on Monday (ISO week standard)

### Status Mapping
- `zoho_people_entry_status` containing "Present" → Present (green)
- `zoho_people_entry_status` containing "Sick Leave" → Sick Leave (yellow)  
- `zoho_people_entry_status` containing "Weekend" → Weekend (grey)
- Other statuses → Partial (red)

### Time Calculations
- **Total Hours**: Sum of all `total_minutes` from timesheets
- **Billable Hours**: Sum of all `billable_minutes` from timesheets
- **Leave Hours**: Calculate from entries with "Sick Leave" status (8hrs full day, 4hrs half day)
- **Unpaid Breaks**: Sum of all `unpaid_minutes` from timesheets

## Integration with Existing Applications

This component is designed to be easily integrated into existing Vue applications:

1. **Minimal Dependencies**: Only requires Vue 3 and DayJS
2. **Self-Contained Styling**: All styles are scoped to the component
3. **Event-Based Communication**: Uses Vue events for parent-child communication
4. **TypeScript Support**: Full type definitions included
5. **Responsive Design**: Works on all device sizes without external CSS frameworks

## Deployment

The component is ready for deployment to Vercel or any static hosting service:

1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting service
3. Configure your hosting to serve the app as an SPA (redirect all routes to index.html)

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Supports ES2020+ features

## License

MIT License - see LICENSE file for details.