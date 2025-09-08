import React, { useState } from 'react';
import { X, Minus, Plus, Clock } from 'lucide-react';
import { ItemCardapio } from '../dados/cardapioDemo';
import { useCarrinho } from '../contexto/CarrinhoContexto';

interface ModalItemProps {
  item: ItemCardapio;
  aberto: boolean;
  onFechar: () => void;
}

export default function ModalItem({ item, aberto, onFechar }: ModalItemProps) {
  const { adicionarItem } = useCarrinho();
  const [quantidade, setQuantidade] = useState(1);
  const [observacoes, setObservacoes] = useState('');

  const formatarPreco = (preco: number) => {
    return `R$ ${preco.toFixed(2).replace('.', ',')}`;
  };

  const handleAdicionarCarrinho = () => {
    adicionarItem({
      id: `${item.id}-${Date.now()}`, // ID único para cada item no carrinho
      nome: item.nome,
      preco: item.preco,
      quantidade,
      observacoes,
      categoria: item.categoria,
      imagem: item.imagem,
    });
    
    onFechar();
    setQuantidade(1);
    setObservacoes('');
  };

  if (!aberto) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50" 
        onClick={onFechar}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-t-3xl sm:rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto slide-up">
        {/* Header */}
        <div className="relative">
          <img
            src={item.imagem}
            alt={item.nome}
            className="w-full h-64 object-cover rounded-t-3xl sm:rounded-t-3xl"
          />
          <button
            onClick={onFechar}
            className="absolute top-4 right-4 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 transition-all"
          >
            <X className="h-5 w-5" />
          </button>
          {item.tempoPreparo && (
            <div className="absolute top-4 left-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded-lg text-sm flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {item.tempoPreparo} min
            </div>
          )}
        </div>

        {/* Conteúdo */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {item.nome}
              </h2>
              <span className="inline-block bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                {item.categoria}
              </span>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">
                {formatarPreco(item.preco)}
              </div>
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed mb-6">
            {item.descricao}
          </p>

          {/* Ingredientes */}
          {item.ingredientes && item.ingredientes.length > 0 && (
            <div className="mb-6">
              <h4 className="font-semibold text-gray-800 mb-2">Ingredientes:</h4>
              <div className="flex flex-wrap gap-2">
                {item.ingredientes.map((ingrediente, index) => (
                  <span 
                    key={index}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    {ingrediente}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Observações */}
          <div className="mb-6">
            <label className="block font-semibold text-gray-800 mb-2">
              Observações (opcional)
            </label>
            <textarea
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              placeholder="Ex: sem cebola, ponto da carne..."
              className="input-padrao resize-none h-20"
              maxLength={200}
            />
            <div className="text-right text-xs text-gray-500 mt-1">
              {observacoes.length}/200
            </div>
          </div>

          {/* Quantidade e Botão */}
          <div className="flex items-center justify-between">
            <div className="flex items-center border border-gray-200 rounded-lg">
              <button
                onClick={() => setQuantidade(Math.max(1, quantidade - 1))}
                className="p-3 hover:bg-gray-100 transition-colors"
                disabled={quantidade <= 1}
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="px-4 py-3 font-semibold min-w-[50px] text-center">
                {quantidade}
              </span>
              <button
                onClick={() => setQuantidade(quantidade + 1)}
                className="p-3 hover:bg-gray-100 transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <button
              onClick={handleAdicionarCarrinho}
              className="botao-primario flex-1 ml-4"
            >
              Adicionar {formatarPreco(item.preco * quantidade)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}