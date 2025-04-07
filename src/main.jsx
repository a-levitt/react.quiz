import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {QuizProvider} from "./contexts/QuizContext.js";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QuizProvider>
        <App />
    </QuizProvider>
  </StrictMode>,
)
