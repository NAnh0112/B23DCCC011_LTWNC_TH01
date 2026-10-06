export const PRIORITIES = ['low', 'medium', 'high'] as const;
export type Priority = (typeof PRIORITIES)[number];

export const FILTERS = ['all', 'pending', 'overdue', 'completed'] as const;
export type FilterType = (typeof FILTERS)[number];

export type LoadStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface Assignment {
  id: string;
  subject: string;
  title: string;
  dueDate: string; 
  priority: Priority;
  completed: boolean;
}

export type NewAssignment = Omit<Assignment, 'id' | 'completed'>;

export const PRIORITY_LABEL: Record<Priority, string> = {
  low: 'Thấp',
  medium: 'Trung bình',
  high: 'Cao',
};

export const FILTER_LABEL: Record<FilterType, string> = {
  all: 'Tất cả',
  pending: 'Chưa hoàn thành',
  overdue: 'Quá hạn',
  completed: 'Đã hoàn thành',
};

export function isPriority(value: unknown): value is Priority {
  return typeof value === 'string' && (PRIORITIES as readonly string[]).includes(value);
}