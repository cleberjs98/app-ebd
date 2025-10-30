import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Home() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/', { replace: true });
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  // "O Guarda": Se o "Cérebro" não estiver a carregar E o user NÃO existir,
  // ele "expulsa" o utilizador de volta para o Login.
  useEffect(() => {
    if (!loading && !user) {
      navigate('/', { replace: true });
    }
  }, [loading, user, navigate]);

  // Se estiver a carregar ou se for ser expulso, mostrar "A carregar..."
  if (loading || !user) {
    return <div className="text-center">A carregar...</div>;
  }

  // Se estiver tudo OK (carregado E com user), mostrar a Home
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Bem-vindo à Home</h2>
      <p className="mb-4">Olá, {user.displayName || user.email}!</p>
      <p className="mb-6">Este é o conteúdo da página principal, visível apenas após o login.</p>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
      >
        Sair
      </button>
    </div>
  );
}
