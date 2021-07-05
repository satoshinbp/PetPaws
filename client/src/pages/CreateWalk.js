import { useState } from 'react';
import WalkForm from '../components/forms/Walk';

export default function CreateWalk() {
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
      <h2>Create an activity</h2>
      <WalkForm onAdd={addWalk} />
    </div>
  );
}
