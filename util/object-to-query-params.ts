export function objectToQueryFilters(obj?: unknown) {
  return obj
    ? "?" +
        Object.keys(obj)
          .map((key) => `filters[${key}]=${obj[key]}`)
          .join("&")
    : "";
}
