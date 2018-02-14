import { Component, Listen } from '@stencil/core';
import { AbstractFormControlOptions } from '../shared/form/form-contorl.model';
import { FormButton } from '../shared/form/form.model';


@Component({
  tag: 'mca-editor'
})
export class McaEditorPage {
  @Listen('onSubmit')
  private handleSubmit({ detail }) {
    console.log('handleSubmit', detail);
  }

  private controls: Array<AbstractFormControlOptions> = [
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
  ];

  private buttons: Array<FormButton<any>> = [
    {
      buttonType: 'submit',
      id: 'submit-button',
      cssClasses: 'btn btn-primary',
      label: 'Submit'
    }
  ];

  render() {
    return (
      <div class="mt-4">
        <div class="row">
          <div class="col-6 offset-md-3">
            <mca-form-container
              controls={ this.controls }
              buttons={ this.buttons }
              formId={ 'test-form' } />
          </div>
        </div>
      </div>
    );
  }
}
