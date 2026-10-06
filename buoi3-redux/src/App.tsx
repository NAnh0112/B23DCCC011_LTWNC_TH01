import { ProductList } from './features/products/ProductList';
import { CartSummary } from './features/cart/CartSummary';

export default function App() {
  return (
    <div
      style={{
        maxWidth: 960,
        margin: '24px auto',
        display: 'flex',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        borderRadius: 8,
        overflow: 'hidden',
        fontFamily: 'sans-serif',
      }}
    >
      <ProductList />
      <CartSummary />
    </div>
  );
}