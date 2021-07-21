import { useState, useEffect } from 'react';
import Axios from 'axios';
import Map from '../components/GoogleMap';
import finderCombinedIcon from '../images/finder-combined-icon.svg';
import finderIconMobile from '../images/finder-icon-mobile.svg';
import FinderIntro from '../components/intros/Finder';

export default function FindingPetStores() {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:3001/api/store')
      .then((res) => {
        setShops(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onChangeSelect = (e) => {
    Axios.get('http://localhost:3001/api/store')
      .then((res) => {
        if (Number(e.target.value) === 2) {
          setShops(res.data);
        } else {
          setShops(res.data.filter((shop) => shop.is_vet === Number(e.target.value)));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <FinderIntro />

      <div className="body">
        <div className="search-form bg-primary-meat ">
          <div className="wrapper">
            <h2>Lets find the best Pet Stores and vets</h2>
            <div className="search-form-background">
              <div className="search-combined-icon">
                <img src={finderCombinedIcon} alt="search page icon" />
              </div>
              <div className="search-icon-mobile">
                <img src={finderIconMobile} alt="search page icon for" />
              </div>
              <form className="search-form-inner">
                <label htmlFor="">Choose Pet Stores / Vets</label>
                <select name="name" id="name" onChange={(e) => onChangeSelect(e)}>
                  <option value={2}>Both</option>
                  <option value={0}>Pet store</option>
                  <option value={1}>Vet</option>
                </select>
              </form>
              <Map shops={shops} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
