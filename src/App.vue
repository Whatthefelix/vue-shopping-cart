<template>
  <div id="app" class="app">
    <div class="app__logo">
      <!-- Ideally we want to get images from a CDN like cloudflare so that we can cache our assets -->
      <img src="https://2xt8nj9bbi3xwyfj1isvq056-wpengine.netdna-ssl.com/wp-content/uploads/2021/04/LifeBooster-logo-dark.png" class="custom-logo" alt="Life Booster Logo">
    </div>

    <div class="app__container">
      <router-view></router-view>

    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

// Given more time, I would add tailwindCSS and set configs for default width
// For now, we will style with BEM styling
.app {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-direction: column;

  &__logo {
    max-width: 80%;
    margin: 0 auto;
    margin-bottom: 16px;

    img {
      width: 100%;
    }
  }

  &__container {
    max-width: 750px;
    margin: 0 auto;
  }
}
</style>
