import storesVetsFinderIcon from '../../images/finder.svg';

export default function Finder() {
  return (
    <div className="intro">
      <div className="wrapper">
        <div className="intro__body">
          <div className="intro__text">
            <h2>Finding Pet Stores / Vets</h2>
            <p>
              Try the best nutrition plan for your furry friend, monitor their daily routine, and locate the best vets
              and pet shops for your convenience.
            </p>
          </div>

          <div className="intro__btn">
            <button className="btn-contained--intro">Create free account</button>
          </div>
        </div>

        <div className="intro__img">
          <img src={storesVetsFinderIcon} alt="member portrait" />
        </div>
      </div>
    </div>
  );
}
