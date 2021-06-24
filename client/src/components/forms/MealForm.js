import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

const MealForm = ({ onAdd }) => {
    const [name, setName] = useState(''); 
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
    const [type, setType] = useState('Wet'); // option "wet" "dry" "treat"
    const [time, setTime] = useState(''); // time of meal
    const [amount, setAmount] = useState('');
    const [calorie, setCalorie] = useState('');
    const [note, setNote] = useState('');

    const onSubmit = (e) => {
        e.preventDefault()
        console.log(name + date + type + time + amount + calorie + note)


        onAdd({name, date, type, time, amount, calorie, note})

        setName('')
        setDate('')
        setType('')
        setTime('')
        setAmount('')
        setCalorie('')
        setNote('')
 
    }

    return (
        <div>
            <h2>Add New Meal</h2>
            <form className="meal-form" onSubmit={onSubmit}>
                <div className='form-control'>
                    {/* MEAL NAME */}
                    <label htmlFor="name">Name: </label>
                    <input type='text'
                           name='name'
                           id='meal-name'
                           placeholder='Add a Meal Name'
                           value={name}
                           required
                           onChange={(e) => setName(e.target.value)}
                    />   
                    <br /><br />
                    {/* DATE */}
                    <label htmlFor="date">Date: </label>
                    <input type='date' 
                           id='date' 
                           name="meal-date" 
                           defaultValue={date}
                           required
                           onChange={(e) => setDate(e.target.value)}
                    />
                    <br /><br />
                    {/* TIME */}
                    <label htmlFor="time">Time: </label>
                    <input type="time" 
                           id="time" 
                           name="meal-time"
                           value={time} 
                           required
                           onChange={(e) => setTime(e.target.value)}
                    />
                    <br /><br />
                    {/* MEAL TYPE */}
                    <label htmlFor="type">Meal Type: </label>
                    <select id="type" 
                            name="meal-type" 
                            value={type} 
                            onChange={(e) => setType(e.target.value)} >
                        <option value="Wet">Wet</option>
                        <option value="Dry">Dry</option>
                        <option value="Treat">Treat</option>
                    </select>
                    <br /><br />
                    {/* AMOUNT */}
                    <label htmlFor="amount">Amount(g): </label>
                    <input type="number" 
                           id="amount"
                           value={amount}
                           step="0.1" 
                           min="0" 
                           max="2000" 
                           required
                           onChange={(e) => setAmount(e.target.value)}
                    /> 
                    <br /><br />
                    {/* CALORIE */}
                    <label htmlFor="calorie">Calorie(kcal): </label>
                    <input type="number" 
                           id="calorie"
                           value={calorie}
                           min="0" 
                           max="2000"
                           required
                           onChange={(e) => setCalorie(e.target.value)} 
                    />
                    <br /><br />
                    {/* NOTE(OPTIONAL) */}
                    <label htmlFor="note">Note: </label>
                    <textarea 
                           name='note'
                           id='meal-note'
                           placeholder='Add a Note Here'
                           value={note}
                           onChange={(e) => setNote(e.target.value)}
                    />
                    <br /><br />
                    {/* SUBMIT */}
                    <input type="submit" value="Add" />
                    <br /><br />
                </div>              
            </form>
            <Link to="/">Home</Link>
        </div>
    )
}

export default MealForm