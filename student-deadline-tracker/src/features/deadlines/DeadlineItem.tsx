import { useAppDispatch } from '../../app/hooks';
import { useDeadlineInfo } from '../../hooks/useDeadlineInfo';
import { formatDate } from '../../utils/date';
import { removeAssignment, toggleAssignment } from './deadlinesSlice';
import { PRIORITY_LABEL } from './types';
import type { Assignment } from './types';

export function DeadlineItem({ item }: { item: Assignment }) {
  const dispatch = useAppDispatch();
  const { label, tone } = useDeadlineInfo(item.dueDate, item.completed);

  return (
    <li className={`item ${item.completed ? 'done' : ''}`}>
      <input
        type="checkbox"
        checked={item.completed}
        onChange={() => dispatch(toggleAssignment(item.id))}
      />
      <div className="info">
        <span className="subject">{item.subject}</span>
        <strong className="title">{item.title}</strong>
        <small>Hạn nộp: {formatDate(item.dueDate)}</small>
      </div>
      <span className={`badge ${item.priority}`}>{PRIORITY_LABEL[item.priority]}</span>
      <span className={`due ${tone}`}>{label}</span>
      <button className="del" onClick={() => dispatch(removeAssignment(item.id))}>
        Xoá
      </button>
    </li>
  );
}