import api from './api';
import { AuthForm, LoginResponse } from '@/types/auth';

export async function login(data: AuthForm) {
  const res = await api.post<LoginResponse>('/auth/login', data);
  return res.data;
}

export async function register(data: AuthForm) {
  const res = await api.post('/auth/register', data);
  return res.data;
}