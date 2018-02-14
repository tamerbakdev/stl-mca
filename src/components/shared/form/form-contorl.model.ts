export type TextualInputTypes
  = 'email'
  | 'number'
  | 'password'
  | 'search'
  | 'tel'
  | 'text'
  | 'url'
  | 'hidden';

export type DateInputTypes
  = 'date'
  | 'datetime-local'
  | 'month'
  | 'week'
  | 'time';

export type ButtonInputTypes
  = 'button'
  | 'submit'
  | 'reset';

export type RadioInputTypes
  = 'checkbox'
  | 'radio'

export type MediaInputTypes
  = 'file'
  | 'image'
  | 'range'
  | 'color';

export type HtmlInputTypes
  = TextualInputTypes
  | DateInputTypes
  | ButtonInputTypes
  | RadioInputTypes
  | MediaInputTypes;

export class ValidationError extends Error {
  type: string;
  message: string;
}

export type ValidationPredicate = (value: any) => null | ValidationError;

export interface AbstractFormControlOptions<InputTypes = TextualInputTypes, ValueType = any> {
  inputType: InputTypes;
  id: string;
  name: string;
  placeholder?: string;
  value?: ValueType;
  cssClasses?: string;
  label?: string;
  validation?: Array<ValidationPredicate>;
}

export interface FormControlOptions<InputTypes = TextualInputTypes, ValueType = any> extends AbstractFormControlOptions<InputTypes, ValueType> {
  parentId: string;
}
