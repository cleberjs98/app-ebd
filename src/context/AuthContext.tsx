// Importações de VALORES (Funções e Hooks)
import { createContext, useState, useEffect, useContext } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

// Importações de TIPOS (Usando 'import type')
import type { ReactNode } from 'react'; // <--- CORRIGIDO
import type { User } from "firebase/auth"; // <--- CORRIGIDO

// 1. Tipos de dados que o nosso contexto vai guardar
type AuthContextType = {
  user: User | null; 
  loading: boolean;
};

// 2. Criar o Contexto (com valores padrão nulos)
const AuthContext = createContext<AuthContextType>({
  user: null, 
  loading: true,
});

// Definimos o tipo para o 'children' (os componentes que serão envolvidos)
interface AuthProviderProps {
    children: ReactNode; 
}

// 3. Criar o "Provedor" (o componente que vai "embrulhar" o nosso app)
export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null); 
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Este useEffect corre apenas uma vez para configurar o ouvinte do Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      // --- LÓGICA DE REDIRECIONAMENTO CENTRALIZADA ---
      if (currentUser && window.location.pathname === '/') {
        navigate('/home'); 
      }
      // ---------------------------------------------------
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// 4. Criar o hook customizado para usar o contexto
export const useAuth = () => {
  return useContext(AuthContext);
};