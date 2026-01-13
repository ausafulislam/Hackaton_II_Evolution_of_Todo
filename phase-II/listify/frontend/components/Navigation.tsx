import Link from 'next/link';

const Navigation = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">Todo App</div>
        <div>
          <Link href="/" className="mr-4 hover:underline">Home</Link>
          <Link href="/todo" className="hover:underline">Todo List</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;