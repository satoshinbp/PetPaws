import catIcon from '../../images/cat.svg'; // to be replaced

export default function Profile() {
  return (
    <div className="intro">
      <div className="wrapper">
        <div>
          <h1 className="intro__title">Pet Profile</h1>
          <p>
            Let's complete your furry friend detail here. Depending on the age and breed, we will advise the best
            individual plan for nutrition and walking activities.
          </p>

          <div className="intro__img-area pc-hidden">
            {/* icon to be replaced */}
            <img src={catIcon} alt="a cat and a dog both sitting" />
          </div>

          <div className="btn-area">
            <button className="btn-contained--intro">Upgrade to Premium</button>
          </div>
        </div>

        <div className="intro__img-area mb-hidden">
          {/* icon to be replaced */}
          <img src={catIcon} alt="a cat and a dog both sitting" />
        </div>
      </div>
    </div>
  );
}
