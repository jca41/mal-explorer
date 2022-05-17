export const capitalize = (string: string) => string.charAt(0).toUpperCase() + string.slice(1);
export const formatSnakeCase = (string: string) => {
  const split = string.split('_');

  return split.reduce((acc, s) => {
    return `${acc} ${capitalize(s)}`;
  }, '');
};
