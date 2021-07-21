import finderIcon from '../../images/finder.svg';

export default function Finder() {
  return (
    <div className="intro">
      <div className="wrapper">
        <div>
          <h2 className="intro__title">Finding Pet Stores / Vets</h2>
          <p>
            Try the best nutrition plan for your furry friend, monitor their daily routine, and locate the best vets and
            pet shops for your convenience.
          </p>

          <div className="intro__img-area pc-hidden">
            <img src={finderIcon} alt="cat stiting besides cat food" />
          </div>

          <div className="intro__btn-area">
            <button className="btn-contained--intro">Create free account</button>
          </div>
        </div>

        <div className="intro__img-area mb-hidden">
          <img src={finderIcon} alt="cat stiting besides cat food" />
        </div>
      </div>
    </div>
  );
}
