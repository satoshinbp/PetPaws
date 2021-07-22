import twoCatsAndDogIcon from '../../images/cats-and-dog.svg';
export default function Home() {
  return (
    <div className="intro">
      <div className="wrapper">
        <div>
          <h1 className="intro__title">Welcom to Pet Paws</h1>
          <p>
            Try the best nutrition plan for your furry friend, monitor their daily routine, and locate the best vets and
            pet shops for your convenience.
          </p>

          <div className="intro__img-area pc-hidden">
            <img src={twoCatsAndDogIcon} alt="two cat and a dog all sitting" />
          </div>

          <div className="btn-area">
            <button className="btn-contained--intro">Upgrade to Premium</button>
          </div>
        </div>

        <div className="intro__img-area mb-hidden">
          <img src={twoCatsAndDogIcon} alt="two cat and a dog all sitting" />
        </div>
      </div>
    </div>
  );
}
