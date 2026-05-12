interface PokemonListItem {
  name: string;
  url: string;
}

interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
    front_shiny: string;
  };
  types: { slot: number; type: { name: string; url: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
  abilities: { ability: { name: string }; is_hidden: boolean }[];
}

export type PokemonResult = PokemonDetail | PokemonListResponse;

export async function request(query: string): Promise<PokemonResult> {
  const trimmed = query.trim().toLowerCase();

  const url = trimmed
    ? `https://pokeapi.co/api/v2/pokemon/${trimmed}`
    : `https://pokeapi.co/api/v2/pokemon?limit=20`;

  const response = await fetch(url);

  if (!response.ok) {
    if (response.status >= 500) {
      throw new Error('Server error. Please try again later.');
    }
    throw new Error(`Pokemon "${query.trim()}" not found.`);
  }

  return response.json();
}
