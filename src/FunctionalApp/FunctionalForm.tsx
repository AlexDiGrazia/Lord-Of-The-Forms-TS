import { ChangeEventHandler, useRef, useState } from "react";
import { ErrorMessage } from "../ErrorMessage";
import {
  doesNotContainNumbers,
  isEmailValid,
  isGreaterThanTwoCharacters,
  isPhoneValid,
  isValidCity,
} from "../utils/validations";
import { allCities } from "../utils/all-cities";

export type PhoneNumberInput = [string, string, string, string];

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

export const FunctionalForm = () => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<PhoneNumberInput>([
    "",
    "",
    "",
    "",
  ]);

  const refs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];
  const ref0 = refs[0];
  const ref1 = refs[1];
  const ref2 = refs[2];
  const ref3 = refs[3];

  const createOnChangeHandler =
    (index: 0 | 1 | 2 | 3): ChangeEventHandler<HTMLInputElement> =>
    (e) => {
      const lengths = [2, 2, 2, 2];
      const currentMaxLength = lengths[index];
      const nextRef = refs[index + 1];
      const prevRef = refs[index - 1];
      const value =
        new RegExp(/^(?:[0-9]{1,2})?$/).test(e.target.value) && e.target.value;
      const shouldGoToNextRef =
        currentMaxLength === value.toString().length; /* && nextRef?.current */

      const shouldGoToPrevRef = value.toString().length === 0 && prevRef;

      const newState = phoneNumber.map((phoneInput, phoneInputIndex) =>
        index === phoneInputIndex
          ? new RegExp(/^(?:[0-9]{1,2})?$/).test(e.target.value)
            ? e.target.value
            : phoneInput
          : phoneInput
      ) as PhoneNumberInput;

      if (shouldGoToNextRef) {
        nextRef.current?.focus();
      }
      if (shouldGoToPrevRef) {
        prevRef.current?.focus();
      }
      setPhoneNumber(newState);
    };

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

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setIsSubmitted(true);
        shouldAlertError() && alert("Bad Inputs");
      }}
    >
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

      <div className="input-wrap">
        <label htmlFor="phone">Phone:</label>
        <div id="phone-input-wrap">
          <input
            type="text"
            ref={ref0}
            id="phone-input-1"
            placeholder="55"
            onChange={createOnChangeHandler(0)}
            value={phoneNumber[0]}
          />
          -
          <input
            type="text"
            ref={ref1}
            id="phone-input-2"
            placeholder="55"
            onChange={createOnChangeHandler(1)}
            value={phoneNumber[1]}
          />
          -
          <input
            type="text"
            ref={ref2}
            id="phone-input-3"
            placeholder="55"
            onChange={createOnChangeHandler(2)}
            value={phoneNumber[2]}
          />
          -
          <input
            type="text"
            ref={ref3}
            id="phone-input-4"
            placeholder="5"
            onChange={createOnChangeHandler(3)}
            value={phoneNumber[3]}
          />
        </div>
      </div>

      <ErrorMessage
        message={phoneNumberErrorMessage}
        show={shouldShowPhoneNumberErrorMessage}
      />

      <input type="submit" value="Submit" />
    </form>
  );
};
