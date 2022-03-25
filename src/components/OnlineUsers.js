import {useCollection} from '../hooks/useCollection'
import {FaUserFriends} from 'react-icons/fa'
import Avatar from './Avatar.js'
import './OnlineUsers.css'


function OnlineUsers() {

    const {error, documents} = useCollection('users')

  return <div className='user-list'>
        <div className='all-users-heading'><FaUserFriends /> <h2>All Users</h2></div> 
        {error && <div className='error'>{error}</div>}
        {documents && documents.map((user) => (
            <div key={user.id} className='user-list-item'>
            <span>{user.displayName.substring(0,15)}{user.displayName.length > 15 && `...`}</span>
            <Avatar src={user.photoURL} userStatus={user.online ? "online" : "offline"}/>
            </div>
        ))}
    </div>
  
}

export default OnlineUsers