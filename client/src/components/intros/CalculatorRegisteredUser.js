import storesVetsFinderIcon from '../../images/stores-vets-finder.svg'; // dammy img, to be replaced

export default function CalculatorRegisteredUser() {
  return (
    <div className="intro">
      <div className="intro__wrapper">
        <div className="intro__body">
          <div className="intro__text">
            <h2>Calorie Calculator</h2>
            <p>
              Try the best nutrition plan for your furry friend, monitor their daily routine, and locate the best vets
              and pet shops for your convenience.
            </p>
          </div>
        </div>

        <div className="intro__img">
          <img src={storesVetsFinderIcon} alt="member portrait" />
        </div>
      </div>
    </div>
  );
}
