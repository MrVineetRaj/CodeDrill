Additional Features

- AI Code Reviewer
- AI Doubt Solver
- Various Lists Representing featured Problem
- AI interviewer
- Contests
- Mock Interview

# Some Sensitive Command

## For running postgress on docker

```bash
docker run --name postgres -p 5432:5432 -e POSTGRES_PASSWORD=red2003test -e POSTGRES_USER=admin -d postgres
```

# Prisma Command

npx prisma generate
npx prisma migrate dev
npx prisma db push

# Judge0 Run

```bash
  docker compose up -d db redis
  sleep 10s
  docker compose up -d
  sleep 5s
```
