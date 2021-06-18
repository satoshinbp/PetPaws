import React from 'react';

export default function FindingPetStores() {
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
          <select name="name" id="name">
            <option value="Petstore">Pet store</option>
            <option value="Vet">Vet</option>
          </select>
        </div>
        <div>
          <label htmlFor="">Location</label>
          <input type="text" />
        </div>
        <br />
        <div>Map will be displayed</div>
        <input type="submit" value="Search" />
      </form>
    </>
  );
}
