import { writable } from 'svelte/store'

export const meetups = writable([
  {
    id: 'm1',
    title: 'Coding Bootcamp',
    subtitle: 'Learn to code in 2 hours',
    description:
      'In this meetup, we will have some experts that teach you how to code!',
    imageUrl: 'https://picsum.photos/640/360?random=1',
    address: '27th Nerd Road, 32523 New York',
    contactEmail: 'code@test.com'
  },
  {
    id: 'm2',
    title: 'Swim Together',
    subtitle: "Let's go for some swimming",
    description: 'We will simply swim some rounds!',
    imageUrl: 'https://picsum.photos/640/360?random=2',
    address: '27th Nerd Road, 32523 New York',
    contactEmail: 'swim@test.com'
  }
])

export function save(event) {
  meetups.update(events => {
    if (events.find(({ id }) => id === event.id)) {
      return events.map(localEvent =>
        localEvent.id === event.id ? event : localEvent
      )
    }

    return [event, ...events]
  })
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
