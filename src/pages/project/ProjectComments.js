import { useState } from 'react';
import { uuid } from 'uuidv4';
import { Timestamp } from 'firebase/firestore';
import { useFirestore } from '../../hooks/useFirestore';
import { useAuthContext } from '../../hooks/useAuthContext';
// Components
import Avatar from '../../components/Avatar';

export default function ProjectComments({ project }) {
    const [newComment, setNewComment] = useState('');
    const { user } = useAuthContext();
    const { updateDocument, response } = useFirestore('projects');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const commentToAdd = {
            displayName: user.displayName,
            photoURL: user.photoURL,
            content: newComment,
            createdAt: Timestamp.fromDate(new Date()),
            id: uuid(), //generate random id for comment
        };
        console.log(commentToAdd);

        await updateDocument(project.id, {
            ...project,
            comments: [...project.comments, commentToAdd],
        });

        !response.error && setNewComment('');
    };

    return (
        <div className="project-comments">
            <h4>Project Comments:</h4>
            <ul>
                {project.comments.length > 0 &&
                    project.comments.map((comment) => (
                        <li key={comment.id}>
                            <div className="comment-author">
                                <Avatar src={comment.photoURL} />
                                <p>{comment.displayName}</p>
                            </div>
                            <div className="comment-date">
                                <p>[DATE]</p>
                            </div>
                            <div className="comment-content">
                                <p>{comment.content}</p>
                            </div>
                        </li>
                    ))}
            </ul>
            <form onSubmit={handleSubmit} className="add-comment">
                <label>
                    <span>New comment:</span>
                    <textarea
                        required
                        onChange={(e) => setNewComment(e.target.value)}
                        value={newComment}
                    ></textarea>
                </label>
                <button className="btn">Add Comment</button>
            </form>
        </div>
    );
}
