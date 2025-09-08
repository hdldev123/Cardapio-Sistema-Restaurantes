import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, Edit, Trash2, Search, Filter } from 'lucide-react';
import { itensCardapioDemo, categoriasDemo, ItemCardapio, CategoriaCardapio } from '../../dados/cardapioDemo';

export default function GerenciadorCardapio() {
  const [itens, setItens] = useState<ItemCardapio[]>(itensCardapioDemo);
  const [categorias, setCategorias] = useState<CategoriaCardapio[]>(categoriasDemo);
  const [abaSelecionada, setAbaSelecionada] = useState<'itens' | 'categorias'>('itens');
  const [termoBusca, setTermoBusca] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState('todas');

  const formatarPreco = (preco: number) => {
    return `R$ ${preco.toFixed(2).replace('.', ',')}`;
  };

  const itensFiltrados = itens.filter(item => {
    const filtroBusca = item.nome.toLowerCase().includes(termoBusca.toLowerCase()) ||
                       item.descricao.toLowerCase().includes(termoBusca.toLowerCase());
    const filtroCategoria = categoriaFiltro === 'todas' || item.categoria === categoriaFiltro;
    return filtroBusca && filtroCategoria;
  });

  const toggleDisponibilidade = (id: string) => {
    setItens(prevItens => 
      prevItens.map(item => 
        item.id === id ? { ...item, disponivel: !item.disponivel } : item
      )
    );
  };

  const toggleCategoriaAtiva = (id: string) => {
    setCategorias(prevCategorias => 
      prevCategorias.map(categoria => 
        categoria.id === id ? { ...categoria, ativa: !categoria.ativa } : categoria
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                to="/admin/pedidos" 
                className="flex items-center text-gray-600 hover:text-gray-800"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Voltar ao Painel
              </Link>
              <h1 className="text-xl font-bold text-gray-800">
                Gerenciar Cardápio
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-6 max-w-6xl">
        {/* Abas */}
        <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg max-w-md">
          <button
            onClick={() => setAbaSelecionada('itens')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              abaSelecionada === 'itens'
                ? 'bg-white text-gray-800 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Itens do Cardápio
          </button>
          <button
            onClick={() => setAbaSelecionada('categorias')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              abaSelecionada === 'categorias'
                ? 'bg-white text-gray-800 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Categorias
          </button>
        </div>

        {abaSelecionada === 'itens' && (
          <>
            {/* Filtros e Busca */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Buscar itens..."
                  value={termoBusca}
                  onChange={(e) => setTermoBusca(e.target.value)}
                  className="input-padrao pl-10"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <select
                  value={categoriaFiltro}
                  onChange={(e) => setCategoriaFiltro(e.target.value)}
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
              <button className="botao-primario flex items-center space-x-2">
                <Plus className="h-5 w-5" />
                <span>Novo Item</span>
              </button>
            </div>

            {/* Lista de Itens */}
            <div className="space-y-4">
              {itensFiltrados.map(item => (
                <div key={item.id} className="card p-6">
                  <div className="flex items-start space-x-4">
                    {/* Imagem */}
                    <img
                      src={item.imagem}
                      alt={item.nome}
                      className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                    />

                    {/* Informações */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 truncate">
                            {item.nome}
                          </h3>
                          <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                            {item.categoria}
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-600">
                            {formatarPreco(item.preco)}
                          </div>
                          {item.tempoPreparo && (
                            <div className="text-sm text-gray-500">
                              {item.tempoPreparo} min
                            </div>
                          )}
                        </div>
                      </div>

                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {item.descricao}
                      </p>

                      {/* Ingredientes */}
                      {item.ingredientes && item.ingredientes.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {item.ingredientes.slice(0, 3).map((ingrediente, index) => (
                            <span 
                              key={index}
                              className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded"
                            >
                              {ingrediente}
                            </span>
                          ))}
                          {item.ingredientes.length > 3 && (
                            <span className="text-xs text-gray-500">
                              +{item.ingredientes.length - 3} mais
                            </span>
                          )}
                        </div>
                      )}

                      {/* Ações */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={item.disponivel}
                              onChange={() => toggleDisponibilidade(item.id)}
                              className="sr-only"
                            />
                            <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              item.disponivel ? 'bg-green-600' : 'bg-gray-300'
                            }`}>
                              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                item.disponivel ? 'translate-x-6' : 'translate-x-1'
                              }`} />
                            </div>
                            <span className="ml-2 text-sm text-gray-700">
                              {item.disponivel ? 'Disponível' : 'Indisponível'}
                            </span>
                          </label>
                        </div>

                        <div className="flex space-x-2">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {itensFiltrados.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  Nenhum item encontrado
                </h3>
                <p className="text-gray-500">
                  Tente ajustar os filtros ou termo de busca
                </p>
              </div>
            )}
          </>
        )}

        {abaSelecionada === 'categorias' && (
          <>
            {/* Header das Categorias */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Gerenciar Categorias
              </h2>
              <button className="botao-primario flex items-center space-x-2">
                <Plus className="h-5 w-5" />
                <span>Nova Categoria</span>
              </button>
            </div>

            {/* Lista de Categorias */}
            <div className="space-y-4">
              {categorias.map(categoria => (
                <div key={categoria.id} className="card p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {categoria.nome}
                        </h3>
                        <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                          Ordem {categoria.ordem}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">
                        {categoria.descricao}
                      </p>
                    </div>

                    <div className="flex items-center space-x-4">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={categoria.ativa}
                          onChange={() => toggleCategoriaAtiva(categoria.id)}
                          className="sr-only"
                        />
                        <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          categoria.ativa ? 'bg-green-600' : 'bg-gray-300'
                        }`}>
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            categoria.ativa ? 'translate-x-6' : 'translate-x-1'
                          }`} />
                        </div>
                        <span className="ml-2 text-sm text-gray-700">
                          {categoria.ativa ? 'Ativa' : 'Inativa'}
                        </span>
                      </label>

                      <div className="flex space-x-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}