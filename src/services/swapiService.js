const PRIMARY_API = "https://swapi.dev/api";
const FALLBACK_API = "https://swapi.py4e.com/api";

const fetchWithFallback = async (endpoint) => {
  try {
    const response = await fetch(`${PRIMARY_API}${endpoint}`, {
      method: "GET",
      mode: "cors",
    });

    if (!response.ok) {
      throw new Error("Primary API failed");
    }

    return await response.json();
  } catch (error) {
    console.warn("⚠️ swapi.dev failed, using fallback:", error.message);

    const fallbackResponse = await fetch(`${FALLBACK_API}${endpoint}`);
    if (!fallbackResponse.ok) {
      throw new Error("Fallback API also failed");
    }

    return await fallbackResponse.json();
  }
};

export default fetchWithFallback;
