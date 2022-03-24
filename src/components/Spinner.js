import './Spinner.css';

// This is a bit dumb, but I like it

function Spinner() {
    return (
        <div className="spinner-container">
            <div className="alpha-triangle"></div>
            <div className="beta-triangle"></div>
            <div className="charlie-triangle"></div>
            <div className="delta-triangle"></div>
            <div className="echo-triangle"></div>
            <div className="foxtrot-triangle"></div>
        </div>
    );
}

export default Spinner;
