import { useEffect, useState } from "react";

const PRIMARY_API = "https://swapi.dev/api";
const FALLBACK_API = "https://swapi.py4e.com/api";
const TIMEOUT_MS = 4000;

// Fetch con timeout controlado
const fetchWithTimeout = (url, timeout = TIMEOUT_MS) =>
  Promise.race([
    fetch(url),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Request timeout")), timeout)
    )
  ]);

// Normaliza URLs de paginación para usar la API activa
const normalizeUrl = (url, baseApi) => {
  if (!url) return null;
  return url.replace(PRIMARY_API, baseApi);
};

export default function useSwapiPaginated(resource) {
  const [items, setItems] = useState([]);
  const [next, setNext] = useState(null);
  const [prev, setPrev] = useState(null);
  const [url, setUrl] = useState(`${PRIMARY_API}/${resource}/`);
  const [baseApi, setBaseApi] = useState(PRIMARY_API);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async (fetchUrl) => {
    try {
      setLoading(true);
      setError(null);

      let response;

      try {
        // Intento principal con timeout
        response = await fetchWithTimeout(fetchUrl);
        if (!response.ok) throw new Error("Primary API failed");
      } catch {
        // Fallback automático
        const fallbackUrl = fetchUrl.replace(PRIMARY_API, FALLBACK_API);
        setBaseApi(FALLBACK_API);
        response = await fetchWithTimeout(fallbackUrl);
      }

      if (!response.ok) {
        throw new Error("Erro ao buscar dados da API");
      }

      const data = await response.json();

      setItems(data.results || []);
      setNext(normalizeUrl(data.next, baseApi));
      setPrev(normalizeUrl(data.previous, baseApi));
    } catch (err) {
      setError(err.message);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  // Actualiza el recurso (people, planets, starships, etc.)
  useEffect(() => {
    setBaseApi(PRIMARY_API);
    setUrl(`${PRIMARY_API}/${resource}/`);
  }, [resource]);

  // Ejecuta fetch cuando cambia la URL
  useEffect(() => {
    if (url) fetchData(url);
  }, [url]);

  const goNext = () => {
    if (next) setUrl(next);
  };

  const goPrev = () => {
    if (prev) setUrl(prev);
  };

  return {
    items,
    next,
    prev,
    goNext,
    goPrev,
    loading,
    error
  };
}
