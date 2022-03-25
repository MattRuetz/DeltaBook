import './Spinner.css';

// This is a bit dumb, but I like it

function Spinner() {
    return (
        <div className="spinner-container">
            <div className="triangle"></div>
            <div className="triangle"></div>
            <div className="triangle"></div>
            <div className="triangle"></div>
            <div className="triangle"></div>
            <div className="triangle"></div>
        </div>
    );
}

export default Spinner;
