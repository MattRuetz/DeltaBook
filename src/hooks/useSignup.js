import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, projectAuth } from '../firebase/config';
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
    const [unmounted, setUnmounted] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);

    const { dispatch } = useAuthContext();

    const nav = useNavigate();

    const signup = async (displayName, email, password) => {
        setError(null);
        setIsPending(true);

        try {
            const auth = projectAuth;
            // console.log(email, password, displayName);
            const res = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            if (!res) {
                throw new Error('Could not complete signup.');
            }

            // Add displayName prop to AUTH (not firestore)
            await updateProfile(res.user, { displayName });

            // Add a new document in collection "users" in firestore
            await setDoc(doc(db, 'users', res.user.uid), {
                displayName,
                email,
            });

            // Dispatch LOGIN to log in new user
            dispatch({ type: 'LOGIN', payload: res.user });

            if (!unmounted) {
                setIsPending(false);
                setError(null);
            }

            nav('/');
        } catch (err) {
            if (!unmounted) {
                console.log(err.message);
                setError(err.message);
                setIsPending(false);
            }
        }
    };

    useEffect(() => {
        return () => {
            // Return this cleanup function incase unmounted
            setUnmounted(true);
        };
    }, []);

    return { signup, isPending, error };
};
