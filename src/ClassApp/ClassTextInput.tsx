import { Component, ComponentProps, ReactNode } from "react";

type TextInputProps = {
  label: string;
  inputProps: ComponentProps<"input">;
};

export class ClassTextInput extends Component<TextInputProps> {
  render(): ReactNode {
    const { label, inputProps } = this.props;
    return (
      <div className="input-wrap">
        <label>{label}:</label>
        <input type="text" {...inputProps} />
      </div>
    );
  }
}
