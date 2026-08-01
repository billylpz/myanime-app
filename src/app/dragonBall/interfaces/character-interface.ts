 /**
 * Representa la entidad principal de un personaje dentro del API de Dragon Ball Z.
 */
export interface Character {
  id: number;
  name: string;
  ki: string;
  maxKi: string;
  race: string;
  gender: 'Male' | 'Female' | string;
  description: string;

  /** URL o ruta de la imagen oficial del personaje. */
  image: string;

  /** Afiliación, grupo o facción a la que pertenece (ej. 'Z Fighter', 'Army of Frieza'). */
  affiliation: string;

  /** Fecha de eliminación lógica en formato de cadena ISO, o `null` si permanece activo. */
  deletedAt: string | null;

  originPlanet?: OriginPlanet;

  transformations?: Transformation[];
}

 /**
 * Representa un planeta de origen dentro del universo de Dragon Ball Z.
 */
export interface OriginPlanet {
  id: number;
  name: string;
  isDestroyed: boolean;
  description: string;

  /** URL o ruta de acceso a la imagen representativa del planeta. */
  image: string;

  /** Fecha de eliminación lógica en formato de cadena ISO, o `null` si permanece activo. */
  deletedAt: string | null;
}

/**
 * Representa una transformación o estado alcanzado por un personaje (ej. 'Super Saiyan', 'Golden Frieza').
 */
export interface Transformation {
  id: number;
  name: string;

  /** URL o ruta de acceso a la imagen representativa de esta transformación. */
  image: string;

  ki: string;

  /** Fecha de eliminación lógica en formato de cadena ISO, o `null` si permanece activa. */
  deletedAt: string | null;
}

