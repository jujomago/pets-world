import { useEffect, useRef, useState } from "react";

/**
 * Oculta un contenedor cuando el usuario hace scroll hacia abajo
 * y lo muestra al hacer scroll hacia arriba.
 *
 * @param options.offset    Distancia en px desde el top antes de permitir ocultar (default 64)
 * @param options.threshold Delta mínimo de scroll para cambiar estado (reduce jitter) (default 0)
 * @returns hidden boolean
 */
export function useScrollHide(options?: { offset?: number; threshold?: number }) {
  const { offset = 64, threshold = 0 } = options || {};
  const [hidden, setHidden] = useState(false);
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
            // Oculta si vamos hacia abajo y pasamos el offset; muestra si subimos
            if (delta > 0 && y > offset) {
              setHidden(true);
            } else if (delta < 0) {
              setHidden(false);
            }
            lastYRef.current = y;
          }

          tickingRef.current = false;
        });
        tickingRef.current = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [offset, threshold]);

  return hidden;
}
