import {
  Component,
  Event,
  Element,
  Prop,
  Watch,
  EventEmitter
} from '@stencil/core';
import { AbstractFormControl, AbstractFormControlNotifiers } from './form-control';
import { TextualInputTypes, ValidationPredicate, ValidationError, AbstractFormControlOptions, FormControlOptions } from './form-contorl.model';
import { isValidString, isEmptyArray } from '../../mca-data-utils';
import { Subscription } from 'rxjs/Subscription';
import { EventOptions } from '@stencil/core/dist/util/interfaces';

@Component({
  tag: 'mca-form-text-control'
})
export class McaTextualFormControl extends AbstractFormControl {
  @Prop() private updateOn: 'blur' | 'key' = 'blur';
  @Prop() public inputType: TextualInputTypes;
  @Prop() public id: string;
  @Prop() public parentId: string;
  @Prop() public name: string;
  @Prop() public value: any;
  @Prop() public placeholder: string = null;
  @Prop() public cssClasses: string = null;
  @Prop() public label: string = null;
  @Prop() public validation: Array<ValidationPredicate> = [];

  @Element()
  private host: HTMLElement;

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

  @Watch('parentId')
  private handleParentIdChange(newValue: string, oldValue: string) {
    if (!isValidString(newValue)) {
      throw new Error(`Attribute 'parentId' is required and must be valid(non-empty) string`);
    }
  }

  @Watch('name')
  private handleNameChange(newValue: string, oldValue: string) {
    if (!isValidString(newValue)) {
      throw new Error(`Attribute 'name' is required and must be valid(non-empty) string`);
    }
  }

  @Event()
  private valueChanges: EventEmitter;

  @Event()
  private statusChanges: EventEmitter;

  constructor() {
    super();

    const formControlConfig: FormControlOptions = {
      value: this.value,
      inputType: this.inputType,
      id: this.id,
      parentId: this.parentId,
      name: this.name,
      placeholder: this.placeholder,
      cssClasses: this.cssClasses,
      label: this.label,
      validation: this.validation
    };
    const notifiers: AbstractFormControlNotifiers<any> = {
      valueChanges: this.valueChanges,
      validationStatusChanges: this.statusChanges
    }

    this.init(formControlConfig, notifiers);
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

  private renderLabel() {
    if (isValidString(this.label)) {
      return (
        <label htmlFor={ this.id } class="col-sm-3 col-form-label">
          { this.label }
        </label>
      )
    }
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

    this.host.setAttribute('data-parent-id', this.parentId);

    return (
      <fieldset class="form-group row">
        { this.renderLabel() }
        <div class="col-sm-9">
          <input { ...attrs } />
        </div>
      </fieldset>
    )
  }
}
