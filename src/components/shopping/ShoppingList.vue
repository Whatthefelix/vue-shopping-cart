<template>
  <div class="shopping-list">
    <div class="shopping-list__items" v-if="formattedListOfItems.length">
      <shopping-item
        v-for="item in formattedListOfItems"
        :key="item.name"
        :item="item"
        :should-deselect-item="itemsAddedToCart"
        @on-item-selected="onItemSelected"
        data-testid="shopping-item"
      />
    </div>
    <div v-else>
      <loading-spinner/>
    </div>

    <div class="shopping-list__button-container">
      <v-button @click="addToCart" data-testid="add-to-cart"> Add {{ selectedItems.length }} items to Cart </v-button>
      <v-button @click="goToCart"> {{ cartText }} </v-button>
    </div>
  </div>
</template>

<script>
import { PokemonApi } from '@/api/PokemonApi';
import VButton from '@/components/ui/components/VButton';
import ShoppingItem from '@/components/shopping/ShoppingItem';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default {
  name: 'ShoppingList',

  components: {
    ShoppingItem,
    VButton,
    LoadingSpinner
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
      // If given more time, would install Sentry and log the error:
      // this.$sentry.captureException(e)
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
        // this.$sentry.captureException(e)
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
      // if we see an duplicate item in the cart, merge the object and increase the quantity.
      const addToCartAndUpdateQuantity = (cartItem, { name, url, imageUrl }) => {
        cartItem[name] = { name, url, imageUrl, quantity: (cartItem[name] ? cartItem[name].quantity : 0) + 1 }

        return cartItem
      };

      this.cart = Object.values([...this.cart, ...this.selectedItems].reduce(addToCartAndUpdateQuantity, {}));

      this.selectedItems = []
      localStorage.setItem('cart', JSON.stringify(this.cart))
    },

    goToCart() {
      // another option is to store the selected items in a vuex store
      this.$router.push({ name: 'Cart', params: { cart: this.cart } })
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
