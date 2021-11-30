<template>
  <div class="shopping-list">
    <div class="shopping-list__items">
      <shopping-item
        v-for="item in formattedListOfItems"
        :key="item.name"
        :item="item"
        :should-deselect-item="itemsAddedToCart"
        @on-item-selected="onItemSelected"
      />
    </div>

    <div class="shopping-list__button-container">
      <l-button @click="addToCart"> Add {{ selectedItems.length }} items to Cart </l-button>
      <l-button @click="goToCart"> {{ cartText }} </l-button>
    </div>
  </div>
</template>

<script>
import PokemonApi from '../../api/PokemonApi';
import LButton from '@/components/ui/components/LButton';
import ShoppingItem from  '@/components/shopping/ShoppingItem';

export default {
  name: 'ShoppingList',

  components: {
    ShoppingItem,
    LButton
  },

  data() {
    return {
      // alternatively variables could be named listOfPokemon for clarity - depends if we want to re-use this component
      itemsAddedToCart: false,
      listOfItems: [],
      listOfItemImages: [],
      selectedItems: [],
      cart: []
    }
  },

  async created() {
    try {
      if (localStorage.getItem('cart')) {
        this.cart = JSON.parse(localStorage.getItem('cart'))
      }

      const { data } = await PokemonApi.getPokemon()
      this.listOfItems = data?.results

      // after retrieving all of our pokemon, we can go ahead and fetch their respective images
      await this.getItemImages()
    } catch (e) {
      this.handleError(e)
      throw e
    }
  },

  computed: {
    formattedListOfItems() {
      return this.listOfItems.map((item, index) => {
        return {
          name: item.name,
          url: item.url,
          imageUrl: this.listOfItemImages[index]
        }
      });
    },

    cartText() {
      return this.cart.length ? `Go to Cart - ${this.cart.length} items` : `Cart is Empty`;
    }
  },

  methods: {
    async getItemImages() {
      try {
        // using for of because we need to loop through and retrieve images synchronously
        for (const item of this.listOfItems) {
          const { data } = await PokemonApi.getPokemonImageByName(item.name)
          this.listOfItemImages.push(data?.sprites?.front_shiny)
        }
      } catch (e) {
        this.handleError(e)
      }
    },

    onItemSelected(item) {
      const indexOfItem = this.selectedItems.findIndex((selectedItem) => selectedItem === item)
      indexOfItem > -1 ? this.selectedItems.splice(indexOfItem, 1) : this.addSelectedItem(item)
    },

    addSelectedItem(item) {
      this.selectedItems.push(item)
      this.itemsAddedToCart = false
    },

    addToCart() {
      this.itemsAddedToCart = true
      // if we see an duplicate item in the cart, simply increase the qty.
      // maybe this.cart should be an array of objects with 4 properties: name, url, img, qty
      const addToCartAndUpdateQuantity = (acc, { name, url, imageUrl }) => {
        acc[name] = { name, url, imageUrl, quantity: (acc[name] ? acc[name].quantity : 0) + 1 }

        return acc
      };

      // we only allow adding 1 qty at a time
      this.cart = Object.values([...this.cart, ...this.selectedItems].reduce(addToCartAndUpdateQuantity, {}));

      console.log('cart', this.cart)

      this.selectedItems = []
      localStorage.setItem('cart', JSON.stringify(this.cart))
    },

    goToCart() {
      // another option is to store the selected items in a vuex store
      this.$router.push({ name: 'Cart', params: { cart: this.cart } })
    },

    handleError(e) {
      // If given more time, would install Sentry and log the error:
      // this.$sentry.captureException(e)
      console.warn(e)
    }
  }
}
</script>

<style lang="scss" scoped>
.shopping-list {
  &__items {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    &:after {
      content: "";
      flex: auto;
    }
  }

  &__button-container {
    width: 450px;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
  }
}
</style>
