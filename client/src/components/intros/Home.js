import homeIcon from '../../images/home.svg';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="intro">
      <div className="wrapper">
        <div className="intro-container">
          <div>
            <h1 className="intro__title">Welcome to Pet Paws</h1>
            <p>
              Try the best nutrition plan for your furry friend, monitor their daily routine, and locate the best vets
              and pet shops for your convenience.
            </p>

            <div className="intro__img-area pc-hidden">
              <img src={homeIcon} alt="two cat and a dog all sitting" />
            </div>

            <div className="btn-area">
              <Link className="btn btn--link btn-contained--intro" to="/signup">
                Create Free Account
              </Link>
            </div>
          </div>

          <div className="intro__img-area mb-hidden">
            <img src={homeIcon} alt="two cat and a dog all sitting" />
          </div>
        </div>
      </div>
    </div>
  );
}
