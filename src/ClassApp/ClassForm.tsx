import { Component } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { allCities } from "../utils/all-cities";
import { PhoneNumberInput } from "../types";
import { ClassTextInput } from "./ClassTextInput";
import { ClassPhoneInput } from "./ClassPhoneInput";
import {
  doesNotContainNumbers,
  isEmailValid,
  isAtLeastTwoCharacters,
  isPhoneValid,
  isValidCity,
} from "../utils/validations";

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

type FormProps = {
  setUserInformation: (
    email: string,
    firstName: string,
    lastName: string,
    phone: string,
    city: string
  ) => void;
};

type FormState = {
  isSubmitted: boolean;
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  phoneNumber: PhoneNumberInput;
};

export class ClassForm extends Component<FormProps, FormState> {
  state: FormState = {
    isSubmitted: false,
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    phoneNumber: ["", "", "", ""],
  };

  clearForm = () => {
    this.setState({
      isSubmitted: false,
      firstName: "",
      lastName: "",
      email: "",
      city: "",
      phoneNumber: ["", "", "", ""],
    });
  };

  shouldAlertError = () => {
    const { firstName, lastName, email, city, phoneNumber } = this.state;
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

  handleSubmit = (e: React.FormEvent) => {
    const { firstName, lastName, email, city, phoneNumber } = this.state;
    e.preventDefault();

    if (this.shouldAlertError()) {
      this.setState({ isSubmitted: true });
      alert("Bad Inputs");
    } else {
      this.props.setUserInformation(
        email,
        firstName,
        lastName,
        phoneNumber.join(""),
        city
      );
      this.clearForm();
    }
  };

  setPhoneNumber = (newState: PhoneNumberInput) => {
    this.setState({ phoneNumber: newState });
  };
  render() {
    const { firstName, lastName, email, phoneNumber, city, isSubmitted } =
      this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <u>
          <h3>User Information Form</h3>
        </u>

        {/* first name input */}
        <ClassTextInput
          label={"First Name"}
          inputProps={{
            placeholder: "Bilbo",
            onChange: (e) => {
              doesNotContainNumbers(e.target.value) &&
                this.setState({ firstName: e.target.value });
            },
            value: firstName,
          }}
        />
        <ErrorMessage
          message={firstNameErrorMessage}
          show={isSubmitted && !isAtLeastTwoCharacters(firstName)}
        />

        {/* last name input */}
        <ClassTextInput
          label={"Last Name"}
          inputProps={{
            placeholder: "Baggins",
            onChange: (e) => {
              doesNotContainNumbers(e.target.value) &&
                this.setState({ lastName: e.target.value });
            },
            value: lastName,
          }}
        />
        <ErrorMessage
          message={lastNameErrorMessage}
          show={isSubmitted && !isAtLeastTwoCharacters(lastName)}
        />

        {/* Email Input */}
        <ClassTextInput
          label={"Email"}
          inputProps={{
            placeholder: "bilbo-baggins@adventurehobbits.net",
            onChange: (e) => this.setState({ email: e.target.value }),
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
            onChange={(e) => this.setState({ city: e.target.value })}
            value={city}
          />
        </div>
        <ErrorMessage
          message={cityErrorMessage}
          show={isSubmitted && !isValidCity(city)}
        />

        {/* Phone Input */}
        <ClassPhoneInput
          phoneNumber={phoneNumber}
          setPhoneNumber={this.setPhoneNumber}
        />
        <ErrorMessage
          message={phoneNumberErrorMessage}
          show={isSubmitted && !isPhoneValid(phoneNumber)}
        />

        <input type="submit" value="Submit" />
      </form>
    );
  }
}
