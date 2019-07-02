<script>
  import Test from 'test-component/src/index.html'
  import List from 'list-component/src/List.svelte'
  import Item from 'list-component/src/Item.svelte'
</script>

<Test person="world" />

<List>
  <Item>foo</Item>
  <Item>bar</Item>
  <Item>baz</Item>
</List>
