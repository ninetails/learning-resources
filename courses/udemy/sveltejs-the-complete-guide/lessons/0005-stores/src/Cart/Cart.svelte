<script>
  import { onDestroy } from 'svelte'
  import CartItem from './CartItem.svelte'
  import cartStore from './cart-store.js'
  import { timer } from '../timer-store.js'

  // export let items = [
  //   {
  //     id: "p1",
  //     title: "Test",
  //     price: 9.99
  //   },
  //   {
  //     id: "p2",
  //     title: "Test",
  //     price: 9.99
  //   }
  // ];

  // // can be replaced just subscribing on each
  // import { onDestroy } from 'svelte'

  // let items
  // function setItems(values) {
  //   items = values
  // }

  // const unsubscribe = cartStore.subscribe(setItems)

  // onDestroy(unsubscribe)

  // const unsubscribe = timer.subscribe(count => console.log('Cart', count))
  // onDestroy(unsubscribe)
</script>

<style>
  section {
    width: 30rem;
    max-width: 90%;
    margin: 2rem auto;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
</style>

<section>
  <h1>Cart</h1>
  <ul>
    {#each $cartStore as item (item.id)}
      <CartItem {...item} />
    {:else}
      <p>No items in cart yet!</p>
    {/each}
  </ul>
</section>
