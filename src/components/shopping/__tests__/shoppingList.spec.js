import { shallowMount } from '@vue/test-utils'
import ShoppingList from '../ShoppingList'

let wrapper

describe('Shopping List', () => {
  beforeEach(() => {
    wrapper = shallowMount(ShoppingList, {
      data() {
        return {
          itemsAddedToCart: false,
          listOfItems: [{ 'name': 'bulbasaur', 'url': 'https://pokeapi.co/api/v2/pokemon/1/' }, { 'name': 'ivysaur', 'url': 'https://pokeapi.co/api/v2/pokemon/2/' }],
          listOfItemImages: ['https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/2.png'],
          selectedItems: [],
          cart: []
        }
      }
    })
  })

  afterEach(() => {
    wrapper.destroy();
  })
  it('shows a list of pokemon, given a list of pokemon', () => {
    // assert that there are 2 items being displayed
    expect(wrapper.findAll('[data-testid="shopping-item"]').length).toEqual(2);
  })

  // would add a test for clicking a shopping list item and expecting it to emit a value
  // but that would require mounting (not shallowMounting) the component, or could write the test
  // from ShoppingItem.vue
})
