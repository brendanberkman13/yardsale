import { backendFetch } from "./api";
import type { Category, Posting, User } from "./types";

export async function getAllPostings(opts?: {
  category?: Category;
  postedBy?: string;
}): Promise<Posting[]> {
  const params = new URLSearchParams();
  if (opts?.category) params.set("category", opts.category);
  if (opts?.postedBy) params.set("postedBy", opts.postedBy);
  const qs = params.toString() ? `?${params.toString()}` : "";
  const res = await backendFetch(`/postings${qs}`);
  if (!res.ok) return [];
  return res.json();
}

export async function getPostingById(id: string): Promise<Posting | null> {
  const res = await backendFetch(`/postings/${id}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Failed to fetch posting (${res.status})`);
  return res.json();
}

export async function getUserById(id: string): Promise<User | null> {
  const res = await backendFetch(`/users/${id}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Failed to fetch user (${res.status})`);
  return res.json();
}

export async function getMe(idToken: string): Promise<User | null> {
  const res = await backendFetch("/me", { idToken });
  if (res.status === 401) return null;
  if (!res.ok) throw new Error(`Failed to fetch me (${res.status})`);
  return res.json();
}

export async function getMyPostings(idToken: string): Promise<Posting[]> {
  const res = await backendFetch("/me/postings", { idToken });
  if (!res.ok) return [];
  return res.json();
}
