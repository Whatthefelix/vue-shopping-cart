import axios from 'axios';

// could also set/get this in the .ENV
const BASE_URL = 'https://pokeapi.co/api/v2'

export default {
  async getPokemon() {
    return await axios.get(`${BASE_URL}/pokemon`)
  },

  async getPokemonImageByName(name) {
    return await axios.get(`${BASE_URL}/pokemon/${name}`);
  }
};
