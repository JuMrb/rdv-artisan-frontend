export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

// petit helper pour faire les requêtes à l'API backend
export async function apiFetch(
  path: string,
  options: RequestInit = {}
): Promise<any> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    // on essaie de lire l'erreur renvoyée
    let errMsg = "Erreur serveur";
    try {
      const data = await res.json();
      errMsg = data.error || JSON.stringify(data);
    } catch (_) {}
    throw new Error(errMsg);
  }

  try {
    return await res.json();
  } catch {
    return null;
  }
}

// appels concrets
export const api = {
  searchArtisans: async (metier: string) => {
    const q = metier ? `?metier=${encodeURIComponent(metier)}` : "";
    return apiFetch(`/artisans${q}`);
  },
};
