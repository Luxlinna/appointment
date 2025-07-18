import React, { ReactNode } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const { user, logout } = useAuth();
  

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 shadow-md">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Dental Clinic</h1>
          <nav className="space-x-4 flex items-center">
            <Link href="/" className="hover:underline">Home</Link>
            <Link href="/about" className="hover:underline">About</Link>
            <Link href="/services" className="hover:underline">Services</Link>
            <Link href="/contact" className="hover:underline">Contact</Link>

            {!user ? (
              <>
                <Link href="/login" className="hover:underline text-white">Login</Link>
                <Link href="/signup" className="hover:underline text-white">Signup</Link>
              </>
            ) : (
              <button onClick={logout} className="hover:underline text-white">
                Logout
              </button>
            )}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-500 text-gray-100 text-center py-4">
        <div className="container mx-auto px-4">
          &copy; {new Date().getFullYear()} Dental Clinic. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;









// import React, { ReactNode } from 'react';
// import Link from 'next/link';
// import { useAuth } from '@/context/AuthContext';

// type LayoutProps = {
//   children: ReactNode;
// };

// const Layout = ({ children }: LayoutProps) => {
//   // const { role, logout } = useAuth();
//   const { user, logout } = useAuth();

//   const handleLogin = () => {
//     window.location.href = '/login';
//   };

//   return (
//     <div className="flex flex-col min-h-screen">
//       {/* Header */}
//       <header className="bg-blue-600 text-white py-4 shadow-md">
//         <div className="container mx-auto px-4 flex justify-between items-center">
//           <h1 className="text-xl font-bold">Dental Clinic</h1>
//           <nav className="space-x-4 flex items-center">
//             <Link href="/" className="hover:underline">Home</Link>
//             <Link href="/about" className="hover:underline">About</Link>
//             <Link href="/services" className="hover:underline">Services</Link>
//             {/* <Link href="/appointment" className="hover:underline">Appointment</Link> */}
//             <Link href="/contact" className="hover:underline">Contact</Link>

//             {/* Auth Links */}
//             {!user ? (
//               <>
//                 <Link href="/login" className="hover:underline text-white">Login</Link>
//                 <Link href="/signup" className="hover:underline text-white">Signup</Link>
//               </>
//             ) : (
//               <button onClick={logout} className="hover:underline text-white">
//                 Logout
//               </button>
//             )}

//             {/* {!role ? (
//               <>
//                 <Link href="/login" className="hover:underline text-white">Login</Link>
//                 <Link href="/signup" className="hover:underline text-white">Signup</Link>
//               </>
//             ) : (
//               <button onClick={logout} className="hover:underline text-white">
//                 Logout
//               </button>
//             )} */}
//           </nav>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="flex-grow">{children}</main>

//       {/* Footer */}
//       <footer className="bg-gray-500 text-gray-100 text-center py-4">
//         <div className="container mx-auto px-4">
//           &copy; {new Date().getFullYear()} Dental Clinic. All rights reserved.
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Layout;

















// // import React, { ReactNode } from 'react';
// // import Link from 'next/link';
// // import { useAuth } from '@/context/AuthContext';  // Import useAuth here

// // type LayoutProps = {
// //   children: ReactNode;
// // };

// // const Layout = ({ children }: LayoutProps) => {
// //   const { role, logout } = useAuth();  // Get role and logout function from context

// //   const handleLogin = () => {
// //     window.location.href = '/login';  // Redirect to login page
// //   };

// //   return (
// //     <div className="flex flex-col min-h-screen">
// //       {/* Header */}
// //       <header className="bg-blue-600 text-white py-4 shadow-md">
// //         <div className="container mx-auto px-4 flex justify-between items-center">
// //           <h1 className="text-xl font-bold">Dental Clinic</h1>
// //           <nav className="space-x-4">
// //             <Link href="/" className="hover:underline">Home</Link>
// //             <Link href="/about" className="hover:underline">About</Link>
// //             <Link href="/services" className="hover:underline">Services</Link>
// //             <Link href="/appointment" className="hover:underline">Appointment</Link>
// //             <Link href="/contact" className="hover:underline">Contact</Link>

// //             {/* Conditionally render Login/Logout */}
// //             {role ? (
// //               <button onClick={logout} className="hover:underline text-white">
// //                 Logout
// //               </button>
// //             ) : (
// //               <button onClick={handleLogin} className="hover:underline text-white">
// //                 Login
// //               </button>
// //             )}
// //           </nav>
// //         </div>
// //       </header>

// //       {/* Main Content */}
// //       <main className="flex-grow">{children}</main>

// //       {/* Footer */}
// //       <footer className="bg-gray-500 text-gray-100 text-center py-4">
// //         <div className="container mx-auto px-4">
// //           &copy; {new Date().getFullYear()} Dental Clinic. All rights reserved.
// //         </div>
// //       </footer>
// //     </div>
// //   );
// // };

// // export default Layout;






