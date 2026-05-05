const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8000";

export async function backendFetch(
  path: string,
  init?: RequestInit & { idToken?: string },
): Promise<Response> {
  const headers = new Headers(init?.headers);
  if (init?.idToken) {
    headers.set("Authorization", `Bearer ${init.idToken}`);
  }
  if (init?.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  return fetch(`${BACKEND_URL}${path}`, {
    ...init,
    headers,
    cache: "no-store",
  });
}
