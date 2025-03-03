import React from "react";
import InputSections from "./InputSections";
import SelectSections from "./SelectSections";
import Title from "./elements/Title";
import { formatName } from "../utils";

interface FormElementProps {
  questionID: number;
  questionTypeID: number;
  questionName: string;
  questionCode: string;
  isRequired: boolean;
  options?: { value: string; label: string }[];
  value?: string;
  onChange: (event: any) => void;
}

function FormElement({
  questionID,
  questionTypeID,
  questionName,
  questionCode,
  isRequired,
  options,
  value,
  onChange,
}: FormElementProps) {
  switch (questionTypeID) {
    case 1:
      return (
        <InputSections
          questionID={questionID}
          questionName={formatName(questionName)}
          questionCode={questionCode}
          isRequired={isRequired}
          value={value}
          onChange={onChange}
        />
      );
    case 2:
      return (
        <SelectSections
          questionID={questionID}
          questionName={formatName(questionName)}
          questionCode={questionCode}
          options={options || []}
          isRequired={isRequired}
          onChange={onChange}
        />
      );
    case 5:
      return <Title questionID={questionID} name={formatName(questionName)} />;
  }
}

export default FormElement;
