import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

const WalkForm = ({ onAdd }) => {
    const [name, setName] = useState(''); 
    const [date, setDate] = useState(''); // only date
    const [start, setStart] = useState(''); // option "wet" "dry" "treat"
    const [end, setEnd] = useState(''); // time of meal
    const [distance, setDistance] = useState('');
 



    useEffect(() => {
        Date.prototype.toDateInputValue = (function() {
            var local = new Date(this);
            local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
            return local.toJSON().slice(0,10);
        });
    
        const today = new Date().toDateInputValue();
        setDate(today)
          
        /*return () => {
            cleanup
        }*/
    }, [])


    const onSubmit = (e) => {
        e.preventDefault()

        console.log(`${name} ${date} ${start} ${end} ${distance} `)


        onAdd({name, date, start, end, distance})

        setName('')
        setDate('')
        setStart('')
        setEnd('')
        setDistance('')
 
    }

    return (
        <div>
            <h2>Add New Activity</h2>
            <form className="meal-form" onSubmit={onSubmit}>
                <div className='form-control'>
                    {/* MEAL NAME */}
                    <label htmlFor="name">Name: </label>
                    <input type='text'
                           name='name'
                           id='activity-name'
                           value={name}
                           required
                           onChange={(e) => setName(e.target.value)}
                    />   
                    <br /><br />
                    {/* DATE */}
                    <label htmlFor="date">Date: </label>
                    <input type='date' 
                           id='date' 
                           name="activity-date" 
                           defaultValue={date}
                           required
                           nChange={(e) => setDate(e.target.value)}
                    />
                    <br /><br />
                    {/* START TIME */}
                    <label htmlFor="time">Start Time: </label>
                    <input type="time" 
                           id="start-time" 
                           name="start-time"
                           value={start} 
                           required
                           onChange={(e) => setStart(e.target.value)}
                    />
                    <br /><br />
                    {/* END TIME */}
                    <label htmlFor="time">End Time: </label>
                    <input type="time" 
                           id="end-time" 
                           name="end-time"
                           value={end} 
                           required
                           onChange={(e) => setEnd(e.target.value)}
                    />
                    <br /><br />
                    {/* Distance */}
                    <label htmlFor="amount">Distance(m): </label>
                    <input type="number" 
                           id="amount"
                           value={distance}
                           min="0" 
                           max="50000" 
                           onChange={(e) => setDistance(e.target.value)}
                    /> 
                    <br /><br />
                    {/* SUBMIT */}
                    <input type="submit" value="Add" />
                    <br /><br />
                </div>              
            </form>
            <Link to="/">Go Back</Link>
        </div>
    )
}

export default WalkForm
