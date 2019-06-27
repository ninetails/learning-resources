<script>
  import Header from './components/Header.svelte'
  import MeetupGrid from './Meetups/MeetupGrid.svelte'
  import TextInput from './components/TextInput.svelte'
  import Button from './components/Button.svelte'
  import EditMeetup from './Meetups/EditMeetup.svelte'

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

  let editMode

  function addMeetup(event) {
    const { meetup } = event.detail
    meetups = [meetup, ...meetups]

    cancelEdit()
  }

  function toggleFavorite(event) {
    const { id } = event.detail
    const meetup = meetups.find(({ id: meetupId }) => meetupId === id)
    const meetupIndex = meetups.findIndex(({ id: meetupId }) => meetupId === id)

    const updatedMeetup = {
      ...meetup,
      isFavorite: !meetup.isFavorite
    }

    const updatedMeetups = meetups.slice(0)
    updatedMeetups.splice(meetupIndex, 1, updatedMeetup)
    meetups = updatedMeetups
  }

  function cancelEdit() {
    editMode = undefined
  }
</script>

<style>
  main {
    margin-top: 5rem;
  }

  .meetup-controls {
    margin: 1rem;
  }
</style>

<Header />

<main>
  <div class="meetup-controls">
    <Button on:click={() => (editMode = 'add')}>New Meetup</Button>
  </div>
  {#if editMode === 'add'}
    <EditMeetup on:save={addMeetup} on:cancel={cancelEdit} />
  {/if}
  <MeetupGrid {meetups} on:togglefavorite={toggleFavorite} />
</main>
