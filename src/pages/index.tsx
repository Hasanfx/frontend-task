import { useEffect, useState } from 'react';
import TaskCard from '../components/TaskCard';
import { Task } from '@/types/task';
import Navbar from '../components/Navbar'; // Import Navbar component

const HomePage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [activeTab, setActiveTab] = useState<'PENDING' | 'COMPLETED'>('PENDING');

  // Fetch tasks from your backend API
  const fetchTasks = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks`);
    const data = await res.json();
    setTasks(data);
  };

  // Handle tab change
  const handleTabChange = (tab: 'PENDING' | 'COMPLETED') => {
    setActiveTab(tab);
  };

  // Filter tasks based on the selected tab
  useEffect(() => {
    if (activeTab === 'PENDING') {
      setFilteredTasks(tasks.filter((task) => task.status !== 'COMPLETED'));
    } else {
      setFilteredTasks(tasks.filter((task) => task.status === 'COMPLETED'));
    }
  }, [activeTab, tasks]);

  // Mark task as COMPLETED (update status)
  const handleComplete = async (id: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'COMPLETED' }),
    });

    if (res.ok) {
      fetchTasks(); // Re-fetch tasks after updating
    }
  };

  // Handle task deletion
  const handleDelete = async (id: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      fetchTasks(); // Re-fetch tasks after deletion
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar /> {/* Include the Navbar component here */}
      <div className="container mx-auto p-6 flex flex-col items-center"> {/* Center tasks content */}
        <div className="mb-6 flex justify-center space-x-4">
          <button
            onClick={() => handleTabChange('PENDING')}
            className={` px-4 py-2 rounded ${activeTab === 'PENDING' ? 'bg-indigo-600  text-white '  :  'text-blue-600 bg-gray-200'}`}
          >
            PENDING Tasks
          </button>
          <button
            onClick={() => handleTabChange('COMPLETED')}
            className={` px-4 py-2 rounded ${activeTab === 'COMPLETED' ? 'bg-indigo-600  text-white '  :  'text-blue-600 bg-gray-200'}`}
          >
            Completed Tasks
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6 justify-center w-full">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={handleDelete}
              onComplete={handleComplete} // Pass the onComplete handler
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default HomePage;
