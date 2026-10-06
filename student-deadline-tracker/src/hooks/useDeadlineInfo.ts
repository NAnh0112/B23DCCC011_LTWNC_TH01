import { useMemo } from 'react';
import { daysUntil } from '../utils/date';

export type Tone = 'done' | 'overdue' | 'soon' | 'ok';

export function useDeadlineInfo(dueDate: string, completed: boolean): { label: string; tone: Tone } {
  return useMemo(() => {
    const d = daysUntil(dueDate);
    const label = d < 0 ? `Quá hạn ${-d} ngày` : `Còn ${d} ngày`;
    if (completed) return { label, tone: 'done' };
    if (d < 0) return { label, tone: 'overdue' };
    return { label, tone: d <= 2 ? 'soon' : 'ok' };
  }, [dueDate, completed]);
}