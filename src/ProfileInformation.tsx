import { UserInformation } from "./types";

export const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value: string | null;
}) => {
  return (
    <div>
      <span style={{ marginRight: 5 }}>
        <b>{label}:</b>
      </span>
      <span>{value}</span>
    </div>
  );
};

export const ProfileInformation = ({
  userInformation,
}: {
  userInformation: UserInformation | null;
}) => {
  if (!userInformation) {
    return (
      <>
        <u>
          <h3>Your Submitted User Information</h3>
        </u>
        <div className="user-info">
          <div>No information provided</div>
        </div>
      </>
    );
  }
  const { email, firstName, lastName, phone, city } = userInformation;
  return (
    <>
      <u>
        <h3>Your Submitted User Information</h3>
      </u>
      <div className="user-info">
        <InfoRow label="Email" value={email} />
        <InfoRow label="First Name" value={firstName} />
        <InfoRow label="Last Name" value={lastName} />
        <InfoRow label="City" value={city} />
        <InfoRow label="Phone" value={phone} />
      </div>
    </>
  );
};
