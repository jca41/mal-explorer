export const scrollTop = () => window?.scrollTo({ top: 0, behavior: 'smooth' });

export const getFormData = (form: HTMLFormElement | null) => {
  return form ? (Object.fromEntries(new FormData(form)) as Record<string, string>) : {};
};
