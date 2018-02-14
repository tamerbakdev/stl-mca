import { FormControlState } from "./form-contorl.model";

export interface FormState<ValueType = any> {
  [key: string]: FormControlState<ValueType>;
}

export interface FormSubmit<ValueType = any> {
  value: FormState<ValueType>;
  formId: string;
}

export interface FormButton<OnClickEventData> {
  id: string;
  buttonType: 'submit' | 'reset' | 'button';
  onClick?: (event: OnClickEventData) => void;
  icon?: string;
  label?: string;
  cssClasses?: string;
}
