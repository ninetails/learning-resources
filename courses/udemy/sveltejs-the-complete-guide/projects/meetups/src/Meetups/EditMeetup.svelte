<script>
  import { createEventDispatcher } from 'svelte'
  import TextInput from '../components/TextInput.svelte'
  import Button from '../components/Button.svelte'
  import Modal from '../components/Modal.svelte'

  const dispatch = createEventDispatcher()

  function submitForm() {
    const fields = [...this.elements].filter(el => Boolean(el.id))
    const meetup = fields.reduce((acc, el) => ({ ...acc, [el.id]: el.value }), {
      id: Math.random()
        .toString()
        .substr(2)
    })

    dispatch('save', { meetup })
  }
</script>

<style>
  form {
    width: 100%;
  }
</style>

<Modal title="Edit Meetup Data" on:cancel>
  <form id="editmeetup" on:submit|preventDefault={submitForm}>
    <TextInput id="title" label="Title" />
    <TextInput id="subtitle" label="Subtitle" />
    <TextInput id="address" label="Address" />
    <TextInput id="imageUrl" label="Image URL" />
    <TextInput id="contactEmail" label="Email" />
    <TextInput
      id="description"
      label="Description"
      rows={3}
      controlType="textarea" />
  </form>
  <div slot="footer">
    <Button type="submit" form="editmeetup">Save</Button>
    <Button mode="outline" on:click={() => dispatch('cancel')}>Cancel</Button>
  </div>
</Modal>
