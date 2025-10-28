import { Outlet } from "react-router-dom"; 
// NOVO: Importamos o nosso "cérebro" aqui
import { AuthContextProvider } from './context/AuthContext';

// O nosso "molde" principal que usa Tailwind
function App() {
  return (
    // O "cérebro" (AuthProvider) agora "embrulha" o nosso layout.
    // Isto funciona, porque o App.tsx é um "filho" do RouterProvider (em main.tsx),
    // o que significa que o AuthContext (que está dentro disto) agora PODE usar o useNavigate()!
    <AuthContextProvider>
      <div className="min-h-screen bg-gray-100"> 
        
        <header className="bg-blue-600 p-4 text-white shadow-md">
          <h1 className="text-xl font-bold">Escola Bíblica - Discipulado Diário</h1>
        </header>
        
        {/* O <Outlet> é o espaço onde as nossas páginas (Home, Login) vão ser renderizadas */}
        <main className="p-4">
          <Outlet /> 
        </main>
  
      </div>
    </AuthContextProvider>
  )
}

export default App