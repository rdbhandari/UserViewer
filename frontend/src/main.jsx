import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import store from '../store.js'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Redux  */}
    <Provider store={store}> 
    <App />
  </Provider>
  </React.StrictMode>
)
