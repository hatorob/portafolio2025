export function formatDateRange(dateInit: string, dateEnd: string | null) {
  const formatter = new Intl.DateTimeFormat("es-ES", {
    month: "short",
    year: "numeric",
  });

  const start = formatter.format(new Date(dateInit));
  const end = dateEnd ? formatter.format(new Date(dateEnd)) : "Actualidad";

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  return `${capitalize(start)} | ${capitalize(end)}`;
}