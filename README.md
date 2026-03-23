# StudyStreaks

Monorepo for the StudyStreaks MVP:

- `frontend/`: Expo React Native client (`Home`, `Profile`)
- `backend/`: Spring Boot API implementing the v1 contract
- `supabase/`: Supabase CLI config and SQL migrations
- `docs/`: Project roadmap and API contract

## API Endpoints (v1)

- `GET /v1/me/groups`
- `POST /v1/groups`
- `POST /v1/groups/join`

All endpoints require `Authorization: Bearer <supabase_access_token>`.

## Backend Setup

Use environment values from [`backend/.env.example`](backend/.env.example).

Run:

```bash
cd backend
mvn spring-boot:run
```

## Frontend Setup

Use environment values from [`frontend/.env.example`](frontend/.env.example).

Run:

```bash
cd frontend
npm install
npm start
```

## Database Migrations

Supabase migrations are in `supabase/migrations`.

Apply to the linked project:

```bash
npx supabase db push
```
