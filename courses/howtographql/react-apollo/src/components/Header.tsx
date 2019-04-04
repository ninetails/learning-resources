import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { AUTH_TOKEN } from '../constants'
import { useRouter, RouteComponentProps } from '../BrowserRouter'
import { hasToken, clearToken } from '../auth'

function Header() {
  const { history } = useRouter() as RouteComponentProps

  const handleLogout = () => {
    clearToken()
    history.push('/')
  }

  return (
    <div className="flex pa1 justify-between nowrap orange">
      <div className="flex flex-fixed black">
        <div className="fw7 mr1">Supaa Hacka News</div>
        <Link to="/" className="ml1 no-underline black">
          new
        </Link>
        <div className="ml1">|</div>
        <Link to="/top" className="ml1 no-underline black">
          top
        </Link>
        <div className="ml1">|</div>
        <Link to="/search" className="ml1 no-underline black">
          search
        </Link>
        {hasToken() && (
          <div className="flex">
            <div className="ml1">|</div>
            <Link to="/create" className="ml1 no-underline black">
              submit
            </Link>
          </div>
        )}
      </div>
      <div className="flex flex-fixed">
        {hasToken() ? (
          <button className="ml1 black" onClick={handleLogout}>
            logout
          </button>
        ) : (
          <Link to="/login" className="ml1 no-underline black">
            login
          </Link>
        )}
      </div>
    </div>
  )
}

export default withRouter(Header)
