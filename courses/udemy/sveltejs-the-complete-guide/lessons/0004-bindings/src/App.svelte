<script>
  import CustomInput from './CustomInput.svelte'
  import Toggle from './Toggle.svelte'
  import { isValidEmail } from './validation.js'

  let value = 'Max'
  let price
  let selectedOption = 1
  let agreeded = false
  let color = 'green'
  let colorcheckbox = ['red', 'green']
  let selectColor = 'red'

  let selectWithObjs = [
    {
      value: 'a',
      text: 'A'
    },
    {
      value: 'b',
      text: 'B'
    },
    {
      value: 'c',
      text: 'C'
    }
  ]

  let selectedObj = selectWithObjs[1]

  $: console.log('string value', value)
  $: console.log('buttons', selectedOption)
  $: console.log('price', price)
  $: console.log('agreeded', agreeded)
  $: console.log('color', color)
  $: console.log('colorcheckbox', colorcheckbox)
  $: console.log('selectColor', selectColor)
  $: console.log('selectedObj', selectedObj)

  let customInput
  $: console.dir(customInput)

  let usernameInput

  function saveData() {
    // console.log(document.querySelector('#username').value)
    console.log('saveData', usernameInput) // instead
    console.dir(usernameInput)
    customInput.empty()
  }

  let formIsValid,
    enteredEmail = ''
  $: formIsValid = isValidEmail(enteredEmail)
</script>

<style>
  .invalid {
    border: 1px solid red;
  }
</style>

<!-- <input type="text" bind:value /> -->

<CustomInput bind:value bind:this={customInput} />

<hr />

<Toggle bind:chosenOption={selectedOption} />

<hr />

<!-- <input
  type="number"
  value={price}
  on:input={event => console.log(event.target.value)} /> -->

<!-- bind will maintain number type when using type="number", above is getting string because DOM -->
<input type="number" bind:value={price} />

<hr />

<label>
  <input type="checkbox" bind:checked={agreeded} />
  Agree to terms?
</label>

<hr />

<label>
  <input type="radio" name="color" value="red" bind:group={color} />
  red
</label>
<label>
  <input type="radio" name="color" value="green" bind:group={color} />
  green
</label>
<label>
  <input type="radio" name="color" value="blue" bind:group={color} />
  blue
</label>

<hr />

<label>
  <input type="checkbox" name="color" value="red" bind:group={colorcheckbox} />
  red
</label>
<label>
  <input
    type="checkbox"
    name="color"
    value="green"
    bind:group={colorcheckbox} />
  green
</label>
<label>
  <input type="checkbox" name="color" value="blue" bind:group={colorcheckbox} />
  blue
</label>

<hr />

<select bind:value={selectColor}>
  <option value="green">green</option>
  <option value="red">red</option>
  <option value="blue">blue</option>
</select>

<hr />

<select bind:value={selectedObj}>
  {#each selectWithObjs as opt}
    <option value={opt}>{opt.text}</option>
  {/each}
</select>

<hr />

<!-- <input type="text" id="username" bind:this={usernameInput} /> -->
<input type="text" bind:this={usernameInput} />
<button on:click={saveData}>Save</button>

<hr />

<form on:submit|preventDefault>
  <input
    type="email"
    bind:value={enteredEmail}
    class={isValidEmail(enteredEmail) ? '' : 'invalid'} />
  <button type="submit" disabled={!formIsValid}>Save</button>
</form>
