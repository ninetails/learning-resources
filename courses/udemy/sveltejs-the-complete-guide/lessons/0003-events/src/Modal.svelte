<script>
  import {
    createEventDispatcher,
    onMount,
    onDestroy,
    beforeUpdate,
    afterUpdate
  } from 'svelte'

  const dispatch = createEventDispatcher()

  let agreed = false
  let autoscroll = false

  onMount((...args) => console.log('onMount', args))

  onDestroy((...args) => console.log('onDestroy', args))

  beforeUpdate((...args) => {
    console.log('beforeUpdate', args)
    autoscroll = agreed
  })

  afterUpdate((...args) => {
    console.log('afterUpdate', args)

    if (autoscroll) {
      const modal = document.querySelector('.modal')
      modal.scrollTo(0, modal.scrollHeight)
    }
  })

  console.log('Script executed when modal rendered (after opening it)')
</script>

<style>
  .backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.75);
    z-index: 10;
  }

  .modal {
    padding: 1rem;
    position: fixed;
    top: 10vh;
    left: 10%;
    width: 80%;
    max-height: 15vh;
    background: white;
    border-radius: 5px;
    z-index: 100;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    overflow: auto;
  }

  header {
    border-bottom: 1px solid #ccc;
  }
</style>

<div class="backdrop" on:click={() => dispatch('cancel')} />
<div class="modal">
  <header>
    <slot name="header" />
  </header>
  <div class="content">
    <slot />
  </div>
  <div class="disclaimer">
    <p>Before you close, you need to agree our terms</p>
    <button on:click={() => (agreed = true)}>Agree</button>
  </div>
  <footer>
    <slot name="footer" {agreed}>
      <button on:click={() => dispatch('close')} disabled={!agreed}>
        Close
      </button>
    </slot>
  </footer>
</div>
