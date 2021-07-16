export default function ContactIntro() {
  return (
    <div className="contact">
      <h2>How can we help?</h2>
      <form className="contact__form">
        <div>
          <label htmlFor="">
            Your name
            <input type="text" placeholder="Type your name" />
          </label>
        </div>

        <div>
          <label htmlFor="">
            Your email
            <input type="text" placeholder="Type your email" />
          </label>
        </div>

        <div>
          <label htmlFor="">
            Your message
            <textarea rows="5" placeholder="Type your message" />
          </label>
        </div>
        <button type="submit" className="btn-contained-yellow">
          Send
        </button>
      </form>
    </div>
  );
}
