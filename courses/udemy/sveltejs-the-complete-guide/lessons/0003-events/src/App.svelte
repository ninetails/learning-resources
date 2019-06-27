<script>
  import { tick } from 'svelte'
  import Modal from './Modal.svelte'
  import Product from './Product.svelte'

  const products = [
    {
      id: 'p1',
      title: 'A book',
      price: 9.99
    }
  ]

  let showModal = false,
    closable = false

  function addToCart(event) {
    console.log(event)
  }

  function deleteProduct(event) {
    console.log(event)
  }

  let text = 'This is some dummy text!'

  function transform(event) {
    if (event.which !== 9) {
      return
    }

    // prevent tab
    event.preventDefault()

    const { selectionStart, selectionEnd, value } = event.target

    text =
      value.slice(0, selectionStart) +
      value.slice(selectionStart, selectionEnd).toUpperCase() +
      value.slice(selectionEnd)

    // // not work because will executed before DOM gets updated
    // event.target.selectionStart = selectionStart
    // event.target.selectionEnd = selectionEnd

    // // this will throw an error because it cannot be called inside a function
    // afterUpdate(() => {
    //   event.target.selectionStart = selectionStart
    //   event.target.selectionEnd = selectionEnd
    // })

    // tick() returns a promise
    tick().then(() => {
      event.target.selectionStart = selectionStart
      event.target.selectionEnd = selectionEnd
    })
  }
</script>

{#each products as product}
  <Product {...product} on:add-to-cart={addToCart} on:delete={deleteProduct} />
{/each}

<button on:click={() => (showModal = true)}>Show Modal</button>

{#if showModal}
  <Modal
    on:cancel={() => (showModal = false)}
    on:close={() => (showModal = false)}
    let:agreed={closable}>
    <h1 slot="header">Hello!</h1>
    <p>This works!</p>
    <button
      slot="footer"
      on:click={() => (showModal = false)}
      disabled={!closable}>
      Confirm
    </button>
  </Modal>
{/if}

<textarea rows="5" value={text} on:keydown={transform} />
