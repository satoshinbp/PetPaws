import storesVetsFinderIcon from '../../images/stores-vets-finder.svg';

export default function WalkSummary() {
  return (
    <div className="intro">
      <div className="wrapper">
        <div className="intro__body">
          <div className="intro__text">
            <h2>Activity Tracker</h2>
            <p>
              A nutritious, balanced diet is essential to keeping your dog healthy. We provide a feature that allows you
              to keep track of your pet's meals. Additionally, we offer the ideal nutrition for your pet's weight
              control.
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
