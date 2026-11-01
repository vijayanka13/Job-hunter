# Careerly — Job Hunting Tracker

A responsive React + Tailwind job-search workspace built with Vite.

## Features
- Dashboard with status counts, response rate, upcoming interview-stage applications, and recent activity.
- Application CRUD: create, edit, delete, salary range, applied date, notes, job URL and location.
- Status pipeline: Applied → Interview → Offer → Rejected. Update status directly from an application card.
- Search by company, filter by status, sort by applied date.
- Application detail view with a dated notes timeline.
- Explore remote jobs from Remotive's public, keyless API. Search by keyword/category and save a listing into your tracker.
- Local persistence using browser localStorage.
- Reusable components: Card, Badge, Button, StatBox, EmptyState, FormInput, Modal, SearchBox, PageHeading, ApplicationCard, Layout.

## Run locally
1. Install Node.js 18+.
2. In this folder run `npm install`.
3. Run `npm run dev`.
4. Open the local URL printed by Vite.

## Notes
- The app starts with sample applications so the dashboard is populated. Delete these or replace them with your own.
- All tracker data is stored in this browser's localStorage; it is not synced between devices.
- Explore Jobs calls `https://remotive.com/api/remote-jobs` directly from the browser. API availability, CORS policy, and listing freshness are controlled by Remotive.
- Response rate is calculated as applications in Interview, Offer, or Rejected divided by all applications. Upcoming interviews currently means applications in Interview status; add dated timeline notes for exact interview appointments.
