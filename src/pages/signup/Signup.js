import { useState } from 'react';
import { useSignup } from '../../hooks/useSignup';
import './Signup.css';

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [uploadError, setUploadError] = useState(null);

    const { signup, isPending, error } = useSignup();

    const handleSubmit = (e) => {
        e.preventDefault();
        signup(displayName, email, password, thumbnail);
    };

    const handleFileChange = (e) => {
        setThumbnail(null);
        let selected = e.target.files[0];

        if (!selected) {
            setUploadError('Please select a file.');
            return;
        }
        if (!selected.type.includes('image')) {
            setUploadError('Must select an image.');
            return;
        }
        if (selected.size > 2000000) {
            //2 million = 2MB
            setUploadError('Image size must be less than 2MB');
            return;
        }
        setUploadError(null);
        setThumbnail(selected);
        console.log('thumbnail changed');
    };

    return (
        <form action="" className="auth-form" onSubmit={handleSubmit}>
            <h2>Sign up</h2>
            <label>
                <span>Email:</span>
                <input
                    required
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
            </label>
            <label>
                <span>Password:</span>
                <input
                    required
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </label>
            <label>
                <span>Display Name:</span>
                <input
                    required
                    type="text"
                    onChange={(e) => setDisplayName(e.target.value)}
                    value={displayName}
                />
            </label>
            <label>
                <span>Upload Avatar:</span>
                <input required type="file" onChange={handleFileChange} />
                {uploadError && <div className="error">{uploadError}</div>}
            </label>

            {!isPending && <button className="btn">Create Account</button>}
            {isPending && (
                <button className="btn" disabled>
                    Loading...
                </button>
            )}
            {error && <div className="error">{error}</div>}
        </form>
    );
}

export default Signup;
