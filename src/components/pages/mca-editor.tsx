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
        id: 'session-id',
        name: 'session-id',
        placeholder: 'Enter text',
        label: 'Session Id',
        cssClasses: 'form-control'
      },
      {
        inputType: 'text',
        id: 'app',
        name: 'app',
        placeholder: 'Enter text',
        label: 'App',
        cssClasses: 'form-control'
      },
      {
        inputType: 'text',
        id: 'version',
        name: 'version',
        placeholder: 'Enter text',
        label: 'Version',
        cssClasses: 'form-control'
      },
      {
        inputType: 'text',
        id: 'level',
        name: 'level',
        placeholder: 'Enter text',
        label: 'Level',
        cssClasses: 'form-control'
      }
    ]
    return (
      <div class="mt-4">
        <div class="row">
          <div class="col-6 offset-md-3">
            <mca-form-container controls={ controls } />
          </div>
        </div>
      </div>
    );
  }
}
