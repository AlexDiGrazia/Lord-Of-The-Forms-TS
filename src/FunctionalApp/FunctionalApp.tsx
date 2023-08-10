import { useState } from "react";
import { ProfileInformation } from "../ProfileInformation";
import { FunctionalForm } from "./FunctionalForm";

export type PhoneNumberInput = [string, string, string, string];

export const FunctionalApp = () => {
  const [phoneNumber, setPhoneNumber] = useState<PhoneNumberInput>([
    "",
    "",
    "",
    "",
  ]);

  return (
    <>
      <h2>Functional</h2>
      <ProfileInformation userData={null} />
      <FunctionalForm
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
      />
    </>
  );
};
