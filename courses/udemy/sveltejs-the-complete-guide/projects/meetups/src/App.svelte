<script>
  import Header from './components/Header.svelte'
  import MeetupGrid from './Meetups/MeetupGrid.svelte'
  import TextInput from './components/TextInput.svelte'
  import EditMeetup from './Meetups/EditMeetup.svelte'
  import MeetupDetail from './Meetups/MeetupDetail.svelte'
  import { toggleFavorite, meetups } from './Meetups/meetups-store.js'

  let editMode
  let editedId
  let page = 'overview'
  let pageData = {}

  function showDetails({ detail }) {
    page = 'details'
    pageData = detail
  }

  function closeDetails() {
    page = 'overview'
    pageData = {}
  }

  function cancelEdit() {
    editedId = undefined
    editMode = undefined
  }

  function startEdit({ detail: { id } }) {
    editedId = id
    editMode = 'edit'
  }
</script>

<style>
  main {
    margin-top: 5rem;
  }
</style>

<Header />

<main>
  {#if page === 'overview'}
    {#if editMode === 'edit'}
      <EditMeetup id={editedId} on:save={cancelEdit} on:cancel={cancelEdit} />
    {/if}
    <MeetupGrid
      {meetups}
      on:showdetails={showDetails}
      on:add={() => (editMode = 'edit')}
      on:edit={startEdit} />
  {:else}
    <MeetupDetail id={pageData.id} on:close={closeDetails} />
  {/if}
</main>
