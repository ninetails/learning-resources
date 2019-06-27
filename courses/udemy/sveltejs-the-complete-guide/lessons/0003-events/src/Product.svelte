<script>
  import { createEventDispatcher } from 'svelte'

  export let title,
    price,
    bestseller = undefined

  const dispatch = createEventDispatcher()
</script>

<article>
  <h1>{title}</h1>
  <h2>${price}</h2>
  {#if bestseller}
    <h3>BESTSELLER</h3>
  {/if}
  <button on:click={(...args) => dispatch('add-to-cart', ...args)}>
    Add to Cart
  </button>
  <button on:click={(...args) => dispatch('delete', ...args)}>Delete</button>
</article>
