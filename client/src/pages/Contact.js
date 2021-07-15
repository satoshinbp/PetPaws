import storesVetsFinderIcon from '../images/stores-vets-finder.svg'; // dammy img, to be replaced

export default function Contact() {
  return (
    <>
      <div className="intro">
        <div className="intro__wrapper">
          <div className="intro__body">
            <div className="intro__text">
              <h2>Ask us a question!</h2>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet, assumenda asperiores sunt optio
                debitis totam repellat soluta voluptas atque recusandae.
              </p>
            </div>

            <div className="intro__btn">
              <button className="btn-contained-white btn-not-fullwidth">Create free account</button>
            </div>
          </div>

          <div className="intro__img">
            <img src={storesVetsFinderIcon} alt="member portrait" />
          </div>
        </div>
      </div>

      <div className="body">
        <div className="body__wrapper">
          <form>
            <div>
              <label htmlFor="">Your name</label>
              <br />
              <input type="text" />
            </div>
            <div>
              <label htmlFor="">Your email</label>
              <br />
              <input type="text" />
            </div>
            <div>
              <label htmlFor="">Your message</label>
              <br />
              <textarea />
            </div>
            <input type="submit" value="Send" />
          </form>
        </div>
      </div>
    </>
  );
}
