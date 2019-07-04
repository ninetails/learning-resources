<script>
  import Header from '../components/UI/Header.svelte'
  import Button from '../components/UI/Button.svelte'
  import MeetupFilter from '../components/Meetup/MeetupFilter.svelte'

  export let segment
</script>

<style type="text/stylus">
  main
    margin-top 5rem

  #meetup-controls
    margin 1rem
    display flex
    justify-content space-between
</style>

<Header />

<main>
  <section id="meetup-controls">
    <Button href="/new">New Meetup</Button>
    {#if !segment || segment === 'favorites'}
      <MeetupFilter {segment} />
    {/if}
  </section>

  <slot />
</main>
