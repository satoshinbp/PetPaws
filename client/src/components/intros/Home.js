import catIcon from '../../images/cat.svg';

export default function Home() {
  return (
    <div className="intro">
      <div className="intro__wrapper">
        <div className="intro__body">
          <div className="intro__text">
            <h2>Welcom to Pet Paws</h2>
            <p>
              Try the best nutrition plan for your furry friend, monitor their daily routine, and locate the best vets
              and pet shops for your convenience.
            </p>
          </div>

          <div className="intro__btn">
            <button className="btn-contained ">Create free account</button>
          </div>
        </div>

        <div className="intro__img">
          {/* to be replaced */}
          <img src={catIcon} alt="member portrait" />
        </div>
      </div>
    </div>
  );
}
