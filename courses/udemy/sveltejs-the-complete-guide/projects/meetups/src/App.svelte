<script>
  import Header from './components/Header.svelte'
  import MeetupGrid from './Meetups/MeetupGrid.svelte'
  import TextInput from './components/TextInput.svelte'
  import Button from './components/Button.svelte'

  let meetups = [
    {
      id: 'm1',
      title: 'Coding Bootcamp',
      subtitle: 'Learn to code in 2 hours',
      description:
        'In this meetup, we will have some experts that teach you how to code!',
      imageUrl: 'https://picsum.photos/640/360?random=1',
      address: '27th Nerd Road, 32523 New York',
      contactEmail: 'code@test.com'
    },
    {
      id: 'm2',
      title: 'Swim Together',
      subtitle: "Let's go for some swimming",
      description: 'We will simply swim some rounds!',
      imageUrl: 'https://picsum.photos/640/360?random=2',
      address: '27th Nerd Road, 32523 New York',
      contactEmail: 'swim@test.com'
    }
  ]

  function addMeetup() {
    const fields = [...this.elements].filter(el => Boolean(el.id))
    const newMeetup = fields.reduce(
      (acc, el) => ({ ...acc, [el.id]: el.value }),
      {
        id: Math.random()
          .toString()
          .substr(2)
      }
    )

    meetups = [...meetups, newMeetup]
  }
</script>

<style>
  main {
    margin-top: 5rem;
  }

  form {
    width: 30rem;
    max-width: 90%;
    margin: auto;
  }
</style>

<Header />

<main>
  <form on:submit|preventDefault={addMeetup}>
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
    <Button type="submit" caption="Save" />
  </form>
  <MeetupGrid {meetups} />
</main>
