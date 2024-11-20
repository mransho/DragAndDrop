import { validation } from "./validation_types.js";

export const assignValidateInputs = (titleValue: string, descValue: string) => {
  const titleInputRule: validation = {
    type: "title",
    value: titleValue,
    required: true,
    minLength: 4,
    maxLength: 30,
  };
  const descInputRule: validation = {
    type: "descrabtion",
    value: descValue,
    required: true,
    minLength: 10,
    maxLength: 100,
  };
  return [titleInputRule, descInputRule];
};

export const handleValidationErrors = (inputRule: validation): string => {
  let errorMsg: string = "";
  if (inputRule.required && inputRule.value.trim().length === 0) {
    errorMsg = `${inputRule.type} is required`;
  }
  if (
    inputRule.minLength &&
    inputRule.minLength > inputRule.value.trim().length
  ) {
    errorMsg = `${inputRule.type} must be at least ${inputRule.minLength} characters`;
  }
  if (
    inputRule.maxLength &&
    inputRule.maxLength < inputRule.value.trim().length
  ) {
    errorMsg = `${inputRule.type} must be less than ${inputRule.maxLength} characters`;
  }
  return errorMsg;
};
