import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2, Plus, Minus, UtensilsCrossed } from 'lucide-react';
import { useCarrinho } from '../../contexto/CarrinhoContexto';
import { usePedido } from '../../contexto/PedidoContexto';

export default function Carrinho() {
  const { estado, removerItem, atualizarQuantidade, limparCarrinho } = useCarrinho();
  const { criarPedido } = usePedido();
  const navigate = useNavigate();

  const formatarPreco = (preco: number) => {
    return `R$ ${preco.toFixed(2).replace('.', ',')}`;
  };

  const handleFinalizarPedido = async () => {
    if (estado.itens.length === 0 || !estado.numeroMesa) return;

    try {
      const idPedido = await criarPedido({
        numeroMesa: estado.numeroMesa,
        itens: estado.itens,
        total: estado.total,
      });

      limparCarrinho();
      navigate(`/status-pedido/${idPedido}`);
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
      alert('Erro ao finalizar pedido. Tente novamente.');
    }
  };

  if (estado.itens.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex items-center h-16">
              <Link to="/" className="flex items-center text-gray-600 hover:text-gray-800">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Voltar ao Cardápio
              </Link>
            </div>
          </div>
        </header>

        {/* Carrinho Vazio */}
        <div className="container mx-auto px-4 py-12 max-w-md">
          <div className="text-center">
            <div className="text-8xl mb-6">🛒</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Seu carrinho está vazio
            </h2>
            <p className="text-gray-600 mb-8">
              Adicione alguns pratos deliciosos do nosso cardápio
            </p>
            <Link to="/" className="botao-primario inline-flex items-center">
              <UtensilsCrossed className="h-5 w-5 mr-2" />
              Ver Cardápio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center text-gray-600 hover:text-gray-800">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Voltar ao Cardápio
            </Link>
            <h1 className="text-xl font-semibold">Meu Pedido</h1>
            <div className="w-20"></div> {/* Spacer */}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Info da Mesa */}
        {estado.numeroMesa && (
          <div className="card p-4 mb-6 bg-green-50 border border-green-200">
            <div className="flex items-center justify-center">
              <span className="text-green-800 font-semibold">
                Mesa {estado.numeroMesa}
              </span>
            </div>
          </div>
        )}

        {/* Lista de Itens */}
        <div className="space-y-4 mb-6">
          {estado.itens.map((item) => (
            <div key={item.id} className="card p-4">
              <div className="flex items-start space-x-4">
                <img
                  src={item.imagem}
                  alt={item.nome}
                  className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                />
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-800 truncate">
                    {item.nome}
                  </h3>
                  <span className="text-sm text-gray-500">{item.categoria}</span>
                  {item.observacoes && (
                    <p className="text-sm text-gray-600 mt-1 italic">
                      "{item.observacoes}"
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between mt-3">
                    <div className="text-lg font-bold text-green-600">
                      {formatarPreco(item.preco * item.quantidade)}
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      {/* Controles de Quantidade */}
                      <div className="flex items-center border border-gray-200 rounded-lg">
                        <button
                          onClick={() => atualizarQuantidade(item.id, item.quantidade - 1)}
                          className="p-2 hover:bg-gray-100 transition-colors"
                          disabled={item.quantidade <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-3 py-2 font-semibold min-w-[40px] text-center">
                          {item.quantidade}
                        </span>
                        <button
                          onClick={() => atualizarQuantidade(item.id, item.quantidade + 1)}
                          className="p-2 hover:bg-gray-100 transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Botão Remover */}
                      <button
                        onClick={() => removerItem(item.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Resumo do Pedido */}
        <div className="card p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Resumo do Pedido
          </h3>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal ({estado.itens.reduce((total, item) => total + item.quantidade, 0)} itens)</span>
              <span>{formatarPreco(estado.total)}</span>
            </div>
            <div className="flex justify-between">
              <span>Taxa de serviço (10%)</span>
              <span>{formatarPreco(estado.total * 0.1)}</span>
            </div>
            <hr className="my-3" />
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span className="text-green-600">
                {formatarPreco(estado.total * 1.1)}
              </span>
            </div>
          </div>
        </div>

        {/* Botão Finalizar */}
        <div className="space-y-3">
          <button
            onClick={handleFinalizarPedido}
            disabled={!estado.numeroMesa}
            className="botao-primario w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Finalizar Pedido - {formatarPreco(estado.total * 1.1)}
          </button>
          
          {!estado.numeroMesa && (
            <p className="text-sm text-red-600 text-center">
              É necessário estar em uma mesa para finalizar o pedido
            </p>
          )}
        </div>
      </div>
    </div>
  );
}