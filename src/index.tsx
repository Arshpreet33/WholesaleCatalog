import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Router } from './app/router/Router.tsx'
import { StoreContext, store } from './app/stores/store.ts'

const rootElement = document.getElementById('root')
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <React.StrictMode>
      <StoreContext.Provider value={store}>
        <RouterProvider router={Router} />
      </StoreContext.Provider>
    </React.StrictMode>
  )
}
