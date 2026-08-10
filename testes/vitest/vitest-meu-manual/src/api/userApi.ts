import axios from 'axios';
import type { User, UserFormValues } from '../types/user';

export const API_URL = 'http://localhost:8080/api/user';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

export async function listUsers(): Promise<User[]> {
  const response = await api.get<User[]>('');

  if (!Array.isArray(response.data)) {
    return [];
  }

  return response.data;
}

export async function getUser(id: number): Promise<User> {
  const response = await api.get<User>(`/${id}`);
  return response.data;
}

export async function createUser(values: UserFormValues): Promise<User> {
  const response = await api.post<User>('', values);
  return response.data;
}

export async function updateUser(id: number, values: UserFormValues): Promise<User> {
  const response = await api.put<User>(`/${id}`, { id, ...values });
  return response.data;
}

export async function deleteUser(id: number): Promise<void> {
  await api.delete(`/${id}`);
}
