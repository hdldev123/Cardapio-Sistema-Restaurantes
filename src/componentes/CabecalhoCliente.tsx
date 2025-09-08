import React from 'react';
import { Link } from 'react-router-dom';
import { UtensilsCrossed, ShoppingCart } from 'lucide-react';
import { useCarrinho } from '../contexto/CarrinhoContexto';

export default function CabecalhoCliente() {
  const { estado } = useCarrinho();

  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 font-bold text-xl text-green-600">
            <UtensilsCrossed className="h-8 w-8" />
            <span>Restaurante</span>
          </Link>

          {/* Info da Mesa */}
          <div className="flex items-center space-x-4">
            {estado.numeroMesa && (
              <div className="hidden sm:flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full">
                <span className="text-sm font-medium">Mesa {estado.numeroMesa}</span>
              </div>
            )}

            {/* Link para Carrinho */}
            <Link 
              to="/carrinho"
              className="relative p-2 text-gray-600 hover:text-green-600 transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {estado.itens.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold">
                  {estado.itens.reduce((total, item) => total + item.quantidade, 0)}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}