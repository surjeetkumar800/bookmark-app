# Deployment & Configuration Guide

To make your app work **Locally AND in Production**, you need to set different variables in different places.

## 1. Local Development (For your PC)
**Create/Edit these files in your VS Code. These should point to `localhost`.**

### `server/.env`
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
COOKIE_KEY=your_secret_key
CLIENT_URL=http://localhost:5173
```

### `client/.env`
```env
VITE_API_URL=http://localhost:5000
```

---

## 2. Production (Render Backend)
**Go to Render Dashboard -> Settings -> Environment Variables.**
Add these:

| Variable | Value |
| :--- | :--- |
| `NODE_ENV` | `production` |
| `MONGO_URI` | (Your MongoDB Connetion String) |
| `GOOGLE_CLIENT_ID` | (Your Google Client ID) |
| `GOOGLE_CLIENT_SECRET` | (Your Google Client Secret) |
| `GOOGLE_CALLBACK_URL` | `https://bookmark-app-1-oiz0.onrender.com/api/auth/google/callback` |
| `COOKIE_KEY` | (Any random secret string) |
| `CLIENT_URL` | `https://bookmark-app-five-lilac.vercel.app` (Your Vercel URL) |

---

## 3. Production (Vercel Frontend)
**Go to Vercel Dashboard -> Settings -> Environment Variables.**
Add this:

| Variable | Value |
| :--- | :--- |
| `VITE_API_URL` | `https://bookmark-app-1-oiz0.onrender.com` (Your Render URL) |

---

## 4. Google Cloud Console (CRITICAL STEP)
**"Fallback Change" - Yes, you need to add BOTH URLs here.**

Go to [Google Cloud Console](https://console.cloud.google.com/) -> APIs & Services -> Credentials -> Your OAuth Client.

### Authorized JavaScript origins
Add BOTH:
1.  `http://localhost:5173`
2.  `https://bookmark-app-five-lilac.vercel.app`

### Authorized redirect URIs
Add BOTH:
1.  `http://localhost:5000/api/auth/google/callback`
2.  `https://bookmark-app-1-oiz0.onrender.com/api/auth/google/callback`

---

Once you do this, your app will work perfectly on **Localhost** AND **Vercel/Render**! 🚀
