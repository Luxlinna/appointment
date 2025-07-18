// pages/_app.tsx

import { Toaster } from "react-hot-toast";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@components/Layout";
import { AuthProvider } from "@/context/AuthContext";


export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
        <AuthProvider>
          <Layout>
            <Toaster position="bottom-center" />
            <Component {...pageProps} />
          </Layout>
        </AuthProvider>
    </>
  );
}
