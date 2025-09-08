import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UtensilsCrossed, LogOut, RefreshCw, Settings } from 'lucide-react';
import { useAuth } from '../../contexto/AuthContexto';
import { usePedido, Pedido, StatusPedido } from '../../contexto/PedidoContexto';
import CardPedido from '../../componentes/CardPedido';

export default function PainelPedidos() {
  const { estado: authEstado, logout } = useAuth();
  const { buscarTodosPedidos, atualizarStatusPedido } = usePedido();
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregarPedidos();
  }, []);

  const carregarPedidos = async () => {
    try {
      const todosPedidos = await buscarTodosPedidos();
      setPedidos(todosPedidos);
    } catch (error) {
      console.error('Erro ao carregar pedidos:', error);
    } finally {
      setCarregando(false);
    }
  };

  const handleAtualizarStatus = (id: string, novoStatus: StatusPedido) => {
    atualizarStatusPedido(id, novoStatus);
    setPedidos(prevPedidos => 
      prevPedidos.map(pedido => 
        pedido.id === id ? { ...pedido, status: novoStatus } : pedido
      )
    );
  };

  const filtrarPedidosPorStatus = (status: StatusPedido) => {
    return pedidos.filter(pedido => pedido.status === status);
  };

  const colunas = [
    { status: 'recebido' as StatusPedido, titulo: 'Novos Pedidos', cor: 'bg-blue-50 border-blue-200' },
    { status: 'preparo' as StatusPedido, titulo: 'Em Preparo', cor: 'bg-yellow-50 border-yellow-200' },
    { status: 'pronto' as StatusPedido, titulo: 'Prontos', cor: 'bg-green-50 border-green-200' },
    { status: 'entregue' as StatusPedido, titulo: 'Entregues', cor: 'bg-gray-50 border-gray-200' },
  ];

  if (carregando) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2 text-green-600">
                <UtensilsCrossed className="h-8 w-8" />
                <span className="text-xl font-bold">Painel de Pedidos</span>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={carregarPedidos}
                className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                title="Atualizar"
              >
                <RefreshCw className="h-5 w-5" />
              </button>

              {authEstado.usuario?.tipo === 'admin' && (
                <Link
                  to="/admin/cardapio"
                  className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                  title="Gerenciar Cardápio"
                >
                  <Settings className="h-5 w-5" />
                </Link>
              )}

              <div className="flex items-center space-x-2 text-sm">
                <span className="text-gray-600">Olá,</span>
                <span className="font-medium text-gray-800">
                  {authEstado.usuario?.nome}
                </span>
              </div>

              <button
                onClick={logout}
                className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Sair</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Estatísticas */}
      <div className="px-6 py-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {colunas.map(coluna => {
            const pedidosColuna = filtrarPedidosPorStatus(coluna.status);
            return (
              <div key={coluna.status} className="card p-4 text-center">
                <div className="text-2xl font-bold text-gray-800">
                  {pedidosColuna.length}
                </div>
                <div className="text-sm text-gray-600">
                  {coluna.titulo}
                </div>
              </div>
            );
          })}
        </div>

        {/* Colunas de Pedidos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {colunas.map(coluna => {
            const pedidosColuna = filtrarPedidosPorStatus(coluna.status);
            
            return (
              <div key={coluna.status} className="space-y-4">
                <div className={`rounded-lg border-2 border-dashed p-4 ${coluna.cor}`}>
                  <h3 className="font-semibold text-gray-800 text-center">
                    {coluna.titulo} ({pedidosColuna.length})
                  </h3>
                </div>

                <div className="space-y-3 max-h-screen overflow-y-auto">
                  {pedidosColuna.map(pedido => (
                    <CardPedido
                      key={pedido.id}
                      pedido={pedido}
                      onAtualizarStatus={handleAtualizarStatus}
                      tipoUsuario={authEstado.usuario?.tipo || 'admin'}
                    />
                  ))}
                </div>

                {pedidosColuna.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <div className="text-4xl mb-2">📋</div>
                    <p>Nenhum pedido</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}