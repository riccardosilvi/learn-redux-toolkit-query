import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import store from './app/store'
import { Provider } from 'react-redux'

import { worker } from './api/server'
import { extendedApiSlice } from "./features/users/usersSlice";


// Wrap app rendering so we can wait for the mock API to initialize
async function start() {
  // Start our mock API server
  await worker.start({ onUnhandledRequest: 'bypass' })

  // since toolkit is framework-agnostic it provides ways to invoke
  // endpoints queries and trigger them (initiate starts the initial fetch round)
  // we are referencing the extended slice for typescript safety ( otherwise we could still reference the original apiSlice)
  store.dispatch(extendedApiSlice.endpoints.getUsers.initiate())

  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  )
}

start()
