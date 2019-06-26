<script>
  let passwords = [],
    password = '',
    passwordStatus

  $: validatePassword(password)

  function validatePassword(password) {
    if (!password) {
      passwordStatus = null

      return false
    }
    if (password.trim().length < 5) {
      passwordStatus = 'short'
      return false
    }

    if (password.trim().length > 10) {
      passwordStatus = 'long'
      return false
    }

    passwordStatus = 'valid'
    return true
  }

  function addPassword(event) {
    event.preventDefault()

    const value = this.elements.password.value

    if (validatePassword(value)) {
      passwordStatus = undefined
      password = ''
      passwords = [...passwords, value]
    }
  }

  function removePassword(index) {
    passwords.splice(index, 1)
    passwords = passwords.slice(0)
  }
</script>

<h1>Assignment</h1>

<p>Solve these tasks.</p>

<ol>
  <li>Add a password input field and save the user input in a variable.</li>
  <li>
    Output "Too short" if the password is shorter than 5 characters and "Too
    long" if it's longer than 10.
  </li>
  <li>
    Output the password in a paragraph tag if it's between these boundaries.
  </li>
  <li>Add a button and let the user add the passwords to an array.</li>
  <li>Output the array values (= passwords) in a unordered list (ul tag).</li>
  <li>Bonus: If a password is clicked, remove it from the list.</li>
</ol>

<form on:submit={addPassword}>
  <input type="password" id="password" bind:value={password} />
  <button type="submit" disabled={passwordStatus !== 'valid'}>add</button>
</form>

{#if passwordStatus === 'short'}
  <p>Too short</p>
{:else if passwordStatus === 'long'}
  <p>Too long</p>
{:else if passwordStatus === 'valid'}
  <p>Password: {password}</p>
{/if}

<ul>
  {#each passwords as pass, i (pass)}
    <li on:click={removePassword.bind(this, i)}>{pass}</li>
  {/each}
</ul>
