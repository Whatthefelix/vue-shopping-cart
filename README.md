# shopping-cart

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run Tests
```
npm run test:unit
```

### NOTE
- Added more comments than necessary, because I wanted to explain some of the design decisions within the code and not just in the README

### What I would do given more time / Next steps
- Add vuex store to persist / pass data better
- I'd look into adding better loading spinner / loading handlers incase of slow network speeds (especially when fetching all of the pokemon images on load)
- Implement styling library/framework like TailwindCSS, and have a styling system with automatic widths / media breakpoints
- Add props and other options to the LButton (LifeBooster Button) so that it can have option props etc.
would also make the component global Vue.use(LButton) so we don't need to import the button
- Add Cypress.io for E2E testing that ensures the navigation all works properly
- localStorage is used to persist cart data on refresh, but it's not supported in incognito. Would look into implementing a database to ensure
the data gets stored. Also could implement features like "check out as guest" where a user inputs their email, and if they were to leave the site,
email them with a magic link to go back to their cart with the items loaded.

### Alternative design approaches
- Instead of passing data via Router params, I could have stored all of the data into a parent component and implemented
a local 'currentStep' variable to handle which component we rendered (shopping list vs cart vs checkout).

something like:
```
<App>
  <template>
    <component :is="currentStep" @event-handler="methodToUpdateParentDataSelectedItems">
  </template>

  data() {
    return {
      currentStep: 'shoppingList',
      selectedItems: [],
      cartItems: []
    }
  }
</App>
```
I chose to go with the router simply because in a real e-commerce app, there would be many routes and the above mentioned architecture would not suffice.