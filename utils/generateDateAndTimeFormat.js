export default function generateDateAndTimeFormat(stringDate) {
  const targetDateTime = new Date(stringDate).getTime();
  const koreaTimezoneOffset = 3600000 * 9;
  const fiveMinutestoMs = 300000;

  const currentDate = new window.Date(
    targetDateTime * 1 + koreaTimezoneOffset + fiveMinutestoMs,
  )
    .toISOString()
    .slice(0, 16);

  const date = new window.Date(currentDate).toISOString().slice(0, 10);

  return date;
}
