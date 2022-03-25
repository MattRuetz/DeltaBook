import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
// Components
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Spinner from './components/Spinner';
import Sidebar from './components/Sidebar';
// Pages
import Dashboard from './pages/dashboard/Dashboard';
import Create from './pages/create/Create';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Project from './pages/project/Project';
// Hooks
import { useAuthContext } from './hooks/useAuthContext';

function App() {
    // const { authIsReady } = useAuthContext();
    const authIsReady = false; //To test spinner

    return (
        <div className="App">
            <Router>
                <Sidebar />
                <div className="container">
                    <Navbar />
                    {authIsReady && (
                        <Routes>
                            <Route path="/" element={<PrivateRoute />}>
                                <Route path="/" element={<Dashboard />} />
                            </Route>
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/login" element={<Login />} />

                            <Route path="/" element={<PrivateRoute />}>
                                <Route path="/create" element={<Create />} />
                            </Route>
                            <Route path="/" element={<PrivateRoute />}>
                                <Route
                                    path="/projects/:id"
                                    element={<Project />}
                                />
                            </Route>
                            <Route
                                path="*"
                                element={<h1>404: Not Found!</h1>}
                            />
                        </Routes>
                    )}
                    {!authIsReady && <Spinner />}
                </div>
            </Router>
        </div>
    );
}

export default App;
