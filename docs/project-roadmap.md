What has been completed so far
Project scope and decisions

The MVP scope is finalized. The app has exactly two screens: Home and Profile.
The Home screen is responsible for showing all group streak information and for creating or joining groups.
The Profile screen exists as a placeholder and is not part of the MVP functionality.

The Home screen includes:

A dashboard showing all groups the user belongs to

Each group card displays group name, daily study minutes, today’s progress, streak days, and member progress

A create-group flow where users enter a group name and daily minutes

A join-group flow using an invite code

The following are explicitly out of scope for the MVP:

Discovery

Rewards

History

Analytics

Additional screens or tabs

Frontend (Expo / React Native)

The Expo app is set up and runs locally.
React Navigation is configured with a stack containing Home and Profile screens.
The Home UI is implemented and approved visually.
The design is minimal, neutral, and utility-first. No aesthetic or “vibe-coded” styling.

The Home screen currently:

Renders group cards using mock data

Supports create and join flows using local state only

Does not depend on any backend APIs yet

Repository and structure

The project is a Git repository and has been pushed to GitHub.
A monorepo layout is established:

studysync/
  frontend/
  backend/
  docs/


The docs/ directory is the shared source of truth.

Backend API design (contract only)

A real API contract has been written and committed at:

docs/api-contract.md


This file is the canonical source of truth for the backend.

The v1 API includes:

GET /v1/me/groups

POST /v1/groups

POST /v1/groups/join

A single canonical Group object shape is defined and used everywhere:

id

name

dailyMinutes

streakDays

todayMinutes

membersMet

membersTotal

inviteCode

No backend code has been written yet.
No authentication, database, or extra endpoints have been added prematurely.

What remains to be done to publish the app
Backend implementation (phase 1)

Create a Spring Boot backend inside the backend/ folder.
Implement only the endpoints defined in docs/api-contract.md.
Use in-memory storage or H2 for now.
Do not add authentication or extra features.
Enable CORS so the Expo app can call the API during development.

Frontend and backend integration

Replace mock data in the Home screen with real fetch calls.
Configure a base API URL that works on emulator and physical devices.
Add loading states and basic error handling.
Confirm create and join flows work end-to-end.

Persistence and infrastructure (phase 2)

Add Docker Compose.
Run PostgreSQL in Docker.
Switch backend storage from in-memory/H2 to Postgres.
Add database migrations.

Authentication (minimal viable)

Choose an authentication approach (email/password or magic link).
Introduce user identity on the backend.
Associate groups with users.
Update GET /v1/me/groups to use authenticated user context.

Production readiness

Add environment variable configuration.
Add basic logging.
Prepare backend for deployment (Render, Railway, Fly.io, etc.).

App Store and Play Store publishing

Create app icon and splash screen.
Set app name and bundle identifiers.
Write a privacy policy.
Set up TestFlight (iOS) and Play Console (Android).
Capture store screenshots.
Submit first production release.