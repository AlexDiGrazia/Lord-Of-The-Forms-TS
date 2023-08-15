import { Dispatch, SetStateAction, useState } from "react";
import { ErrorMessage } from "../ErrorMessage";
import {
  doesNotContainNumbers,
  isEmailValid,
  isAtLeastTwoCharacters,
  isPhoneValid,
  isValidCity,
} from "../utils/validations";
import { allCities } from "../utils/all-cities";
import { FunctionalPhoneInput } from "./FunctionalPhoneInput";
import { formatPhoneNumber } from "../utils/transformations";
import { UserInformation } from "../types";
import { FunctionalTextInput } from "./FunctionalTextInput";

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

export type PhoneNumberInput = [string, string, string, string];

export const FunctionalForm = ({
  setUserInformation,
}: {
  setUserInformation: Dispatch<SetStateAction<UserInformation | null>>;
}) => {
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

  const clearForm = () => {
    setEmail("");
    setFirstName("");
    setLastName("");
    setPhoneNumber(["", "", "", ""]);
    setCity("");
  };

  const shouldAlertError = () => {
    let shouldAlert = false;
    [
      isAtLeastTwoCharacters(firstName),
      isAtLeastTwoCharacters(lastName),
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
    shouldAlertError() && setIsSubmitted(true);
    isSubmitted && !shouldAlertError() && setIsSubmitted(false);
    shouldAlertError() && alert("Bad Inputs");
    !shouldAlertError() &&
      setUserInformation({
        email: email,
        firstName: firstName,
        lastName: lastName,
        phone: formatPhoneNumber(phoneNumber),
        city: city,
      });
    !shouldAlertError() && clearForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <u>
        <h3>User Information Form</h3>
      </u>

      {/* first name input */}
      <FunctionalTextInput
        label={"First Name"}
        inputProps={{
          placeholder: "Bilbo",
          onChange: (e) => {
            doesNotContainNumbers(e.target.value) &&
              setFirstName(e.target.value);
          },
          value: firstName,
        }}
      />
      <ErrorMessage
        message={firstNameErrorMessage}
        show={isSubmitted && !isAtLeastTwoCharacters(firstName)}
      />

      {/* last name input */}
      <FunctionalTextInput
        label={"Last Name"}
        inputProps={{
          placeholder: "Baggins",
          onChange: (e) => {
            doesNotContainNumbers(e.target.value) &&
              setLastName(e.target.value);
          },
          value: lastName,
        }}
      />
      <ErrorMessage
        message={lastNameErrorMessage}
        show={isSubmitted && !isAtLeastTwoCharacters(lastName)}
      />

      {/* Email Input */}
      <FunctionalTextInput
        label={"Email"}
        inputProps={{
          placeholder: "bilbo-baggins@adventurehobbits.net",
          onChange: (e) => setEmail(e.target.value),
          value: email,
        }}
      />
      <ErrorMessage
        message={emailErrorMessage}
        show={isSubmitted && !isEmailValid(email)}
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
        show={isSubmitted && !isValidCity(city)}
      />

      {/* Phone Input */}
      <FunctionalPhoneInput
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
      />
      <ErrorMessage
        message={phoneNumberErrorMessage}
        show={isSubmitted && !isPhoneValid(phoneNumber)}
      />

      <input type="submit" value="Submit" />
    </form>
  );
};
