import axios from 'axios';

// --- Configuração da API ---
const BASE_URL = 'http://192.168.0.107:5287/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- Tipagens ---
export interface Filial {
  filialId: number;
  nomeFilial: string;
  cidade: string;
}

interface FiliaisResponse {
  items: Filial[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

// --- Função para buscar filiais ---
export async function getFiliais(): Promise<Filial[]> {
  try {
    const response = await api.get<FiliaisResponse>('/Filiais');
    return response.data.items;
  } catch (error) {
    console.error('Erro ao buscar filiais:', error);
    return [];
  }
}
