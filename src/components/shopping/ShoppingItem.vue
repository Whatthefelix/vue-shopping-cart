<template>
  <div
    class="shopping-item"
    @mouseover="showCheckbox = true"
    @mouseleave="showCheckbox = false"
    @click="onItemSelect(item)"
    data-testid="shopping-item"
  >
    <div v-show="shouldShowCheckbox" class="shopping-item__checkbox">
      <input type="checkbox" v-model="isSelected"/>
    </div>

    <div class="shopping-item__name">
      {{ item.name }}
    </div>

    <div class="shopping-item__quantity" v-if="shouldShowQuantity">
      quantity: {{ item.quantity }}
    </div>

    <div class="shopping-item__image">
      <img :src="item.imageUrl">
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShoppingItem',

  props: {
    item: {
      required: true,
      type: Object
    },
    shouldDeselectItem: {
      default: false,
      type: Boolean
    },
    shouldShowQuantity: {
      default: false,
      type: Boolean
    }
  },

  watch: {
    shouldDeselectItem() {
      if (this.shouldDeselectItem) {
        this.isSelected = false
      }
    }
  },

  data() {
    return {
      showCheckbox: false,
      isSelected: false
    }
  },

  computed: {
    shouldShowCheckbox() {
      return this.isSelected ? true : this.showCheckbox
    }
  },

  methods: {
    onItemSelect(item) {
      this.$emit('on-item-selected', item)
      this.isSelected = !this.isSelected;
    }
  }
}
</script>

<style lang="scss" scoped>
.shopping-item {
  width: 150px;
  height: 150px;
  margin: 0 auto;
  position: relative;

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }

  &__checkbox {
    position: absolute;
  }
}
</style>