import axios from 'axios';
import { BASE_URL, PokemonApi } from '../PokemonApi'

jest.mock('axios');

describe('fetchPokemon', () => {
  describe('when API call is successful', () => {
    it('fetches pokemon successfully from the API', async () => {
      const pokemon = {
        response: {
          data: {
            count: 1111,
            next: 'next-pokemon-url.com?offset=20&limit=20',
            previous: '',
            results: [
              {
                name: 'bulbasaur',
                url: 'https://pokeapi.co/api/v2/pokemon/1/'
              },
              {
                name: 'bulbasaur',
                url: 'https://pokeapi.co/api/v2/pokemon/1/'
              },
              {
                name: 'bulbasaur',
                url: 'https://pokeapi.co/api/v2/pokemon/1/'
              },
              {
                name: 'bulbasaur',
                url: 'https://pokeapi.co/api/v2/pokemon/1/'
              }
            ]
          }
        }
      }

      // given
      axios.get.mockResolvedValueOnce(pokemon);

      // when
      const result = await PokemonApi.getPokemon();

      // then
      expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/pokemon`);
      expect(result).toEqual(pokemon);
    })
  })

  describe('when API call fails', () => {
    // If given more time, would implement better error handling for this in the code, and also implement the test
    it('should return empty users list', () => {});
  });
})
