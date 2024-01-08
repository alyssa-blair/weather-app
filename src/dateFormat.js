export function formatDate(date) {
  const dateOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  const timeOptions = {
    hour: "2-digit",
    hourCycle: "h24",
  };

  const formattedDate = date
    .toLocaleDateString("en-CA", dateOptions)
    .replaceAll("/", "-");
  const formattedTime = date.toLocaleTimeString("en-CA", timeOptions);

  return `${formattedDate}T${formattedTime}:00`;
}
