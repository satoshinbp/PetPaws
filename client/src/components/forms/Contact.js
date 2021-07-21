export default function ContactIntro() {
  return (
    <div className="contact bg-primary-meat">
      <div className="wrapper">
        <h2>How can we help?</h2>

        <form className="basic-form bg-primary-light">
          <div className="input-area">
            <label htmlFor="name">Your name</label>
            <input id="name" name="name" type="text" placeholder="Type your name" />
          </div>

          <div className="input-area">
            <label htmlFor="email">Your email</label>
            <input id="email" name="email" type="text" placeholder="Type your email" />
          </div>

          <div className="input-area">
            <label htmlFor="message">Your message</label>
            <textarea id="message" name="message" rows="5" placeholder="Type your message" />
          </div>

          <div className="btn-area">
            <button type="submit" className="btn-contained">
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
