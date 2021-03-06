import React, { useState } from 'react';
import WalkMonthChart from '../components/charts/WalkMonthChart';
import WalkWeekChart from '../components/charts/WalkWeekChart';
import WalkDayChart from '../components/charts/WalkDayChart';
import WalkForm from '../components/forms/Walk';
import WalkSummaryIntro from '../components/intros/WalkSummary';
import defaultPetImg from '../images/pet-profile-default.jpg';
import Header from '../components/Header';

export default function WalkSummary({ petProfile, allActivities, setAllActivities }) {
  const [showForm, setShowForm] = useState(false);
  const [showWeekGraph, setShowWeekGraph] = useState(true); // if true, week graph appears, if false, month graph appears

  return (
    <>
      <Header />
      <WalkSummaryIntro />

      <div className="body">
        <div className="bg-primary-meat">
          <div className="wrapper">
            <h2>Activity Summary</h2>

            <div className="bg-primary-light walk-summary">
              <div class="basic-info">
                <div className="pet-image-name-wrapper">
                  {petProfile.image ? (
                    <img className="pet-image" src={petProfile.image} />
                  ) : (
                    <img className="pet-image" src={defaultPetImg} />
                  )}
                  {petProfile.name ? (
                    <p className="pet-name">{petProfile.name}</p>
                  ) : (
                    <p>Please create your pet profile</p>
                  )}
                </div>

                {petProfile.name && (
                  <button className="add-button btn-contained" onClick={() => setShowForm(true)}>
                    Add Activity
                  </button>
                )}
              </div>
              <div className="graphs">
                <h3 className="graph-title">Activity Charts</h3>
                <div className="week-month-toggle">
                  <button
                    onClick={() => setShowWeekGraph(true)}
                    className={showWeekGraph ? 'btn-underlined' : 'button-no-accent'}
                  >
                    Week
                  </button>
                  <button
                    onClick={() => setShowWeekGraph(false)}
                    className={!showWeekGraph ? 'btn-underlined' : 'button-no-accent'}
                  >
                    Month
                  </button>
                </div>

                {showWeekGraph ? (
                  <WalkWeekChart allActivities={allActivities} />
                ) : (
                  <WalkMonthChart allActivities={allActivities} />
                )}

                <div className={`overlay ${showForm ? 'isActive' : ''}`}>
                  {showForm && (
                    <WalkForm
                      petProfile={petProfile}
                      setAllActivities={setAllActivities}
                      closeForm={() => setShowForm(false)}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <WalkDayChart allActivities={allActivities} />
      </div>
    </>
  );
}
