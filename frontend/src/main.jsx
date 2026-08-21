import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { MainContextProvider } from './pages/Context/Context.jsx'
import SocketProvider from './pages/Context/SocketContext.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <SocketProvider>
    <MainContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MainContextProvider>
  </SocketProvider>
  // </StrictMode>, */}
)
