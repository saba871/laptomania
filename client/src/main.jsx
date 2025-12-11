import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/auth.context.jsx'
import { BrowserRouter } from 'react-router'
import { LeptopsProvider } from './context/leptops.context.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <LeptopsProvider>
        <App />
      </LeptopsProvider>
    </AuthProvider>
  </ BrowserRouter>
)
