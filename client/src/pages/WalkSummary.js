import { useState, useEffect } from 'react';
import Axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import WalkWeekChart from '../components/charts/WalkWeekChart';
import WalkDayChart from '../components/charts/WalkDayChart';
import WalkForm from '../components/forms/Walk';

export default function WalkSummary({ petProfile }) {
  const [allActivities, setAllActivities] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const getUid = async () => {
      await Axios.get(`http://localhost:3001/api/activity?pet_id=${petProfile.id}`)
        .then((res) => {
          const fetchedActivities = res.data;
          setAllActivities(fetchedActivities);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getUid();
  }, [petProfile]);

  return (
    <div>
      <h2>Activity Tracker</h2>
      <WalkForm petProfile={petProfile} setAllActivities={setAllActivities} />
      <WalkDayChart allActivities={allActivities} />
      <WalkWeekChart allActivities={allActivities} />
    </div>
  );
}
