import { SeasonParam } from '~/contracts/mal';

export const getCurrentYear = () => new Date().getFullYear();

export const getCurrentSeason = (): SeasonParam => {
  const month = new Date().getMonth();

  if (month <= 3) {
    return 'winter';
  } else if (month <= 6) {
    return 'spring';
  } else if (month <= 9) {
    return 'summer';
  } else {
    return 'fall';
  }
};
