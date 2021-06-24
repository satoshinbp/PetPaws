import React from 'react';

function Calorie() {
  return (
    <>
      <h3>Upgrade to Premium</h3>
      <p>
        We recommend the best nutrition plan for your furry friend, monitor their daily routeine, and locate the best
        vets and pet stores for your convenience.
      </p>
      <button>Get Premium</button>

      <h2>Calorie Calculator</h2>
      <form>
        <h3>Pet type:</h3>
        <input type="checkbox" name="dog" value="dog" />
        <label htmlFor="dog">Dog</label>
        <input type="checkbox" name="cat" value="cat" />
        <label htmlFor="cat">Cat</label>

        <label htmlFor="breed">Breed:</label>
        <select name="breed">
          <option value="afadorvolvo">Afador</option>
          <option value="affenhuahua">Affenhuahua</option>
          <option value="affenpinscher">Affenpinscher</option>
          <option value="afganhound">Afgan Hound</option>
        </select>

        <label htmlFor="weight">Weight:</label>
        <input type="number" name="weight" />

        <label htmlFor="age">Age:</label>
        <input type="number" name="age" />

        <label htmlFor="height">Height:</label>
        <input type="number" name="height" />

        <button type="submit">calculate</button>
      </form>

      <h3>Warning!</h3>
      <h4>Your pet is overweight</h4>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam facilis temporibus totam in ab culpa perferendis
        unde recusandae! Consectetur obcaecati neque rem ut alias eos vero et ipsa aliquid molestias?
      </p>
    </>
  );
}

export default Calorie;
