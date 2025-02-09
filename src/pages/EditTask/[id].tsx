import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';

const EditTask = () => {
  const [task, setTask] = useState<any>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [dueDate, setDueDate] = useState<string | null>('');
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const fetchTask = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${id}`);
        const data = await res.json();
        setTask(data);
        setTitle(data.title);
        setDescription(data.description);
        setPriority(data.priority);
        setDueDate(data.dueDate);
      };
      fetchTask();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, priority, dueDate }),
      });

      if (res.ok) {
        router.push('/');
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  if (!task) return <div>Loading...</div>;

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-semibold text-indigo-600 mb-6">Edit Task</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task Title"
            className="w-full p-4 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Task Description"
            className="w-full p-4 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
          />
          
          {/* Priority Dropdown */}
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full p-4 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
          >
            <option value="" disabled>Select Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          {/* Due Date field */}
          <input
            type="date"
            value={dueDate || ''}
            onChange={(e) => setDueDate(e.target.value || null)} // Set dueDate to null if empty
            className="w-full p-4 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
          />
          
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTask;
