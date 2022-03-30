import ProjectListItem from './ProjectListItem';
import './ProjectList.css';

function ProjectList({ projects }) {
    return (
        <div className="project-list">
            {projects.length === 0 && (
                <p>Nothing here yet - start a project!</p>
            )}
            {projects &&
                projects.map((each) => <ProjectListItem project={each} />)}
        </div>
    );
}

export default ProjectList;
