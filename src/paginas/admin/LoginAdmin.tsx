import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, UtensilsCrossed, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../contexto/AuthContexto';

export default function LoginAdmin() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCarregando(true);
    setErro('');

    try {
      await login(email, senha);
      navigate('/admin/pedidos');
    } catch (error) {
      setErro('Credenciais inválidas. Verifique email e senha.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Link Voltar */}
        <div className="mb-6">
          <Link to="/" className="flex items-center text-green-600 hover:text-green-700 transition-colors">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Voltar ao Cardápio
          </Link>
        </div>

        {/* Card de Login */}
        <div className="card p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <UtensilsCrossed className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Painel Administrativo
            </h1>
            <p className="text-gray-600">
              Acesse o sistema de gerenciamento
            </p>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {erro && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {erro}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-padrao"
                placeholder="seu@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <div className="relative">
                <input
                  type={mostrarSenha ? 'text' : 'password'}
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="input-padrao pr-12"
                  placeholder="Sua senha"
                  required
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {mostrarSenha ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={carregando}
              className="botao-primario w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {carregando ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          {/* Credenciais Demo */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-700 mb-3">
              Credenciais para Teste:
            </h4>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Admin:</span>
                <span>admin@restaurante.com / admin123</span>
              </div>
              <div className="flex justify-between">
                <span>Cozinha:</span>
                <span>cozinha@restaurante.com / cozinha123</span>
              </div>
              <div className="flex justify-between">
                <span>Garçom:</span>
                <span>garcom@restaurante.com / garcom123</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}