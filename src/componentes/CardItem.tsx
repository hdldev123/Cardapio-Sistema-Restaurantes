import React from 'react';
import { Clock, Plus } from 'lucide-react';
import { ItemCardapio } from '../dados/cardapioDemo';

interface CardItemProps {
  item: ItemCardapio;
  onClicar: () => void;
}

export default function CardItem({ item, onClicar }: CardItemProps) {
  const formatarPreco = (preco: number) => {
    return `R$ ${preco.toFixed(2).replace('.', ',')}`;
  };

  return (
    <div 
      className="card-produto"
      onClick={onClicar}
    >
      <div className="relative">
        <img
          src={item.imagem}
          alt={item.nome}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
        {item.tempoPreparo && (
          <div className="absolute top-3 left-3 bg-black bg-opacity-60 text-white px-2 py-1 rounded-lg text-xs flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {item.tempoPreparo}min
          </div>
        )}
        <div className="absolute top-3 right-3 bg-green-600 text-white p-2 rounded-full shadow-lg">
          <Plus className="h-4 w-4" />
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-1">
          {item.nome}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
          {item.descricao}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-green-600">
            {formatarPreco(item.preco)}
          </span>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {item.categoria}
          </span>
        </div>
      </div>
    </div>
  );
}