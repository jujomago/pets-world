import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combina `clsx` y `tailwind-merge` en una sola función de utilidad.
 * Primero, `clsx` construye la cadena de clases (incluyendo condicionales).
 * Segundo, `twMerge` limpia la cadena, resolviendo conflictos de Tailwind.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
