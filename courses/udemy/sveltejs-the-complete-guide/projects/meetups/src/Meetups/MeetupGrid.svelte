<script>
  import { createEventDispatcher } from 'svelte'
  import MeetupItem from './MeetupItem.svelte'
  import MeetupFilter from './MeetupFilter.svelte'
  import Button from '../components/Button.svelte'

  export let meetups

  const dispatch = createEventDispatcher()

  let favsOnly = false

  $: filteredMeetups = favsOnly ? $meetups.filter(m => m.isFavorite) : $meetups

  function setFilter({ detail }) {
    favsOnly = !!detail
  }
</script>

<style>
  #meetups {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
  }

  @media (min-width: 768px) {
    #meetups {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  #meetup-controls {
    margin: 1rem;
    display: flex;
    justify-content: space-between;
  }
</style>

<section id="meetup-controls">
  <MeetupFilter on:select={setFilter} />

  <Button on:click={() => dispatch('add')}>New Meetup</Button>
</section>

<section id="meetups">
  {#each filteredMeetups as meetup (meetup.id)}
    <MeetupItem {...meetup} on:showdetails on:edit />
  {/each}
</section>
