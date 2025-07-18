// components/NavBar.tsx

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="p-4 bg-gray-100 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">
        MyApp
      </Link>

      <div className="flex gap-4 items-center">
        {user ? (
          <>
            <Link href="/dashboard" className="text-blue-600">
              Dashboard
            </Link>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="text-blue-600">
              Login
            </Link>
            <Link href="/signup" className="text-blue-600">
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}


