// Importações de VALORES (Funções e Hooks)
import { createContext, useState, useEffect, useContext } from 'react';
// NOVO: Adicionamos getRedirectResult aqui
import { onAuthStateChanged, getRedirectResult } from "firebase/auth"; 
import { auth } from '../firebase';

// Importações de TIPOS (Usando 'import type')
import type { ReactNode } from 'react';
import type { User } from "firebase/auth";

// 1. Tipos de dados
type AuthContextType = {
  user: User | null; 
  loading: boolean;
};

// 2. Criar o Contexto
const AuthContext = createContext<AuthContextType>({
  user: null, 
  loading: true,
});

// Tipos para o 'children'
interface AuthProviderProps {
    children: ReactNode; 
}

// 3. Criar o "Provedor"
export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null); 
  const [loading, setLoading] = useState(true);
  // O useNavigate FOI REMOVIDO daqui

  useEffect(() => {
    // NOVO: Chamamos o "Apanhador" UMA VEZ quando o app carrega.
    // Isto "acorda" o onAuthStateChanged e garante que o login
    // de redirect seja detetado.
    getRedirectResult(auth).catch((error) => {
      console.error("Erro no getRedirectResult (AuthContext): ", error);
    });

    // O "Ouvinte" principal (como estava na sua sugestão)
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []); // Sem dependências, corre só uma vez

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// 4. Criar o hook
export const useAuth = () => {
  return useContext(AuthContext);
};