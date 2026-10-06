import { useState } from 'react';
import type { FormEvent } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { useForm } from '../../hooks/useForm';
import { addAssignment } from './deadlinesSlice';
import { PRIORITIES, PRIORITY_LABEL, isPriority } from './types';

const initialValues = { subject: '', title: '', dueDate: '', priority: 'medium' };

export function DeadlineForm() {
  const dispatch = useAppDispatch();
  const { values, handleChange, reset } = useForm(initialValues);
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = values.subject.trim();
    const title = values.title.trim();
    const priority = values.priority;

    if (!subject || !title || !values.dueDate) {
      setError('Vui lòng nhập đầy đủ môn học, tên bài tập và hạn nộp.');
      return;
    }
    if (!isPriority(priority)) {
      setError('Độ ưu tiên không hợp lệ.');
      return;
    }

    dispatch(addAssignment({ subject, title, dueDate: values.dueDate, priority }));
    reset();
    setError('');
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input name="subject" placeholder="Môn học" value={values.subject} onChange={handleChange} />
      <input name="title" placeholder="Tên bài tập" value={values.title} onChange={handleChange} />
      <input name="dueDate" type="date" value={values.dueDate} onChange={handleChange} />
      <select name="priority" value={values.priority} onChange={handleChange}>
        {PRIORITIES.map((p) => (
          <option key={p} value={p}>
            {PRIORITY_LABEL[p]}
          </option>
        ))}
      </select>
      <button type="submit">Thêm bài tập</button>
      {error && <p className="msg error">{error}</p>}
    </form>
  );
}