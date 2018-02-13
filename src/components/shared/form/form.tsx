import { Component, Prop } from '@stencil/core';
import { AbstractFormControlOptions } from './form-contorl.model';
import { matchFormControlComponent } from './form-control.factory';

@Component({
  tag: 'mca-form-container'
})
export class McaFormComponent {
  @Prop()
  private controls: Array<AbstractFormControlOptions>;

  private renderControl(control: AbstractFormControlOptions) {
    return matchFormControlComponent(control);
  }

  public render() {
    return <form novalidate>
      { this.controls.map(control => this.renderControl(control)) }
    </form>
  }
}
