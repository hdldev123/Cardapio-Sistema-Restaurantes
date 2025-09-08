import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, CheckCircle, Truck, ChefHat } from 'lucide-react';
import { usePedido, StatusPedido as TipoStatus } from '../../contexto/PedidoContexto';

export default function StatusPedido() {
  const { idPedido } = useParams();
  const { buscarPedidoPorId } = usePedido();
  const [pedido, setPedido] = useState<any>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregarPedido = async () => {
      if (idPedido) {
        try {
          const pedidoEncontrado = await buscarPedidoPorId(idPedido);
          setPedido(pedidoEncontrado);
        } catch (error) {
          console.error('Erro ao buscar pedido:', error);
        } finally {
          setCarregando(false);
        }
      }
    };

    carregarPedido();
  }, [idPedido, buscarPedidoPorId]);

  const formatarPreco = (preco: number) => {
    return `R$ ${preco.toFixed(2).replace('.', ',')}`;
  };

  const formatarHora = (data: Date) => {
    return new Date(data).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const obterInfoStatus = (status: TipoStatus) => {
    switch (status) {
      case 'recebido':
        return {
          titulo: 'Pedido Recebido',
          descricao: 'Seu pedido foi recebido e está sendo processado',
          icone: CheckCircle,
          cor: 'text-blue-600',
          bgCor: 'bg-blue-100',
        };
      case 'preparo':
        return {
          titulo: 'Em Preparo',
          descricao: 'Nossa cozinha está preparando seu pedido',
          icone: ChefHat,
          cor: 'text-yellow-600',
          bgCor: 'bg-yellow-100',
        };
      case 'pronto':
        return {
          titulo: 'Pronto para Entrega',
          descricao: 'Seu pedido está pronto! O garçom já está a caminho',
          icone: Truck,
          cor: 'text-green-600',
          bgCor: 'bg-green-100',
        };
      case 'entregue':
        return {
          titulo: 'Entregue',
          descricao: 'Pedido entregue com sucesso! Bom apetite!',
          icone: CheckCircle,
          cor: 'text-green-600',
          bgCor: 'bg-green-100',
        };
      default:
        return {
          titulo: 'Status Desconhecido',
          descricao: '',
          icone: Clock,
          cor: 'text-gray-600',
          bgCor: 'bg-gray-100',
        };
    }
  };

  if (carregando) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!pedido) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Pedido não encontrado
          </h2>
          <Link to="/" className="botao-primario">
            Voltar ao Cardápio
          </Link>
        </div>
      </div>
    );
  }

  const infoStatus = obterInfoStatus(pedido.status);
  const IconeStatus = infoStatus.icone;

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
            <h1 className="text-xl font-semibold">Status do Pedido</h1>
            <div className="w-20"></div> {/* Spacer */}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Status Principal */}
        <div className="card p-6 mb-6 text-center">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${infoStatus.bgCor} mb-4`}>
            <IconeStatus className={`h-8 w-8 ${infoStatus.cor}`} />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {infoStatus.titulo}
          </h2>
          <p className="text-gray-600 mb-4">
            {infoStatus.descricao}
          </p>

          {/* Tempo Estimado */}
          {pedido.status !== 'entregue' && pedido.tempoEstimado && (
            <div className="flex items-center justify-center text-sm text-gray-600">
              <Clock className="h-4 w-4 mr-1" />
              Tempo estimado: {pedido.tempoEstimado} minutos
            </div>
          )}
        </div>

        {/* Informações do Pedido */}
        <div className="card p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Pedido #{pedido.id}
            </h3>
            <div className="text-right text-sm text-gray-600">
              <div>Mesa {pedido.numeroMesa}</div>
              <div>{formatarHora(pedido.dataHora)}</div>
            </div>
          </div>

          {/* Itens do Pedido */}
          <div className="space-y-3">
            {pedido.itens.map((item: any, index: number) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div className="flex-1">
                  <div className="font-medium text-gray-800">
                    {item.quantidade}x {item.nome}
                  </div>
                  {item.observacoes && (
                    <div className="text-sm text-gray-600 italic">
                      "{item.observacoes}"
                    </div>
                  )}
                </div>
                <div className="font-semibold text-gray-800">
                  {formatarPreco(item.preco * item.quantidade)}
                </div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="border-t border-gray-200 pt-4 mt-4">
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span className="text-green-600">
                {formatarPreco(pedido.total)}
              </span>
            </div>
          </div>
        </div>

        {/* Timeline do Status */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Acompanhe seu Pedido
          </h3>
          
          <div className="space-y-4">
            {['recebido', 'preparo', 'pronto', 'entregue'].map((status, index) => {
              const isAtivo = pedido.status === status;
              const isConcluido = ['recebido', 'preparo', 'pronto', 'entregue'].indexOf(pedido.status) >= index;
              
              return (
                <div key={status} className="flex items-center">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    isConcluido ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {isConcluido ? <CheckCircle className="h-4 w-4" /> : <div className="w-3 h-3 bg-gray-400 rounded-full" />}
                  </div>
                  <div className={`ml-3 ${isAtivo ? 'font-semibold text-green-600' : 'text-gray-600'}`}>
                    {obterInfoStatus(status as TipoStatus).titulo}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="mt-6 space-y-3">
          <Link to="/" className="botao-outline w-full block text-center">
            Fazer Novo Pedido
          </Link>
          
          {pedido.status === 'entregue' && (
            <div className="text-center text-sm text-gray-600 p-4">
              Obrigado por escolher nosso restaurante! 😊
            </div>
          )}
        </div>
      </div>
    </div>
  );
}