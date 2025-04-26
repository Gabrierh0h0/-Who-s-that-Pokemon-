import axios from 'axios';

// Función que obtiene los datos de un Pokémon desde la PokeAPI usando su ID.
export const fetchPokemonData = async (id: number) => {
  try {
    // Hace una solicitud a la PokeAPI para obtener los datos del Pokémon.
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = response.data;

    // Devuelve un objeto con el nombre y sprite del Pokémon (únicos datos necesarios).
    return {
      name: data.name,
      sprite: data.sprites.front_default,
    };
  } catch (error) {
    console.error('Error al obtener datos del Pokémon:', error);
    throw error;
  }
};