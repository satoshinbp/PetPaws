import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Map from '../components/GoogleMap';

export default function FindingPetStores() {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    Axios.get('https://pet-paws-langara.herokuapp.com/api/store')
      .then((res) => {
        setShops(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onChangeSelect = (e) => {
    Axios.get('https://pet-paws-langara.herokuapp.com/api/store')
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
      <div>
        <h1>Finding Pet stores/ Vets</h1>
      </div>
      <form>
        <h3>Lets find the best Vets and Pet stores</h3>
        <div>
          <label htmlFor="">Find location</label>
          <select name="name" id="name" onChange={(e) => onChangeSelect(e)}>
            <option value={2}>Both</option>
            <option value={0}>Pet store</option>
            <option value={1}>Vet</option>
          </select>
        </div>
        <br />
      </form>
      <Map shops={shops} />
    </>
  );
}
