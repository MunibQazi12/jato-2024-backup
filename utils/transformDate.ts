export default function transformDate(dateStr: string) {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
    date
  );
  const day = date.getDate();

  // Extract hours and minutes
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Format hours and minutes as "hh:mm"
  const timeFormatted = `${String(hours).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")}`;

  return `${month} ${day}, ${year} ${timeFormatted}`;
}
