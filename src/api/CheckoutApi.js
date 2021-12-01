// mock submit API request that takes 3s to complete
export const CheckoutApi = {
  async submit() {
    return new Promise(resolve => {
      setTimeout(resolve, 3000);
    });
  }
};
