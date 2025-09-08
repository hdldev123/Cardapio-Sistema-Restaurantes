export interface ItemCardapio {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  categoria: string;
  imagem: string;
  disponivel: boolean;
  ingredientes?: string[];
  tempoPreparo?: number;
}

export interface CategoriaCardapio {
  id: string;
  nome: string;
  descricao: string;
  ordem: number;
  ativa: boolean;
}

export const categoriasDemo: CategoriaCardapio[] = [
  {
    id: '1',
    nome: 'Entradas',
    descricao: 'Pratos para começar bem a refeição',
    ordem: 1,
    ativa: true,
  },
  {
    id: '2',
    nome: 'Pratos Principais',
    descricao: 'Nossos pratos principais irresistíveis',
    ordem: 2,
    ativa: true,
  },
  {
    id: '3',
    nome: 'Pizzas',
    descricao: 'Pizzas artesanais com massa própria',
    ordem: 3,
    ativa: true,
  },
  {
    id: '4',
    nome: 'Bebidas',
    descricao: 'Bebidas geladas e quentes',
    ordem: 4,
    ativa: true,
  },
  {
    id: '5',
    nome: 'Sobremesas',
    descricao: 'Finalize sua refeição com doçura',
    ordem: 5,
    ativa: true,
  },
];

export const itensCardapioDemo: ItemCardapio[] = [
  // Entradas
  {
    id: '1',
    nome: 'Bruschetta Italiana',
    descricao: 'Pão artesanal tostado com tomate, manjericão fresco e azeite extra virgem',
    preco: 18.90,
    categoria: 'Entradas',
    imagem: 'https://images.pexels.com/photos/5710192/pexels-photo-5710192.jpeg?auto=compress&cs=tinysrgb&w=400',
    disponivel: true,
    ingredientes: ['Pão artesanal', 'Tomate', 'Manjericão', 'Azeite'],
    tempoPreparo: 10,
  },
  {
    id: '2',
    nome: 'Batata Rústica',
    descricao: 'Batatas temperadas com ervas e assadas no forno, servidas com molho especial',
    preco: 16.90,
    categoria: 'Entradas',
    imagem: 'https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg?auto=compress&cs=tinysrgb&w=400',
    disponivel: true,
    ingredientes: ['Batata', 'Ervas', 'Molho especial'],
    tempoPreparo: 15,
  },
  
  // Pratos Principais
  {
    id: '3',
    nome: 'Hambúrguer Artesanal',
    descricao: 'Pão brioche, hamburger 180g, queijo, alface, tomate, cebola caramelizada',
    preco: 28.90,
    categoria: 'Pratos Principais',
    imagem: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=400',
    disponivel: true,
    ingredientes: ['Pão brioche', 'Carne 180g', 'Queijo', 'Vegetais'],
    tempoPreparo: 20,
  },
  {
    id: '4',
    nome: 'Salmão Grelhado',
    descricao: 'Filé de salmão grelhado com legumes salteados e molho de maracujá',
    preco: 42.90,
    categoria: 'Pratos Principais',
    imagem: 'https://images.pexels.com/photos/3535383/pexels-photo-3535383.jpeg?auto=compress&cs=tinysrgb&w=400',
    disponivel: true,
    ingredientes: ['Salmão fresco', 'Legumes', 'Molho maracujá'],
    tempoPreparo: 25,
  },
  {
    id: '5',
    nome: 'Risotto de Camarão',
    descricao: 'Risotto cremoso com camarões frescos, aspargos e parmesão',
    preco: 38.90,
    categoria: 'Pratos Principais',
    imagem: 'https://images.pexels.com/photos/8753657/pexels-photo-8753657.jpeg?auto=compress&cs=tinysrgb&w=400',
    disponivel: true,
    ingredientes: ['Arroz arbóreo', 'Camarões', 'Aspargos', 'Parmesão'],
    tempoPreparo: 30,
  },
  
  // Pizzas
  {
    id: '6',
    nome: 'Pizza Margherita',
    descricao: 'Molho de tomate, mussarela, manjericão fresco e azeite',
    preco: 35.90,
    categoria: 'Pizzas',
    imagem: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400',
    disponivel: true,
    ingredientes: ['Molho tomate', 'Mussarela', 'Manjericão'],
    tempoPreparo: 18,
  },
  {
    id: '7',
    nome: 'Pizza Pepperoni',
    descricao: 'Molho de tomate, mussarela e generosas fatias de pepperoni',
    preco: 39.90,
    categoria: 'Pizzas',
    imagem: 'https://images.pexels.com/photos/13993627/pexels-photo-13993627.jpeg?auto=compress&cs=tinysrgb&w=400',
    disponivel: true,
    ingredientes: ['Molho tomate', 'Mussarela', 'Pepperoni'],
    tempoPreparo: 18,
  },
  {
    id: '8',
    nome: 'Pizza Quatro Queijos',
    descricao: 'Mussarela, gorgonzola, parmesão e provolone',
    preco: 41.90,
    categoria: 'Pizzas',
    imagem: 'https://images.pexels.com/photos/4394612/pexels-photo-4394612.jpeg?auto=compress&cs=tinysrgb&w=400',
    disponivel: true,
    ingredientes: ['Mussarela', 'Gorgonzola', 'Parmesão', 'Provolone'],
    tempoPreparo: 18,
  },
  
  // Bebidas
  {
    id: '9',
    nome: 'Suco Natural de Laranja',
    descricao: 'Suco de laranja natural, extraído na hora',
    preco: 8.90,
    categoria: 'Bebidas',
    imagem: 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400',
    disponivel: true,
    ingredientes: ['Laranja fresca'],
    tempoPreparo: 5,
  },
  {
    id: '10',
    nome: 'Refrigerante Lata',
    descricao: 'Coca-cola, Guaraná, Sprite - 350ml',
    preco: 6.50,
    categoria: 'Bebidas',
    imagem: 'https://images.pexels.com/photos/50593/coca-cola-cold-drink-soft-drink-coke-50593.jpeg?auto=compress&cs=tinysrgb&w=400',
    disponivel: true,
    tempoPreparo: 2,
  },
  {
    id: '11',
    nome: 'Água Mineral',
    descricao: 'Água mineral 500ml - Com gás ou sem gás',
    preco: 4.50,
    categoria: 'Bebidas',
    imagem: 'https://images.pexels.com/photos/327090/pexels-photo-327090.jpeg?auto=compress&cs=tinysrgb&w=400',
    disponivel: true,
    tempoPreparo: 2,
  },
  
  // Sobremesas
  {
    id: '12',
    nome: 'Petit Gâteau',
    descricao: 'Bolinho de chocolate quente com sorvete de baunilha',
    preco: 16.90,
    categoria: 'Sobremesas',
    imagem: 'https://images.pexels.com/photos/1998633/pexels-photo-1998633.jpeg?auto=compress&cs=tinysrgb&w=400',
    disponivel: true,
    ingredientes: ['Chocolate', 'Sorvete baunilha'],
    tempoPreparo: 15,
  },
  {
    id: '13',
    nome: 'Tiramisu',
    descricao: 'Sobremesa italiana tradicional com café e mascarpone',
    preco: 14.90,
    categoria: 'Sobremesas',
    imagem: 'https://images.pexels.com/photos/6957461/pexels-photo-6957461.jpeg?auto=compress&cs=tinysrgb&w=400',
    disponivel: true,
    ingredientes: ['Mascarpone', 'Café', 'Cacau'],
    tempoPreparo: 5,
  },
];