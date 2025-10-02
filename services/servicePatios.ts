import api from './api';

export interface Patio {
  patioId: number;
  nomePatio: string;
  filialId: number;
  nomeFilial: string;
}

export const getPatiosByFilial = async (filialId: number): Promise<Patio[]> => {
  const res = await api.get(`/filiais/${filialId}/patios`);
  return res.data.items;
};



