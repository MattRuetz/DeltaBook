import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import Spinner from './Spinner';

function PrivateRoute() {
    // get UTD states from hook
    const { user, authIsReady } = useAuthContext();

    if (!authIsReady) {
        return <Spinner />;
    }

    return user ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
