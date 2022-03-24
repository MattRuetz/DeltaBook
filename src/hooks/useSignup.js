import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, projectAuth, projectStorage } from '../firebase/config';
import { doc, setDoc } from 'firebase/firestore';
import {
    uploadBytesResumable,
    ref,
    uploadBytes,
    getDownloadURL,
} from 'firebase/storage';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
    const [unmounted, setUnmounted] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);

    const { dispatch } = useAuthContext();

    const nav = useNavigate();

    // Store image in firebase
    const storeImage = async (image, user) => {
        return new Promise((resolve, reject) => {
            // create path for image
            const uploadPath = `thumbnails/${user.uid}/${image.name}`;
            const storageRef = ref(projectStorage, uploadPath);

            const uploadTask = uploadBytesResumable(storageRef, image);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Uploading.... ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        default:
                            break;
                    }
                },
                (error) => {
                    reject(error);
                },
                () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    getDownloadURL(uploadTask.snapshot.ref).then(
                        (downloadURL) => {
                            // return image download url on successful upload
                            resolve(downloadURL);
                        }
                    );
                }
            );
        });
    };

    const signup = async (displayName, email, password, thumbnail) => {
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

            if (!res) throw new Error('Could not complete signup.');

            const newUser = res.user;

            // storeImage returns the URL of the newly stored thumbnail
            const imgUrl = await storeImage(thumbnail, newUser);

            // Add displayName prop to AUTH (not firestore)
            await updateProfile(newUser, { displayName, photoURL: imgUrl });

            // Create user doc
            // Add a new document in collection "users" in firestore
            await setDoc(doc(db, 'users', newUser.uid), {
                online: true,
                displayName,
                imgUrl,
            });

            // Dispatch LOGIN to log in new user
            dispatch({ type: 'LOGIN', payload: newUser });

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
