<script>
  import { createEventDispatcher, onDestroy } from 'svelte'
  import TextInput from '../UI/TextInput.svelte'
  import Button from '../UI/Button.svelte'
  import { notEmpty, isValidEmail } from '../../helpers/validation.js'

  export let id = undefined

  export let meetup = {}

  const dispatch = createEventDispatcher()

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
      meetup
    )

    const isFormValid = Object.entries(meetupFormData).every(([name, value]) =>
      validateField(name, value)
    )

    if (isFormValid) {
      dispatch('save', meetupFormData)
    }
  }

  $: isValid = {}
</script>

<style type="text/stylus">
  section
    margin 0 auto
    max-width 50rem
    padding 1rem
</style>

<section>
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
  <footer>
    <Button type="submit" form="editmeetup">Save</Button>
    <Button href="/" mode="outline">Cancel</Button>
  </footer>
</section>
