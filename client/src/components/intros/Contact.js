import contactIcon from '../../images/contact.svg'; // dammy img, to be replaced

export default function ContactIntro() {
  return (
    <div className="intro">
      <div className="intro__wrapper">
        <div className="intro__body">
          <div className="intro__text">
            <h2>Ask us a question!</h2>
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
          <img src={contactIcon} alt="member portrait" />
        </div>
      </div>
    </div>
  );
}
