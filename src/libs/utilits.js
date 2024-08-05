import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatDistanceToNowStrict } from "date-fns";

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}


export function relativeDate(from) {
  return formatDistanceToNowStrict(from, { addSuffix: true });
}
