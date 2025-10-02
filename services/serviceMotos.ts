import axios from 'axios';

// --- Configuração da API ---
const BASE_URL = 'http://192.168.0.107:5287/api'; 

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- Interfaces ---
export interface Moto {
  motoId: number;
  placa: string;
  modelo: string;
  ano: number;
  patioId: number;
}

export interface PaginacaoResponse<T> {
  items: T[];
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
}

export interface MotoInput {
  placa: string;
  modelo: string;
  ano: number;
  patioId: number;
}

// --- Rotas de motos ---
export const getMotosByPatio = (patioId: number, pageNumber = 1, pageSize = 50) =>
  api
    .get<PaginacaoResponse<Moto>>(`/patios/${patioId}/motos?pageNumber=${pageNumber}&pageSize=${pageSize}`)
    .then(res => res.data.items);

export const getMotoById = (id: number) =>
  api.get<Moto>(`/motos/${id}).then(res => res.data`);

export const getMotoByPlaca = (placa: string) =>
  api.get<Moto>(`/motos/placa/${placa}).then(res => res.data`);

export const addMoto = (moto: MotoInput) =>
  api.post<Moto>('/motos', moto).then(res => res.data);

export const moveMotoToPatio = (id: number, novoPatioId: number) =>
    api.put(`/motos/${id}/patio`, { patioId: novoPatioId })
       .then(res => res.data);
       
export const deleteMoto = (id: number) =>
  api.delete<void>(`/motos/${id}`);