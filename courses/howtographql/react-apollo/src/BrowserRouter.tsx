// source: https://github.com/ReactTraining/react-router/issues/6430#issuecomment-434708844
import React, { createContext, memo, useContext } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter, Route, RouteComponentProps } from 'react-router-dom'

type RouterProps = {
  children: JSX.Element | JSX.Element[]
}

export const RouterContext = createContext<RouteComponentProps | null>(null)

function Router({ children }: RouterProps) {
  return (
    <BrowserRouter>
      <Route>
        {(routeProps: RouteComponentProps) => (
          <RouterContext.Provider value={routeProps}>
            {children}
          </RouterContext.Provider>
        )}
      </Route>
    </BrowserRouter>
  )
}

Router.propTypes = {
  children: PropTypes.node
}

export function useRouter() {
  return useContext(RouterContext)
}

export default memo(Router)

export type RouteComponentProps = RouteComponentProps
