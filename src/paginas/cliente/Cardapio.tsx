import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ShoppingCart, Search, Filter } from 'lucide-react';
import { useCarrinho } from '../../contexto/CarrinhoContexto';
import { itensCardapioDemo, categoriasDemo, ItemCardapio } from '../../dados/cardapioDemo';
import CabecalhoCliente from '../../componentes/CabecalhoCliente';
import CardItem from '../../componentes/CardItem';
import ModalItem from '../../componentes/ModalItem';
import FloatingCart from '../../componentes/FloatingCart';

export default function Cardapio() {
  const { numeroMesa } = useParams();
  const { definirMesa } = useCarrinho();
  const [itensCardapio, setItensCardapio] = useState<ItemCardapio[]>(itensCardapioDemo);
  const [categorias, setCategorias] = useState(categoriasDemo);
  const [categoriaAtiva, setCategoriaAtiva] = useState<string>('todas');
  const [termoBusca, setTermoBusca] = useState('');
  const [itemSelecionado, setItemSelecionado] = useState<ItemCardapio | null>(null);
  const [modalAberto, setModalAberto] = useState(false);

  useEffect(() => {
    if (numeroMesa) {
      definirMesa(numeroMesa);
    }
  }, [numeroMesa, definirMesa]);

  const itensFiltrados = itensCardapio.filter(item => {
    const filtroCategoria = categoriaAtiva === 'todas' || item.categoria === categoriaAtiva;
    const filtroBusca = item.nome.toLowerCase().includes(termoBusca.toLowerCase()) ||
                       item.descricao.toLowerCase().includes(termoBusca.toLowerCase());
    return filtroCategoria && filtroBusca && item.disponivel;
  });

  const abrirModalItem = (item: ItemCardapio) => {
    setItemSelecionado(item);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setItemSelecionado(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <CabecalhoCliente />
      
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Banner de Boas-vindas */}
        <div className="card p-6 mb-6 text-center bg-gradient-to-r from-green-600 to-green-700 text-white">
          <h2 className="text-2xl font-bold mb-2">
            Bem-vindo ao Nosso Restaurante!
          </h2>
          <p className="text-green-100">
            {numeroMesa ? `Mesa ${numeroMesa}` : 'Explore nosso delicioso cardápio'}
          </p>
        </div>

        {/* Barra de Busca e Filtros */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Buscar pratos..."
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
              className="input-padrao pl-10"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <select
              value={categoriaAtiva}
              onChange={(e) => setCategoriaAtiva(e.target.value)}
              className="input-padrao pl-10 pr-8 appearance-none min-w-[160px]"
            >
              <option value="todas">Todas Categorias</option>
              {categorias.map(categoria => (
                <option key={categoria.id} value={categoria.nome}>
                  {categoria.nome}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Categorias (Chips) */}
        <div className="flex overflow-x-auto gap-3 mb-6 pb-2">
          <button
            onClick={() => setCategoriaAtiva('todas')}
            className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all ${
              categoriaAtiva === 'todas'
                ? 'bg-green-600 text-white shadow-md'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            Todas
          </button>
          {categorias.map(categoria => (
            <button
              key={categoria.id}
              onClick={() => setCategoriaAtiva(categoria.nome)}
              className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all ${
                categoriaAtiva === categoria.nome
                  ? 'bg-green-600 text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {categoria.nome}
            </button>
          ))}
        </div>

        {/* Lista de Itens */}
        <div className="space-y-6">
          {categorias
            .filter(cat => {
              const temItens = itensFiltrados.some(item => item.categoria === cat.nome);
              return categoriaAtiva === 'todas' ? temItens : cat.nome === categoriaAtiva;
            })
            .map(categoria => (
              <div key={categoria.id} className="fade-in">
                <h3 className="text-xl font-bold text-gray-800 mb-4 border-l-4 border-green-500 pl-4">
                  {categoria.nome}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {itensFiltrados
                    .filter(item => item.categoria === categoria.nome)
                    .map(item => (
                      <CardItem
                        key={item.id}
                        item={item}
                        onClicar={() => abrirModalItem(item)}
                      />
                    ))}
                </div>
              </div>
            ))}
        </div>

        {/* Mensagem quando não há resultados */}
        {itensFiltrados.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Nenhum prato encontrado
            </h3>
            <p className="text-gray-500">
              Tente ajustar os filtros ou termo de busca
            </p>
          </div>
        )}
      </div>

      {/* Carrinho Flutuante */}
      <FloatingCart />

      {/* Modal do Item */}
      {modalAberto && itemSelecionado && (
        <ModalItem
          item={itemSelecionado}
          aberto={modalAberto}
          onFechar={fecharModal}
        />
      )}
    </div>
  );
}