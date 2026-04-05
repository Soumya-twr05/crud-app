# Posts CRUD App

A React app that performs full CRUD operations against the [JSONPlaceholder](https://jsonplaceholder.typicode.com) API.

## Features

- **GET** — Fetches and lists 10 posts on load
- **POST** — Create a new post via the form
- **PUT** — Edit an existing post inline
- **DELETE** — Remove a post with a confirmation dialog

## Tech

- React + Vite
- Axios for HTTP requests
- JSONPlaceholder as the mock REST API

## Run

```bash
npm install
npm run dev
```

## Vercel Deployment

Add these environment variables in your Vercel project settings (Settings → Environment Variables):

```
VITE_API_BASE_URL=https://jsonplaceholder.typicode.com
VITE_POSTS_LIMIT=10
```

> Vite env vars must be prefixed with `VITE_` and accessed via `import.meta.env.VITE_*`.
> The `.env` file is not pushed to git — set variables directly in Vercel dashboard.
