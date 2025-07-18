// pages/index.tsx
import Head from 'next/head';
import HeroSection from '../components/HeroSection';
import Services from '../components/Services';
import Doctors from '../components/Doctors';
import Testimonials from '../components/Testimonials';
import ContactForm from '../components/ContactForm';
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const { user } = useAuth();

  // Default: public homepage
  return (
    <>
      <Head>
        <title>Dental Clinic</title>
      </Head>
      <HeroSection />
      <Services />
      <Doctors />
      <Testimonials />
      <ContactForm />
    </>
  );
}
