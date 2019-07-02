<script>
  import { interval, merge, of, timer } from 'rxjs'
  import { bufferCount, takeUntil } from 'rxjs/operators'

  const store = merge(
    of(null),
    interval(500).pipe(
      takeUntil(timer(10000)),
      bufferCount(3)
    )
  )
  store.subscribe(console.log.bind(console))
</script>

{#if $store}
  <ul>
    {#each $store as item (item)}
      <li>{item}</li>
    {/each}
  </ul>
{:else}
  <p>loading</p>
{/if}
