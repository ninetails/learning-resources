<script>
  export let goal
</script>

<style>
  .text-red {
    color: red;
  }
</style>

<h1 class:text-red={~goal.indexOf('!')}>{goal}</h1>
