import { useEffect, useState } from 'react';
import { useCollection } from '../../hooks/useCollection';
import { useAuthContext } from '../../hooks/useAuthContext';
import Select from 'react-select/creatable';
// import { timestamp } from '../../firebase/config';
// import { fromDate } from 'firebase/firestore/Timestamp';
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
    const [formError, setFormError] = useState(null);

    const { documents } = useCollection('users');
    const [users, setUsers] = useState([]);

    const { user } = useAuthContext();

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
        setFormError(null);

        !category && setFormError('Select a project category');
        assignedUsers.length < 1 &&
            setFormError('Please select at least 1 Team Member');
    };

    const createdBy = {
        displayName: user.displayName,
        photoURL: user.photoURL,
        id: user.id,
    };

    const assignedUsersList = assignedUsers.map((chosenUser) => {
        return {
            displayName: chosenUser.value.displayName,
            photoURL: chosenUser.value.photoURL,
            id: chosenUser.value.uid,
        };
    });

    const project = {
        name,
        details,
        category: category.value,
        dueDate: fromDate(new Date(dueDate)),
        comments: [],
        createdBy,
        assignedUsersList,
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
                {formError && <p className="error">{formError}</p>}
            </form>
        </div>
    );
}

export default Create;
