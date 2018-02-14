import { Component, Prop, Listen } from '@stencil/core';
import { AbstractFormControlOptions } from './form-contorl.model';
import { matchFormControlComponent } from './form-control.factory';
import { AbstractFormControlChanges } from './form-control';

@Component({
  tag: 'mca-form-container'
})
export class McaFormComponent {
  @Prop()
  private controls: Array<AbstractFormControlOptions>;

  @Prop()
  private formId: string;

  @Listen('valueChanges')
  private handleValueChange(change: AbstractFormControlChanges) {
    if (change.target === this.formId) {
      console.log('valueChanges', change.value);
    }
  }

  private renderControl(control: AbstractFormControlOptions) {
    return matchFormControlComponent({ ...control, parentId: this.formId });
  }

  public render() {
    return <form novalidate id={ this.formId }>
      { this.controls.map(control => this.renderControl(control)) }
    </form>
  }
}
