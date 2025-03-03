import React, { useState } from "react";
import { Icon, Icons } from "./Icon";

export enum InputType {
  DATE = "date",
  TEL = "tel",
  EMAIL = "email",
  TEXT = "text",
  NUMBER = "number",
}

interface InputProps {
  id: string;
  type: InputType;
  pattern?: string;
  name?: string;
  isRequired?: boolean;
  autoComplete?: string;
  placeholder?: string;
  maxlength?: number;
  minlength?: number;
  information?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value?: string;
  className?: string;
  min?: string;
  max?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  isValid?: boolean;
}

function CustomInput({
  id,
  type,
  name,
  pattern,
  isRequired = true,
  autoComplete = "off",
  placeholder,
  maxlength,
  minlength,
  information = undefined,
  onChange,
  className = "",
  value,
  min,
  max,
  disabled = false,
  autoFocus = false,
  isValid = true,
}: InputProps) {
  const [validClass, setValidClass] = useState<string>("");

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const inputElement = e.target;

    if (inputElement.checkValidity() && isValid) {
      setValidClass("valid");
    } else {
      setValidClass("invalid");
    }
  };

  return (
    <div className="input-container">
      <div className="input-wrapper">
        <input
          type={type}
          id={id}
          name={id}
          pattern={pattern}
          required={isRequired}
          placeholder={placeholder}
          autoComplete={autoComplete}
          maxLength={maxlength}
          minLength={minlength}
          className={`input-area ${className} ${validClass}`}
          onChange={onChange}
          onBlur={handleBlur}
          min={min}
          max={max}
          value={value}
          disabled={disabled}
          autoFocus={autoFocus}
        />
        <label htmlFor={id} className="input-label">
          <span>{name}</span>
        </label>
        <div className="absolute right-4 top-4 cursor-pointer">
          {type === InputType.DATE && <Icon icon={Icons.CALENDAR_ICON} />}
          {!!information && (
            <div className="relative group">
              <Icon icon={Icons.INFO_ICON} />
              <div className="absolute -right-6 mt-2 w-[90vw] max-w-[470px] bg-blue-100 text-blue-400 text-sm font-light px-4 py-2 rounded shadow-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100 border-4 border-red-500 hidden group-hover:block">
                {information}
              </div>
            </div>
          )}
        </div>
      </div>
      {validClass === "invalid" && (
        <span className="error-message">
          Lütfen geçerli bir {name} giriniz.
        </span>
      )}
    </div>
  );
}

export default CustomInput;
