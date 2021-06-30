import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Map from '../components/GoogleMap';

export default function FindingPetStores() {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:3001/stores/get')
      .then((response) => {
        setShops(response.data);
        console.log(response.data);
        // console.log(response.data[0].is_vet);
      })
      .catch((err) => {
        // Below dammy data to be removed once database gets ready
        setShops([
          { name: 'Canada pet store', address: '7575 alberta st Vancouver BC' },
          { name: 'Vancouver vet', address: '2524 ontario st Vancouver BC' },
        ]);
      });
  }, []);

  const onChangeSelect = (e) => {
    Axios.get('http://localhost:3001/stores/get')
      .then((response) => {
        if (Number(e.target.value) === 2) {
          setShops(response.data);
        } else {
          setShops(response.data.filter((shop) => shop.is_vet === Number(e.target.value)));
          // console.log(response.data);
        }
      })
      .catch((err) => {
        // Below dammy data to be removed once database gets ready
        setShops([
          { name: 'Canada pet store', address: '7575 alberta st Vancouver BC' },
          { name: 'Vancouver vet', address: '2524 ontario st Vancouver BC' },
        ]);
      });
  };

  return (
    // Will be changed
    <>
      <div>
        <h1
          style={{
            border: '1px solid black',
            borderRadius: '5px',
            backgroundColor: '#F0F0F0',
          }}
        >
          Finding Pet stores/ Vets
        </h1>
      </div>
      <form>
        <h3>Lets find the best Vets and Pet stores</h3>
        <div>
          <label htmlFor="">Pet Stores/Vets</label>
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
