<script>
  import { createEventDispatcher } from 'svelte'
  import TextInput from '../components/TextInput'
  import Button from '../components/Button'
  import Modal from '../components/Modal'
  import { notEmpty, isValidEmail } from '../helpers/validation'

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

  function validate(fieldName) {
    isValid[fieldName] =
      isValid[fieldName] === undefined ? true : isValid[fieldName]

    return event => {
      isValid = {
        ...isValid,
        [fieldName]: validateField(fieldName, event.target.value)
      }
    }
  }

  function submitForm() {
    const fields = [...this.elements].filter(el => Boolean(el.id))
    const meetup = fields.reduce((acc, el) => ({ ...acc, [el.id]: el.value }), {
      id: Math.random()
        .toString()
        .substr(2)
    })

    const isFormValid = Object.entries(meetup).every(([name, value]) =>
      validateField(name, value)
    )

    if (isFormValid) {
      dispatch('save', { meetup })
    }
  }

  $: isValid = {}
  $: console.log(isValid)
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
      on:input={validate('title')}
      on:blur={validate('title')}
      validityMessage="Please enter a valid title." />
    <TextInput
      id="subtitle"
      label="Subtitle"
      valid={isValid.subtitle}
      on:input={validate('subtitle')}
      on:blur={validate('subtitle')}
      validityMessage="Please enter a valid subtitle." />
    <TextInput
      id="address"
      label="Address"
      valid={isValid.address}
      on:input={validate('address')}
      on:blur={validate('address')}
      validityMessage="Please enter a valid address." />
    <TextInput
      id="imageUrl"
      label="Image URL"
      valid={isValid.imageUrl}
      on:input={validate('imageUrl')}
      on:blur={validate('imageUrl')}
      validityMessage="Please enter a valid image URL." />
    <TextInput
      id="contactEmail"
      label="Email"
      valid={isValid.contactEmail}
      on:input={validate('contactEmail')}
      on:blur={validate('contactEmail')}
      validityMessage="Please enter a valid email." />
    <TextInput
      id="description"
      label="Description"
      rows={3}
      controlType="textarea"
      valid={isValid.description}
      on:input={validate('description')}
      on:blur={validate('description')}
      validityMessage="Please enter a valid description." />
  </form>
  <div slot="footer">
    <Button type="submit" form="editmeetup">Save</Button>
    <Button mode="outline" on:click={() => dispatch('cancel')}>Cancel</Button>
  </div>
</Modal>
