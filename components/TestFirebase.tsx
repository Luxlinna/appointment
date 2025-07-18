import { useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const FirestoreTest = () => {
    useEffect(() => {
        const db = getFirestore();

        const testFirestoreConnection = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "test-collection"));
                querySnapshot.forEach((doc) => {
                    console.log(doc.id, " => ", doc.data());
                });
            } catch (error) {
                console.error("Firestor error fetching documents: ", error);
            }
        };

        testFirestoreConnection();
    }, []);

    return <div>Check the console for Firestore test data.</div>;
};

export default FirestoreTest;