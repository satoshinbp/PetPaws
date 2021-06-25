import { useState } from 'react';
import WalkForm from '../components/forms/WalkForm';

export const CreateWalk = () => {
  const [walks, setWalks] = useState('');
  const addWalk = async (meal) => {
    console.log('clicked Add buttom');
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
      <h2 style={{ border: '1px solid black', borderRadius: '5px', backgroundColor: '#F0F0F0' }}>Create an activity</h2>
      <WalkForm onAdd={addWalk} />
    </div>
  );
};

export default CreateWalk;
