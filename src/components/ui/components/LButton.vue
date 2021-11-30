<template>
  <div class="l-button" @click="$emit('click')">
    <span>
      <slot></slot>
    </span>

  </div>
</template>

<script>
export default {
  name: 'l-button'
}
</script>

<style lang="scss" scoped>
.l-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 45px;
  background-color: #02717b;
  border-radius: 5px;
  color: #FFF;
  padding: 8px;

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
}
</style>