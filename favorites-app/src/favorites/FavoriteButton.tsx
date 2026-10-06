import { useFavoritesStore, type Product } from './favoritesStore';

interface FavoriteButtonProps {
  product: Product;
}

export function FavoriteButton({ product }: FavoriteButtonProps) {
  const isFavorite = useFavoritesStore((s) =>
    s.favorites.some((p) => p.id === product.id)
  );
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);

  return (
    <button onClick={() => toggleFavorite(product)}>
      {isFavorite ? '❤️ Bỏ yêu thích' : '🤍 Yêu thích'}
    </button>
  );
}