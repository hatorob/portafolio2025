export function formatDateRange(
  dateInit?: string | null,
  dateEnd?: string | null
) {
  if (!dateInit) return "Fecha no disponible";

  const formatter = new Intl.DateTimeFormat("es-ES", {
    month: "short",
    year: "numeric",
  });

  const startDate = new Date(`${dateInit}T00:00:00`);
  const endDate = dateEnd ? new Date(`${dateEnd}T00:00:00`) : null;

  const start = formatter.format(startDate);
  const end = endDate ? formatter.format(endDate) : "Actualidad";

  const capitalize = (s: string) =>
    s.charAt(0).toUpperCase() + s.slice(1);

  return `${capitalize(start)} | ${capitalize(end)}`;
}