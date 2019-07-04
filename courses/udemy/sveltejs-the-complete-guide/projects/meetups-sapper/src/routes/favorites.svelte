<script context="module">
  export async function preload(page, session) {
    const { meetups, load } = await import('../stores/meetups.js')

    load(this.fetch)

    return { meetups }
  }
</script>

<script>
  import MeetupGrid from '../components/Meetup/MeetupGrid.svelte'

  export let meetups
</script>

<svelte:head>
  <title>Favorite Meetups</title>
</svelte:head>

<MeetupGrid meetups={$meetups.filter(({ isFavorite }) => isFavorite)} />
