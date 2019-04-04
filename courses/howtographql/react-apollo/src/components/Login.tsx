import React, { useState } from 'react'
import gql from 'graphql-tag'
import { AUTH_TOKEN } from '../constants'
import { useMutation } from 'react-apollo-hooks'
import { useRouter, RouteComponentProps } from '../BrowserRouter'
import { setToken } from '../auth'

enum FormType {
  Login,
  Signup
}

enum StorageType {
  local,
  session
}

type LoginState = {
  email?: string
  name?: string
  password?: string
  type?: FormType
  [StorageType.local]?: boolean
  [StorageType.session]?: boolean
}

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`

export default function Login() {
  const { history } = useRouter() as RouteComponentProps

  const [state, setState] = useState<LoginState>({})
  const { email, name, password, type } = state

  const submitMutation = useMutation(
    type === FormType.Login ? LOGIN_MUTATION : SIGNUP_MUTATION,
    {
      update: (proxy, mutationResult) => {
        const { token } =
          type === FormType.Login
            ? mutationResult.data.login
            : mutationResult.data.signup

        setToken(token, {
          local: state[StorageType.local],
          session: state[StorageType.session]
        })
        history.push('/')
      },
      variables: state
    }
  )

  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    submitMutation()
  }

  const createHandleOnChange = (field: string) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => setState({ ...state, [field]: e.target.value })

  const changeFormType = (e: React.MouseEvent<HTMLButtonElement>) =>
    setState({
      ...state,
      type: type === FormType.Login ? FormType.Signup : FormType.Login
    })

  const toggleBooleanField = (field: StorageType) => () =>
    setState({ ...state, [field]: !state[field] })

  return (
    <form onSubmit={handleOnSubmit}>
      <h4 className="mv3">{type === FormType.Login ? 'Login' : 'Sign Up'}</h4>
      <div className="flex flex-column">
        {type !== FormType.Login && (
          <input
            onChange={createHandleOnChange('name')}
            placeholder="Your name"
            type="text"
            value={name || ''}
          />
        )}
        <input
          onChange={createHandleOnChange('email')}
          placeholder="Your email address"
          type="text"
          value={email || ''}
        />
        <input
          onChange={createHandleOnChange('password')}
          placeholder="Choose a safe password"
          type="password"
          value={password || ''}
        />
      </div>
      {type === FormType.Login && (
        <div className="flex flex-column">
          <label>
            <input
              type="checkbox"
              checked={!!state[StorageType.local]}
              onChange={toggleBooleanField(StorageType.local)}
            />{' '}
            local
          </label>
          <label>
            <input
              type="checkbox"
              checked={!!state[StorageType.session]}
              onChange={toggleBooleanField(StorageType.session)}
            />{' '}
            session
          </label>
        </div>
      )}
      <div className="flex mt3">
        <button type="submit" className="mr2">
          {type === FormType.Login ? 'login' : 'create account'}
        </button>
        <button type="button" onClick={changeFormType}>
          {type === FormType.Login
            ? 'need to create an account?'
            : 'already have an account?'}
        </button>
      </div>
    </form>
  )
}
