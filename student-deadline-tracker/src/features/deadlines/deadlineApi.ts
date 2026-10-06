import type { Assignment } from './types';
import { addDays } from '../../utils/date';

export interface ApiResponse<T> {
  data: T;
  status: number;
}
function fakeRequest<T>(data: T, delay = 800): Promise<ApiResponse<T>> {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data, status: 200 }), delay);
  });
}

function buildSampleData(): Assignment[] {
  return [
    { id: 's1', subject: 'Lập trình Web nâng cao', title: 'Bài tập Redux Toolkit', dueDate: addDays(3), priority: 'high', completed: false },
    { id: 's2', subject: 'Cơ sở dữ liệu', title: 'Báo cáo chuẩn hoá dữ liệu', dueDate: addDays(-2), priority: 'medium', completed: false },
    { id: 's3', subject: 'Mạng máy tính', title: 'Bài lab cấu hình VLAN', dueDate: addDays(7), priority: 'low', completed: false },
    { id: 's4', subject: 'Cấu trúc dữ liệu', title: 'Cài đặt cây AVL', dueDate: addDays(-5), priority: 'high', completed: true },
    { id: 's5', subject: 'Tiếng Anh chuyên ngành', title: 'Thuyết trình nhóm', dueDate: addDays(1), priority: 'medium', completed: false },
  ];
}

export async function getSampleAssignments(): Promise<Assignment[]> {
  const res = await fakeRequest(buildSampleData());
  return res.data;
}