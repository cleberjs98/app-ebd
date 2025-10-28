import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { auth } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react'; // <--- Importar useEffect
import { useNavigate } from 'react-router-dom'; // <--- Importar useNavigate

export default function Login() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // NOVO: Este useEffect ouve o "Cérebro".
  // Se o Cérebro diz que não está a carregar E que o user existe,
  // nós navegamos para a Home.
  useEffect(() => {
    if (!loading && user) {
      navigate('/home', { replace: true }); // 'replace: true' é boa prática
    }
  }, [loading, user, navigate]); // Dependências

  const loginComGoogle = async () => {
    if (loading || user) return; // Não fazer nada se já estiver logado
    const provider = new GoogleAuthProvider();
    await signInWithRedirect(auth, provider);
  };

  // Se o "Cérebro" estiver a carregar, esperamos
  if (loading) {
    return <div className="text-center">A carregar...</div>;
  }

  // Se NÃO estiver a carregar E NÃO tiver user, mostrar o botão
  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
      <button
        onClick={loginComGoogle}
        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
      >
        Entrar com Google
      </button>
    </div>
  );
}