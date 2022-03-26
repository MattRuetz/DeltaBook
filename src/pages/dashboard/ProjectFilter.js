import filterlist from '../../data/ProjectTags.json';

function ProjectFilter({ currentFilter, changeFilter }) {
    const handleClick = (newTag) => {
        changeFilter(newTag);
    };

    return (
        <div className="project-filter">
            <nav>
                <p>Filter:</p>
                {filterlist.map((tag, index) => (
                    <div key={tag} className="tag-and-divider">
                        <button
                            className={currentFilter === tag ? 'active' : ''}
                            onClick={() => handleClick(tag)}
                        >
                            {tag}
                        </button>
                    </div>
                ))}
            </nav>
        </div>
    );
}

export default ProjectFilter;
