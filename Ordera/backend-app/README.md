Backend for Conozcamos Honduras

Quick start (PowerShell):

```powershell
cd 'c:\Users\Henry PC\Documents\GitHub\conozcamos-HN\backend-app'
npm install
# copy example env and edit values if needed
cp .env.example .env
# on Windows PowerShell use Copy-Item instead of cp if cp not available:
# Copy-Item .env.example .env
npm run dev
```

Notes:
- The project uses `dotenv` to load DB credentials from `.env`.
- The server listens on `process.env.PORT` (defaults to 5000).
- If you want to run in production use `npm start` (requires `NODE_ENV=production`).
