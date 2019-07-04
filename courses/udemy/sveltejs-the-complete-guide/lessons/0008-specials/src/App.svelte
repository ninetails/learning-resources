<script>
  // import Product from './Product.svelte'
  // import CartItem from './CartItem.svelte'
  import FamilyNode from './FamilyNode.svelte'

  // const views = {
  //   product: {
  //     component: Product,
  //     title: 'Test Product',
  //     id: 'p1'
  //   },
  //   cartItem: {
  //     component: CartItem,
  //     title: 'Another Product',
  //     id: 'p2'
  //   }
  // }

  // let renderedComponent = views.product

  // function toggle() {
  //   if (renderedComponent === views.product) {
  //     renderedComponent = views.cartItem
  //   } else {
  //     renderedComponent = views.product
  //   }
  // }

  let familyStructure = [
    {
      isParent: true,
      name: 'Chris',
      children: [
        {
          isParent: true,
          name: 'Moe',
          children: [{ isParent: false, name: 'Julie' }]
        }
      ]
    },
    { isParent: false, name: 'Anna' }
  ]

  let y

  $: console.log(y)
</script>

<svelte:window on:load={() => console.log('loaded')} bind:scrollY={y} />

<svelte:body id="app-foo" />

<!--
<button on:click={toggle}>Toggle Display</button>
<svelte:component this={renderedComponent.component} {...renderedComponent} />
-->

{#each familyStructure as familyMember}
  <FamilyNode member={familyMember} />
{/each}

<p>foo</p>
<p>foo</p>
<p>foo</p>
<p>foo</p>
<p>foo</p>
<p>foo</p>
<p>foo</p>
<p>foo</p>
<p>foo</p>
<p>foo</p>
<p>foo</p>
<p>foo</p>
<p>foo</p>
<p>foo</p>
<p>foo</p>
<p>foo</p>
<p>foo</p>
<p>foo</p>
<p>foo</p>
<p>foo</p>
<p>foo</p>
<p>foo</p>
<p>foo</p>
<p>foo</p>
<p>foo</p>
<p>foo</p>
<p>foo</p>
<p>foo</p>
<p>foo</p>
<p>foo</p>
<p>foo</p>
<p>foo</p>
<p>foo</p>
<p>foo</p>
<p>foo</p>
<p>foo</p>
<p>foo</p>
<p>foo</p>
<p>foo</p>
