import { useEffect, useState } from 'react';
import { useCollection } from '../../hooks/useCollection';
import Select from 'react-select/creatable';
import styles from './SelectStyles';
import './Create.css';

const categories = [
    { value: 'development', label: 'Development' },
    { value: 'sales', label: 'Sales' },
    { value: 'design', label: 'Design' },
    { value: 'marketing', label: 'Marketing' },
];

function Create() {
    const [name, setName] = useState('');
    const [details, setDetails] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [category, setCategory] = useState('');
    const [assignedUsers, setAssignedUsers] = useState([]);

    const { documents } = useCollection('users');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (documents) {
            const options = documents.map((user) => ({
                value: user,
                label: user.displayName,
            }));
            setUsers(options);
        }
    }, [documents]);

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
                        className="new-proj-input"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <label>
                    <span>Project Details:</span>
                    <textarea
                        required
                        className="new-proj-input"
                        type="text"
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                    />
                </label>
                <label>
                    <span>Due Date:</span>
                    <input
                        required
                        className="new-proj-input"
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                </label>
                <label>
                    <span>Category:</span>
                    <Select
                        styles={styles}
                        options={categories}
                        onChange={(option) => setCategory(option)}
                    />
                </label>
                <label>
                    <span>Select Team Members:</span>
                    <Select
                        isMulti
                        closeMenuOnSelect={false}
                        styles={styles}
                        options={users}
                        onChange={(option) => setAssignedUsers(option)}
                    />
                </label>
                <button className="btn">Create</button>
            </form>
        </div>
    );
}

export default Create;
