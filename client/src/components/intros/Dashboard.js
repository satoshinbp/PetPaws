import catIcon from '../../images/cat-and-meal.svg'; // to be replaced

export default function Dashboard() {
  return (
    <div className="intro">
      <div className="wrapper">
        <div>
          <h1 className="intro__title">Dashboard</h1>
          <p>
            Let's check the last week's summary here. You can review your pet's meal and activity habits, and notice
            small changes in your furry friend.
          </p>

          <div className="intro__img-area pc-hidden">
            <img src={catIcon} alt="cat stiting besides cat food" />
          </div>

          <div className="btn-area">
            <button className="btn-contained--intro">Upgrade to Premium</button>
          </div>
        </div>

        <div className="intro__img-area mb-hidden">
          {/* to be replaced */}
          <img src={catIcon} alt="a blue cat and a purple cat both sitting" />
        </div>
      </div>
    </div>
  );
}
