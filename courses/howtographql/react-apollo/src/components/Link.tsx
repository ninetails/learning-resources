import React from 'react'
import { oc } from 'ts-optchain'
import gql from 'graphql-tag'
import { useMutation } from 'react-apollo-hooks'
import { hasToken } from '../auth'
import { timeDifferenceForDate } from '../utils'

type User = {
  name: string
}

export type LinkData = {
  id: string
  createdAt: Date
  description: string
  postedBy?: User
  url: string
  votes: any[]
}

export type LinkProps = {
  index: number
  link?: LinkData
  updateStoreAfterVote?: (store: any, vote: any, linkId: string) => void
}

const voteFragment = gql`
  fragment VoteLinksList on Vote {
    id
    user {
      id
    }
  }
`

const linkFragment = gql`
  fragment LinkLinksList on Link {
    id
    createdAt
    description
    postedBy {
      id
      name
    }
    url
    votes {
      ...VoteLinksList
    }
  }

  ${voteFragment}
`

export const fragment = {
  vote: voteFragment,
  link: linkFragment
}

const VOTE_MUTATION = gql`
  mutation VoteMutation($linkId: ID!) {
    vote(linkId: $linkId) {
      id
      link {
        ...LinkLinksList
      }
      user {
        id
      }
    }

    ${linkFragment}
  }
`

export default function Link({ index, link, updateStoreAfterVote }: LinkProps) {
  if (!link) {
    return null
  }

  const { id, createdAt, description, postedBy, url, votes } = link

  const voteMutation = useMutation(VOTE_MUTATION, {
    update: (store, { data: { vote } }) =>
      updateStoreAfterVote && updateStoreAfterVote(store, vote, link.id),
    variables: { linkId: id }
  })

  return (
    <div className="flex mt2 items-start">
      <div className="flex items-center">
        <span className="gray">{index + 1}.</span>
        {hasToken() && (
          <button className="ml1 gray f11" onClick={() => voteMutation()}>
            ▲
          </button>
        )}
      </div>
      <div className="ml1">
        <div>
          {description} ({url})
        </div>
        <div className="f6 lh-copy gray">
          {votes.length} votes | by {oc(postedBy).name('Unknown')}{' '}
          {timeDifferenceForDate(createdAt)}
        </div>
      </div>
    </div>
  )
}
