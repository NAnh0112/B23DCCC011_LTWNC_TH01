import type { Assignment } from '../features/deadlines/types';

const MS_PER_DAY = 86_400_000;

export function toISODate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function addDays(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return toISODate(d);
}

export function parseISODate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function daysUntil(iso: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.round((parseISODate(iso).getTime() - today.getTime()) / MS_PER_DAY);
}

export function isOverdue(a: Pick<Assignment, 'dueDate' | 'completed'>): boolean {
  return !a.completed && daysUntil(a.dueDate) < 0;
}

export function formatDate(iso: string): string {
  return iso.split('-').reverse().join('/');
}