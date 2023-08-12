import { useState } from "react";
import { ProfileInformation } from "../ProfileInformation";
import { FunctionalForm } from "./FunctionalForm";
import { formatPhoneNumber } from "../utils/transformations";

export type PhoneNumberInput = [string, string, string, string];

export const FunctionalApp = () => {
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
    setFirstName("");
    setLastName("");
    setEmail("");
    setCity("");
    setPhoneNumber(["", "", "", ""]);
  };

  return (
    <>
      <h2>Functional</h2>
      <ProfileInformation
        isSubmitted={isSubmitted}
        userData={{
          firstName,
          lastName,
          email,
          city,
          phone: formatPhoneNumber(phoneNumber),
        }}
      />
      <FunctionalForm
        clearForm={clearForm}
        isSubmitted={isSubmitted}
        setIsSubmitted={setIsSubmitted}
        firstName={firstName}
        setFirstName={setFirstName}
        lastName={lastName}
        setLastName={setLastName}
        email={email}
        setEmail={setEmail}
        city={city}
        setCity={setCity}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
      />
    </>
  );
};
