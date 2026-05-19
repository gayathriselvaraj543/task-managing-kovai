import TaskCard from './TaskCard';
import TaskGrid from './TaskGrid';
import useTasks from '../../hooks/useTasks';

function TaskList({ tasks }) {
  const tasksToRender = tasks ?? useTasks().tasks;

  return (
    <TaskGrid>
      {tasksToRender.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </TaskGrid>
  );
}

export default TaskList;
