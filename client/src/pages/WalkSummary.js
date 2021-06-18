import { Link } from 'react-router-dom';

const WalkSummary = () => {
    return (
        <div>
            <h2 style={{border: '1px solid black', borderRadius: '5px', backgroundColor: '#F0F0F0'}}>Walk Tracker</h2>
            <h3>Activity Summary</h3>
            <div>
                <Link to="/createwalk">Add Activity</Link>
            </div>
        </div>
    )
}

export default WalkSummary