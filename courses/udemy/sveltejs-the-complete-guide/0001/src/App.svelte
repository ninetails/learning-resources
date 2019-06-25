<script>
  import ContactCard from './ContactCard.svelte'

  export let name = 'Max'
  export let age = 30

  let title = '',
    description = '<strong>foo</strong>',
    image = ''

  // let uppercaseName // not required

  $: uppercaseName = name.toUpperCase()

  $: console.log(name)

  $: if (name === 'Maximilian') {
    console.log('It runs!')
    age = 31
  }

  function incrementAge() {
    age += 1
  }

  function changeName() {
    name = 'Maximilian'
  }

  function nameInput(event) {
    name = event.target.value
  }
</script>

<style>
  h1 {
    color: purple;
  }
</style>

<h1>Hello {uppercaseName}, my age is {age}!</h1>
<button on:click={incrementAge}>Change Age</button>
<!-- <button on:click={changeName}>Change Name</button> -->
<!-- <input type="text" value={name} on:input={nameInput} /> -->
<input type="text" bind:value={name} />
<input type="text" bind:value={image} />
<input type="text" bind:value={title} />
<textarea bind:value={description} />

<ContactCard userName={name} jobTitle={title} userImage={image} {description} />
