import axios from 'axios';
import type { Item } from '../types/Item';

const API_URL = 'http://localhost:5005/items';

export const getItems = () => axios.get<Item[]>(API_URL);
export const addItem = (name: string) => axios.post<Item>(API_URL, { name });
export const updateItem = (id: string, name: string) => axios.put<Item>(`${API_URL}/${id}`, { name });
export const deleteItem = (id: string) => axios.delete(`${API_URL}/${id}`);
