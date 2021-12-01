import { shallowMount } from '@vue/test-utils'
import ShoppingItem from '../ShoppingItem'

let wrapper

describe('Shopping Item', () => {
  beforeEach(() => {
    wrapper = shallowMount(ShoppingItem, {
      propsData: {
        item: {
          name: 'bulbasaur',
          url: 'https://pokeapi.co/api/v2/pokemon/1/',
          imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png'
        }
      }
    })
  })

  afterEach(() => {
    wrapper.destroy();
  })

  it('emits items if they are clicked', () => {
    wrapper.find('[data-testid="shopping-item"]').trigger('click')
    expect(wrapper.emitted()['on-item-selected']).toBeTruthy()
  })
})