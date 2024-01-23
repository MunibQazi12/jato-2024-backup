export default function agendaTime(dateStr: string, format: string = "full") {
  const date = new Date(dateStr);

  // Format for day with day of the week
  const optionsDay: Intl.DateTimeFormatOptions = { weekday: "long" };
  const dayFormatted = new Intl.DateTimeFormat("en-US", optionsDay).format(
    date
  );

  // Format for date in "DD/MM/YY" format
  const dayOfMonth = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-based
  const yearLastTwoDigits = date.getFullYear().toString().slice(-2);
  const dateFormatted = `${String(dayOfMonth).padStart(2, "0")}/${String(
    month
  ).padStart(2, "0")}/${yearLastTwoDigits}`;

  // Format for time
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const timeFormatted = `${String(hours).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")}`;

  if (format === "day") {
    return dayFormatted;
  } else if (format === "date") {
    return dateFormatted;
  } else if (format === "time") {
    return timeFormatted;
  } else if (format === "full") {
    return {
      day: dayFormatted,
      date: dateFormatted,
      time: timeFormatted,
      year: date.getFullYear(),
    };
  } else {
    // Handle invalid format
    return "Invalid format";
  }
}
