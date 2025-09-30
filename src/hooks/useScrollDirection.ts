import { useEffect, useRef, useState } from "react";

export type ScrollDirection = "up" | "down";

/**
 * Devuelve la dirección del scroll (up | down). Útil para comportamientos condicionales.
 * @param options.threshold Delta mínimo de scroll para cambiar dirección (default 0)
 */
export function useScrollDirection(options?: { threshold?: number }) {
  const { threshold = 0 } = options || {};
  const [direction, setDirection] = useState<ScrollDirection>("up");
  const lastYRef = useRef(0);
  const tickingRef = useRef(false);

  useEffect(() => {
    lastYRef.current = window.scrollY || 0;

    const onScroll = () => {
      const y = window.scrollY || 0;
      if (!tickingRef.current) {
        window.requestAnimationFrame(() => {
          const delta = y - lastYRef.current;
          if (Math.abs(delta) > threshold) {
            setDirection(delta > 0 ? "down" : "up");
            lastYRef.current = y;
          }
          tickingRef.current = false;
        });
        tickingRef.current = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return direction;
}
