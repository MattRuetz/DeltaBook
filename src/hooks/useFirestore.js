// Hook to ADD OR REMOVE DOCUMENTS FROM FBASE COLLECTIONS
import { db } from '../firebase/config';
import { useReducer, useEffect, useState } from 'react';
import {
    collection,
    addDoc,
    deleteDoc,
    doc,
    Timestamp,
    setDoc,
} from 'firebase/firestore';

let initState = {
    document: null,
    isPending: false,
    error: null,
    success: null,
};

const firestoreReducer = (state, action) => {
    switch (action.type) {
        case 'IS_PENDING':
            return {
                ...state,
                isPending: true,
                document: null,
                success: false,
                error: null,
            };
        case 'ADDED_DOCUMENT':
            return {
                // Dont need ...state because setting every state
                isPending: false,
                document: action.payload,
                success: true,
                error: null,
            };

        case 'DELETED_DOCUMENT':
            return {
                isPending: false,
                document: null,
                success: true,
                error: null,
            };

        case 'UPDATED_DOCUMENT':
            return {
                isPending: false,
                document: action.payload,
                success: true,
                error: null,
            };

        case 'ERROR':
            return {
                isPending: false,
                document: null,
                success: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const useFirestore = (collectionName) => {
    const [unmounted, setUnmounted] = useState(false);
    const [response, dispatch] = useReducer(firestoreReducer, initState);
    // collection reference
    const ref = collection(db, collectionName);

    // only dispatch if component is still mounted
    const dispatchIfMounted = (action) => {
        if (!unmounted) {
            dispatch(action);
        }
    };

    // Add document, input is an object, which gets turned into a DB doc
    const addDocument = async (doc) => {
        dispatch({ type: 'IS_PENDING' });

        try {
            doc.createdAt = Timestamp.fromDate(new Date());

            const addedDocument = await addDoc(ref, {
                ...doc,
            });

            dispatchIfMounted({
                type: 'ADDED_DOCUMENT',
                payload: addedDocument,
                error: null,
            });
        } catch (err) {
            console.log(err);
            dispatchIfMounted({
                type: 'ERROR',
                payload: 'Unable to delete document',
            });
        }
    };

    // delete a doc, ref'd by id
    const deleteDocument = async (id) => {
        dispatch({ type: 'IS_PENDING' });

        try {
            const deletedDocument = await deleteDoc(doc(ref, id));

            dispatchIfMounted({
                type: 'DELETED_DOCUMENT',
                payload: deletedDocument,
                error: null,
            });
        } catch (err) {
            console.log(err);
            dispatchIfMounted({
                type: 'ERROR',
                payload: 'unable to delete',
            });
        }
    };

    // Update document
    const updateDocument = async (id, updates) => {
        dispatch({ type: 'IS_PENDING' });

        try {
            const updatedDocument = await setDoc(doc(ref, id), updates);

            dispatchIfMounted({
                type: 'UPDATED_DOCUMENT',
                payload: updateDocument,
            });

            return updatedDocument;
        } catch (err) {
            console.log(err);
            dispatchIfMounted({
                type: 'ERROR',
                payload: 'unable to update document',
            });
        }
    };

    useEffect(() => {
        return () => setUnmounted(true);
    }, []);

    return { addDocument, deleteDocument, updateDocument, response };
};
