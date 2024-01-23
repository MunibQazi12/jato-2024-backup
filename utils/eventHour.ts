// Format the time in 'HH:mm' format
export function formatTime(dateStr: string): string {
  const date = new Date(dateStr);
  const formattedTime = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
  return formattedTime;
}

// Get the day of the week
export function getDayOfWeek(dateStr: string): string {
  const date = new Date(dateStr);
  const dayOfWeek = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
  }).format(date);
  return dayOfWeek;
}
