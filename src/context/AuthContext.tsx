// Importações de VALORES (Funções e Hooks)
import { createContext, useState, useEffect, useContext } from 'react';
import { onAuthStateChanged } from "firebase/auth";
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

  // Este useEffect apenas ouve o Firebase e atualiza o estado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      // A LÓGICA DE NAVEGAÇÃO FOI REMOVIDA DAQUI
    });

    return () => unsubscribe();
  }, []); // Sem dependências

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