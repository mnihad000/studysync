# StudyStreaks API Contract (v1)

All endpoints are under `/v1` and require:

- Header: `Authorization: Bearer <supabase_access_token>`

## GET /v1/me/groups

Returns all groups the current user belongs to.

### Response

```json
{
  "groups": [
    {
      "id": "grp_123",
      "name": "Calculus Crew",
      "dailyMinutes": 45,
      "streakDays": 12,
      "todayMinutes": 30,
      "membersMet": 3,
      "membersTotal": 5,
      "inviteCode": "ABC123"
    }
  ]
}
```

## POST /v1/groups

Creates a new group and adds the current user as a member.

### Request

```json
{
  "name": "Calculus Crew",
  "dailyMinutes": 45
}
```

### Response

```json
{
  "id": "grp_123",
  "name": "Calculus Crew",
  "dailyMinutes": 45,
  "streakDays": 0,
  "todayMinutes": 0,
  "membersMet": 0,
  "membersTotal": 1,
  "inviteCode": "ABC123"
}
```

## POST /v1/groups/join

Join a group by invite code.

### Request

```json
{
  "inviteCode": "ABC123"
}
```

### Response

```json
{
  "id": "grp_123",
  "name": "Calculus Crew",
  "dailyMinutes": 45,
  "streakDays": 12,
  "todayMinutes": 30,
  "membersMet": 3,
  "membersTotal": 5,
  "inviteCode": "ABC123"
}
```
