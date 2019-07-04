<script>
  import { scale } from 'svelte/transition'
  import { flip } from 'svelte/animate'
  import MeetupItem from './MeetupItem.svelte'
  import Button from '../UI/Button.svelte'

  export let meetups
</script>

<style type="text/stylus">
  #meetups
    width 100%
    display grid
    grid-template-columns 1fr
    grid-gap 1rem

    @media (min-width: 768px)
      grid-template-columns repeat(2, 1fr)
</style>

{#if meetups}
  <section id="meetups">
    {#each meetups as meetup (meetup.id)}
      <div transition:scale={{ duration: 100 }} animate:flip={{ duration: 300 }}>
        <MeetupItem {...meetup} on:showdetails on:edit />
      </div>
    {/each}
  </section>
{/if}
