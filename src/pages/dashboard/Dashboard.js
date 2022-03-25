import { useCollection } from '../../hooks/useCollection';
import ProjectList from '../../components/ProjectList';
import './Dashboard.css';

function Dashboard() {
    const { documents, error } = useCollection('projects');

    return (
        <div>
            <h2 className="page-title">Projects</h2>
            <hr />
            {error && <p className="error">{error}</p>}
            {documents && <ProjectList projects={documents} />}
        </div>
    );
}

export default Dashboard;
