import { withLoading } from '../../hoc/withLoading';
import { DeadlineItem } from './DeadlineItem';
import type { Assignment } from './types';

function DeadlineListBase({ items }: { items: Assignment[] }) {
  if (items.length === 0) return <p className="msg">Không có bài tập nào.</p>;
  return (
    <ul className="list">
      {items.map((a) => (
        <DeadlineItem key={a.id} item={a} />
      ))}
    </ul>
  );
}

export const DeadlineList = withLoading(DeadlineListBase);