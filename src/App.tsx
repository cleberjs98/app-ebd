import { Outlet } from "react-router-dom"; // Importar o Outlet

// O nosso "molde" principal que usa Tailwind
function App() {
  return (
      <div className="min-h-screen bg-gray-100"> 

            <header className="bg-blue-600 p-4 text-white shadow-md">
                    <h1 className="text-xl font-bold">Escola Bíblica - Discipulado Diário</h1>
                          </header>

                                {/* O <Outlet> é o espaço onde as nossas páginas (Home, Login) vão ser renderizadas */}
                                      <main className="p-4">
                                              <Outlet /> 
                                                    </main>

                                                        </div>
                                                          )
                                                          }

                                                          export default App
                                                          