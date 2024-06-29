import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {BrowserRouter as ReactRouter} from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ReactRouter>
    <App />
  </ReactRouter>,
)
