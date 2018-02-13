import { Component, Prop, Watch } from '@stencil/core';
import { AbstractFormControl } from './form-control';
import { TextualInputTypes, ValidationPredicate, ValidationError } from './form-contorl.model';
import { isValidString, isEmptyArray } from '../../mca-data-utils';

// export type TextualFormControlValue = any;

@Component({
  tag: 'mca-form-text-control'
})
export class McaTextualFormControl extends AbstractFormControl<TextualInputTypes, any> {
  @Prop() private updateOn: 'blur' | 'key' = 'blur';
  @Prop() inputType: TextualInputTypes;
  @Prop() id: string;
  @Prop() name: string;
  @Prop() value: any;
  @Prop() placeholder: string = null;
  @Prop() cssClasses: string = null;
  @Prop() label: string = null;
  @Prop() validation: Array<ValidationPredicate> = [];

  @Watch('type')
  private handleTypeChange(newValue: string, oldValue: string) {
    if (!isValidString(newValue)) {
      throw new Error(`Attribute 'type' is required and must be valid(non-empty) string`);
    }
  }

  @Watch('id')
  private handleIdChange(newValue: string, oldValue: string) {
    if (!isValidString(newValue)) {
      throw new Error(`Attribute 'id' is required and must be valid(non-empty) string`);
    }
  }

  @Watch('name')
  private handleNameChange(newValue: string, oldValue: string) {
    if (!isValidString(newValue)) {
      throw new Error(`Attribute 'name' is required and must be valid(non-empty) string`);
    }
  }


  constructor() {
    super();
    this.init({
      value: this.value,
      inputType: this.inputType,
      id: this.id,
      name: this.name,
      placeholder: this.placeholder,
      cssClasses: this.cssClasses,
      label: this.label,
      validation: this.validation
    });
  }

  private handleInput(event) {
    const value = event.target.value;

    if (!isEmptyArray(this.validation)) {
      const isValid = this.validation.every(validator => {
        const result = validator(value);
        return !(result instanceof ValidationError);
      });

      this.updateValidationStatus(isValid);
    }

    this.updateValue(value);
  }

  public render() {
    const changesTarget = this.updateOn === 'blur' ? 'onChange' : 'onInput';
    const attrs = {
      type: this.inputType,
      name: this.name,
      id: this.id,
      placeholder: this.placeholder,
      class: this.cssClasses,
      [changesTarget]: (event) => this.handleInput(event)
    };

    return <input { ...attrs } />
  }
}
