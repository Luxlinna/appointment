// commponents/Rooms.tsx

import React, { useEffect, useState } from "react";
import { fetchRooms } from "../utils/firestoreUtils";

interface Room {
  id: string;
  name: string;
  capacity: number;
}

const Rooms: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchRooms();
        setRooms(data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Available Rooms</h2>
      <ul>
        {rooms.map((room) => (
          <li key={room.id}>
            {room.name} - Capacity: {room.capacity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Rooms;
// This component fetches and displays a list of rooms from Firestore.




