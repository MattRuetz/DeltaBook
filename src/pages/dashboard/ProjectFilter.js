const filterlist = '../../data/ProjectTags.json';

function ProjectFilter() {
    const handleClick = (newTag) => {
        console.log(newTag);
    };

    return (
        <div className="project-filter">
            <nav>
                {filterlist.map((tag) => (
                    <button key={tag} onClick={() => handleClick(tag)}>
                        {tag}
                    </button>
                ))}
            </nav>
        </div>
    );
}

export default ProjectFilter;
