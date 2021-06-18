import React from 'react'

export default function PetProfile() {
  return (
    <div>
      <h1>Pet Profile</h1>
      Picture  Pet Type
      <form action="">
        <label htmlFor="petName">Pet Name</label>
        <input type="text" />

        <label htmlFor="gender">Gender</label>
        <select name="gender" id="gender">
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <label htmlFor="">Breed</label>
        <select name="breed" id="breed">
          <option value="shibaInu">Shiba Inu</option>
          <option value="shiba">Shiba Inu2</option>
        </select>

        <label htmlFor="weight">Weight(Ibs)</label>
        <input type="number" />

        <label htmlFor="height">Height</label>
        <input type="number" />

        <input type="submit" value="Save" />
      </form>
          
      <p>Add new pet</p>
    </div>
  )
}
