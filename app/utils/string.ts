export const capitalize = (input: string) => {
  return input.charAt(0).toUpperCase() + input.slice(1);
};
export const formatSnakeCase = (input: string, options?: { capitalize: boolean }) => {
  const shouldCapitalize = options?.capitalize ?? true;
  const split = input.split('_');

  return split
    .reduce((acc, s) => {
      return `${acc} ${shouldCapitalize ? capitalize(s) : s}`;
    }, '')
    .trim();
};
