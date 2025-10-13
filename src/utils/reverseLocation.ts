export const reverseLocation = async (
  coordinates: [number, number]
): Promise<string | null> => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${coordinates[0]}&lon=${coordinates[1]}&zoom=16&format=jsonv2`
    );
    const data = await response.json();
    return data.display_name || null;
  } catch (error) {
    console.error("Error al obtener la ubicación:", error);
    return null;
  }
};
