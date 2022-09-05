export const capitalize = (input: string) => {
  return input.charAt(0).toUpperCase() + input.slice(1);
};
export const formatSnakeCase = (input = '', options?: { capitalize: boolean }) => {
  const shouldCapitalize = options?.capitalize ?? true;
  const split = input.split('_');

  return split
    .reduce((acc, s) => {
      return `${acc} ${shouldCapitalize ? capitalize(s) : s}`;
    }, '')
    .trim();
};

export const snakeToKebabCase = (s: string) => s.toLowerCase().replace(/_/g, '-');

export function parseIntSafe(v: unknown) {
  if (typeof v === 'number') return v;
  return typeof v === 'string' && v ? parseInt(v, 10) : NaN;
}
