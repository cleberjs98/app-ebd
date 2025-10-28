// Importações de VALORES (Funções e Hooks)
import { GoogleAuthProvider, signInWithRedirect, getRedirectResult } from "firebase/auth"; // Precisamos do getRedirectResult
import { auth } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Este useEffect agora trata dos DOIS casos
  useEffect(() => {
    
    // --- Caso 1: "O Guarda" ---
    // Se o Cérebro (AuthContext) já sabe que o user está logado,
    // (ex: o utilizador já estava logado e tentou aceder a '/')
    // então redirecionamos imediatamente.
    if (!loading && user) {
      navigate('/home', { replace: true });
      return; // Parar a execução
    }

    // --- Caso 2: "O Apanhador" ---
    // Se o Cérebro NÃO está a carregar E NÃO tem user,
    // temos de verificar ativamente se acabámos de voltar do Google.
    // Esta é a chamada que faltava.
    if (!loading && !user) {
      getRedirectResult(auth)
        .then((result) => {
          if (result) {
            // Sucesso! O Google deu-nos um user.
            // Não precisamos de navegar aqui. O simples facto de
            // 'result' existir vai fazer o 'onAuthStateChanged' (no Cérebro)
            // disparar, o 'user' vai ser preenchido, o componente vai
            // re-renderizar, e o "Caso 1" (o Guarda) vai fazer o redirecionamento.
            console.log("Login (via redirect) apanhado!", result.user.displayName);
          }
          // Se 'result' for null, significa que o utilizador
          // simplesmente aterrou na página de login (sem vir do Google).
          // Não fazemos nada.
        })
        .catch((error) => {
          console.error("Erro ao apanhar o redirect:", error);
          alert("Erro ao processar o login: " + error.message);
        });
    }

  }, [loading, user, navigate]); // Dependências corretas


  // --- O "INICIADOR" ---
  // (Esta função está perfeita e não muda)
  const loginComGoogle = async () => {
    if (loading || user) return;
    const provider = new GoogleAuthProvider();
    await signInWithRedirect(auth, provider);
  };

  // Se o "Cérebro" estiver a carregar, esperamos
  // (Isto também apanha o momento após o getRedirectResult)
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