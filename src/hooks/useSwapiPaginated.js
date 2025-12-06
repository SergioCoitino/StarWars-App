// useSwapiPaginated.js
import { useEffect, useState } from "react";

export default function useSwapiPaginated(resource) {
  const [items, setItems] = useState([]);
  const [next, setNext] = useState(null);
  const [prev, setPrev] = useState(null);
  const [url, setUrl] = useState(`https://swapi.dev/api/${resource}/`);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async (fetchUrl) => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(fetchUrl);

      if (!res.ok) throw new Error("Erro ao buscar dados da API");

      const data = await res.json();

      setItems(data.results || []);
      setNext(data.next);
      setPrev(data.previous);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Carrega sempre que mudar o recurso
  useEffect(() => {
    setUrl(`https://swapi.dev/api/${resource}/`);
  }, [resource]);

  // Busca dados quando mudar a URL
  useEffect(() => {
    fetchData(url);
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
