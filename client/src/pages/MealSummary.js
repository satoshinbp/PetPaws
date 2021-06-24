import { Link } from 'react-router-dom';

const MealSummary = () => {
  return (
    <div>
      <h2 style={{ border: '1px solid black', borderRadius: '5px', backgroundColor: '#F0F0F0' }}>Meal Tracker</h2>
      <Link to="/createmeal">Add Meal</Link>
    </div>
  );
};

export default MealSummary;
