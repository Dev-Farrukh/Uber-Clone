import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import {MainContextProvider} from './pages/Context/Context.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <MainContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MainContextProvider>
  // </StrictMode>, */}
)
