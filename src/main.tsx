import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// 1. Importar o nosso CSS (Tailwind)
import './index.css'; 

// 2. Importar o nosso "molde"
import App from './App.tsx'; 

// 3. Importar as nossas páginas
import Home from './pages/Home.tsx';
import Login from './pages/Login.tsx';

// 4. IMPORTAR O NOSSO "CÉREBRO" (A MUDANÇA ESTÁ AQUI)
import { AuthProvider } from './context/AuthContext.tsx';

// 5. Definir as rotas (isto fica igual)
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/", 
        element: <Login />,
      },
      {
        path: "/home", 
        element: <Home />,
      },
    ]
  },
]);

// 6. Iniciar a aplicação
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* 7. "EMBRULHAR" O APP TODO COM O AUTHPROVIDER (A OUTRA MUDANÇA) */}
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);