# Sistema de Cardápio e Pedidos para Restaurantes

Um aplicativo web completo para gerenciamento de cardápio e sistema de pedidos para restaurantes, desenvolvido com React, TypeScript e Tailwind CSS.

## 📋 Sobre o Projeto

Este sistema oferece uma solução completa para restaurantes gerenciarem seus cardápios digitais e receberem pedidos online. A aplicação possui uma interface para clientes fazerem pedidos e uma área administrativa para gerenciamento.

## 🚀 Funcionalidades

### Área do Cliente
- Visualização do cardápio digital com categorias e itens
- Adição de produtos ao carrinho
- Ajuste de quantidades no carrinho
- Finalização de pedidos
- Acompanhamento do status do pedido em tempo real

### Área Administrativa
- Login seguro para administradores
- Gerenciamento completo do cardápio (adicionar, editar, remover itens)
- Painel de controle para visualização e gerenciamento dos pedidos
- Atualização de status dos pedidos

## 🛠️ Tecnologias Utilizadas

- **React** - Biblioteca para construção da interface
- **TypeScript** - Linguagem tipada para desenvolvimento mais seguro
- **Vite** - Ferramenta de build rápida e moderna
- **Tailwind CSS** - Framework CSS para estilização
- **Context API** - Gerenciamento de estado da aplicação

## 📁 Estrutura do Projeto

```
src/
├── componentes/           # Componentes reutilizáveis
│   ├── CabecalhoCliente.tsx
│   ├── CardItem.tsx
│   ├── CardPedido.tsx
│   ├── FloatingCart.tsx
│   ├── ModalItem.tsx
│   └── RotaProtegida.tsx
├── contexto/              # Contextos React para gerenciamento de estado
│   ├── AuthContexto.tsx
│   ├── CarrinhoContexto.tsx
│   └── PedidoContexto.tsx
├── dados/                 # Dados estáticos ou de demonstração
│   └── cardapioDemo.ts
├── paginas/               # Componentes de página
│   ├── admin/             # Área administrativa
│   │   ├── GerenciadorCardapio.tsx
│   │   ├── LoginAdmin.tsx
│   │   └── PainelPedidos.tsx
│   └── cliente/           # Área do cliente
│       ├── Cardapio.tsx
│       ├── Carrinho.tsx
│       └── StatusPedido.tsx
├── App.tsx                # Componente principal e roteamento
├── index.css             # Estilos globais
└── main.tsx              # Ponto de entrada da aplicação
```

## 🚀 Configuração e Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/hdldev123/Cardapio-Sistema-Restaurantes.git
   ```

2. Instale as dependências:
   ```bash
   cd Cardapio-Sistema-Restaurantes
   npm install
   ```

3. Execute o projeto em modo de desenvolvimento:
   ```bash
   npm run dev
   ```

## 📱 Responsividade

O sistema é totalmente responsivo, funcionando bem em dispositivos móveis, tablets e desktops.

## 🔒 Autenticação

A área administrativa é protegida por autenticação para garantir a segurança das operações de gerenciamento.

## 🧪 Próximas Melhorias

- Integração com sistemas de pagamento
- Sistema de avaliação dos produtos
- Perfil de cliente com histórico de pedidos
- Notificações por e-mail e push
