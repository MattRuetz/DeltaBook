import React from 'react';
import { useParams } from 'react-router-dom';
import { useDocument } from '../../hooks/useDocument';

// Components
import Spinner from '../../components/Spinner';

function Project() {
    const { id } = useParams();
    const { error, document } = useDocument('projects', id);

    // Error reading doc
    if (error) return <div className="error">{error}</div>;

    // Not yet fetched doc
    if (!document) return <Spinner />;

    //
    return <div className="project-details">
        <h1>{document.name}</h1>
    </div>
}

export default Project;
