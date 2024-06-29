export function formatTimestamp(timestamp: number): string {
  const minutes = Math.floor(timestamp / 60);
  const seconds = Math.floor(timestamp % 60);
  const milliseconds = Math.floor((timestamp - Math.floor(timestamp)) * 100);
  return `${minutes}:${seconds}:${milliseconds}`;
}