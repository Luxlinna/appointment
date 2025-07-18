// utils/firestoreUtils.ts
import { fetchRooms } from "../utils/firestoreUtils"; // Adjust the import path as necessary
import { db } from "../lib/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

/**
 * Room type definition
 * @typedef {Object} Room
 * @property {string} id - Firestore document ID
 * @property {string} name - Room name
 * @property {number} capacity - Room capacity
 */

/**
 * Fetches all room documents from Firestore
 * @returns {Promise<Room[]>}
 */
export const fetchRooms = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "rooms")); // Make sure 'rooms' matches your Firestore collection
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(), // Spread Firestore document data
    }));
  } catch (error) {
    console.error("Error fetching rooms from Firestore:", error);
    return [];
  }
};




