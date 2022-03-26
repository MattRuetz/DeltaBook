import React from 'react';
import { useParams } from 'react-router-dom';
import { useDocument } from '../../hooks/useDocument';
// Local components
import ProjectSummary from './ProjectSummary';
import ProjectComments from './ProjectComments';
// Components
import Spinner from '../../components/Spinner';
// style
import './Project.css';

function Project() {
    const { id } = useParams();
    const { error, document } = useDocument('projects', id);

    // Error reading doc
    if (error) return <div className="error">{error}</div>;

    // Not yet fetched doc
    if (!document) return <Spinner />;

    //
    return (
        <div className="project-details">
            <ProjectSummary project={document} />
            <ProjectComments project={document} />
        </div>
    );
}

export default Project;
