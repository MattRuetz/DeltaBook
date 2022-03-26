import { useEffect, useRef, useState } from 'react';
import { useCollection } from '../../hooks/useCollection';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFirestore } from '../../hooks/useFirestore';
import Select from 'react-select/creatable';
import { useNavigate } from 'react-router-dom';
import { Timestamp } from 'firebase/firestore';
import styles from './SelectStyles';
import terminalAnim from '../../assets/terminal-anim.svg';
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

    const nav = useNavigate();

    const { addDocument, response } = useFirestore('projects');

    // doc(db, 'projects', newUser.uid);

    useEffect(() => {
        if (documents) {
            const options = documents.map((user) => ({
                value: user,
                label: user.displayName,
            }));
            setUsers(options);
        }
    }, [documents]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError(null);

        !category && setFormError('Select a project category');
        assignedUsers.length < 1 &&
            setFormError('Please select at least 1 Team Member');

        const createdBy = {
            displayName: user.displayName,
            photoURL: user.photoURL,
            id: user.uid,
        };

        const assignedUsersList = assignedUsers.map((chosenUser) => {
            return {
                displayName: chosenUser.value.displayName,
                photoURL: chosenUser.value.photoURL,
                id: chosenUser.value.id,
            };
        });

        const project = {
            name,
            details,
            category: category.value,
            dueDate: Timestamp.fromDate(new Date(dueDate)),
            comments: [],
            createdBy,
            assignedUsersList,
        };

        await addDocument(project);
        !response.error && nav('/');
    };

    const nameRef = useRef('name-input');

    return (
        <div className="create-form">
            <div className="page-title">
                {name.length === 0 && (
                    <img src={terminalAnim} alt="Waiting for title..." />
                )}
                {name.length > 0 && (
                    <h3>
                        {name.substring(0, 100)}
                        {name.length >= 100 && ' ...'}
                    </h3>
                )}
            </div>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Project Name:</span>
                    <input
                        required
                        id="name-input"
                        className="new-proj-input"
                        type="text"
                        value={name}
                        ref={nameRef}
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
