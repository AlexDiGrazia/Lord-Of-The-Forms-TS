import { UserInformation } from "../types";
import { Component } from "react";
import { ProfileInformation } from "../ProfileInformation";
import { ClassForm } from "./ClassForm";

type State = { userInformation: UserInformation | null };

export class ClassApp extends Component<Record<string, never>, State> {
  state = { userInformation: null };

  setUserInformation = (
    email: string,
    firstName: string,
    lastName: string,
    phone: string,
    city: string
  ) =>
    this.setState({
      userInformation: {
        email,
        firstName,
        lastName,
        phone,
        city,
      },
    });

  render() {
    const { userInformation } = this.state;
    return (
      <>
        <h2>Class</h2>
        <ProfileInformation userInformation={userInformation} />
        <ClassForm setUserInformation={this.setUserInformation} />
      </>
    );
  }
}

// const [userInformation, setUserInformation] =
//   useState<UserInformation | null>(null);
