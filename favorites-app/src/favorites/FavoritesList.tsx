import { useFavoritesStore } from './favoritesStore';

export function FavoritesList() {
  const favorites = useFavoritesStore((s) => s.favorites);
  const removeFavorite = useFavoritesStore((s) => s.removeFavorite);

  if (favorites.length === 0) return <p>Chưa có sản phẩm yêu thích.</p>;

  return (
    <ul>
      {favorites.map((p) => (
        <li key={p.id}>
          {p.name} - {p.price.toLocaleString('vi-VN')}đ{' '}
          <button onClick={() => removeFavorite(p.id)}>Xóa</button>
        </li>
      ))}
    </ul>
  );
}