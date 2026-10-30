import { useState, useEffect } from "react";

const STORAGE_KEY = "starwars_favorites_v1";

export default function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (err) {
      console.error("Failed to save favorites", err);
    }
  }, [favorites]);

  const isFavorite = (id, resource) => {
    return Boolean(favorites[`${resource}_${id}`]);
  };

  const toggleFavorite = (item, resource) => {
    const key = `${resource}_${item.id}`;
    setFavorites((prev) => {
      const next = { ...prev };
      if (next[key]) {
        delete next[key];
      } else {
        next[key] = {
          ...item,
          resource
        };
      }
      return next;
    });
  };

  const getFavoritesByResource = (resource) => {
    return Object.values(favorites).filter((f) => f.resource === resource);
  };

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    getFavoritesByResource
  };
}
