import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "@appwrite.io/pink-icons";
import App from './App.jsx'
import { BrowserRouter } from 'react-router';
import { AppRouter } from './router/AppRouter.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AppRouter/>
    </BrowserRouter>
  </StrictMode>,
)
