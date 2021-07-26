import { useAuth } from '../../contexts/AuthContext';
import finderIcon from '../../images/finder.svg';

export default function Finder() {
  const { currentUser } = useAuth();

  return (
    <div className="intro">
      <div className="wrapper">
        <div>
          <h1 className="intro__title">Finding Pet Stores / Vets</h1>
          <p>
            Try the best nutrition plan for your furry friend, monitor their daily routine, and locate the best vets and
            pet shops for your convenience.
          </p>

          <div className="intro__img-area pc-hidden">
            <img src={finderIcon} alt="cat stiting besides cat food" />
          </div>

          <div className="btn-area">
            <button className="btn-contained--intro">
              {currentUser ? 'Upgrade to Premium' : 'Create Free Account'}
            </button>
          </div>
        </div>

        <div className="intro__img-area mb-hidden">
          <img src={finderIcon} alt="cat stiting besides cat food" />
        </div>
      </div>
    </div>
  );
}
