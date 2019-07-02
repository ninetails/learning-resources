<script>
  import { createEventDispatcher, onDestroy } from 'svelte'
  import TextInput from '../components/TextInput'
  import Button from '../components/Button'
  import Modal from '../components/Modal'
  import { notEmpty, isValidEmail } from '../helpers/validation'
  import {
    meetups,
    save as saveMeetup,
    remove as removeMeetup
  } from './meetups-store.js'

  export let id = undefined

  let meetup = {}

  const dispatch = createEventDispatcher()

  if (id) {
    const unsubscribe = meetups.subscribe(items => {
      meetup = items.find(({ id: meetupId }) => meetupId === id)
    })

    onDestroy(unsubscribe)
  }

  const validations = {
    title: [notEmpty],
    subtitle: [notEmpty],
    address: [notEmpty],
    imageUrl: [notEmpty],
    contactEmail: [notEmpty, isValidEmail],
    description: [notEmpty]
  }

  function validateField(name, value) {
    return !validations[name] || validations[name].every(fn => fn(value))
  }

  function handleInput(fieldName) {
    isValid[fieldName] =
      isValid[fieldName] === undefined ? true : isValid[fieldName]
    meetup[fieldName] = meetup[fieldName] === undefined ? '' : meetup[fieldName]

    return event => {
      const { value } = event.target

      meetup = { ...meetup, [fieldName]: value }

      isValid = {
        ...isValid,
        [fieldName]: validateField(fieldName, value)
      }
    }
  }

  function submitForm() {
    const fields = [...this.elements].filter(el => Boolean(el.id))
    const meetupFormData = fields.reduce(
      (acc, el) => ({ ...acc, [el.id]: el.value }),
      {
        id:
          id ||
          Math.random()
            .toString()
            .substr(2)
      }
    )

    const isFormValid = Object.entries(meetupFormData).every(([name, value]) =>
      validateField(name, value)
    )

    if (isFormValid) {
      dispatch('save')
      saveMeetup(meetupFormData)
    }
  }

  function deleteMeetup() {
    removeMeetup(id)
    dispatch('save')
  }

  $: isValid = {}
</script>

<style>
  form {
    width: 100%;
  }
</style>

<Modal title="Edit Meetup Data" on:cancel>
  <form id="editmeetup" on:submit|preventDefault={submitForm}>
    <TextInput
      id="title"
      label="Title"
      valid={isValid.title}
      value={meetup.title}
      on:input={handleInput('title')}
      on:blur={handleInput('title')}
      validityMessage="Please enter a valid title." />
    <TextInput
      id="subtitle"
      label="Subtitle"
      valid={isValid.subtitle}
      value={meetup.subtitle}
      on:input={handleInput('subtitle')}
      on:blur={handleInput('subtitle')}
      validityMessage="Please enter a valid subtitle." />
    <TextInput
      id="address"
      label="Address"
      valid={isValid.address}
      value={meetup.address}
      on:input={handleInput('address')}
      on:blur={handleInput('address')}
      validityMessage="Please enter a valid address." />
    <TextInput
      id="imageUrl"
      label="Image URL"
      valid={isValid.imageUrl}
      value={meetup.imageUrl}
      on:input={handleInput('imageUrl')}
      on:blur={handleInput('imageUrl')}
      validityMessage="Please enter a valid image URL." />
    <TextInput
      id="contactEmail"
      label="Email"
      valid={isValid.contactEmail}
      value={meetup.contactEmail}
      on:input={handleInput('contactEmail')}
      on:blur={handleInput('contactEmail')}
      validityMessage="Please enter a valid email." />
    <TextInput
      id="description"
      label="Description"
      rows={3}
      controlType="textarea"
      valid={isValid.description}
      value={meetup.description}
      on:input={handleInput('description')}
      on:blur={handleInput('description')}
      validityMessage="Please enter a valid description." />
  </form>
  <div slot="footer">
    <Button type="submit" form="editmeetup">Save</Button>
    <Button mode="outline" on:click={() => dispatch('cancel')}>Cancel</Button>
    {#if id}
      <Button on:click={deleteMeetup}>Remove</Button>
    {/if}
  </div>
</Modal>
