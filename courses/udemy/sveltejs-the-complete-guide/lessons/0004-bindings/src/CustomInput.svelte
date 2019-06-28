<script>
  export let value,
    type = 'text'

  export function empty() {
    value = ''
    console.log('empty called!')
  }
</script>

<input type="text" bind:value />
