// NÃO precisamos de getRedirectResult aqui
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth"; 
import { auth } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // "O Porteiro": Se o Cérebro (AuthContext) diz que o user existe,
  // (seja pelo "Ouvinte" ou pelo "Apanhador"), navegue.
  useEffect(() => {
    if (!loading && user) {
      navigate('/home', { replace: true });
    }
  }, [loading, user, navigate]); // Dependências

  // "O Iniciador"
  const loginComGoogle = async () => {
    if (loading || user) return;
    const provider = new GoogleAuthProvider();
    await signInWithRedirect(auth, provider);
  };

  // "O Loading" (Enquanto o Cérebro verifica)
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