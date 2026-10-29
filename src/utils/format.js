export function formatValue(value, options = {}) {
  if (value == null) return "Unknown";
  
  const raw = value.toString().trim().toLowerCase();

  // Unknown → "Unknown"
  if (["unknown", "n/a", "none", ""].includes(raw)) return "Unknown";

  // Capitalización
  const capitalize = (str) =>
    str
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  // 🔹 Limpia todo excepto números, punto o guión
  const numeric = Number(value.toString().replace(/[^0-9.-]/g, ""));

  // Si no es número válido → solo capitaliza
  if (isNaN(numeric)) return capitalize(value);

  // ------- DISTANCIA -------
  if (options.distance) {
    // SWAPI devuelve metros
    // 0.36 → 36 cm
    if (numeric < 1) {
      return `${(numeric * 100).toFixed(0)} Cm`;
    }

    // 1 a 999 metros
    if (numeric < 1000) {
      return `${numeric} M`;
    }

    // 1000+ metros → convertir a km
    return `${(numeric / 1000).toFixed(1)} Km`;
  }

  // ------- VELOCIDAD -------
  if (options.speed) {
    return `${numeric} Km/h`;
  }

  // ------- PESO (Kg) -------
  if (options.weight) {
    let result = `${numeric} Kg`;
    // Y si también pidió abreviar:
    if (options.largeNumber) {
      result = formatLarge(numeric) + " Kg";
    }
    return result;
  }

  // ------- GRANDES NÚMEROS -------
  if (options.largeNumber) {
    const formatted = formatLarge(numeric);
    return options.unit ? `${formatted} ${options.unit}` : formatted;
  }

  if (options.unit) {
    return `${capitalize(value.toString())} ${options.unit}`;
  }

  return capitalize(value.toString());
}

function formatLarge(num) {
  if (num >= 1_000_000_000_000) return (num / 1e12).toFixed(1) + "T";
  if (num >= 1_000_000_000) return (num / 1e9).toFixed(1) + "B";
  if (num >= 1_000_000) return (num / 1e6).toFixed(1) + "M";
  if (num >= 1_000) return (num / 1e3).toFixed(1) + "K";
  return num.toString();
}
