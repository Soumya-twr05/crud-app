import axios from "axios";

// Fallback ensures it works even if env var is missing on Vercel
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://jsonplaceholder.typicode.com";
const LIMIT = Number(import.meta.env.VITE_POSTS_LIMIT) || 10;
const BASE = `${BASE_URL}/posts`;

// Log in dev to confirm env vars are loaded
if (import.meta.env.DEV) {
  console.log("API BASE:", BASE);
}

export const getPosts   = ()         => axios.get(`${BASE}?_limit=${LIMIT}`);
export const createPost = (data)     => axios.post(BASE, data);
export const updatePost = (id, data) => axios.put(`${BASE}/${id}`, data);
export const deletePost = (id)       => axios.delete(`${BASE}/${id}`);
