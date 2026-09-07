# Mangesh Solution

React/Vite frontend connected to a Node.js + Express + MongoDB backend.

## 1. Backend

```bash
cd backend
npm install
```

Create `backend/.env` from `.env.example` and set `MONGO_URI` and `JWT_SECRET`.
Then:

```bash
npm run dev
```

Backend runs at `http://localhost:5000`.

## 2. Frontend

In a second terminal:

```bash
npm install
npm run dev
```

Optional: create `.env` from `.env.example` if your API URL is different.

## Connected features

- Register and Login use `/api/auth` and store the JWT locally.
- Course enrollment saves to MongoDB through `/api/enrollments`.
- Contact form saves messages through `/api/contact`.
- Courses can be served from `/api/courses`.

## Deploy frontend to GitHub Pages

The repository includes a GitHub Actions workflow in `.github/workflows/deploy.yml`.
Before enabling it, add a repository secret named `VITE_API_URL` containing the deployed backend API URL, for example `https://your-backend.example.com/api`.
Then enable **Settings -> Pages -> GitHub Actions**. Every push to `main` will build and deploy the frontend.

GitHub Pages hosts only the frontend. Deploy the `backend` separately and set its `CLIENT_URL` to the GitHub Pages URL.
