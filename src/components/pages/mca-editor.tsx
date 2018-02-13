import { Component } from '@stencil/core';
import { AbstractFormControlOptions } from '../shared/form/form-contorl.model';


@Component({
  tag: 'mca-editor'
})
export class McaEditorPage {

  render() {
    const controls: Array<AbstractFormControlOptions> = [
      {
        inputType: 'text',
        id: 'asdasdasd',
        name: 'asdasdasd',
        placeholder: 'Enter text',
        // value?,
        // cssClasses?,
        // label?,
        // validation?,
      }
    ]
    return (
      <mca-form-container controls={ controls } />
    );
  }
}
