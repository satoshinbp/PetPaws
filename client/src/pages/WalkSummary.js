import WalkMonthChart from '../components/charts/WalkMonthChart';
import WalkWeekChart from '../components/charts/WalkWeekChart';
import WalkDayChart from '../components/charts/WalkDayChart';
import WalkForm from '../components/forms/Walk';

export default function WalkSummary({ petProfile, allActivities, setAllActivities }) {
  return (
    <div>
      <h2>Activity Tracker</h2>
      <WalkForm petProfile={petProfile} setAllActivities={setAllActivities} />
      <WalkDayChart allActivities={allActivities} />
      <WalkWeekChart allActivities={allActivities} />
      <WalkMonthChart allActivities={allActivities} />
    </div>
  );
}
