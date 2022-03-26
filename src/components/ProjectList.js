import { Link } from 'react-router-dom';
import Avatar from '../components/Avatar';
import './ProjectList.css';

function ProjectList({ projects }) {
    return (
        <div className="project-list">
            {projects.length === 0 && (
                <p>Nothing here yet - start a project!</p>
            )}
            {projects &&
                projects.map((each) => (
                    <Link to={`/projects/${each.id}`} key={each.id}>
                        <h4>{each.name}</h4>
                        <p>Due by {each.dueDate.toDate().toDateString()}</p>
                        <div className="assigned-to">
                            <ul>
                                {each.assignedUsersList.map((user) => (
                                    <li key={user.photoURL} className="avatar">
                                        <Avatar src={user.photoURL} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Link>
                ))}
        </div>
    );
}

export default ProjectList;
