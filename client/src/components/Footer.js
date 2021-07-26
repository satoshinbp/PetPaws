import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import footerIcon from '../images/footer.svg';
import Premium from '../pages/Premium';

export default function Footer() {
  const { currentUser } = useAuth();
  const [showPremium, setShowPremium] = useState(false);

  return (
    <footer>
      <div className="footer__wrapper">
        <nav>
          <ul>
            <div className="footer-logo">
              <li>
                <img src={footerIcon} alt="site logo" />
              </li>
            </div>
            <div className="copy-right">
              <li>© PetPaws 2021</li>
            </div>

            <div className="footer-btn">
              {currentUser ? (
                <>
                  <li>
                    <button className="btn-contained--footer " onClick={() => setShowPremium(true)}>
                      Go premium
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <Link to="/signup">
                    <li className="button-wrapper">
                      <button className="btn-contained--footer ">Join us</button>
                    </li>
                  </Link>
                </>
              )}
            </div>
          </ul>
        </nav>
      </div>

      <div className={`overlay ${showPremium ? 'isActive' : ''}`}>
        {showPremium && <Premium closeForm={() => setShowPremium(false)} />}
      </div>
    </footer>
  );
}
