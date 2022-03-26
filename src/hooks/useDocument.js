import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { doc, collection, onSnapshot } from 'firebase/firestore';

// Realtime listener for a specific document
export const useDocument = (collectionName, docID) => {
    const [document, setDocument] = useState(null);
    const [error, setError] = useState(null);

    // Realtime doc date
    useEffect(() => {
        const docRef = doc(collection(db, collectionName), docID);

        // Take snapshot of this dcoument in firestore
        const unsub = onSnapshot(
            docRef,
            (snap) => {
                if (snap.data()) {
                    setDocument({ ...snap.data(), id: snap.id });
                    setError(null);
                } else {
                    setError('This document does not exist!');
                }
            },
            (err) => {
                setError('Unable to fetch project data');
                console.log(err);
            }
        );
        // cleanup if unmounted before return
        return () => unsub();
    }, [collectionName, docID]);

    return { document, error };
};
