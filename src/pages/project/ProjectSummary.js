import Avatar from '../../components/Avatar';

function ProjectSummary({ project }) {
    return (
        <div>
            <div className="project-summary">
                <h2 className="page-title">{project.name}</h2>
                <p className="due-date">
                    Due by {project.dueDate.toDate().toDateString()}
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
        </div>
    );
}

export default ProjectSummary;
