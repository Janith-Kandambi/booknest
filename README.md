# BookNest Monorepo

BookNest is a MERN app for personal reading lists and short book reviews.

This repo is deployment-ready for a **split architecture**:
- Frontend deployed separately
- Backend deployed separately
- MongoDB Atlas as database

## Tech Stack

- Frontend: React + Vite (`@booknest/client`)
- Backend: Node + Express + Mongoose (`@booknest/server`)
- Database: MongoDB Atlas

# Output
<img width="1432" height="776" alt="image" src="https://github.com/user-attachments/assets/f65f8cfe-2a32-45d3-a8b5-20477ca8a5ff" />
<img width="1426" height="469" alt="image" src="https://github.com/user-attachments/assets/4e3e0e06-673b-42cb-8709-8db4afef4fdc" />
<img width="1417" height="776" alt="image" src="https://github.com/user-attachments/assets/9befa4db-6b26-406a-acf1-f2353235e62e" />
<img width="1417" height="731" alt="image" src="https://github.com/user-attachments/assets/f6445892-9e73-4222-96ff-903132d51805" />
<img width="1430" height="772" alt="image" src="https://github.com/user-attachments/assets/ba26e385-293f-4c27-b24a-efe890e33a60" />
<img width="1420" height="780" alt="image" src="https://github.com/user-attachments/assets/bc578021-459b-4264-aa8c-a4638ecbbbc2" />



## Monorepo Packages

- `@booknest/client`
- `@booknest/server`

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create server env file:
   ```bash
   cp server/.env.example server/.env
   ```
3. Create client env file:
   ```bash
   cp client/.env.example client/.env
   ```
4. Set local env values in `server/.env`:
   ```env
   PORT=4000
   NODE_ENV=development
   CLIENT_URL=http://localhost:5173
   MONGODB_URI=<your_mongodb_connection_string>
   JWT_SECRET=<your_jwt_secret>
   ```
5. Set local API URL in `client/.env`:
   ```env
   VITE_API_URL=http://localhost:4000/api
   ```
6. Run both frontend and backend:
   ```bash
   npm run dev
   ```

Local URLs:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:4000`
- Health: `http://localhost:4000/api/health`

## Production Environment Variables

### Backend (`@booknest/server`)

Required:
- `PORT` (provided by host in many platforms)
- `NODE_ENV=production`
- `CLIENT_URL`
- `MONGODB_URI`
- `JWT_SECRET`

Notes:
- `CLIENT_URL` is a **required CORS allowlist**, supports comma-separated origins.
- Example:
  ```env
  CLIENT_URL=https://booknest.vercel.app,https://booknest-preview.vercel.app
  ```

### Frontend (`@booknest/client`)

Required for split deployment:
- `VITE_API_URL`

Example:
```env
VITE_API_URL=https://your-backend-domain.com/api
```

## Production Scripts

Root:
- `npm run build`
- `npm run start` (starts backend workspace)

Server workspace:
- `npm run start -w @booknest/server`

Client workspace:
- `npm run build -w @booknest/client`

## Backend Deployment Steps

1. Provision MongoDB Atlas cluster and database user.
2. Add Atlas network access (IP allowlist) for your backend host.
3. Deploy backend folder/workspace (`@booknest/server`) to your host.
4. Configure backend env vars:
   - `NODE_ENV=production`
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `CLIENT_URL` (your frontend origin(s))
   - `PORT` (if host requires manual config)
5. Verify:
   - `GET /api/health`
   - Auth routes
   - Book CRUD routes

## Frontend Deployment Steps

1. Deploy client workspace (`@booknest/client`) to your frontend host.
2. Set `VITE_API_URL` to deployed backend URL.
3. Build and publish static output.
4. Verify auth + CRUD flows from deployed UI.

## MongoDB Atlas Notes

- Use a dedicated database user with strong password.
- Prefer least-privilege access for production.
- Keep `MONGODB_URI` only in secret env storage (never commit).
- If authentication fails in production, check:
  1. Atlas user credentials
  2. IP/network access list
  3. connection string database name/options

## API Overview

Auth:
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

Books (protected):
- `POST /api/books`
- `GET /api/books`
- `GET /api/books/:id`
- `PATCH /api/books/:id`
- `DELETE /api/books/:id`

`GET /api/books` supports:
- `status` = `want_to_read | reading | completed`
- `search` = title/author search
- `sort` = `newest | oldest`
