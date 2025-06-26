import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { store } from './store'
import App from './App.jsx'
import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <MantineProvider>
          <Notifications position="top-right" />
          <App />
        </MantineProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
