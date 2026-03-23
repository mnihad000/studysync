StudySync – Project Roadmap
1. Completed Work
1.1 Project Scope and Decisions

The MVP scope is finalized.

The app has exactly two screens:

Home

Profile

The Profile screen is a placeholder and not part of MVP functionality.

No additional screens, tabs, or features are planned for MVP.

1.2 Home Screen Responsibilities

The Home screen is responsible for:

Displaying all group streak information

Creating new groups

Joining existing groups

1.3 Home Screen Features (MVP)

The Home screen includes:

A dashboard listing all groups the user belongs to

Group cards that display:

Group name

Daily study minutes

Today’s progress

Streak days

Members met goal

Total members

A create-group flow:

Input: group name

Input: daily study minutes

A join-group flow:

Input: invite code

1.4 Explicitly Out of Scope (MVP)

The following are not included in the MVP:

Discovery

Rewards

History

Analytics

Additional screens or tabs

2. Frontend Status (Expo / React Native)
2.1 App Setup

Expo app is initialized and runs locally.

React Navigation is configured with a stack containing:

Home

Profile

2.2 UI Implementation

Home screen UI is fully implemented.

Visual design is approved.

Design philosophy:

Minimal

Neutral

Utility-first

No aesthetic or “vibe-coded” styling

2.3 Current Home Screen Behavior

Group cards are rendered using mock data

Create and join flows work using local state only

No backend APIs are currently consumed

3. Repository and Project Structure
3.1 Git and Repository

Project is a Git repository.

Repository is pushed to GitHub.

3.2 Monorepo Layout
studysync/
  frontend/
  backend/
  docs/

3.3 Documentation Source of Truth

The docs/ directory is the shared canonical source of truth for the project.

4. Backend API Design (Contract Only)
4.1 API Contract

A complete API contract is written and committed at:

docs/api-contract.md


This file is the canonical backend specification.

4.2 v1 API Endpoints

The v1 API includes only:

GET /v1/me/groups

POST /v1/groups

POST /v1/groups/join

4.3 Canonical Group Object

A single Group object shape is defined and used everywhere:

id

name

dailyMinutes

streakDays

todayMinutes

membersMet

membersTotal

inviteCode

4.4 Backend Implementation Status

No backend code has been written yet.

No authentication has been added.

No database has been added.

No extra endpoints exist beyond the contract.

5. Remaining Work to Publish the App
5.1 Backend Implementation (Phase 1)

Create a Spring Boot project inside backend/

Implement only the endpoints defined in docs/api-contract.md

Use in-memory storage or H2

Do not add authentication or extra features

Enable CORS for Expo development

5.2 Frontend ↔ Backend Integration

Replace mock data with real API fetch calls

Configure a base API URL that works for:

Emulator

Physical devices

Add loading states

Add basic error handling

Verify create and join flows work end-to-end

5.3 Persistence and Infrastructure (Phase 2)

Add Docker Compose

Run PostgreSQL in Docker

Migrate backend storage from in-memory/H2 to PostgreSQL

Add database migrations

5.4 Authentication (Minimal Viable)

Choose authentication method:

Email/password or

Magic link

Introduce user identity on the backend

Associate groups with users

Update GET /v1/me/groups to use authenticated user context

5.5 Production Readiness

Add environment variable configuration

Add basic logging

Prepare backend for deployment:

Render

Railway

Fly.io

or similar

5.6 App Store & Play Store Publishing

Create app icon

Create splash screen

Set app name and bundle identifiers

Write a privacy policy

Set up:

TestFlight (iOS)

Play Console (Android)

Capture store screenshots

Submit first production release