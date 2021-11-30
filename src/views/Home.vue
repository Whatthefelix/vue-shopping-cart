<template>
  <div class="home">
    <shopping-list />
  </div>
</template>

<script>
import ShoppingList from '@/components/shopping/ShoppingList.vue'

export default {
  name: 'Home',
  components: {
    ShoppingList
  }
}
</script>
