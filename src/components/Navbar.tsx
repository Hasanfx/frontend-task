import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-lg font-bold">Home</Link>
        <Link href="/createtask" className="bg-blue-500 text-white px-4 py-2 rounded">Create Task</Link>
      </div>
    </nav>
  );
};

export default Navbar;
