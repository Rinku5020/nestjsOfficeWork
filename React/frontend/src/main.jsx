import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Dashboard from './components/Dashboard'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Dashboard /> 
  </StrictMode>,
)
