import { HtmlInputTypes, AbstractFormControlOptions } from "./form-contorl.model";

export const textualInputTypes = [
  'email',
  'number',
  'password',
  'search',
  'tel',
  'text',
  'url',
  'hidden'
];

export const dateInputTypes = [
  'date',
  'datetime-local',
  'month',
  'week',
  'time'
];

export const buttonInputTypes = [
  'button',
  'submit',
  'reset'
];

export const radioInputTypes = [
  'checkbox',
  'radio'
];

export const mediaInputTypes = [
  'file',
  'image',
  'range',
  'color'
];

export const matchFormControlComponent = function<T extends AbstractFormControlOptions = AbstractFormControlOptions>(control: T) {
  switch (true) {
    case textualInputTypes.some(controlType => controlType === control.inputType):
    default:
      return <mca-form-text-control { ...control } />;
  }
}
