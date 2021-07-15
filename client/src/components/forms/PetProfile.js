import React from 'react';
import signinImg from '../../images/dog-sample.jpg'; // dammy img, to be replaced

export default function petProfileForm(props) {
  const today = new Date();

  return (
    <>
      <form className="pet-profile-form" onSubmit={(e) => props.handleSubmit(e)}>
        <div className="pet-profile-form_area">
          <div className="pet-profile-form_image">
            <img src={signinImg} alt="" className="" />
          </div>
          <div className="pet-type">
            <label>Pet type</label>
            <div className="pet-type_cat">
              <input
                type="radio"
                name="petType"
                value={0}
                checked={!props.isDog}
                onChange={(e) => props.changePetType(e.target.value)}
              />
              <label htmlFor="cat">Cat</label>
            </div>
            <div className="pet-type_dog">
              <input
                type="radio"
                name="petType"
                value={1}
                checked={props.isDog}
                onChange={(e) => props.changePetType(e.target.value)}
              />
              <label htmlFor="dog">Dog</label>
            </div>
          </div>
          <div className="input-area">
            <label htmlFor="name">Pet Name</label>
            <input
              type="text"
              value={props.name}
              required
              onChange={(e) => props.changeName(e.target.value)}
              placeholder="Pet Name"
            />
          </div>
          <div className="input-area">
            <label htmlFor="breed">Breed</label>
            <select name="breed" value={props.breedName} onChange={(e) => props.changeBreed(e.target.value)} required>
              <option value="">Select breed</option>
              {props.isDog ? (
                <>
                  {props.dogBreeds.map((breed) => (
                    <option value={breed.name} key={breed.name}>
                      {breed.name}
                    </option>
                  ))}
                </>
              ) : (
                <>
                  {props.catBreeds.map((breed) => (
                    <option value={breed.name} key={breed.name}>
                      {breed.name}
                    </option>
                  ))}
                </>
              )}
            </select>
          </div>
          <div className="input-area">
            <label htmlFor="gender">Gender</label>
            <select name="gender" id="gender" value={props.gender} onChange={(e) => props.changeGender(e.target.value)}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="input-area">
            <label htmlFor="birthday">Birthday</label>
            <input
              type="date"
              name="birthday"
              max={
                today.getFullYear() +
                '-' +
                (today.getMonth() + 1 < 10 ? '0' + (today.getMonth() + 1) : today.getMonth() + 1) +
                '-' +
                (today.getDate() < 10 ? '0' + today.getDate() : today.getDate())
              }
              value={props.birthday.slice(0, 10)}
              onChange={(e) => props.changeBirthday(e.target.value)}
            />
          </div>
          <div className="input-area">
            <label htmlFor="weight">Weight</label>
            <input
              type="number"
              name="weight"
              value={props.weight}
              min={0}
              step={0.1}
              onChange={(e) => props.changeWeight(e.target.value)}
              placeholder="Weight in kg"
            />
          </div>
          <div className="input-area">
            <label htmlFor="height">Height</label>
            <input
              type="number"
              name="height"
              value={props.height}
              min={0}
              step={0.1}
              onChange={(e) => props.changeHeight(e.target.value)}
              placeholder="Height in cm"
            />
          </div>
          <div className="input-area">
            <label htmlFor="isSpayed">Signalment</label>
            <select name="isSpayed" value={props.isSpayed} onChange={(e) => props.changeIsSpayed(e.target.value)}>
              <option value={0}>Intact</option>
              <option value={1}>Spayed/Neutered</option>
            </select>
          </div>
          <div className="input-area">
            <label htmlFor="activityLevel">Activity Level</label>
            <select
              name="activityLevel"
              value={props.activityLevel}
              onChange={(e) => props.changeActivityLevel(e.target.value)}
            >
              <option value={0}>Inactive</option>
              <option value={1}>Somewhat Active</option>
              <option value={2}>Active</option>
              <option value={3}>Very Active</option>
            </select>
          </div>
          <div className="input-area">
            <label htmlFor="bodyCondition">Body Condition</label>
            <select
              name="bodyCondition"
              value={props.bodyCondition}
              onChange={(e) => props.changeBodyCondition(e.target.value)}
            >
              <option value={0}>Underweight</option>
              <option value={1}>Ideal</option>
              <option value={2}>Overweight</option>
            </select>
          </div>
        </div>

        <button className="btn-contained-yellow btn-not-fullwidth" type="submit">
          Save
        </button>
      </form>

      <div className="add-pet">
        <button className="icon-btn--circle-add">＋</button>
        <p>Add new pet</p>
        <img src={signinImg} alt="" />
      </div>
    </>
  );
}
