<script context="module">
  export async function preload(page, session) {
    const { load, meetups } = await import('../stores/meetups.js')

    load(this.fetch)

    return { meetups }
  }
</script>

<script>
  import MeetupGrid from '../components/Meetup/MeetupGrid.svelte'

  export let meetups
</script>

<svelte:head>
  <title>All Meetups</title>
</svelte:head>

<MeetupGrid meetups={$meetups} />
