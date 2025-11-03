// app/lib/api.ts
const RAW_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "https://rdv-artisan-backend.onrender.com";
export const API_URL = RAW_URL.replace(/\/+$/, "");

export async function apiFetch(
  path: string,
  options: RequestInit = {}
): Promise<any> {
  const url = `${API_URL}${path.startsWith("/") ? path : `/${path}`}`;

  // Ne force pas Content-Type pour GET
  const isGet = !options.method || options.method.toUpperCase() === "GET";
  const headers: HeadersInit = {
    ...(options.headers || {}),
    ...(isGet ? {} : { "Content-Type": "application/json" }),
  };

  const res = await fetch(url, {
    ...options,
    headers,
    cache: "no-store",
  });

  if (!res.ok) {
    let errMsg = `HTTP ${res.status}`;
    try {
      const data = await res.json();
      errMsg = data?.error || JSON.stringify(data);
    } catch {}
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
// app/lib/api.ts (ajoute à la fin)
export const auth = {
  login: async (email: string, password: string) => {
    return apiFetch(`/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" }, // POST => ok
      body: JSON.stringify({ email, password }),
    });
  },
  me: async (token: string) => {
    return apiFetch(`/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};
