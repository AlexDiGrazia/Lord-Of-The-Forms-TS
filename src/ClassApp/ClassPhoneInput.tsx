import { ChangeEventHandler, Component, ReactNode, createRef } from "react";
import { PhoneNumberInput } from "../types";

type ClassPhoneInputProps = {
  phoneNumber: PhoneNumberInput;
  setPhoneNumber: (newState: PhoneNumberInput) => void;
};

export class ClassPhoneInput extends Component<ClassPhoneInputProps> {
  private ref0: React.RefObject<HTMLInputElement>;
  private ref1: React.RefObject<HTMLInputElement>;
  private ref2: React.RefObject<HTMLInputElement>;
  private ref3: React.RefObject<HTMLInputElement>;

  constructor(props: ClassPhoneInputProps) {
    super(props);
    this.ref0 = createRef<HTMLInputElement>();
    this.ref1 = createRef<HTMLInputElement>();
    this.ref2 = createRef<HTMLInputElement>();
    this.ref3 = createRef<HTMLInputElement>();
  }

  createOnChangeHandler =
    (index: 0 | 1 | 2 | 3): ChangeEventHandler<HTMLInputElement> =>
    (e) => {
      const refs = [this.ref0, this.ref1, this.ref2, this.ref3];
      const lengths = [2, 2, 2, 2];
      const currentMaxLength = lengths[index];
      const nextRef = refs[index + 1];
      const prevRef = refs[index - 1];
      const value =
        new RegExp(/^(?:[0-9]{1,2})?$/).test(e.target.value) && e.target.value;

      const shouldGoToNextRef = currentMaxLength === value.toString().length;
      const shouldGoToPrevRef = value.toString().length === 0 && prevRef;

      const newState = this.props.phoneNumber.map(
        (phoneInput, phoneInputIndex) =>
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
      this.props.setPhoneNumber(newState);
    };

  render(): ReactNode {
    const { phoneNumber } = this.props;

    const phoneInputsArray = [];
    const refArray = [this.ref0, this.ref1, this.ref2, this.ref3];

    for (let i = 0 as 0 | 1 | 2 | 3; i < 4; i++) {
      phoneInputsArray.push({
        ref: refArray[i],
        id: `phone-input-${i + 1}`,
        placeholder: "55",
        onChange: this.createOnChangeHandler(i),
        value: phoneNumber[i],
      });
    }

    phoneInputsArray[3].placeholder = "5";

    return (
      <>
        <div className="input-wrap">
          <label htmlFor="phone">Phone:</label>
          <div id="phone-input-wrap">
            {phoneInputsArray.map((obj) => (
              <>
                <input
                  type="text"
                  ref={obj.ref}
                  id={obj.id}
                  placeholder={obj.placeholder}
                  onChange={obj.onChange}
                  value={obj.value}
                />
                {obj.id !== "phone-input-4" && <>-</>}
              </>
            ))}
          </div>
        </div>
      </>
    );
  }
}
