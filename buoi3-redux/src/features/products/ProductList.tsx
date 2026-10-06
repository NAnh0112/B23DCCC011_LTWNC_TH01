import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchProducts } from './productsSlice';
import { addItem } from '../cart/cartSlice';

export const ProductList = () => {
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((state) => state.products);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  if (status === 'loading') return <div style={{ padding: 20 }}>Đang tải danh sách sản phẩm...</div>;
  if (status === 'failed') return <div style={{ padding: 20, color: 'red' }}>Lỗi: {error}</div>;

  return (
    <div style={{ flex: 1, padding: 16 }}>
      <h2>Danh Sách Sản Phẩm</h2>
      <div style={{ display: 'grid', gap: 12 }}>
        {items.map((product) => (
          <div
            key={product.id}
            style={{
              padding: 12,
              border: '1px solid #e0e0e0',
              borderRadius: 6,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <strong>{product.name}</strong>
              <div style={{ color: '#2e7d32', marginTop: 4 }}>
                {product.price.toLocaleString('vi-VN')} đ
              </div>
            </div>
            <button
              style={{
                padding: '6px 12px',
                backgroundColor: '#1976d2',
                color: '#fff',
                border: 'none',
                borderRadius: 4,
                cursor: 'pointer',
              }}
              onClick={() => dispatch(addItem(product))}
            >
              + Thêm vào giỏ
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};