import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import { useCarrinho } from '../contexto/CarrinhoContexto';

export default function FloatingCart() {
  const { estado } = useCarrinho();

  const totalItens = estado.itens.reduce((total, item) => total + item.quantidade, 0);

  if (estado.itens.length === 0) {
    return null;
  }

  const formatarPreco = (preco: number) => {
    return `R$ ${preco.toFixed(2).replace('.', ',')}`;
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 max-w-sm mx-auto">
      <Link
        to="/carrinho"
        className="flex items-center justify-between bg-green-600 hover:bg-green-700 text-white p-4 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-200"
      >
        <div className="flex items-center space-x-3">
          <div className="relative">
            <ShoppingCart className="h-6 w-6" />
            <span className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold">
              {totalItens}
            </span>
          </div>
          <div>
            <div className="font-semibold">
              {totalItens} {totalItens === 1 ? 'item' : 'itens'}
            </div>
            <div className="text-green-100 text-sm">
              {formatarPreco(estado.total)}
            </div>
          </div>
        </div>
        
        <ArrowRight className="h-5 w-5" />
      </Link>
    </div>
  );
}