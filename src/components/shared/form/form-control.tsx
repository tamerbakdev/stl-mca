import { Subject } from 'rxjs/Subject';

import {
  HtmlInputTypes,
  ValidationPredicate,
  AbstractFormControlOptions,
  TextualInputTypes,
} from './form-contorl.model';
import { isValidString } from '../../mca-data-utils';

export abstract class AbstractFormControl<InputTypes = TextualInputTypes, ValueType = any> {
  private _valueChanges$: Subject<ValueType>;
  private _value: ValueType;
  private _validationStatusChanges$: Subject<boolean>;
  private _validationStatus: boolean;

  protected inputType: InputTypes;
  protected id: string;
  protected name: string;
  protected placeholder: string;
  protected cssClasses?: string;
  protected label?: string;
  protected validation?: Array<ValidationPredicate>;

  public get valueChanges$() {
    return this._valueChanges$.asObservable();
  }

  public get value() {
    return this._value;
  }

  public get validationStatusChanges$() {
    return this._validationStatusChanges$.asObservable();
  }

  public get validationStatus() {
    return this._validationStatus;
  }

  constructor() {

  }

  protected init(config?: AbstractFormControlOptions<InputTypes, ValueType>) {
    this.inputType = config.inputType;
    this.id = config.id;
    this.name = config.name;
    this.placeholder = isValidString(config.placeholder) ? config.placeholder : '';
    this.cssClasses = isValidString(config.cssClasses) ? config.cssClasses : '';
    this.label = isValidString(config.label) ? config.label : '';
    this.validation = config.validation || [];

    this._value = isValidString(config.value) ? config.value : null;
    this._valueChanges$ = new Subject();

    this._validationStatus = true;
    this._validationStatusChanges$ = new Subject();
  }

  protected updateValidationStatus(isValid: boolean) {
    this._validationStatus = isValid;
    this._validationStatusChanges$.next(this._validationStatus);
  }

  protected updateValue(value: ValueType) {
    this._value = value;
    this._valueChanges$.next(this._value);
  }
}

