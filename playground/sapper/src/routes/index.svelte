<style type="text/stylus">
	h1, figure, p
		text-align center
		margin 0 auto

	h1
		font-size 2.8em
		text-transform uppercase
		font-weight 700
		margin 0 0 0.5em 0

	figure
		margin 0 0 1em 0

	img
		width 100%
		max-width 400px
		margin 0 0 1em 0

	p
		margin 1em auto

	@media (min-width 480px)
		h1
			font-size 4em
</style>

<script type="typescript">
  let count: number = 1;
  let doubled: number;
  let quadrupled: number;

  $: doubled = count * 2;
  $: quadrupled = doubled * 2;
</script>

<svelte:head>
	<title>Sapper project template</title>
</svelte:head>

<h1>Great success!</h1>

<button on:click="{() => count += 1}">+1</button>
<p>Twice {count} is {doubled}; twice that is {quadrupled}</p>

<figure>
	<img alt='Borat' src='great-success.png'>
	<figcaption>HIGH FIVE!</figcaption>
</figure>

<p><strong>Try editing this file (src/routes/index.svelte) to test live reloading.</strong></p>
