import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      <h2 style={{ border: '1px solid black', borderRadius: '5px', backgroundColor: '#F0F0F0' }}>Dashboard</h2>
      <h3>Nutrition Summary</h3>
      <Link to="/mealsummary">Discover More</Link>
      <br></br>
      <h3>Activity Summary</h3>
      <Link to="/walksummary">Discover More</Link>
    </div>
  );
};

export default Dashboard;
