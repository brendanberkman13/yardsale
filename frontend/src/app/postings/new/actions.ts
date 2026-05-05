"use server";

import { auth } from "@/auth";
import { backendFetch } from "@/lib/api";
import type { NewPostingInput } from "@/lib/types";

export type CreatePostingResult =
  | { ok: true; id: string }
  | { ok: false; error: string };

export async function createPostingAction(
  input: NewPostingInput,
): Promise<CreatePostingResult> {
  const session = await auth();
  const idToken = session?.idToken;
  if (!idToken) {
    return { ok: false, error: "Not signed in" };
  }

  const res = await backendFetch("/postings", {
    method: "POST",
    body: JSON.stringify(input),
    idToken,
  });

  if (!res.ok) {
    let detail = "";
    try {
      const body = await res.json();
      detail = typeof body?.detail === "string" ? body.detail : "";
    } catch {
      // ignore
    }
    return {
      ok: false,
      error: detail || `Backend rejected the posting (${res.status})`,
    };
  }

  const posting = (await res.json()) as { id: string };
  return { ok: true, id: posting.id };
}
