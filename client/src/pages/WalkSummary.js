import React, { useState } from 'react';
import WalkMonthChart from '../components/charts/WalkMonthChart';
import WalkWeekChart from '../components/charts/WalkWeekChart';
import WalkDayChart from '../components/charts/WalkDayChart';
import WalkForm from '../components/forms/Walk';
import trackerIcon from '../images/tracker.svg'; // dammy img, to be replaced

export default function WalkSummary({ petProfile, allActivities, setAllActivities }) {
  const [showForm, setShowForm] = useState(false);
  // if yes, week graph appears, if no, month graph appears
  const [showWeekGraph, setShowWeekGraph] = useState(true);
  return (
    <>
      <div className="intro">
        <div className="intro__wrapper">
          <div className="intro__body">
            <div className="intro__text">
              <h2>Activity Tracker</h2>
              <p>
                A nutritious, balanced diet is essential to keeping your dog healthy. We provide a feature that allows
                you to keep track of your pet's meals. Additionally, we offer the ideal nutrition for your pet's weight
                control.
              </p>
            </div>

            <div className="intro__btn">
              <button className="btn-contained-white btn-not-fullwidth">Create free account</button>
            </div>
          </div>

          <div className="intro__img">
            <img src={trackerIcon} alt="member portrait" />
          </div>
        </div>
      </div>
      <div className="body">
        <div className="body__wrapper">
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
                <button className="add-button btn-contained-yellow" onClick={() => setShowForm(true)}>
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
          <div className="walk-day-graph-wrapper">
            <WalkDayChart allActivities={allActivities} />
          </div>
        </div>
      </div>
    </>
  );
}
