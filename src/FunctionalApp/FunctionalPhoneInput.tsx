import { ChangeEventHandler, Dispatch, SetStateAction, useRef } from "react";

export type PhoneNumberInput = [string, string, string, string];

export const FunctionalPhoneInput = ({
  phoneNumber,
  setPhoneNumber,
}: {
  phoneNumber: PhoneNumberInput;
  setPhoneNumber: Dispatch<SetStateAction<PhoneNumberInput>>;
}) => {
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

  return (
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
  );
};
