<script>
  import { products } from './products-store'
  import Product from '../Products/Product.svelte'

  // let products = [
  //   {
  //     id: "p1",
  //     title: "A Book",
  //     price: 9.99,
  //     description: "A great book!"
  //   },
  //   {
  //     id: "p2",
  //     title: "A Carpet",
  //     price: 99.99,
  //     description: "Red and green."
  //   }
  // ];
</script>

<style>
  section {
    width: 30rem;
    max-width: 90%;
    margin: 2rem auto;
  }
</style>

<section>
  <h1>Products</h1>
  {#each $products as product (product.id)}
    <Product {...product} />
  {/each}
</section>
