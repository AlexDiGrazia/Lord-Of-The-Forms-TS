import { useState } from "react";
import { ProfileInformation } from "../ProfileInformation";
import { FunctionalForm } from "./FunctionalForm";

export type PhoneNumberInput = [string, string, string, string];
export type TypeUserData = {
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  city: string | null;
};

export const FunctionalApp = () => {
  const [userData, setUserData] = useState<TypeUserData | null>(null);

  return (
    <>
      <h2>Functional</h2>
      <ProfileInformation userData={userData} />
      <FunctionalForm userData={userData} setUserData={setUserData} />
    </>
  );
};
