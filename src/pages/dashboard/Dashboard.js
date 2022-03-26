import { useCollection } from '../../hooks/useCollection';
import ProjectList from '../../components/ProjectList';
import './Dashboard.css';

function Dashboard() {
    const { documents, error } = useCollection('projects');

    return (
        <div>
            <div className="page-title">
                <h2>Projects</h2>
            </div>

            <hr />
            {error && <p className="error">{error}</p>}
            {documents && <ProjectList projects={documents} />}
        </div>
    );
}

export default Dashboard;
