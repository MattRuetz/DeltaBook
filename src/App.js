import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
// Components
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
// Pages
import Dashboard from './pages/dashboard/Dashboard';
import Create from './pages/create/Create';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Project from './pages/project/Project';

function App() {
    return (
        <div className="App">
            <Router>
                <Sidebar />
                <div className="container">
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/create" element={<Create />} />
                        <Route path="/projects/:id" element={<Project />} />
                        <Route path="*" element={<h1>404: Not Found!</h1>} />
                    </Routes>
                </div>
            </Router>
        </div>
    );
}

export default App;
