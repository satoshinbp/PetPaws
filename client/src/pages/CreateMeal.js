import { useState } from 'react';
import MealForm from '../components/forms/MealForm';

export const CreateMeal = () => {
  //const [meals, setMeals] = useState('');
  const addMeal = async (meal) => {
    console.log('clicked Submit Button');
    /* // when connect with database
        const res = await fetch('http://localhost:5000/meals', {
            method: 'POST',
            headers: {
                'Content-type' : 'application/json',
            },
            body: JSON.stringify(meal),
        })
    
        const data = await res.json()
    
        setMeals([...meals, data])
        */
  };

  return (
    <div>
      <h2 style={{ border: '1px solid black', borderRadius: '5px', backgroundColor: '#F0F0F0' }}>Add a Meal</h2>
      <MealForm onAdd={addMeal} />
    </div>
  );
};

export default CreateMeal;
