# Svelte v3 Cheatsheet

<details>
  <summary>Table of Contents</summary>
<!-- TOC depthFrom:2 -->

- [Best Practices](#best-practices)
- [Variables](#variables)
  - [Local variable](#local-variable)
  - [Repassing props](#repassing-props)
    - [Shorthand when name are the same](#shorthand-when-name-are-the-same)
    - [Using Spread](#using-spread)
- [Statements](#statements)
  - [if/else](#ifelse)
  - [each](#each)
- [DOM Events](#dom-events)
  - [Browser (DOM) events](#browser-dom-events)
  - [Interceptors](#interceptors)
    - [Available event modifiers](#available-event-modifiers)
  - [Forwarding events](#forwarding-events)
  - [Repassing multiple/custom events](#repassing-multiplecustom-events)
    - [Custom events](#custom-events)
- [Slots](#slots)
  - [Usage](#usage)
  - [Default values](#default-values)
  - [Named Slot](#named-slot)
- [Component Lifecycle Hooks](#component-lifecycle-hooks)
  - [Special Hook](#special-hook)
- [Stores](#stores)
  - [Writable](#writable)
  - [Using (naive way)](#using-naive-way)
  - [Using (Svelte shortcut)](#using-svelte-shortcut)
  - [Derived stores](#derived-stores)

<!-- /TOC -->
</details>

## Best Practices

- Separate Stateful components from presentational components
- Avoid using `bind:*`, use only when necessary
- Always remember to unsubscribe `onDestroy`

## Variables

### Local variable

```
<script>
  // js vanilla: let or const
  let <name>
</script>

<!-- usage -->
{<name>}
```

### Repassing props

```
Component.svelte
---

<script>
  export let one
</script>
```

then using

```
App.svelte
---

<script>
  import Component from 'path/to/Component.svelte'

  let another
</script>

<Component one={another} />
```

#### Shorthand when name are the same

```
<script>
  import Component from 'path/to/Component.svelte'

  let one
</script>

<Component {one} />
```

#### Using Spread

```
<script>
  import Component from 'path/to/Component.svelte'

  let thing = {
    foo: 'foo',
    bar: 'bar'
  }
</script>

<!-- will repass foo & bar -->
<Component {...thing} />
```

## Statements

### if/else

```
{#if condition}
  ...
{:else if other-condition}
  ...
{:else}
  ...
{/if}
```

### each

```
{#each products as product, index (product.id)}
  ...
{/each}
```

## DOM Events

### Browser (DOM) events

```
<script>
  function fn (event) {
    console.log(event)
  }
</script>

<Button on:click={fn}>
```

### Interceptors

```
<form on:submit|preventDefault={fn}>
  ...
</form>
```

#### Available event modifiers

[Official Tutorial](https://svelte.dev/tutorial/event-modifiers)

- preventDefault
- stopPropagation
- passive
- capture
- once

Can be chained: `on:click|once|capture={...}`

### Forwarding events

When component have only one event

```
Component.svelte
---

<Button on:click>
```

then calling

```
App.svelte
---

<Component on:click={fn}>
```

### Repassing multiple/custom events

```
Component.svelte
---

<script>
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()
</script>

<Button on:click={(...args) => dispatch('eventname', ...args)} />
```

then calling

```
<Component on:eventname={fn} />
```

#### Custom events

Svelte will wrap DOM event inside a CustomEvent

When calling

```
<button on:customevent={event => dispatch('handler', { foo: 'bar', event })} />
```

that function associated with `handler`, on example above, will contain `detail` attribute with dispatch second argument

```
CustomEvent {
  // ...
  detail: {
    foo: 'bar',
    event: ...
  }
  // ...
}
```

## Slots

### Usage

```
Component.svelte
---

<div>
  <slot />
</div>
```

then calling

```
App.svelte
---

<Component>
  content that will be inside slot
</Component>
```

### Default values

```
<slot>
  default content
</slot>
```

### Named Slot

```
Component.svelte
---

<div>
  <slot name="slot-name" />
  <slot />
</div>
```

then calling

```
App.svelte
---

<Component>
  <h1 slot="slot-name">content that will be inside default slot</h1>
  <p>content that will be inside default slot</p>
</Component>
```

## Component Lifecycle Hooks

- onMount
- onDestroy
- beforeUpdate
- afterUpdate

### Special Hook

- tick()

## Stores

### Writable

```
store.js
---

import { writable } from 'svelte/store'

export default writable(initialValue)
```

### Using (naive way)

```
<script>
  import { onDestroy } from 'svelte'

  let items
  function setItems(values) {
    items = values
  }

  const unsubscribe = cartStore.subscribe(setItems)

  onDestroy(unsubscribe)
</script>

{#each items as item (item.id)}
  <CartItem {...item} />
{:else}
  <p>No items in cart yet!</p>
{/each}
```

### Using (Svelte shortcut)

```
{#each $store as item (item.id)}
  <CartItem {...item} />
{:else}
  <p>No items in cart yet!</p>
{/each}
```

### Derived stores

> https://svelte.dev/tutorial/derived-stores
