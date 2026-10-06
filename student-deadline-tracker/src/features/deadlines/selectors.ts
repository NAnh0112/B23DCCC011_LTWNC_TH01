import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { isOverdue } from '../../utils/date';

const selectItems = (s: RootState) => s.deadlines.items;
export const selectFilter = (s: RootState) => s.deadlines.filter;
export const selectStatus = (s: RootState) => s.deadlines.status;
export const selectError = (s: RootState) => s.deadlines.error;

export const selectFilteredAssignments = createSelector(
  [selectItems, selectFilter],
  (items, filter) => {
    const filtered = items.filter((a) => {
      switch (filter) {
        case 'pending':
          return !a.completed;
        case 'overdue':
          return isOverdue(a);
        case 'completed':
          return a.completed;
        default:
          return true;
      }
    });
    return [...filtered].sort((a, b) => a.dueDate.localeCompare(b.dueDate));
  }
);