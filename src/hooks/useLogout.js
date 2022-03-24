import { useState, useEffect } from 'react';
import { projectAuth, db } from '../firebase/config';
import { doc, updateDoc } from 'firebase/firestore';
import { useAuthContext } from './useAuthContext';

export const useLogout = () => {
    const [unmounted, setUnmounted] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch, user } = useAuthContext();

    const logout = async () => {
        setError(null);
        setIsPending(true);

        try {
            const { uid } = user;

            await updateDoc(doc(db, 'users', uid), { online: false });

            await projectAuth.signOut();

            dispatch({ type: 'LOGOUT' });

            // update state
            if (!unmounted) {
                setIsPending(false);
                setError(null);
            }
        } catch (err) {
            console.log(err.message);
            setError(err.message);
            setIsPending(false);
        }
    };

    useEffect(() => {
        return () => {
            // Return a cleanup function incase unmounted
            setUnmounted(true);
        };
    }, []);

    return { logout, error, isPending };
};
