import React, { createContext, useContext, useState, useEffect } from 'react';

export type StatusPedido = 'recebido' | 'preparo' | 'pronto' | 'entregue';

export interface Pedido {
  id: string;
  numeroMesa: string;
  itens: Array<{
    id: string;
    nome: string;
    preco: number;
    quantidade: number;
    observacoes: string;
  }>;
  total: number;
  status: StatusPedido;
  dataHora: Date;
  tempoEstimado?: number;
}

interface EstadoPedido {
  pedidos: Pedido[];
  pedidoAtual: Pedido | null;
  carregando: boolean;
}

const PedidoContexto = createContext<{
  estado: EstadoPedido;
  criarPedido: (dadosPedido: Omit<Pedido, 'id' | 'dataHora' | 'status'>) => Promise<string>;
  buscarPedidoPorId: (id: string) => Promise<Pedido | null>;
  atualizarStatusPedido: (id: string, status: StatusPedido) => void;
  buscarTodosPedidos: () => Promise<Pedido[]>;
} | undefined>(undefined);

export function PedidoProvider({ children }: { children: React.ReactNode }) {
  const [estado, setEstado] = useState<EstadoPedido>({
    pedidos: [],
    pedidoAtual: null,
    carregando: false,
  });

  // Simular dados de pedidos para demonstração
  const pedidosDemo: Pedido[] = [
    {
      id: '1',
      numeroMesa: '5',
      itens: [
        { id: '1', nome: 'Hambúrguer Artesanal', preco: 28.90, quantidade: 2, observacoes: 'Sem cebola' },
        { id: '2', nome: 'Batata Frita', preco: 12.90, quantidade: 1, observacoes: '' }
      ],
      total: 70.70,
      status: 'recebido',
      dataHora: new Date(Date.now() - 5 * 60000), // 5 minutos atrás
      tempoEstimado: 25
    },
    {
      id: '2',
      numeroMesa: '3',
      itens: [
        { id: '3', nome: 'Pizza Margherita', preco: 35.90, quantidade: 1, observacoes: 'Massa fina' }
      ],
      total: 35.90,
      status: 'preparo',
      dataHora: new Date(Date.now() - 15 * 60000), // 15 minutos atrás
      tempoEstimado: 20
    },
    {
      id: '3',
      numeroMesa: '7',
      itens: [
        { id: '4', nome: 'Salmão Grelhado', preco: 42.90, quantidade: 1, observacoes: 'Ponto médio' }
      ],
      total: 42.90,
      status: 'pronto',
      dataHora: new Date(Date.now() - 25 * 60000), // 25 minutos atrás
    }
  ];

  useEffect(() => {
    // Carregar pedidos demo na inicialização
    setEstado(prev => ({
      ...prev,
      pedidos: pedidosDemo
    }));
  }, []);

  const criarPedido = async (dadosPedido: Omit<Pedido, 'id' | 'dataHora' | 'status'>): Promise<string> => {
    setEstado(prev => ({ ...prev, carregando: true }));
    
    try {
      // Simular chamada à API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const novoPedido: Pedido = {
        ...dadosPedido,
        id: Date.now().toString(),
        status: 'recebido',
        dataHora: new Date(),
        tempoEstimado: Math.floor(Math.random() * 20) + 15 // 15-35 minutos
      };

      setEstado(prev => ({
        ...prev,
        pedidos: [...prev.pedidos, novoPedido],
        pedidoAtual: novoPedido,
        carregando: false
      }));

      return novoPedido.id;
    } catch (error) {
      setEstado(prev => ({ ...prev, carregando: false }));
      throw error;
    }
  };

  const buscarPedidoPorId = async (id: string): Promise<Pedido | null> => {
    const pedido = estado.pedidos.find(p => p.id === id);
    return pedido || null;
  };

  const atualizarStatusPedido = (id: string, status: StatusPedido) => {
    setEstado(prev => ({
      ...prev,
      pedidos: prev.pedidos.map(pedido =>
        pedido.id === id ? { ...pedido, status } : pedido
      ),
      pedidoAtual: prev.pedidoAtual?.id === id 
        ? { ...prev.pedidoAtual, status }
        : prev.pedidoAtual
    }));
  };

  const buscarTodosPedidos = async (): Promise<Pedido[]> => {
    return estado.pedidos;
  };

  return (
    <PedidoContexto.Provider
      value={{
        estado,
        criarPedido,
        buscarPedidoPorId,
        atualizarStatusPedido,
        buscarTodosPedidos,
      }}
    >
      {children}
    </PedidoContexto.Provider>
  );
}

export function usePedido() {
  const contexto = useContext(PedidoContexto);
  if (contexto === undefined) {
    throw new Error('usePedido deve ser usado dentro de um PedidoProvider');
  }
  return contexto;
}