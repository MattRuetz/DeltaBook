import { useEffect, useState, useRef } from 'react';
import {
    collection,
    onSnapshot,
    where,
    query,
    orderBy,
} from 'firebase/firestore';
import { db } from '../firebase/config';

export const useCollection = (collectionName, _query, _orderBy) => {
    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);

    // useRef for query so the useEffect does not run infinite loop
    // (ref's don't get relocated in memory every render, so wont trigger the useEffect)
    const queryRef = useRef(_query).current;

    const orderByRef = useRef(_orderBy).current;

    useEffect(() => {
        let ref = collection(db, collectionName);

        if (queryRef) {
            ref = query(ref, where(...queryRef));
        }
        if (orderByRef) {
            ref = query(ref, orderBy(...orderByRef));
        }

        // onSnapshot is a REAL-TIME LISTENER, which returns
        // its own unsubscribe function, in case comp. unmounts
        const unsub = onSnapshot(
            ref,
            (snap) => {
                let results = [];
                snap.docs.forEach((doc) => {
                    results.push({ ...doc.data(), id: doc.id });
                });

                // update states
                setDocuments(results);
                setError(null);
            },
            (err) => {
                setError('Unable to fetch data');
                console.log(err);
            }
        );

        // unsub when component unmounts
        return () => unsub();
    }, [collectionName, queryRef, orderByRef]);

    return { documents, error };
};
