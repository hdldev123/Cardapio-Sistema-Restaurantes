import React from 'react';
import { Clock, User, ArrowRight, CheckCircle, ChefHat } from 'lucide-react';
import { Pedido, StatusPedido } from '../contexto/PedidoContexto';

interface CardPedidoProps {
  pedido: Pedido;
  onAtualizarStatus: (id: string, novoStatus: StatusPedido) => void;
  tipoUsuario: string;
}

export default function CardPedido({ pedido, onAtualizarStatus, tipoUsuario }: CardPedidoProps) {
  const formatarPreco = (preco: number) => {
    return `R$ ${preco.toFixed(2).replace('.', ',')}`;
  };

  const formatarTempo = (data: Date) => {
    const agora = new Date();
    const diff = Math.floor((agora.getTime() - new Date(data).getTime()) / 1000 / 60);
    
    if (diff < 1) return 'Agora mesmo';
    if (diff === 1) return 'há 1 minuto';
    return `há ${diff} minutos`;
  };

  const obterProximoStatus = (): StatusPedido | null => {
    switch (pedido.status) {
      case 'recebido':
        return 'preparo';
      case 'preparo':
        return 'pronto';
      case 'pronto':
        return 'entregue';
      default:
        return null;
    }
  };

  const obterTextoBotao = () => {
    switch (pedido.status) {
      case 'recebido':
        return 'Iniciar Preparo';
      case 'preparo':
        return 'Marcar como Pronto';
      case 'pronto':
        return 'Marcar como Entregue';
      default:
        return null;
    }
  };

  const podeAtualizar = () => {
    if (tipoUsuario === 'admin') return true;
    if (tipoUsuario === 'cozinha' && (pedido.status === 'recebido' || pedido.status === 'preparo')) return true;
    if (tipoUsuario === 'garcom' && pedido.status === 'pronto') return true;
    return false;
  };

  const proximoStatus = obterProximoStatus();
  const textoBotao = obterTextoBotao();

  return (
    <div className="card p-4 hover:shadow-lg transition-all duration-200">
      {/* Header do Pedido */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <User className="h-4 w-4 text-gray-500" />
          <span className="font-semibold text-gray-800">Mesa {pedido.numeroMesa}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Clock className="h-4 w-4" />
          <span>{formatarTempo(pedido.dataHora)}</span>
        </div>
      </div>

      {/* Número do Pedido */}
      <div className="text-xs text-gray-500 mb-3">
        Pedido #{pedido.id}
      </div>

      {/* Itens do Pedido */}
      <div className="space-y-2 mb-4">
        {pedido.itens.map((item, index) => (
          <div key={index} className="flex justify-between items-start text-sm">
            <div className="flex-1">
              <span className="font-medium text-gray-800">
                {item.quantidade}x {item.nome}
              </span>
              {item.observacoes && (
                <div className="text-xs text-orange-600 italic mt-1">
                  📝 {item.observacoes}
                </div>
              )}
            </div>
            <span className="text-gray-600 ml-2">
              {formatarPreco(item.preco * item.quantidade)}
            </span>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="flex justify-between items-center mb-4 pt-2 border-t border-gray-100">
        <span className="font-semibold text-gray-800">Total:</span>
        <span className="font-bold text-green-600 text-lg">
          {formatarPreco(pedido.total)}
        </span>
      </div>

      {/* Tempo Estimado */}
      {pedido.tempoEstimado && pedido.status !== 'entregue' && (
        <div className="flex items-center justify-center bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs mb-4">
          <Clock className="h-3 w-3 mr-1" />
          Tempo estimado: {pedido.tempoEstimado}min
        </div>
      )}

      {/* Botão de Ação */}
      {proximoStatus && textoBotao && podeAtualizar() && (
        <button
          onClick={() => onAtualizarStatus(pedido.id, proximoStatus)}
          className="w-full flex items-center justify-center space-x-2 py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm font-medium"
        >
          {pedido.status === 'recebido' && <ChefHat className="h-4 w-4" />}
          {pedido.status === 'preparo' && <CheckCircle className="h-4 w-4" />}
          {pedido.status === 'pronto' && <ArrowRight className="h-4 w-4" />}
          <span>{textoBotao}</span>
        </button>
      )}

      {/* Status para pedidos entregues */}
      {pedido.status === 'entregue' && (
        <div className="w-full flex items-center justify-center space-x-2 py-2 px-4 bg-gray-100 text-gray-600 rounded-lg text-sm">
          <CheckCircle className="h-4 w-4" />
          <span>Entregue</span>
        </div>
      )}
    </div>
  );
}