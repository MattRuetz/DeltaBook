import { useState } from 'react';
import './Create.css';
function Create() {
    const [name, setName] = useState('');
    const [details, setDetails] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [category, setCategory] = useState('');
    const [assignedUsers, setAssignedUsers] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name, details, dueDate);
    };

    return (
        <div className="create-form">
            <h2 className="page-title">New Project</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Project Name:</span>
                    <input
                        required
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <label>
                    <span>Project Details:</span>
                    <textarea
                        required
                        type="text"
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                    />
                </label>
                <label>
                    <span>Due Date:</span>
                    <input
                        required
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                </label>
                <label>
                    <span>Category:</span>
                    {/* Category select */}
                </label>
                <label>
                    <span>Select Team Members:</span>
                    {/* user select */}
                </label>
                <button className="btn">Create</button>
            </form>
        </div>
    );
}

export default Create;
