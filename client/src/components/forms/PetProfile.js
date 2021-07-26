import React from 'react';

export default function petProfileForm(props) {
  const today = new Date();

  return (
    <form className="bg-primary-light" onSubmit={(e) => props.handleSubmit(e)}>
      <div className="img-area">
        <div className="errorMessage">{props.errorMessage && props.errorMessage}</div>
        <input
          id="profImage"
          type="file"
          accept="image/*"
          className="profile-img-input"
          onChange={(e) => props.changeImage(e.target.files[0])}
        />
        <label htmlFor="profImage" className="profile-img-label">
          <img id="profImage" src={props.imageURL} alt="pet-profile" className="profile-img" />
        </label>
      </div>
      <div className="radios-area">
        <label>Pet type</label>
        <div className="radio-area">
          <input
            type="radio"
            name="petType"
            value={0}
            checked={!props.isDog}
            onChange={(e) => props.changePetType(e.target.value)}
          />
          <label htmlFor="cat">Cat</label>
        </div>
        <div className="radio-area">
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
        <input type="number" name="weight" value={props.weight} min={0} step={0.1} />
        <span className="end-adornment">kg</span>
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
        />
        <span className="end-adornment">cm</span>
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
      <div className="radios-area">
        <label htmlFor="isSpayed">Spayed/Neutered</label>
        <div className="radio-area">
          <input
            id="notSpayed"
            type="radio"
            name="isSpay"
            value={0}
            checked={props.isSpayed == 0}
            onChange={(e) => props.changeIsSpayed(e.target.value)}
          />
          <label htmlFor="notSpayed">No</label>
        </div>
        <div className="radio-area">
          <input
            id="spayed"
            type="radio"
            name="isSpay"
            value={1}
            checked={props.isSpayed == 1}
            onChange={(e) => props.changeIsSpayed(e.target.value)}
          />
          <label htmlFor="spayed">Yes</label>
        </div>
      </div>

      <div className="btn-area">
        <button className="btn-contained " type="submit">
          Save
        </button>
      </div>
    </form>
  );
}
