import React, { useState } from 'react'
import gql from 'graphql-tag'
import { useMutation } from 'react-apollo-hooks'
import { RouteComponentProps, useRouter } from '../BrowserRouter'
import { FEED_QUERY, FeedQueryData } from './LinkList'
import { LINKS_PER_PAGE } from '../constants'

type CreateLinkState = {
  description?: string
  url?: string
}

const POST_MUTATION = gql`
  mutation PostMutation($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id
      createdAt
      description
      postedBy {
        id
        name
      }
      url
      votes {
        id
        user {
          id
        }
      }
    }
  }
`

function usePostMutation(state: CreateLinkState) {
  return useMutation(POST_MUTATION, {
    update: (store, { data: { post } }) => {
      const variables = {
        first: LINKS_PER_PAGE,
        skip: 0,
        orderBy: 'createdAt_DESC'
      }

      const data = store.readQuery({
        query: FEED_QUERY,
        variables
      }) as FeedQueryData

      store.writeQuery({
        query: FEED_QUERY,
        data: {
          ...data,
          feed: {
            ...data.feed,
            links: [post, ...((data.feed || {}).links || [])]
          }
        },
        variables
      })
    },
    variables: state
  })
}

function CreateLink() {
  const { history } = useRouter() as RouteComponentProps
  const [state, setState] = useState<CreateLinkState>({})
  const postMutation = usePostMutation(state)

  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    postMutation().then(() => history.push('/new/1'))
  }

  const createHandleOnChange = (key: string) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => setState({ ...state, [key]: e.target.value })

  const { description = '', url = '' } = state as CreateLinkState

  return (
    <form onSubmit={handleOnSubmit}>
      <div className="flex flex-column mt3">
        <input
          className="mb2"
          onChange={createHandleOnChange('description')}
          placeholder="A description for the link"
          type="text"
          value={description}
        />
        <input
          className="mb2"
          onChange={createHandleOnChange('url')}
          placeholder="The URL for the link"
          type="text"
          value={url}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

export default CreateLink
