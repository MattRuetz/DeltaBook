import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import Spinner from '../components/Spinner';
import { useAuthContext } from '../hooks/useAuthContext';
import './Navbar.css';

function Navbar() {
    const { logout, isPending } = useLogout();
    const { user, authIsReady } = useAuthContext();

    return (
        <div className="navbar">
            <ul>
                <li className="logo">
                    <Link to="/">
                        <span>
                            <span className="logo-img">⟁</span> Delta Book
                        </span>
                    </Link>
                </li>
                {isPending && !authIsReady && <Spinner />}
                {!user && authIsReady && (
                    <>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/signup">Sign up</Link>
                        </li>
                    </>
                )}
                {user && authIsReady && (
                    <li>
                        <button className="btn logout-btn" onClick={logout}>
                            Logout
                        </button>
                    </li>
                )}
            </ul>
        </div>
    );
}

export default Navbar;
