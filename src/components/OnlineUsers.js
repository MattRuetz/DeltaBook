import { useEffect, useState } from 'react';
import { useCollection } from '../hooks/useCollection';
import { FaUserFriends } from 'react-icons/fa';
import Avatar from './Avatar.js';
import './OnlineUsers.css';

function OnlineUsers() {
    const { error, documents } = useCollection('users');
    const [onlineList, setOnlineList] = useState([]);
    const [offlineList, setOfflineList] = useState([]);

    useEffect(() => {
        setOnlineList([]);
        setOfflineList([]);

        if (documents && !error) {
            documents.forEach((user) => {
                if (user.online === true) {
                    setOnlineList((prev) => prev.concat(user));
                }
                if (!user.online) {
                    setOfflineList((prev) => prev.concat(user));
                }
            });
        }
    }, [error, documents]);

    return (
        <div className="user-list">
            <div className="all-users-heading">
                <FaUserFriends /> <h2>All Users</h2>
            </div>
            {error && <div className="error">{error}</div>}
            {/* online users list */}
            {onlineList.length > 0 && (
                <div className="sub-heading online">
                    <h3>
                        Online
                        <span>
                            {onlineList.length}{' '}
                            {onlineList.length > 1 ? 'people' : 'person'}
                        </span>
                    </h3>
                </div>
            )}
            {onlineList.length > 0 &&
                onlineList.map((user) => (
                    <div key={user.id} className="online user-list-item">
                        <span>
                            {user.displayName.substring(0, 15)}
                            {user.displayName.length > 15 && `...`}
                        </span>
                        <Avatar src={user.photoURL} userStatus={'online'} />
                    </div>
                ))}

            {/* Offline users list */}
            {offlineList.length === 0 && (
                <span className="all-online-message">Everyone is online!</span>
            )}
            {offlineList.length > 0 && (
                <div className="sub-heading offline">
                    <h3>
                        Offline
                        <span>
                            {offlineList.length}{' '}
                            {offlineList.length > 1 ? 'people' : 'person'}
                        </span>
                    </h3>
                </div>
            )}
            {offlineList.length > 0 &&
                offlineList.map((user) => (
                    <div key={user.id} className="offline user-list-item">
                        <span>
                            {user.displayName.substring(0, 15)}
                            {user.displayName.length > 15 && `...`}
                        </span>
                        <Avatar src={user.photoURL} userStatus={'offline'} />
                    </div>
                ))}
        </div>
    );
}

export default OnlineUsers;
