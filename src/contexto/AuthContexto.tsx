import React, { createContext, useContext, useState, useEffect } from 'react';

interface Usuario {
  id: string;
  nome: string;
  email: string;
  tipo: 'admin' | 'cozinha' | 'garcom';
}

interface EstadoAuth {
  usuario: Usuario | null;
  autenticado: boolean;
  carregando: boolean;
}

const AuthContexto = createContext<{
  estado: EstadoAuth;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
} | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [estado, setEstado] = useState<EstadoAuth>({
    usuario: null,
    autenticado: false,
    carregando: true,
  });

  useEffect(() => {
    // Verificar se há token salvo
    const token = localStorage.getItem('token');
    const usuarioSalvo = localStorage.getItem('usuario');
    
    if (token && usuarioSalvo) {
      setEstado({
        usuario: JSON.parse(usuarioSalvo),
        autenticado: true,
        carregando: false,
      });
    } else {
      setEstado(prev => ({ ...prev, carregando: false }));
    }
  }, []);

  const login = async (email: string, senha: string): Promise<void> => {
    setEstado(prev => ({ ...prev, carregando: true }));

    try {
      // Simular validação (em produção, fazer chamada à API)
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Usuários demo
      const usuariosDemo = [
        { id: '1', nome: 'Admin', email: 'admin@restaurante.com', senha: 'admin123', tipo: 'admin' as const },
        { id: '2', nome: 'Cozinheiro', email: 'cozinha@restaurante.com', senha: 'cozinha123', tipo: 'cozinha' as const },
        { id: '3', nome: 'Garçom', email: 'garcom@restaurante.com', senha: 'garcom123', tipo: 'garcom' as const },
      ];

      const usuario = usuariosDemo.find(u => u.email === email && u.senha === senha);

      if (!usuario) {
        throw new Error('Credenciais inválidas');
      }

      const { senha: _, ...usuarioSemSenha } = usuario;
      const token = 'token-demo-' + usuario.id;

      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify(usuarioSemSenha));

      setEstado({
        usuario: usuarioSemSenha,
        autenticado: true,
        carregando: false,
      });
    } catch (error) {
      setEstado(prev => ({ ...prev, carregando: false }));
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setEstado({
      usuario: null,
      autenticado: false,
      carregando: false,
    });
  };

  return (
    <AuthContexto.Provider value={{ estado, login, logout }}>
      {children}
    </AuthContexto.Provider>
  );
}

export function useAuth() {
  const contexto = useContext(AuthContexto);
  if (contexto === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return contexto;
}