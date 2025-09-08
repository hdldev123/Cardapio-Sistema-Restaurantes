import React, { createContext, useContext, useReducer, useEffect } from 'react';

interface ItemCarrinho {
  id: string;
  nome: string;
  preco: number;
  quantidade: number;
  observacoes: string;
  categoria: string;
  imagem: string;
}

interface EstadoCarrinho {
  itens: ItemCarrinho[];
  total: number;
  numeroMesa: string | null;
}

type AcaoCarrinho =
  | { tipo: 'ADICIONAR_ITEM'; payload: ItemCarrinho }
  | { tipo: 'REMOVER_ITEM'; payload: string }
  | { tipo: 'ATUALIZAR_QUANTIDADE'; payload: { id: string; quantidade: number } }
  | { tipo: 'ATUALIZAR_OBSERVACOES'; payload: { id: string; observacoes: string } }
  | { tipo: 'LIMPAR_CARRINHO' }
  | { tipo: 'DEFINIR_MESA'; payload: string };

const estadoInicial: EstadoCarrinho = {
  itens: [],
  total: 0,
  numeroMesa: null,
};

function carrinhoReducer(estado: EstadoCarrinho, acao: AcaoCarrinho): EstadoCarrinho {
  switch (acao.tipo) {
    case 'ADICIONAR_ITEM':
      const itemExistente = estado.itens.find(item => 
        item.id === acao.payload.id && item.observacoes === acao.payload.observacoes
      );
      
      let novosItens;
      if (itemExistente) {
        novosItens = estado.itens.map(item =>
          item.id === acao.payload.id && item.observacoes === acao.payload.observacoes
            ? { ...item, quantidade: item.quantidade + acao.payload.quantidade }
            : item
        );
      } else {
        novosItens = [...estado.itens, acao.payload];
      }
      
      const novoTotal = novosItens.reduce((total, item) => total + (item.preco * item.quantidade), 0);
      
      return {
        ...estado,
        itens: novosItens,
        total: novoTotal,
      };

    case 'REMOVER_ITEM':
      const itensFiltrados = estado.itens.filter(item => item.id !== acao.payload);
      const totalFiltrado = itensFiltrados.reduce((total, item) => total + (item.preco * item.quantidade), 0);
      
      return {
        ...estado,
        itens: itensFiltrados,
        total: totalFiltrado,
      };

    case 'ATUALIZAR_QUANTIDADE':
      const itensAtualizados = estado.itens.map(item =>
        item.id === acao.payload.id
          ? { ...item, quantidade: acao.payload.quantidade }
          : item
      ).filter(item => item.quantidade > 0);
      
      const totalAtualizado = itensAtualizados.reduce((total, item) => total + (item.preco * item.quantidade), 0);
      
      return {
        ...estado,
        itens: itensAtualizados,
        total: totalAtualizado,
      };

    case 'ATUALIZAR_OBSERVACOES':
      return {
        ...estado,
        itens: estado.itens.map(item =>
          item.id === acao.payload.id
            ? { ...item, observacoes: acao.payload.observacoes }
            : item
        ),
      };

    case 'LIMPAR_CARRINHO':
      return {
        ...estado,
        itens: [],
        total: 0,
      };

    case 'DEFINIR_MESA':
      return {
        ...estado,
        numeroMesa: acao.payload,
      };

    default:
      return estado;
  }
}

const CarrinhoContexto = createContext<{
  estado: EstadoCarrinho;
  adicionarItem: (item: ItemCarrinho) => void;
  removerItem: (id: string) => void;
  atualizarQuantidade: (id: string, quantidade: number) => void;
  atualizarObservacoes: (id: string, observacoes: string) => void;
  limparCarrinho: () => void;
  definirMesa: (numeroMesa: string) => void;
} | undefined>(undefined);

export function CarrinhoProvider({ children }: { children: React.ReactNode }) {
  const [estado, dispatch] = useReducer(carrinhoReducer, estadoInicial);

  // Salvar no localStorage
  useEffect(() => {
    localStorage.setItem('carrinho', JSON.stringify(estado));
  }, [estado]);

  // Carregar do localStorage
  useEffect(() => {
    const carrinhoSalvo = localStorage.getItem('carrinho');
    if (carrinhoSalvo) {
      const dadosCarrinho = JSON.parse(carrinhoSalvo);
      if (dadosCarrinho.itens) {
        dadosCarrinho.itens.forEach((item: ItemCarrinho) => {
          dispatch({ tipo: 'ADICIONAR_ITEM', payload: item });
        });
      }
      if (dadosCarrinho.numeroMesa) {
        dispatch({ tipo: 'DEFINIR_MESA', payload: dadosCarrinho.numeroMesa });
      }
    }
  }, []);

  const adicionarItem = (item: ItemCarrinho) => {
    dispatch({ tipo: 'ADICIONAR_ITEM', payload: item });
  };

  const removerItem = (id: string) => {
    dispatch({ tipo: 'REMOVER_ITEM', payload: id });
  };

  const atualizarQuantidade = (id: string, quantidade: number) => {
    dispatch({ tipo: 'ATUALIZAR_QUANTIDADE', payload: { id, quantidade } });
  };

  const atualizarObservacoes = (id: string, observacoes: string) => {
    dispatch({ tipo: 'ATUALIZAR_OBSERVACOES', payload: { id, observacoes } });
  };

  const limparCarrinho = () => {
    dispatch({ tipo: 'LIMPAR_CARRINHO' });
  };

  const definirMesa = (numeroMesa: string) => {
    dispatch({ tipo: 'DEFINIR_MESA', payload: numeroMesa });
  };

  return (
    <CarrinhoContexto.Provider
      value={{
        estado,
        adicionarItem,
        removerItem,
        atualizarQuantidade,
        atualizarObservacoes,
        limparCarrinho,
        definirMesa,
      }}
    >
      {children}
    </CarrinhoContexto.Provider>
  );
}

export function useCarrinho() {
  const contexto = useContext(CarrinhoContexto);
  if (contexto === undefined) {
    throw new Error('useCarrinho deve ser usado dentro de um CarrinhoProvider');
  }
  return contexto;
}