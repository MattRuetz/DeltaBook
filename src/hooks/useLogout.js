import { useState, useEffect } from 'react';
import { projectAuth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useLogout = () => {
    const [unmounted, setUnmounted] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();

    const logout = async () => {
        setError(null);
        setIsPending(true);

        try {
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
