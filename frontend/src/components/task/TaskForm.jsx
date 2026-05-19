import { useMemo, useState } from 'react';
import useCreateTask from '../../hooks/useCreateTask';
import Button from '../ui/Button';
import Card from '../ui/Card';
import FormField from '../ui/FormField';
import StatusDropdown from './StatusDropdown';

function TaskForm({ onSubmit }) {
  const [task, setTask] = useState({ title: '', description: '', status: 'Planned' });
  const { createTask, isCreating } = useCreateTask();

  const isDisabled = useMemo(
    () => task.title.trim().length < 3 || task.description.trim().length < 6,
    [task.title, task.description]
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTask((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const submitFn = onSubmit || createTask;

    await submitFn({
      title: task.title.trim(),
      description: task.description.trim(),
      status: task.status,
    });

    setTask({ title: '', description: '', status: 'Planned' });
  };

  return (
    <Card title="Add new task" className="space-y-6">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <FormField
          name="title"
          label="Task title"
          value={task.title}
          onChange={handleChange}
          placeholder="Write a short title"
        />
        <FormField
          name="description"
          label="Description"
          value={task.description}
          onChange={handleChange}
          placeholder="Describe the task briefly"
        />
        <StatusDropdown
          id="task-status"
          name="status"
          label="Status"
          value={task.status}
          onChange={handleChange}
        />
        <Button type="submit" disabled={isDisabled || isCreating} className="w-full">
          {isCreating ? 'Saving...' : 'Create task'}
        </Button>
      </form>
    </Card>
  );
}

export default TaskForm;
