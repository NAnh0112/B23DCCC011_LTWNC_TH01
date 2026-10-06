import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectFilter } from './selectors';
import { setFilter } from './deadlinesSlice';
import { FILTERS, FILTER_LABEL } from './types';

export function DeadlineFilter() {
  const dispatch = useAppDispatch();
  const current = useAppSelector(selectFilter);

  return (
    <div className="filters">
      {FILTERS.map((f) => (
        <button
          key={f}
          className={f === current ? 'active' : ''}
          onClick={() => dispatch(setFilter(f))}
        >
          {FILTER_LABEL[f]}
        </button>
      ))}
    </div>
  );
}