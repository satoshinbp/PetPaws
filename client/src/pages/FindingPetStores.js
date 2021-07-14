import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Map from '../components/GoogleMap';

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
      <div className="search">
        <div className="intro">
          <h3>Finding Pet shops/ Vets </h3>
          <p>We locate the best vets and pet shops based on your location for your convenience.</p>
          <div className="intro__btn">
            <button className="btn-contained-green">Create free account</button>
          </div>
        </div>
        <div className="search-form">
          <form>
            <h2>Lets find the best Pet Stores and vets</h2>

            <label htmlFor="">Choose Pet Stores / Vets</label>
            <select name="name" id="name" onChange={(e) => onChangeSelect(e)}>
              <option value={2}>Both</option>
              <option value={0}>Pet store</option>
              <option value={1}>Vet</option>
            </select>

            <br />
          </form>
          <Map shops={shops} />
        </div>
      </div>
    </>
  );
}
