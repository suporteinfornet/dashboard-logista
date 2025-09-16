// Dados simulados da aplicação
export const users = [
  {
    id: 7,
    nome: 'Miss Dias',
    email: 'applequedemodas@gmail.com',
    senha: '123456',
    telefone: '85988887777',
    endereco: 'Rua das Flores, 123',
    tipo: 'logista'
  },
  {
    id: 8,
    nome: 'João Silva',
    email: 'joao@teste.com',
    senha: '123456',
    telefone: '85999999999',
    endereco: 'Av. Principal, 456',
    tipo: 'logista'
  }
];

export const statsData = {
  7: { // Miss Dias
    totalPedidos: 15,
    pedidosPendentes: 3,
    pedidosConfirmados: 12,
    totalVendas: 2450.75
  },
  8: { // João Silva
    totalPedidos: 8,
    pedidosPendentes: 1,
    pedidosConfirmados: 7,
    totalVendas: 1200.50
  }
};

export const pedidosData = {
  7: [ // Miss Dias
    {
      id: 1,
      cliente: { nome: 'Maria Silva', email: 'maria@email.com' },
      dataPedido: '2024-01-15T10:30:00Z',
      valorTotal: 150.00,
      status: 'PENDENTE'
    },
    {
      id: 2,
      cliente: { nome: 'João Santos', email: 'joao@email.com' },
      dataPedido: '2024-01-14T14:20:00Z',
      valorTotal: 89.90,
      status: 'CONFIRMADO'
    },
    {
      id: 3,
      cliente: { nome: 'Ana Costa', email: 'ana@email.com' },
      dataPedido: '2024-01-13T09:15:00Z',
      valorTotal: 200.50,
      status: 'ENTREGUE'
    },
    {
      id: 4,
      cliente: { nome: 'Pedro Lima', email: 'pedro@email.com' },
      dataPedido: '2024-01-12T16:45:00Z',
      valorTotal: 75.25,
      status: 'PENDENTE'
    },
    {
      id: 5,
      cliente: { nome: 'Carla Oliveira', email: 'carla@email.com' },
      dataPedido: '2024-01-11T11:30:00Z',
      valorTotal: 300.00,
      status: 'CONFIRMADO'
    }
  ],
  8: [ // João Silva
    {
      id: 6,
      cliente: { nome: 'Roberto Silva', email: 'roberto@email.com' },
      dataPedido: '2024-01-10T13:20:00Z',
      valorTotal: 120.75,
      status: 'PENDENTE'
    },
    {
      id: 7,
      cliente: { nome: 'Fernanda Lima', email: 'fernanda@email.com' },
      dataPedido: '2024-01-09T15:30:00Z',
      valorTotal: 95.50,
      status: 'CONFIRMADO'
    }
  ]
};

// Funções de autenticação
export const authenticateUser = (email: string, password: string) => {
  const user = users.find(u => u.email === email && u.senha === password);
  
  if (!user) {
    return { success: false, message: 'Credenciais inválidas' };
  }

  const { senha, ...userWithoutPassword } = user;
  const token = `token_${user.id}_${Date.now()}`;

  return {
    success: true,
    user: userWithoutPassword,
    token: token
  };
};

// Funções de dados
export const getStats = (userId: number) => {
  return statsData[userId as keyof typeof statsData] || {
    totalPedidos: 0,
    pedidosPendentes: 0,
    pedidosConfirmados: 0,
    totalVendas: 0
  };
};

export const getPedidos = (userId: number) => {
  return pedidosData[userId as keyof typeof pedidosData] || [];
};