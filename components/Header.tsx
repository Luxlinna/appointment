import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Header = () => {
  const { role, logout } = useAuth();
  const router = useRouter();

  const handleLogin = () => {
    router.push('/login');  // Redirect to login page using router
  };

  return (
    <header className="bg-blue-600 text-white py-4 shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Dental Clinic</h1>
        <nav className="space-x-4">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/about" className="hover:underline">About</Link>
          <Link href="/about" className="hover:underline">About</Link>
          <Link href="/services" className="hover:underline">Services</Link>
          {/* <Link href="/appointment" className="hover:underline">Appointment</Link> */}
          <Link href="/contact" className="hover:underline">Contact</Link>

          {/* Show login/logout buttons based on role */}
          {role ? (
            <button onClick={logout} className="hover:underline text-white">
              Logout
            </button>
          ) : (
            <button onClick={handleLogin} className="hover:underline text-white">
              Login
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;

















// import Link from 'next/link';

// const Header: React.FC = () => (
//     <header className="flex justify-between items-center bg-gray-800 text-white py-4 shadow-md px-12">
//         <h1 className='text-xl font-bold'>Dentist Logo</h1>
//         <nav className="flex items-center space-x-4">
//             <ul className='flex space-x-4'>
//                 <li><Link href="/">Home</Link></li>
//                 <li><Link href="/about">About</Link></li>
//                 <li><Link href="/services">Service</Link></li>
//                 <li><Link href="/appointment">Appointment</Link></li>
//                 <li><Link href="/contact">Contact</Link></li>
//             </ul>
//         </nav>
//     </header>
// );

// export default Header;