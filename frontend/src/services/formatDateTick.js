export default function formatDateTick(tickItem) {
  const date = new Date(tickItem);
  const formattedTime = date.toLocaleTimeString('en-GB');

  return `${formattedTime}`;
}
