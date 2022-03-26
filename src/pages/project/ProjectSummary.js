// Hooks
import { useFirestore } from '../../hooks/useFirestore';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
// Components
import Avatar from '../../components/Avatar';

function ProjectSummary({ project }) {
    const { deleteDocument } = useFirestore('projects');
    const { user } = useAuthContext();
    const nav = useNavigate();

    const handleClick = (e) => {
        deleteDocument(project.id);
        nav('/');
    };

    return (
        <div>
            <div className="project-summary">
                <h2 className="page-title">{project.name}</h2>
                <p className="created-by">
                    By:{' '}
                    <span>
                        {project.createdBy.displayName}
                        <Avatar
                            className="avatar"
                            src={project.createdBy.photoURL}
                        />
                    </span>
                </p>
                <p className="due-date">
                    Due:
                    <span>
                        {'  '}
                        {project.dueDate.toDate().toDateString()}
                    </span>
                </p>
                <p className="details">{project.details}</p>
                <h4>Dev Team: </h4>
                <div className="assigned-users">
                    {project.assignedUsersList.map((user) => (
                        <div key={user.id}>
                            <Avatar src={user.photoURL} />
                        </div>
                    ))}
                </div>
            </div>
            {user.uid === project.createdBy.id && (
                <button className="btn" onClick={handleClick}>
                    Complete ✓
                </button>
            )}
        </div>
    );
}

export default ProjectSummary;
