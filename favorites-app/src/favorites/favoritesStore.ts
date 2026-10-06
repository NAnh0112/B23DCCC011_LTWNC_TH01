import { create } from 'zustand';

export interface Product {
  id: string;
  name: string;
  price: number;
}

interface FavoritesState {
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
  removeFavorite: (id: string) => void;
}

export const useFavoritesStore = create<FavoritesState>((set) => ({
  favorites: [],
  toggleFavorite: (product) =>
    set((state) => {
      const exists = state.favorites.some((p) => p.id === product.id);
      return {
        favorites: exists
          ? state.favorites.filter((p) => p.id !== product.id)
          : [...state.favorites, product],
      };
    }),
  removeFavorite: (id) =>
    set((state) => ({
      favorites: state.favorites.filter((p) => p.id !== id),
    })),
}));