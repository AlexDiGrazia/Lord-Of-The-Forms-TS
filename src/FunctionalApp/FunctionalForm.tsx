import { Dispatch, SetStateAction } from "react";
import { ErrorMessage } from "../ErrorMessage";
import {
  doesNotContainNumbers,
  isEmailValid,
  isGreaterThanTwoCharacters,
  isPhoneValid,
  isValidCity,
} from "../utils/validations";
import { allCities } from "../utils/all-cities";
import { FunctionalPhoneInput } from "./FunctionalPhoneInput";
import { PhoneNumberInput } from "./FunctionalApp";

type FunctionalFormProps = {
  clearForm: () => void;
  isSubmitted: boolean;
  setIsSubmitted: Dispatch<SetStateAction<boolean>>;
  firstName: string;
  setFirstName: Dispatch<SetStateAction<string>>;
  lastName: string;
  setLastName: Dispatch<SetStateAction<string>>;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  city: string;
  setCity: Dispatch<SetStateAction<string>>;
  phoneNumber: PhoneNumberInput;
  setPhoneNumber: Dispatch<SetStateAction<PhoneNumberInput>>;
};

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

export const FunctionalForm = ({
  clearForm,
  isSubmitted,
  setIsSubmitted,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  city,
  setCity,
  phoneNumber,
  setPhoneNumber,
}: FunctionalFormProps) => {
  const shouldShowFirstNameErrorMessage =
    isSubmitted && !isGreaterThanTwoCharacters(firstName);
  const shouldShowLastNameErrorMessage =
    isSubmitted && !isGreaterThanTwoCharacters(lastName);
  const shouldShowEmailErrorMessage = isSubmitted && !isEmailValid(email);
  const shouldShowCityErrorMessage = isSubmitted && !isValidCity(city);
  const shouldShowPhoneNumberErrorMessage =
    isSubmitted && !isPhoneValid(phoneNumber);

  const shouldAlertError = () => {
    let shouldAlert = false;
    [
      isGreaterThanTwoCharacters(firstName),
      isGreaterThanTwoCharacters(lastName),
      isEmailValid(email),
      isValidCity(city),
      isPhoneValid(phoneNumber),
    ].forEach((validation) => {
      if (validation === false) {
        shouldAlert = true;
      }
    });
    return shouldAlert;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitted(true);
    shouldAlertError() && alert("Bad Inputs");
  };

  return (
    <form onSubmit={handleSubmit}>
      <u>
        <h3>User Information Form</h3>
      </u>

      {/* first name input */}
      <div className="input-wrap">
        <label>{"First Name"}:</label>
        <input
          placeholder="Bilbo"
          onChange={(e) => {
            doesNotContainNumbers(e.target.value) &&
              setFirstName(e.target.value);
          }}
          value={firstName}
        />
      </div>
      <ErrorMessage
        message={firstNameErrorMessage}
        show={shouldShowFirstNameErrorMessage}
      />

      {/* last name input */}
      <div className="input-wrap">
        <label>{"Last Name"}:</label>
        <input
          placeholder="Baggins"
          onChange={(e) => {
            doesNotContainNumbers(e.target.value) &&
              setLastName(e.target.value);
          }}
          value={lastName}
        />
      </div>
      <ErrorMessage
        message={lastNameErrorMessage}
        show={shouldShowLastNameErrorMessage}
      />

      {/* Email Input */}
      <div className="input-wrap">
        <label>{"Email"}:</label>
        <input
          placeholder="bilbo-baggins@adventurehobbits.net"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </div>
      <ErrorMessage
        message={emailErrorMessage}
        show={shouldShowEmailErrorMessage}
      />

      {/* City Input */}
      <div className="input-wrap">
        <label>{"City"}:</label>
        <datalist id="cities">
          {allCities.map((city) => (
            <option value={city}></option>
          ))}
        </datalist>
        <input
          placeholder="Hobbiton"
          list="cities"
          onChange={(e) => setCity(e.target.value)}
          value={city}
        />
      </div>
      <ErrorMessage
        message={cityErrorMessage}
        show={shouldShowCityErrorMessage}
      />

      {/* Phone Input */}
      <FunctionalPhoneInput
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
      />
      <ErrorMessage
        message={phoneNumberErrorMessage}
        show={shouldShowPhoneNumberErrorMessage}
      />

      <input type="submit" value="Submit" />
    </form>
  );
};
