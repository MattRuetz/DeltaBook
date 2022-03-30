import { Link } from 'react-router-dom';
import Avatar from '../components/Avatar';
import './ProjectList.css';

function ProjectListItem({ project }) {
    return (
        <Link to={`/projects/${project.id}`} key={project.id}>
            <h4>{project.name}</h4>
            <p>Due: {project.dueDate.toDate().toDateString()}</p>
            <div className="category-label">
                <p>{project.category}</p>
            </div>
            <div className="details">
                <p>{project.details.substring(0, 200) + '...'}</p>
            </div>
            <hr />
            <div className="assigned-to">
                <ul>
                    {project.assignedUsersList.map((user) => (
                        <li key={user.photoURL} className="avatar">
                            <Avatar src={user.photoURL} />
                        </li>
                    ))}
                </ul>
            </div>
        </Link>
    );
}

export default ProjectListItem;
