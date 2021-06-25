import { Link } from 'react-router-dom';
import MealBar from '../components/charts/MealBar';


  

const MealSummary = () => {

    

    return (
        <div>
            <h2>Meal Tracker</h2>
            <Link to="/createmeal">Add Meal</Link>
            <MealBar />
            
        </div>
        
    )
}

export default MealSummary