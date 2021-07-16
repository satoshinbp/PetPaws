export default function calculateAgeFromBirthday(dateBirthStr) {
  const dateNow = new Date();
  const dateBirth = new Date(dateBirthStr);

  const timeTillNow = dateNow.getTime() - dateBirth.getTime();
  const daysTillNow = timeTillNow / (1000 * 3600 * 24);

  const daysPerMonth = 365 / 12;
  const ageY = Math.floor(daysTillNow / 365);
  const ageM = Math.floor((daysTillNow - 365 * ageY) / daysPerMonth);

  return { ageY, ageM };
}
