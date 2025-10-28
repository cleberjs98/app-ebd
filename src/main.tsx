import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// 1. Importar o nosso CSS (Tailwind)
import './index.css'; 

// 2. Importar o nosso "molde" (que agora vai carregar o AuthProvider)
import App from './App.tsx'; 

// 3. Importar as nossas páginas
import Home from './pages/Home.tsx';
import Login from './pages/Login.tsx';

// 4. Definir as rotas
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // O "molde" App.tsx é o elemento principal
    
    // As páginas "filhas" serão renderizadas dentro do <Outlet> do App.tsx
    children: [
      {
        path: "/", 
        element: <Login />, // A página de Login
      },
      {
        path: "/home", 
        element: <Home />, // A página Home
      },
    ]
  },
]);

// 5. Iniciar a aplicação
// O AuthProvider FOI REMOVIDO daqui.
// Apenas o RouterProvider é carregado aqui.
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);