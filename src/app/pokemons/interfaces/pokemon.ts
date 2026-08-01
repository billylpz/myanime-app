export interface Pokemon {
  name: string;
  order: number;
  weight: number;
  abilities: Ability[];
  cries: Cries;
  moves: Move[];
  sprites: Sprites;
  types: TypeSlot[];
}

// --- Abilities ---
export interface Ability {
  ability: AbilityInfo;
  is_hidden: boolean;
  slot: number;
}

export interface AbilityInfo {
  name: string;
  url: string;
}

// --- Cries ---
export interface Cries {
  latest: string;
  legacy: string;
}

// --- Moves ---
export interface Move {
  move: MoveInfo;
  version_group_details: any[]; 
}

export interface MoveInfo {
  name: string;
  url: string;
}

// --- Sprites ---
export interface Sprites {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;

  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
}

// --- Types ---
export interface TypeSlot {
  slot: number;
  type: TypeInfo;
}

export interface TypeInfo {
  name: string;
  url: string;
}
