import { useState, useEffect } from 'react';
import Axios from 'axios';
import Map from '../components/GoogleMap';
import storesVetsFinderIcon from '../images/stores-vets-finder.svg'; // dammy img, to be replaced

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
      <div className="intro">
        <div className="intro__wrapper">
          <div className="intro__body">
            <div className="intro__text">
              <h2>Finding Pet Stores / Vets</h2>
              <p>
                Try the best nutrition plan for your furry friend, monitor their daily routine, and locate the best vets
                and pet shops for your convenience.
              </p>
            </div>

            <div className="intro__btn">
              <button className="btn-contained ">Create free account</button>
            </div>
          </div>

          <div className="intro__img">
            <img src={storesVetsFinderIcon} alt="member portrait" />
          </div>
        </div>
      </div>

      <div className="body">
        <div className="search-form">
          <h2>Lets find the best Pet Stores and vets</h2>
          <div className="search-form-background">
            <form className="search-form-inner">
              <label htmlFor="">Choose Pet Stores / Vets</label>
              <select className="input-md" name="name" id="name" onChange={(e) => onChangeSelect(e)}>
                <option value={2}>Both</option>
                <option value={0}>Pet store</option>
                <option value={1}>Vet</option>
              </select>
            </form>
            <Map shops={shops} />
          </div>
        </div>
      </div>
    </>
  );
}
