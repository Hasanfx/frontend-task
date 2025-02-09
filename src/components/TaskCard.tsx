import Link from 'next/link';
import { Task } from '@/types/task';

const priorityColor: { [key: string]: string } = {
  High: 'bg-red-500',
  Medium: 'bg-yellow-500',
  Low: 'bg-green-500',
};

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onComplete: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete, onComplete }) => {
  return (
    <div
      className={`bg-white p-6 rounded-lg shadow-xl w-full max-w-full mx-auto ${
        task.status === 'COMPLETED' ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : ''
      }`}
    >
      <span
        className={`inline-block px-3 py-1 text-sm font-medium text-black rounded-full ${priorityColor[task.priority]} mb-5`}
      >
        {task.priority} Priority
      </span>
      <span
        className={`inline-block px-3 py-1 text-sm font-medium text-black rounded-full bg-blue-300 ml-3`}
      >
        Due Date:{' '}
        {task.dueDate ? new Date(task.dueDate).toLocaleDateString('en-GB') : 'Not Specified'}
      </span>
      <h3 className="font-bold text-2xl text-black truncate">{task.title}</h3>
      <p className="text-lg text-black mt-2 truncate">{task.description}</p>

      <div className="mt-6 flex flex-wrap gap-2 justify-between items-center">
  <Link
    href={`/EditTask/${task.id}`}
    className={`bg-yellow-500 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg text-base sm:text-lg ${
      task.status === 'COMPLETED' ? 'cursor-not-allowed hidden bg-gray-500 text-gray-300' : ''
    } flex-1 sm:flex-none text-center min-w-fit`}
  >
    Edit
  </Link>

  <button
    onClick={() => onDelete(task.id)}
    className={`bg-red-500 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg text-base sm:text-lg ${
      task.status === 'COMPLETED' ? 'cursor-not-allowed hidden bg-gray-500 text-gray-300' : ''
    } flex-1 sm:flex-none text-center min-w-fit`}
    disabled={task.status === 'COMPLETED'}
  >
    Delete
  </button>

  {/* Conditionally render the Complete button */}
  {task.status !== 'COMPLETED' && (
    <button
      onClick={() => onComplete(task.id)}
      className="bg-green-500 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg text-base sm:text-lg flex-1 sm:flex-none text-center min-w-fit"
    >
      Complete
    </button>
  )}
</div>
    </div>
  );
};

export default TaskCard;
