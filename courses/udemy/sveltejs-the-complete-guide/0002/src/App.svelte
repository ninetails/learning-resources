<script>
  import ContactCard from './ContactCard.svelte'

  let formState
  let createdContacts = []

  function addContact() {
    const fields = [...this.elements].filter(el => el.id)
    const contact = fields.reduce(
      (acc, el) => ({ ...acc, [el.id]: el.value.trim() }),
      {}
    )

    const isAllFilled = Object.entries(contact)
      .map(([_, value]) => value.length)
      .reduce((acc, itemLen) => acc && Boolean(itemLen), true)

    if (!isAllFilled) {
      formState = 'invalid'
      return
    }

    createdContacts = [
      ...createdContacts,
      {
        id: Math.random(),
        ...contact
      }
    ]

    formState = 'done'
  }

  function del(index, event) {
    console.log(this, event)
    createdContacts.splice(index, 1)
    createdContacts = createdContacts.slice(0)
  }
</script>

<style>
  #form {
    width: 30rem;
    max-width: 100%;
  }
</style>

<form on:submit|preventDefault={addContact} id="form">
  <div class="form-control">
    <label for="userName">User Name</label>
    <input type="text" id="userName" />
  </div>
  <div class="form-control">
    <label for="jobTitle">Job Title</label>
    <input type="text" id="jobTitle" />
  </div>
  <div class="form-control">
    <label for="image">Image URL</label>
    <input type="text" id="userImage" />
  </div>
  <div class="form-control">
    <label for="desc">Description</label>
    <textarea rows="3" id="description" />
  </div>
  <button type="submit">Add Contact Card</button>
</form>

{#if formState === 'invalid'}
  <p>Invalid input.</p>
{:else}
  <p>Please enter some data and hit the button!</p>
{/if}

{#each createdContacts as contact, i (contact.id)}
  <h2># {i + 1}</h2>
  <ContactCard {...contact} />
  <button on:click={del.bind(this, i)}>x</button>
{:else}
  <p>Please start adding some contacts.</p>
{/each}
