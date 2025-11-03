// app/lib/api.ts
const RAW_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "https://rdv-artisan-backend.onrender.com";

// 1) normalise: pas de slash final
export const API_URL = RAW_URL.replace(/\/+$/, "");

// Petit helper API
export async function apiFetch(
  path: string,
  options: RequestInit = {}
): Promise<any> {
  // 2) garantit le slash initial du path
  const url = `${API_URL}${path.startsWith("/") ? path : `/${path}`}`;

  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    let errMsg = `HTTP ${res.status}`;
    try {
      const data = await res.json();
      errMsg = data?.error || JSON.stringify(data);
    } catch (_) {}
    throw new Error(errMsg);
  }

  try {
    return await res.json();
  } catch {
    return null;
  }
}

export const api = {
  searchArtisans: async (metier: string) => {
    const q = metier ? `?metier=${encodeURIComponent(metier)}` : "";
    return apiFetch(`/artisans${q}`);
  },
};
