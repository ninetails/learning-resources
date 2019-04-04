import React, { useState } from 'react'
import { ApolloClient } from 'apollo-client'
import { useApolloClient } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import Link, { LinkData, fragment as linkFragments } from './Link'

type SearchState = {
  links?: LinkData[]
  filter?: string
}

const FEED_SEARCH_QUERY = gql`
  query FeedSearchQuery($filter: String!) {
    feed(filter: $filter) {
      links {
        ...LinkLinksList
      }
    }

    ${linkFragments.link}
  }
`

function Search() {
  const [state, setState] = useState<SearchState>({})

  const apolloClient = useApolloClient()

  const executeSearch = async (filter: string | undefined) => {
    if (!filter) {
      return
    }

    const result = await apolloClient.query({
      query: FEED_SEARCH_QUERY,
      variables: { filter }
    })
    const links = result.data.feed.links

    setState({ ...state, links })
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setState({ ...state, filter: e.target.value })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    executeSearch(state.filter)
  }

  const { links } = state

  return (
    <form onSubmit={handleSubmit}>
      <div>
        Search
        <input type="text" onChange={handleOnChange} />
        <button type="submit">OK</button>
      </div>

      {links &&
        links.map((link: LinkData, index) => (
          <Link key={link.id} index={index} link={link} />
        ))}
    </form>
  )
}

export default Search
