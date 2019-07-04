<script>
  export let controlType = undefined,
    id,
    label,
    rows = undefined,
    type = 'text',
    valid = true,
    validityMessage = undefined,
    value

  let touched = false
</script>

<style type="text/stylus">
  input,
  textarea
    display block
    width 100%
    font inherit
    border none
    border-bottom 2px solid #ccc
    border-radius 3px 3px 0 0
    background white
    padding 0.15rem 0.25rem
    transition border-color 0.1s ease-out

  input:focus,
  textarea:focus
    border-color #e40763
    outline none

  label
    display block
    margin-bottom 0.5rem
    width 100%

  .form-control
    padding 0.5rem 0
    width 100%
    margin 0.25rem 0

  .invalid
    border-color red
    background-color #fde3e3

  .error-message
    color red
    margin 0.25rem 0
</style>

<div class="form-control">
  <label for="title">{label}</label>
  {#if controlType === 'textarea'}
    <textarea {rows} {id} {value} class:invalid={!valid} on:input on:blur />
  {:else}
    <input {type} {id} {value} class:invalid={!valid} on:input on:blur />
  {/if}

  {#if validityMessage && !valid}
    <p class="error-message">{validityMessage}</p>
  {/if}
</div>
