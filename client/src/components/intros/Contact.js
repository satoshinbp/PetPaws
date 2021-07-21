import contactIcon from '../../images/contact.svg';

export default function ContactIntro() {
  return (
    <div className="intro">
      <div className="wrapper">
        <div>
          <h2 className="intro__title">Ask us a question!</h2>
          <p>Pet Paws Team is always glad to hear your feeback and answer any questions about our services</p>

          <div className="intro__img-area pc-hidden">
            <img src={contactIcon} alt="sitting dog with question mark" />
          </div>

          <div className="btn-area">
            <button className="btn-contained--intro">Create free account</button>
          </div>
        </div>

        <div className="intro__img-area mb-hidden">
          <img src={contactIcon} alt="sitting dog with question mark" />
        </div>
      </div>
    </div>
  );
}
