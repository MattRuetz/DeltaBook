import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
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
                            Delta <span className="logo-img">⟁</span> Book
                        </span>
                    </Link>
                </li>
                {!user && authIsReady ? (
                    <>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/signup">Sign up</Link>
                        </li>
                    </>
                ) : (
                    <li>
                        {!isPending && (
                            <button className="btn" onClick={logout}>
                                Logout
                            </button>
                        )}
                        {isPending && (
                            <button className="btn" disabled>
                                ...
                            </button>
                        )}
                    </li>
                )}
            </ul>
        </div>
    );
}

export default Navbar;
