<script>
  import ContactCard from './ContactCard.svelte'

  let userName = 'Max'
  let jobTitle = ''
  let userImage = ''
  let description = ''

  let formState
  let createdContacts = []

  function addContact() {
    const areAllFieldsWithValue = [userName, jobTitle, userImage, description]
      .map(field => field.trim().length)
      .reduce((acc, itemLen) => acc && Boolean(itemLen), true)

    if (!areAllFieldsWithValue) {
      formState = 'invalid'
      return
    }

    createdContacts = [
      ...createdContacts,
      {
        id: Math.random(),
        userName,
        jobTitle,
        userImage,
        description
      }
    ]

    formState = 'done'
  }

  function del(index) {
    return () => {
      createdContacts.splice(index, 1)
      createdContacts = [...createdContacts]
    }
  }
</script>

<style>
  #form {
    width: 30rem;
    max-width: 100%;
  }
</style>

<div id="form">
  <div class="form-control">
    <label for="userName">User Name</label>
    <input type="text" bind:value={userName} id="userName" />
  </div>
  <div class="form-control">
    <label for="jobTitle">Job Title</label>
    <input type="text" bind:value={jobTitle} id="jobTitle" />
  </div>
  <div class="form-control">
    <label for="image">Image URL</label>
    <input type="text" bind:value={userImage} id="image" />
  </div>
  <div class="form-control">
    <label for="desc">Description</label>
    <textarea rows="3" bind:value={description} id="desc" />
  </div>
</div>

<button on:click={addContact}>Add Contact Card</button>

{#if formState === 'invalid'}
  <p>Invalid input.</p>
{:else}
  <p>Please enter some data and hit the button!</p>
{/if}

{#each createdContacts as contact, i (contact.id)}
  <h2># {i + 1}</h2>
  <ContactCard {...contact} />
  <button on:click={del(i)}>x</button>
{:else}
  <p>Please start adding some contacts.</p>
{/each}
