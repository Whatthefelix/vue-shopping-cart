<template>
  <div class="cart">
    <h2> Your Cart ({{ cartItems.length }} item(s)) </h2>

    <div class="cart__item-container">
      <shopping-item
        v-for="item in cartItems"
        :key="item.name"
        :item="item"
        :should-show-quantity="true"
        @on-item-selected="onItemSelected(item)"
      />
    </div>

    <loading-spinner v-if="isLoading"/>

    <div class="cart__button-container">
      <l-button v-if="itemsToRemove.length" @click="removeItemsFromCart"> Remove {{ itemsToRemove.length }} items from Cart </l-button>
      <l-button @click="checkout"> Checkout </l-button>
    </div>
  </div>
</template>

<script>
import CheckoutApi from '../api/CheckoutApi';

// Components
import LButton from '@/components/ui/components/LButton';
import ShoppingItem from '@/components/shopping/ShoppingItem';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default {
  components: {
    ShoppingItem,
    LoadingSpinner,
    LButton
  },

  data() {
    return {
      cartItems: this.$route.params?.cart || [],
      itemsToRemove: [],
      isLoading: false
    }
  },

  mounted() {
    if (localStorage.getItem('cart')) {
      this.cartItems = JSON.parse(localStorage.getItem('cart'))
    }
  },

  methods: {
    onItemSelected(item) {
      const indexOfItem = this.itemsToRemove.findIndex((selectedItem) => selectedItem === item)
      indexOfItem > -1 ? this.itemsToRemove.splice(indexOfItem, 1) : this.itemsToRemove.push(item)
    },

    removeItemsFromCart() {
      this.itemsToRemove.forEach(item => {
        const index = this.cartItems.indexOf(item)
        this.cartItems.splice(index, 1);
      });

      // after removing the items, also update the number of items to remove
      this.itemsToRemove = []
      // also update localStorage with our updated cart
      localStorage.setItem('cart', JSON.stringify(this.cartItems))
    },

    async checkout() {
      try {
        // in a real API, we would pass in this.cartItems to the submit fn
        this.isLoading = true
        await CheckoutApi.submit()

        this.$router.push({ name: 'Success' })

      } catch (e) {
        this.isLoading = false
        console.warn(e)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.cart {

  &__item-container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    &:after {
      content: "";
      flex: auto;
    }
  }

  &__button-container {
    display: flex;
    width: 500px;
    justify-content: space-evenly;
    margin: auto;
  }
}

</style>