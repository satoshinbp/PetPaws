import React, { useState } from 'react';
import WalkMonthChart from '../components/charts/WalkMonthChart';
import WalkWeekChart from '../components/charts/WalkWeekChart';
import WalkDayChart from '../components/charts/WalkDayChart';
import WalkForm from '../components/forms/Walk';
import WalkSummaryIntro from '../components/intros/WalkSummary';

export default function WalkSummary({ petProfile, allActivities, setAllActivities }) {
  const [showForm, setShowForm] = useState(false);
  // if yes, week graph appears, if no, month graph appears
  const [showWeekGraph, setShowWeekGraph] = useState(true);
  return (
    <>
      <WalkSummaryIntro />

      <div className="body">
        {/* form toggled by add button */}
        <div className={`modal ${showForm ? 'isActive overlay' : ''}`}>
          {showForm && (
            <WalkForm
              petProfile={petProfile}
              setAllActivities={setAllActivities}
              closeForm={() => setShowForm(false)}
            />
          )}
        </div>
        <div className="walk-week-month-graphs-wrapper">
          <div className="wrapper">
            <div class="basic-info">
              <h3>ACTIVITY SUMMARY</h3>
              <div className="pet-image-name-wrapper">
                {/* if there is no pet img uploaded, use default img*/}
                {petProfile.image ? (
                  <image className="pet-image" src={petProfile.image} />
                ) : (
                  <p className="pet-image">default image</p>
                )}
                {petProfile.name ? (
                  <p className="pet-name">{petProfile.name}</p>
                ) : (
                  <p>Please create your pet profile</p>
                )}
              </div>
              {/* if there is no pet pet pofile, warn to create profile*/}
              {petProfile.name && (
                <button className="add-button btn-contained" onClick={() => setShowForm(true)}>
                  Add Activity
                </button>
              )}
            </div>
            <div className="graphs">
              <h3 className="graph-title">weekly/monthly charts</h3>
              <div className="week-month-toggle">
                <div className="button-background btn-toggle-tab">
                  <button
                    onClick={() => setShowWeekGraph(true)}
                    className={showWeekGraph ? 'btn-toggle-tab btn-darkened' : 'button-no-accent'}
                  >
                    Week
                  </button>
                  <button
                    onClick={() => setShowWeekGraph(false)}
                    className={!showWeekGraph ? 'btn-toggle-tab btn-darkened' : 'button-no-accent'}
                  >
                    Month
                  </button>
                </div>
              </div>
              {showWeekGraph ? (
                <WalkWeekChart allActivities={allActivities} />
              ) : (
                <WalkMonthChart allActivities={allActivities} />
              )}
            </div>
          </div>
        </div>
        <div className="walk-day-graph-wrapper">
          <div className="wrapper">
            <WalkDayChart allActivities={allActivities} />
          </div>
        </div>
      </div>
    </>
  );
}
