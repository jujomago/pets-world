export interface Pet{
    id: string;
    nombre: string;
    esta_perdida: boolean | null;
    edad: number | null;
    color: string | null;
    genero: string | null;
    lugar_perdida: string;
    fecha_perdida: Date;
    detalle_perdida: string | null;
    recompensa: number | null;
}