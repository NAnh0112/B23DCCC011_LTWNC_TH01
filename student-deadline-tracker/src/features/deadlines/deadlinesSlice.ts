import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { getSampleAssignments } from './deadlineApi';
import type { Assignment, FilterType, LoadStatus, NewAssignment } from './types';

interface DeadlinesState {
  items: Assignment[];
  filter: FilterType;
  status: LoadStatus;
  error?: string;
}

const initialState: DeadlinesState = {
  items: [],
  filter: 'all',
  status: 'idle',
};

export const fetchAssignments = createAsyncThunk<Assignment[], void>(
  'deadlines/fetchAll',
  async () => await getSampleAssignments()
);

const deadlinesSlice = createSlice({
  name: 'deadlines',
  initialState,
  reducers: {
    addAssignment: {
      reducer(state, action: PayloadAction<Assignment>) {
        state.items.unshift(action.payload);
      },
      prepare(data: NewAssignment) {
        return {
          payload: { ...data, id: crypto.randomUUID(), completed: false } as Assignment,
        };
      },
    },
    toggleAssignment(state, action: PayloadAction<string>) {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) item.completed = !item.completed;
    },
    removeAssignment(state, action: PayloadAction<string>) {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    setFilter(state, action: PayloadAction<FilterType>) {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssignments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAssignments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchAssignments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addAssignment, toggleAssignment, removeAssignment, setFilter } =
  deadlinesSlice.actions;
export default deadlinesSlice.reducer;