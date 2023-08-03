import { allCities } from "./all-cities";

export function isEmailValid(emailAddress: string) {
  // eslint-disable-next-line no-useless-escape
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return !!emailAddress.match(regex);
}

export const isGreaterThanTwoCharacters = (str: string) => {
  return str.length > 2;
};

export const doesNotContainNumbers = (str: string) => {
  return str
    .split("")
    .every((char) => char.toLowerCase() !== char.toUpperCase());
};

export const isValidCity = (str: string) => {
  return allCities
    .map((city) => city.toLowerCase())
    .includes(str.toLowerCase());
};

export const isPhoneValid = (arr: [string, string, string, string]) => {
  let isValid = true;
  isValid =
    arr[0].length === 2 &&
    arr[1].length === 2 &&
    arr[2].length === 2 &&
    arr[3].length === 1;

  return isValid;
};
