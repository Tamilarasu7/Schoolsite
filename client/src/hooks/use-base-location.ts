import { useLocation } from "wouter";

const base = import.meta.env.BASE_URL;

function stripBase(path: string) {
  if (path.startsWith(base)) {
    return path.slice(base.length) || "/";
  }
  return path;
}

export function useBaseLocation() {
  const [location, setLocation] = useLocation();

  return [
    stripBase(location),
    (to: string) => setLocation(base + to),
  ] as const;
}