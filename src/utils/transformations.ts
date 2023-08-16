export const capitalize = (str: string) => {
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
};

export const formatPhoneNumber = (str: string) =>
  `${str.slice(0, 2)}-${str.slice(2, 4)}-${str.slice(4, 6)}-${str.slice(6)}`;
