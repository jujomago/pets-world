const formatFechaToLocaleES = (fecha: Date) => {
    return fecha.toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
        year: "2-digit",
      });
}   

export default formatFechaToLocaleES;
