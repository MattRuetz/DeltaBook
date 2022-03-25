import './Avatar.css';

function Avatar({ src, userStatus }) {
    return (
        <div className={`avatar ${userStatus}`}>
            <img src={src} alt={`avatar - ${userStatus}`}  />
        </div> 
    );
}

export default Avatar;
