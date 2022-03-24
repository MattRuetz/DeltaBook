import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
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
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/signup">Sign up</Link>
                </li>
                <li>
                    <button className="btn">Logout</button>
                </li>
            </ul>
        </div>
    );
}

export default Navbar;
