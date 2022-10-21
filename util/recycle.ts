/**
 * Automatically runs the desired function after a period of time.
 * The first run will be immediately after call.
 * @param fn The function to run
 * @param ttl time to leave
 * @returns a function to clear the current interval
 *
 * @author [Andre](https://andrmeury.com)
 */
export function recycle(fn: () => void, ttl = 30000) {
  fn();
  let iv: NodeJS.Timeout;
  // Only use intervals if is not dev to avoid interval overflow
  if (process.env.NODE_ENV === "production") iv = setInterval(fn, ttl);
  return () => clearInterval(iv);
}
