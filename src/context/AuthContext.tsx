// Importações de VALORES (Funções e Hooks)
import { createContext, useState, useEffect, useContext } from 'react';
// NOVO: Adicionamos getRedirectResult aqui
import { onAuthStateChanged, getRedirectResult, signOut } from "firebase/auth";
import { auth } from '../firebase';

// Importações de TIPOS (Usando 'import type')
import type { ReactNode } from 'react';
import type { User } from "firebase/auth";

// 1. Tipos de dados
type AuthContextType = {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
};

// 2. Criar o Contexto
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  logout: async () => {},
});

// Tipos para o 'children'
interface AuthProviderProps {
    children: ReactNode; 
}

// 3. Criar o "Provedor"
export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      throw error;
    }
  };

  useEffect(() => {
    let unsubscribe: () => void;

    // Primeiro, tentar obter o resultado do redirect
    getRedirectResult(auth)
      .then((result) => {
        if (result && result.user) {
          // Se há um resultado do redirect, atualizar o user
          setUser(result.user);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro no getRedirectResult (AuthContext): ", error);
        setLoading(false);
      })
      .finally(() => {
        // Depois de processar o redirect, configurar o listener
        unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
          setLoading(false);
        });
      });

    // Cleanup: desinscrever o listener quando o componente desmontar
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []); // Sem dependências, corre só uma vez

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 4. Criar o hook
export const useAuth = () => {
  return useContext(AuthContext);
};
