// context/AuthContext.tsx

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebaseConfig';
import { useRouter } from 'next/router';

type AuthContextType = {
  user: string | null;
  login: (email: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser?.email ?? null);
    });
    return () => unsubscribe();
  }, []);

  const login = (email: string) => setUser(email);

  const logout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        router.push('/');  // 👈 Redirect to home after logout
      })
      .catch((error) => {
        console.error('Logout failed:', error);
      });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);







// // context/AuthContext.tsx

// import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// import { onAuthStateChanged, signOut } from 'firebase/auth';
// import { auth } from '@/lib/firebaseConfig';

// type AuthContextType = {
//   user: string | null;
//   // role?: string;
//   login: (email: string) => void;
//   logout: () => void;
// };

// const AuthContext = createContext<AuthContextType>({
//   user: null,
//   login: () => {},
//   logout: () => {},
// });

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<string | null>(null);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
//       setUser(firebaseUser?.email ?? null);
//     });
//     return () => unsubscribe();
//   }, []);

//   const login = (email: string) => setUser(email);

//   const logout = () => {
//     signOut(auth)
//       .then(() => setUser(null))
//       .catch((error) => {
//         console.error('Logout failed:', error);
//       });
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
