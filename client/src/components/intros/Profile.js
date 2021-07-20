import storesVetsFinderIcon from '../../images/finder.svg'; // dammy img, to be replaced

export default function Profile() {
  return (
    <div className="intro">
      <div className="wrapper">
        <div className="intro__body">
          <div className="intro__text">
            <h2>Pet Profile</h2>
            <p>
              Let's complete your furry friend detail here. Depending on the age and breed, we will advise the best
              individual plan for nutrition and walking activities.
            </p>
            <button className="btn-contained--intro">Go premium</button>
          </div>
        </div>

        <div className="intro__img">
          <img src={storesVetsFinderIcon} alt="member portrait" />
        </div>
      </div>
    </div>
  );
}
