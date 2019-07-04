<script>
  import EditMeetup from '../components/Meetup/EditMeetup.svelte'
  import { save } from '../stores/meetups.js'

  function handleSave(event) {
    save(event.detail)

    window.location.href = '/'
  }
</script>

<EditMeetup on:save={handleSave} />
