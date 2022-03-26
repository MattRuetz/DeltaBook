import { useState } from 'react';
import { useCollection } from '../../hooks/useCollection';
import { useAuthContext } from '../../hooks/useAuthContext';
import ProjectList from '../../components/ProjectList';
import './Dashboard.css';
import ProjectFilter from './ProjectFilter';

function Dashboard() {
    const { documents, error } = useCollection('projects');
    const [currentFilter, setCurrentFilter] = useState('all');

    const { user } = useAuthContext();

    const changeFilter = (newTag) => {
        setCurrentFilter(newTag);
    };

    const filtered = documents
        ? documents.filter(
              (proj) =>
                  proj.category === currentFilter ||
                  currentFilter === 'all' ||
                  (currentFilter === 'mine' &&
                      user.displayName === proj.createdBy.displayName)
          )
        : [];

    return (
        <div>
            <div className="page-title">
                <h2>Projects</h2>
            </div>

            <hr />
            {error && <p className="error">{error}</p>}
            {documents && (
                <ProjectFilter
                    currentFilter={currentFilter}
                    changeFilter={changeFilter}
                />
            )}
            {documents && <ProjectList projects={filtered} />}
        </div>
    );
}

export default Dashboard;
