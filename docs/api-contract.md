# StudyStreaks API Contract (v1)

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

POST /v1/groups

Creates a new group.

Request
{
  "name": "Calculus Crew",
  "dailyMinutes": 45
}

Response
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

POST /v1/groups/join

Join a group by invite code.

Request
{
  "inviteCode": "ABC123"
}

Response
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