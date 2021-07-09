import Axios from 'axios';

export default async function calculateRecommendedCalorie(petProfile) {
  const { isDog, breedName, weight, isSpayed, activityLevel, bodyCondition, ageYears, ageMonths } = petProfile;

  const dogBreedsRow = await Axios.get('https://api.thedogapi.com/v1/breeds');
  const dogBreeds = dogBreedsRow.data.map((breed) => {
    const weightRange = breed.weight.metric.split('-').map((weightEdge) => parseInt(weightEdge.trim()));
    const weightAvg = (weightRange[0] + weightRange[1]) / 2;
    const adultAge = weightAvg <= 4 ? 8 : weightAvg < 10 ? 10 : weightAvg < 25 ? 12 : weightAvg < 44 ? 15 : 18;

    return { name: breed.name, adultAge };
  });

  const catBreedsRow = await Axios.get('https://api.thecatapi.com/v1/breeds');
  const catBreeds = catBreedsRow.data.map((breed) => ({ name: breed.name, adultAge: 12 }));

  const signalmentFactors = [
    [1.4, 1.2],
    [1.8, 1.6],
  ];
  const activityLevelFactors = [1, 1.2, 1.4, 1.6];
  const bodyConditionFactors = [1.2, 1, 0.8];

  const breedAdultAge = isDog
    ? dogBreeds.find((dogBreed) => dogBreed.name === breedName).adultAge
    : catBreeds.find((catBreed) => catBreed.name === breedName).adultAge;

  const RER = 70 * Math.pow(weight, 0.75);
  const signalmentFactor = signalmentFactors[isDog][isSpayed];
  const activityLevelFactor = activityLevelFactors[activityLevel];
  const bodyConditionFactor = bodyConditionFactors[bodyCondition];
  const ageFactor = ageYears * 12 + ageMonths < 4 ? 3 : ageYears * 12 + ageMonths < breedAdultAge ? 2 : 1;

  const MER = RER * signalmentFactor * activityLevelFactor * bodyConditionFactor * ageFactor;

  return MER;
}
