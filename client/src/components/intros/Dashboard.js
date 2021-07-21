import catIcon from '../../images/cat.svg'; // to be replaced

export default function Dashboard() {
  return (
    <div className="intro">
      <div className="wrapper">
        <div>
          <h2 className="intro__title">Dashboard</h2>
          <p>
            Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..." "There is no
            one who loves pain itself, who seeks after it and wants to have it, simply because it is pain.
          </p>

          <div className="intro__img-area pc-hidden">
            <img src={catIcon} alt="cat stiting besides cat food" />
          </div>

          <div className="btn-area">
            <button className="btn-contained--intro">Upgrade to Premium</button>
          </div>
        </div>

        <div className="intro__img-area mb-hidden">
          {/* to be replaced */}
          <img src={catIcon} alt="a blue cat and a purple cat both sitting" />
        </div>
      </div>
    </div>
  );
}
