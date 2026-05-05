const BASE_URL = "https://api.freeapi.app/api/v1";

export const fetchJokes = async (signal) => {
  const res = await fetch(`${BASE_URL}/public/randomjokes`, {
    signal,
  });

  if (!res.ok) {
    throw new Error("Failed to fetch jokes");
  }

  const data = await res.json();

  // handle variations safely
  if (Array.isArray(data?.data?.data)) {
    return data.data.data;
  }

  throw new Error("Invalid API response structure");
};