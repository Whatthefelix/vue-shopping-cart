// mock submit API request that takes 3s to complete
export default {
  async submit() {
    // we don't actually use cartItems, but we can pretend to :D
    return new Promise(resolve => {
      setTimeout(resolve, 3000);
    });
  }
};
