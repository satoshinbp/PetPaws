import catIcon from '../../images/cat.svg';

export default function Home() {
  return (
    <div className="intro">
      <div className="wrapper">
        <div>
          <h2 className="intro__title">Welcom to Pet Paws</h2>
          <p>
            Try the best nutrition plan for your furry friend, monitor their daily routine, and locate the best vets and
            pet shops for your convenience.
          </p>

          <div className="intro__img-area pc-hidden">
            {/* icon to be replaced */}
            <img src={catIcon} alt="two cat and a dog all sitting" />
          </div>

          <div className="intro__btn-area">
            <button className="btn-contained--intro">Upgrade to Premium</button>
          </div>
        </div>

        <div className="intro__img-area mb-hidden">
          {/* icon to be replaced */}
          <img src={catIcon} alt="two cat and a dog all sitting" />
        </div>
      </div>
    </div>
  );
}
