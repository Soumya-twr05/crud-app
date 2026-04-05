import axios from "axios";

const BASE = `${import.meta.env.VITE_API_BASE_URL}/posts`;
const LIMIT = import.meta.env.VITE_POSTS_LIMIT || 10;

export const getPosts   = ()         => axios.get(`${BASE}?_limit=${LIMIT}`);
export const createPost = (data)     => axios.post(BASE, data);
export const updatePost = (id, data) => axios.put(`${BASE}/${id}`, data);
export const deletePost = (id)       => axios.delete(`${BASE}/${id}`);
