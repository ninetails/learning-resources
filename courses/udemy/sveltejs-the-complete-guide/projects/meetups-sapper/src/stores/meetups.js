import { writable } from 'svelte/store'

let loaded = false
const endpoint = `${process.env.API_URL}/meetups.json`

export const meetups = writable([])

export async function save(meetup) {
  if (!meetup.id) {
    const res = await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify(meetup),
      headers: { 'Content-Type': 'application/json' }
    })

    if (res.ok) {
      const { name: id } = await res.json()
      meetups.update(meetups => [{ id, ...meetup }, ...meetups])
    }
  }
  // meetups.update(meetups => {
  //   if (meetups.find(({ id }) => id === meetup.id)) {
  //     return meetups.map(localMeetup =>
  //       localMeetup.id === meetup.id ? meetup : localMeetup
  //     )
  //   }

  //   return [meetup, ...meetups]
  // })
}

export function toggleFavorite(id) {
  meetups.update(events =>
    events.map(event =>
      event.id === id ? { ...event, isFavorite: !event.isFavorite } : event
    )
  )
}

export function remove(id) {
  meetups.update(events => events.filter(event => event.id !== id))
}

export async function load(fetch) {
  if (loaded) {
    return
  }

  const res = await fetch(endpoint)
  meetups.set(
    Object.entries(await res.json()).reduce(
      (acc, [key, value]) => [...acc, { id: key, ...value }],
      []
    )
  )

  loaded = true
}
