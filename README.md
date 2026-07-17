# StudyNook Client

**StudyNook** – Library Study Room Booking System (React frontend)

Live site: `https://your-vercel-url.vercel.app` *(replace after deployment)*

## Project Overview

StudyNook helps students and library users browse, search, filter, and book private study rooms. Room owners can list and manage spaces; every booking is guarded by server-side conflict detection and secured with Firebase + JWT HTTP-only cookies.

## Features

- Browse latest rooms on a polished SaaS-style homepage with hero, testimonials, and why-StudyNook sections
- Search and filter rooms by name, amenities, floor, and hourly rate
- Book rooms with date/time pickers, live cost calculation, and double-booking prevention
- Add, update, and delete your own room listings (owner-only)
- Manage personal bookings with cancel support for future confirmed slots
- Firebase email/password + Google auth synced to JWT cookies (refresh-safe sessions)
- Dark/light theme toggle, Framer Motion animations, skeleton loaders, and SEO page titles
- Fully responsive layout for mobile, tablet, and desktop

## Technology

- React 19 + Vite
- React Router
- Tailwind CSS v4
- Firebase Authentication
- Axios (credentials / cookies)
- React Hook Form
- TanStack Query
- React Hot Toast
- Framer Motion
- React Helmet Async

## Installation

```bash
git clone https://github.com/<your-username>/study-nook-client.git
cd study-nook-client
npm install
cp .env.example .env
# Fill Firebase + API URL values
npm run dev
```

Open `http://localhost:5173`.

## Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Backend API base URL (e.g. `http://localhost:5000/api`) |
| `VITE_FIREBASE_API_KEY` | Firebase web API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase auth domain |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID |
| `VITE_FIREBASE_APP_ID` | Firebase app ID |

Enable **Email/Password** and **Google** providers in the Firebase console. Add your domains to Authorized domains.

## Folder Structure

```
src/
  components/     # Navbar, RoomCard, modals, loaders, etc.
  pages/          # Route-level screens
  layouts/        # Main app shell
  routes/         # React Router config
  hooks/          # TanStack Query hooks
  context/        # Auth & Theme providers
  services/       # Axios API + Firebase
  utils/          # Helpers
  constants/      # Shared constants
  animations/     # Framer Motion variants
  assets/         # Static assets
```

## Deployment Guide (Vercel)

1. Push this repository to GitHub.
2. Import the project in [Vercel](https://vercel.com).
3. Set all `VITE_*` environment variables (point `VITE_API_URL` to your Render API `/api`).
4. Deploy. `vercel.json` rewrites ensure SPA routes work on refresh.
5. Add the Vercel domain to Firebase Authorized domains and set the server `CLIENT_URL` to match.

## Connecting to the Backend

1. Run `study-nook-server` locally or on Render.
2. Set `VITE_API_URL` to that API’s `/api` path.
3. Ensure server `CLIENT_URL` matches this frontend origin and cookies use `sameSite: none` + `secure` in production.

## License

MIT
