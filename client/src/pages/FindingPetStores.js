import React, { useState, useEffect } from 'react';
import Map from '../components/GoogleMap';

export default function FindingPetStores() {
  const [shops, setShops] = useState([]);

  const locations = [
    {
      id: 1,
      address: '1889 Cornwall Ave, Vancouver, BC V6J 1C6',
      category: 'vet',
      geocode: { latitude: 49.27462, longitude: -123.14759 },
      name: 'Cypress St. Animal Hospital Vancouver',
    },
    {
      id: 2,
      address: '665 Market Hill, Vancouver, BC V5Z 4B5',
      category: 'vet',
      geocode: { latitude: 49.26775, longitude: -123.115939 },
      name: 'Market Hill Animal Hospital',
    },
    {
      id: 3,
      address: '595 Burrard St, Vancouver, BC V7X 1L4',
      category: 'store',
      geocode: { latitude: 49.2874, longitude: -123.11985 },
      name: 'Fetch Raw Food Company',
    },
    {
      id: 4,
      address: '1171 Thurlow St, Vancouver, BC V6E 1X3',
      category: 'store',
      geocode: { latitude: 49.25975, longitude: -123.03173 },
      name: 'Bones Pet Stores',
    },
    {
      id: 5,
      address: '2860 Bentall St, Vancouver, BC V5M 4H4',
      category: 'store',
      geocode: { latitude: 49.28236, longitude: -123.13007 },
      name: 'Pet Smart',
    },
  ];

  useEffect(() => {
    setShops(locations);
  }, []);

  const onChangeSelect = (e) => {
    setShops(
      locations.filter((location) => location.category == e.target.value)
    );
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
            <option value="store">Pet store</option>
            <option value="vet">Vet</option>
          </select>
        </div>
        <br />
      </form>
      <Map shops={shops} />
    </>
  );
}
