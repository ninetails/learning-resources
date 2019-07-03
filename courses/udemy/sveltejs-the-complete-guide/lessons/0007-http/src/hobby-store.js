import { writable } from 'svelte/store'

const hobbies = writable([])

const customStore = {
  subscribe: hobbies.subscribe,
  setHobbies: hobbies.set.bind(hobbies),
  addHobby: hobby => hobbies.update(items => items.concat(hobby))
}

export default customStore
