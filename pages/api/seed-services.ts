// pages/api/seed-services.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../lib/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

const serviceList = [
  {
    title: "General Dentistry",
    description: "Comprehensive dental care for all ages.",
    image: "/images/services/general-dentistry.jpg",
    doctorName: "Dr. Jane Smith",
    availableDates: ["2024-05-01 09:00", "2024-05-03 11:00"],
    price: "$100",
    gallery: [
      "/images/services/general1.jpg",
      "/images/services/general2.jpg"
    ]
  },
  {
    title: "Cosmetic Dentistry",
    description: "Enhancing your smile's appearance.",
    image: "/images/services/cosmetic-dentistry.jpg",
    doctorName: "Dr. Alex Lee",
    availableDates: ["2024-05-04 10:00", "2024-05-06 13:00"],
    price: "$200",
    gallery: [
      "/images/services/cosmetic1.jpg",
      "/images/services/cosmetic2.jpg"
    ]
  },
  {
    title: "Orthodontics",
    description: "Braces and aligners for a straighter smile.",
    image: "/images/services/orthodontics.jpg",
    doctorName: "Dr. Laura Green",
    availableDates: ["2024-05-07 15:00", "2024-05-09 12:00"],
    price: "$1500",
    gallery: [
      "/images/services/ortho1.jpg",
      "/images/services/ortho2.jpg"
    ]
  },
  {
    title: "Pediatric Dentistry",
    description: "Gentle dental care for children.",
    image: "/images/services/pediatric-dentistry.jpg",
    doctorName: "Dr. Mark Chen",
    availableDates: ["2024-05-02 09:00", "2024-05-05 10:00"],
    price: "$120",
    gallery: [
      "/images/services/pediatric1.jpg",
      "/images/services/pediatric2.jpg"
    ]
  },
  {
    title: "Oral Surgery",
    description: "Surgical procedures for complex dental issues.",
    image: "/images/services/oral-surgery.jpg",
    doctorName: "Dr. Emily Brown",
    availableDates: ["2024-05-08 14:00", "2024-05-10 11:00"],
    price: "$800",
    gallery: [
      "/images/services/oral1.jpg",
      "/images/services/oral2.jpg"
    ]
  },
  {
    title: "Periodontics",
    description: "Gum disease prevention and treatment.",
    image: "/images/services/periodontics.jpg",
    doctorName: "Dr. David Nguyen",
    availableDates: ["2024-05-03 16:00", "2024-05-06 09:00"],
    price: "$250",
    gallery: [
      "/images/services/periodontics1.jpg",
      "/images/services/periodontics2.jpg"
    ]
  },
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const servicesRef = collection(db, 'services');

    for (const service of serviceList) {
      await addDoc(servicesRef, service);
    }

    return res.status(200).json({ message: 'Services added successfully' });
  } catch (error) {
    console.error("Error seeding services:", error);
    return res.status(500).json({ message: 'Failed to add services' });
  }
}

