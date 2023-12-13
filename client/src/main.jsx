import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from "react-router-dom"
import ContaxtAPI from './context/ContaxtAPI.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContaxtAPI>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ContaxtAPI>

  </React.StrictMode>,
)


