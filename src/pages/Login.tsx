// A LINHA 1 FOI CORRIGIDA (Removemos o "React, ")
import { useEffect } from 'react'; 
import { GoogleAuthProvider, signInWithRedirect, getRedirectResult } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // Para navegar para a /home
import { auth } from '../firebase'; // O nosso ficheiro firebase.ts
import { useAuth } from '../context/AuthContext'; // O nosso "cérebro"

export default function Login() {
  const { user, loading } = useAuth(); // Pegar o estado do "cérebro"
  const navigate = useNavigate(); // Preparar o navegador

  // --- O "APANHADOR" ---
  // Isto corre *sempre* que a página de Login carrega.
  // A sua função é "apanhar" o login quando o Google nos redireciona de volta.
  useEffect(() => {
    // Se ainda estiver a carregar ou se o utilizador JÁ estiver logado, não faça nada
    if (loading || user) {
      return;
    }

    getRedirectResult(auth)
      .then((result) => {
        // Se 'result' existir, significa que o utilizador acabou de voltar do Google
        if (result) {
          console.log("Login (via redirect) com sucesso!", result.user.displayName);
          navigate("/home"); // Login feito, enviar para a Home
        }
      })
      .catch((error) => {
        console.error("Erro ao apanhar o redirect:", error);
        alert("Erro ao processar o login: " + error.message);
      });
  }, [loading, user, navigate]); // Dependências do Effect

  // --- O "INICIADOR" ---
  // Isto é chamado quando o botão é clicado
  const loginComGoogle = async () => {
    const provider = new GoogleAuthProvider();
    // Iniciar o *redirecionamento* para o Google
    await signInWithRedirect(auth, provider);
  };

  // Removida a Proteção de Rota redundante, agora o AuthContext lida com isso.
  // Este useEffect fica apenas para garantir que o redirecionamento acontece após o retorno do Google.

  // Se estiver a carregar ou já logado, mostrar "A carregar..."
  if (loading || user) {
    return (
      <div className="text-center">
        <p>A carregar...</p>
      </div>
    );
  }

  // Se não estiver logado, mostrar o botão
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