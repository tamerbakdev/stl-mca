import { EventEmitter } from '@stencil/core';

import {
  HtmlInputTypes,
  ValidationPredicate,
  AbstractFormControlOptions,
  TextualInputTypes,
  FormControlOptions,
} from './form-contorl.model';
import { isValidString, hasMethod, hasProperty } from '../../mca-data-utils';

export interface AbstractFormControlNotifiers<ValueType = any> {
  valueChanges: EventEmitter<AbstractFormControlChanges<ValueType>>;
  validationStatusChanges: EventEmitter<AbstractFormControlChanges<boolean>>
}

export interface AbstractFormControlChanges<ValueType = any> {
  value: ValueType;
  target: string;
}

export const AbstractFormControlNotifierMock = { emit(...args: any[]) { void(0) } };

export abstract class AbstractFormControl<InputTypes = TextualInputTypes, ValueType = any> {
  private _valueChanges$: EventEmitter<AbstractFormControlChanges<ValueType>>;
  private _value: ValueType;
  private _validationStatusChanges$: EventEmitter<AbstractFormControlChanges<boolean>>;
  private _validationStatus: boolean;

  protected inputType: InputTypes;
  protected id: string;
  protected parentId: string;
  protected name: string;
  protected placeholder: string;
  protected cssClasses?: string;
  protected label?: string;
  protected validation?: Array<ValidationPredicate>;

  public get value() {
    return this._value;
  }

  public get validationStatus() {
    return this._validationStatus;
  }

  constructor() { }

  /**
   *
   * @param {AbstractFormControlOptions} config - a form control config
   * @param {AbstractFormControlNotifiers} notifiers - object with references to the stencil component's "Events"
   */
  protected init(
    config: FormControlOptions<InputTypes, ValueType>,
    notifiers?: AbstractFormControlNotifiers<ValueType>
  ) {
    this.inputType = config.inputType;
    this.id = config.id;
    this.parentId = config.parentId;
    this.name = config.name;
    this.placeholder = isValidString(config.placeholder) ? config.placeholder : '';
    this.cssClasses = isValidString(config.cssClasses) ? config.cssClasses : '';
    this.label = isValidString(config.label) ? config.label : '';
    this.validation = config.validation || [];

    this._value = isValidString(config.value) ? config.value : null;
    this._valueChanges$ = hasProperty(notifiers, 'valueChanges')
      ? notifiers.valueChanges
      : AbstractFormControlNotifierMock;

    this._validationStatus = true;
    this._validationStatusChanges$ = hasProperty(notifiers, 'validationStatusChanges')
      ? notifiers.validationStatusChanges
      : AbstractFormControlNotifierMock;
  }

  protected updateValidationStatus(isValid: boolean) {
    this._validationStatus = isValid;
    this._validationStatusChanges$.emit({
      value: this._validationStatus,
      target: this.parentId
    });
  }

  protected updateValue(value: ValueType) {
    this._value = value;
    this._valueChanges$.emit({
      value: this._value,
      target: this.parentId
    });
  }
}

