import { useState, useEffect } from 'react';
import Axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import WalkMonthChart from '../components/charts/WalkMonthChart';
import WalkWeekChart from '../components/charts/WalkWeekChart';
import WalkDayChart from '../components/charts/WalkDayChart';
import WalkForm from '../components/forms/Walk';

const WalkSummary = () => {
  const [allActivities, setAllActivities] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    // fix this part later
    const getUid = async () => {
      const uid = currentUser.uid;
      await Axios.get('http://localhost:3001/api/activity')
        .then((response) => {
          let userData = [];
          response.data.filter((walk) => walk.uid === uid).forEach((walk) => userData.push(walk));
          setAllActivities(userData);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getUid();
  }, []);

  return (
    <div>
      <h2>Activity Tracker</h2>
      <WalkMonthChart allActivities={allActivities} />
      <WalkForm />
      <WalkDayChart allActivities={allActivities} />
      <WalkWeekChart allActivities={allActivities} />
    </div>
  );
};

export default WalkSummary;
