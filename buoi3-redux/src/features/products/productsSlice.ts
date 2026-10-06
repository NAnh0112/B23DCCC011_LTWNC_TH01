import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface Product {
  id: string;
  name: string;
  price: number;
}

interface ProductsState {
  items: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null,
};

// Mock API lấy danh sách sản phẩm
export const fetchProducts = createAsyncThunk<Product[], void>(
  'products/fetchAll',
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return [
      { id: 'p1', name: 'Bàn phím cơ AKKO 3087', price: 1250000 },
      { id: 'p2', name: 'Chuột Logitech G102 Lightsync', price: 420000 },
      { id: 'p3', name: 'Tai nghe gaming Kingston HyperX', price: 1790000 },
      { id: 'p4', name: 'Lót chuột cỡ lớn RGB', price: 250000 },
    ];
  }
);

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Lỗi không tải được sản phẩm';
      });
  },
});

export default productsSlice.reducer;