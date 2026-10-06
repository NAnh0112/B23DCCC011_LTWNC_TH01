import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { removeItem, updateQuantity } from './cartSlice';

export const CartSummary = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div
      style={{
        flex: 1,
        padding: 16,
        borderLeft: '1px solid #ddd',
        backgroundColor: '#fafafa',
      }}
    >
      <h2>Giỏ Hàng</h2>
      {cartItems.length === 0 ? (
        <p style={{ color: '#777' }}>Giỏ hàng đang trống.</p>
      ) : (
        <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {cartItems.map((item) => (
              <div
                key={item.id}
                style={{
                  padding: 10,
                  backgroundColor: '#fff',
                  border: '1px solid #eee',
                  borderRadius: 4,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <strong>{item.name}</strong>
                  <div style={{ fontSize: 14, color: '#555' }}>
                    {item.price.toLocaleString('vi-VN')} đ
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <button
                    onClick={() =>
                      dispatch(
                        updateQuantity({ id: item.id, quantity: item.quantity - 1 })
                      )
                    }
                  >
                    -
                  </button>
                  <span style={{ minWidth: 20, textAlign: 'center' }}>
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      dispatch(
                        updateQuantity({ id: item.id, quantity: item.quantity + 1 })
                      )
                    }
                  >
                    +
                  </button>
                  <button
                    style={{
                      marginLeft: 8,
                      color: 'red',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                    onClick={() => dispatch(removeItem(item.id))}
                  >
                    Xóa
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 20,
              paddingTop: 12,
              borderTop: '2px solid #ccc',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <strong>Tổng thanh toán:</strong>
            <strong style={{ color: '#d32f2f', fontSize: 18 }}>
              {totalPrice.toLocaleString('vi-VN')} đ
            </strong>
          </div>
        </>
      )}
    </div>
  );
};