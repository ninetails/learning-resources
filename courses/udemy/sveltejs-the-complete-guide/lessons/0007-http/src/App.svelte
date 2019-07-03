<script>
  import { onMount } from 'svelte'
  import hobbyStore from './hobby-store.js'

  let hobbies = [],
    hobbyInput,
    isLoading = false

  isLoading = true
  const getHobbies = fetch(`${process.env.API_URL}hobbies.json`)
    .then(res => {
      if (!res.ok) {
        throw new Error('Failed!')
      }

      return res.json()
    })
    .then(data => {
      isLoading = false
      hobbyStore.setHobbies(Object.values(data))
      return Object.values(data)
    })
    .catch(err => {
      isLoading = false
      console.error(err)
    })

  function addHobby() {
    // hobbies = [...hobbies, hobbyInput.value]
    hobbyStore.addHobby(hobbyInput.value)

    isLoading = true
    fetch(`${process.env.API_URL}hobbies.json`, {
      method: 'POST',
      body: JSON.stringify(hobbyInput.value),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        isLoading = false
        if (!res.ok) {
          throw new Error('Failed!')
        }
        //
        alert('Saved Data!')
        // res.json() => Promise with obj containing id
      })
      .catch(err => {
        isLoading = false
        console.error(err)
      })
  }
</script>

<label for="hobby">Hobby</label>
<input type="text" id="hobby" bind:this={hobbyInput} />

<button on:click={addHobby}>Add Hobby</button>

<!--
{#if isLoading}
  <p>loading...</p>
{:else}
  <ul>
    {#each hobbies as hobby (hobby)}
      <li>{hobby}</li>
    {/each}
  </ul>
{/if}
-->

<!--
{#await getHobbies}
  <p>Loading...</p>
{:then hobbyData}
  <ul>
    {#each hobbyData as hobby (hobby)}
      <li>{hobby}</li>
    {/each}
  </ul>
{:catch error}
  <p>{error.message}</p>
{/await}
-->

{#if isLoading}
  <p>loading...</p>
{:else}
  <ul>
    {#each $hobbyStore as hobby (hobby)}
      <li>{hobby}</li>
    {/each}
  </ul>
{/if}
