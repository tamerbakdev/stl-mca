import { Component, Event, Prop, Listen, EventEmitter } from '@stencil/core';
import { AbstractFormControlOptions, FormControlState } from './form-contorl.model';
import { matchFormControlComponent } from './form-control.factory';
import { AbstractFormControlChanges } from './form-control';
import { arrayFrom } from '../../mca-data-utils';
import { McaTextualFormControl } from './form-text-control';
import { FormState, FormButton, FormSubmit } from './form.model';

@Component({
  tag: 'mca-form-container'
})
export class McaFormComponent {
  @Prop()
  private formId: string = '';

  @Prop()
  private controls: Array<AbstractFormControlOptions> = [];

  @Prop()
  private buttons: Array<FormButton<any>> = [];

  private value: FormState<string> = null;

  @Listen('valueChanges')
  private handleValueChange({ detail }) {
    const change: AbstractFormControlChanges = detail;

    if (change.target === this.formId) {
      this.value = this.getFormValue();
    }
  }

  @Event()
  private onSubmit: EventEmitter<FormSubmit>;

  private getFormValue(fullState = false): FormState<string> {
    const inputsSelector = `mca-form-text-control[data-parent-id=${ this.formId }]`;
    const inputs = document.querySelectorAll(inputsSelector) as NodeListOf<HTMLElement & McaTextualFormControl>;

    return arrayFrom(inputs).reduce((map, control) => {
      const state = control.getCurrentState();
      map[control.id] = fullState ? state : state.value;
      return map;
    }, {});
  }

  private renderControl(control: AbstractFormControlOptions) {
    return matchFormControlComponent({ ...control, parentId: this.formId });
  }

  private renderButton(button: FormButton<any>) {
    const clickHandler = (() => {
      switch (button.buttonType) {
        case 'submit': return () => button.onClick(this.getFormValue());
        case 'reset': return (event: MouseEvent) => {
          // reset the form
          button.onClick(event);
        };
        case 'button':
        default: return (event) => button.onClick(event)
      }
    });

    return <button
      id={ button.id }
      type={ button.buttonType }
      class={ button.cssClasses }
      onClick={ clickHandler.bind(this) }>
      { button.label }
    </button>
  }

  private handleSubmit(event: Event) {
    event.preventDefault();

    this.onSubmit.emit({
      formId: this.formId,
      value: this.getFormValue()
    });
  }

  public render() {
    return <form
      id={ this.formId }
      onSubmit={ this.handleSubmit.bind(this) }
      novalidate>
      { this.controls.map(control => this.renderControl(control)) }
      { this.buttons.map(button => this.renderButton(button)) }
    </form>
  }
}
