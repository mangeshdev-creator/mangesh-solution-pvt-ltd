# Mangesh Solution Backend

Node.js + Express + MongoDB + JWT backend for the existing React/Vite frontend.

## 1. Requirements
- Node.js 18+
- MongoDB local installation or MongoDB Atlas

## 2. Setup
```bash
cd backend
npm install
copy .env.example .env
```
On macOS/Linux use `cp .env.example .env` instead.

Edit `.env` and set `MONGO_URI` and a strong `JWT_SECRET`.

## 3. Run
```bash
npm run dev
```
API: `http://localhost:5000`

## API
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me` (Bearer token)
- `GET /api/courses`
- `GET /api/courses/:id`
- `POST /api/enrollments`
- `GET /api/enrollments` (admin)
- `POST /api/contact`
- `GET /api/contact` (admin)
- `GET /api/health`

Courses are automatically seeded from the existing frontend course list when the server starts.
