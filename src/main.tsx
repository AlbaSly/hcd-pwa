import React from 'react'
import ReactDOM from 'react-dom/client'

import { PrimeReactProvider } from "primereact/api";

// Theme
import "primereact/resources/themes/lara-light-green/theme.css";
// Core
import "primereact/resources/primereact.min.css";
// Icons
import "primeicons/primeicons.css";
// Primeflex
import "primeflex/primeflex.css";
// Animate.css
import 'animate.css';
// Index
import './scss/index.scss';

import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <PrimeReactProvider>
        <App />
      </PrimeReactProvider>
  </React.StrictMode>,
)
