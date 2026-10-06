import { FavoriteButton } from './FavoriteButton';
import { FavoritesList } from './FavoritesList';
import type { Product } from './favoritesStore';

const products: Product[] = [
  { id: '1', name: 'Áo thun', price: 150000 },
  { id: '2', name: 'Quần jean', price: 350000 },
  { id: '3', name: 'Giày thể thao', price: 800000 },
];

export function ProductPage() {
  return (
    <div>
      <h2>Sản phẩm</h2>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} - {p.price.toLocaleString('vi-VN')}đ{' '}
            <FavoriteButton product={p} />
          </li>
        ))}
      </ul>
      <h2>Yêu thích</h2>
      <FavoritesList />
    </div>
  );
}