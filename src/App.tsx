import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CarrinhoProvider } from './contexto/CarrinhoContexto';
import { PedidoProvider } from './contexto/PedidoContexto';
import { AuthProvider } from './contexto/AuthContexto';
import Cardapio from './paginas/cliente/Cardapio';
import Carrinho from './paginas/cliente/Carrinho';
import StatusPedido from './paginas/cliente/StatusPedido';
import LoginAdmin from './paginas/admin/LoginAdmin';
import PainelPedidos from './paginas/admin/PainelPedidos';
import GerenciadorCardapio from './paginas/admin/GerenciadorCardapio';
import RotaProtegida from './componentes/RotaProtegida';
import './index.css';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <CarrinhoProvider>
            <PedidoProvider>
              <Routes>
                {/* Rotas do Cliente */}
                <Route path="/" element={<Cardapio />} />
                <Route path="/mesa/:numeroMesa" element={<Cardapio />} />
                <Route path="/carrinho" element={<Carrinho />} />
                <Route path="/status-pedido/:idPedido" element={<StatusPedido />} />
                
                {/* Rotas do Admin */}
                <Route path="/admin/login" element={<LoginAdmin />} />
                <Route 
                  path="/admin/pedidos" 
                  element={
                    <RotaProtegida>
                      <PainelPedidos />
                    </RotaProtegida>
                  } 
                />
                <Route 
                  path="/admin/cardapio" 
                  element={
                    <RotaProtegida>
                      <GerenciadorCardapio />
                    </RotaProtegida>
                  } 
                />
              </Routes>
            </PedidoProvider>
          </CarrinhoProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;