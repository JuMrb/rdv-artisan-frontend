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
// --- AUTH HELPERS ---
// stocke/récupère le token JWT dans localStorage
export const tokenStore = {
  get: () => (typeof window !== "undefined" ? localStorage.getItem("token") : null),
  set: (t: string) => localStorage.setItem("token", t),
  clear: () => localStorage.removeItem("token"),
};

async function apiFetchAuth(path: string, options: RequestInit = {}) {
  const t = tokenStore.get();
  return apiFetch(path, {
    ...options,
    headers: {
      ...(options.headers || {}),
      ...(t ? { Authorization: `Bearer ${t}` } : {}),
    },
  });
}

export const authApi = {
  // POST /auth/login  { email, password } -> { token, user }
  login: async (email: string, password: string) => {
    return apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
  },

  // POST /auth/register/artisan  { companyName, email, password } -> { token, user }
  registerArtisan: async (companyName: string, email: string, password: string) => {
    return apiFetch("/auth/register/artisan", {
      method: "POST",
      body: JSON.stringify({ companyName, email, password }),
      headers: { "Content-Type": "application/json" },
    });
  },

  // GET /auth/me -> user (avec Authorization: Bearer)
  me: async () => apiFetchAuth("/auth/me"),
};
