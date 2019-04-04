import React from 'react'
import gql from 'graphql-tag'
import { ApolloClient } from 'apollo-client'
import { useSubscription, useQuery } from 'react-apollo-hooks'
import { oc } from 'ts-optchain'
import { History } from 'history'
import Link, { LinkData, fragment as linkFragments } from './Link'
import { LINKS_PER_PAGE } from '../constants'
import { useRouter, RouteComponentProps } from '../BrowserRouter'

export type FeedQueryData = {
  feed?: {
    links?: LinkData[]
    count?: number
  }
}

type LinkListProps = {
  location?: {
    pathname?: string
  }
  match?: {
    params?: {
      page?: string
    }
  }
}

export const FEED_QUERY = gql`
  query FeedQuery($first: Int, $skip: Int, $orderBy: LinkOrderByInput) {
    feed(first: $first, skip: $skip, orderBy: $orderBy) {
      links {
        ...LinkLinksList
      }
      count
    }

    ${linkFragments.link}
  }
`

const NEW_LINKS_SUBSCRIPTION = gql`
  subscription {
    newLink {
      ...LinkLinksList
    }

    ${linkFragments.link}
  }
`

const NEW_VOTES_SUBSCRIPTION = gql`
  subscription {
    newVote {
      id
      link {
        ...LinkLinksList
      }
      user {
        id
      }
    }

    ${linkFragments.link}
  }
`

type isNewPageInterface =
  | undefined
  | {
      pathname?: string
    }

function isNewPage(location: isNewPageInterface) {
  return oc(location)
    .pathname('')
    .includes('new')
}

type RouterMatch =
  | undefined
  | {
      params?: {
        page?: string
      }
    }

function getPageFromMatch(match: RouterMatch) {
  return parseInt(
    oc<{ params?: { page?: string } }>(match).params.page('1'),
    10
  )
}

function getPropsToVariables({ location = {}, match = {} }: LinkListProps) {
  if (!isNewPage(location)) {
    return {
      first: 100,
      skip: 0,
      orderBy: null
    }
  }

  const page = getPageFromMatch(match)
  return {
    first: LINKS_PER_PAGE,
    skip: (page - 1) * LINKS_PER_PAGE,
    orderBy: 'createdAt_DESC'
  }
}

function createUpdateCacheAfterVote(props: LinkListProps) {
  return function updateCacheAfterVote(
    client: ApolloClient<any>,
    createVote: any,
    linkId: string
  ) {
    const data = client.readQuery({
      query: FEED_QUERY,
      variables: getPropsToVariables(props)
    })

    const votedLink = data.feed.links.find(
      (link: LinkData) => link.id === linkId
    )
    votedLink.votes = createVote.link.votes

    client.writeQuery({ query: FEED_QUERY, data })
  }
}

function subscribeToNewLinks() {
  useSubscription(NEW_LINKS_SUBSCRIPTION, {
    onSubscriptionData: ({ client, subscriptionData }) => {
      const { newLink } = subscriptionData.data
      const data = client.readQuery({ query: FEED_QUERY })

      const exists = data.feed.links.find(
        ({ id }: { id: string }) => id === newLink.id
      )

      if (exists) return

      client.writeQuery({
        query: FEED_QUERY,
        data: {
          ...data,
          feed: {
            ...data.feed,
            links: [...data.feed.links, newLink]
          }
        }
      })
    }
  })
}

function subscribeToNewVotes() {
  useSubscription(NEW_VOTES_SUBSCRIPTION, {
    onSubscriptionData: ({ client, subscriptionData }) => {
      const { newVote } = subscriptionData.data
      const data = client.readQuery({ query: FEED_QUERY })

      const match = data.feed.links.find(
        ({ id }: { id: string }) => id === newVote.link.id
      )

      if (!match) return

      const links = data.feed.links.slice()
      links.splice(links.indexOf(match), 1, newVote.link)

      client.writeQuery({
        query: FEED_QUERY,
        data: {
          ...data,
          feed: {
            ...data.feed,
            links
          }
        }
      })
    }
  })
}

function getLinksToRender({
  location,
  data
}: {
  location: isNewPageInterface
  data: FeedQueryData
}) {
  const links = oc(data).feed.links([])
  if (isNewPage(location)) {
    return links
  }

  const rankedLinks = links.slice()
  rankedLinks.sort((l1, l2) => l2.votes.length - l1.votes.length)
  return rankedLinks
}

function previousPage(history: History, match: RouterMatch) {
  const page = getPageFromMatch(match)
  if (page > 1) {
    history.push(`/new/${page - 1}`)
  }
}

function nextPage(history: History, match: RouterMatch, data: FeedQueryData) {
  const page = getPageFromMatch(match)
  const count = oc(data).feed.count(0)
  if (page <= count / LINKS_PER_PAGE) {
    history.push(`/new/${page + 1}`)
  }
}

export default function LinkList(props: LinkListProps) {
  const { history } = useRouter() as RouteComponentProps
  const query = useQuery(FEED_QUERY, { variables: getPropsToVariables(props) })

  subscribeToNewLinks()
  subscribeToNewVotes()

  const updateCacheAfterVote = createUpdateCacheAfterVote(props)

  if (query.loading) return <div>Fetching</div>
  if (query.error) return <div>Error</div>

  const links = getLinksToRender({ location, data: query.data })
  const page = getPageFromMatch(props.match)

  return (
    <>
      {links &&
        links.map((link, index) => (
          <Link
            key={link.id}
            index={(page - 1) * LINKS_PER_PAGE + index}
            link={link}
            updateStoreAfterVote={updateCacheAfterVote}
          />
        ))}
      {isNewPage(props.location) && (
        <div className="flex ml4 mv3 gray">
          <button
            className="mr2"
            onClick={() => previousPage(history, props.match)}>
            Previous
          </button>
          <button onClick={() => nextPage(history, props.match, query.data)}>
            next
          </button>
        </div>
      )}
    </>
  )
}
