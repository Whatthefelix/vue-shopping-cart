import axios from 'axios';

// could also set/get this in the .ENV
export const BASE_URL = 'https://pokeapi.co/api/v2'

export const PokemonApi = {
  async getPokemon() {
    return await axios.get(`${BASE_URL}/pokemon`)
  },

  async getPokemonImageByName(name) {
    return await axios.get(`${BASE_URL}/pokemon/${name}`);
  }
};
