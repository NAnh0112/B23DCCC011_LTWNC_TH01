import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { fetchAssignments } from './features/deadlines/deadlinesSlice';
import { selectError, selectFilteredAssignments, selectStatus } from './features/deadlines/selectors';
import { DeadlineForm } from './features/deadlines/DeadlineForm';
import { DeadlineFilter } from './features/deadlines/DeadlineFilter';
import { DeadlineList } from './features/deadlines/DeadlineList';

export default function App() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectFilteredAssignments);
  const status = useAppSelector(selectStatus);
  const error = useAppSelector(selectError);

  useEffect(() => {
    dispatch(fetchAssignments());
  }, [dispatch]);

  return (
    <div className="container">
      <h1>📚 Student Deadline Tracker</h1>
      <DeadlineForm />
      <DeadlineFilter />
      <DeadlineList items={items} status={status} error={error} />
    </div>
  );
}