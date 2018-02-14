import { matchFormControlComponent } from './form-control.factory';
import { VNode } from '@stencil/core/dist/util/interfaces';
import { McaTextualFormControl } from './form-text-control';
import { AbstractFormControlOptions } from './form-contorl.model';

describe('form-control factory', () => {
  it('should return match textual input types', () => {
    const textualInputs: Array<AbstractFormControlOptions> = [
      { inputType: 'email', id: 'test-email', name: 'test-email' },
      { inputType: 'number', id: 'test-number', name: 'test-number' },
      { inputType: 'password', id: 'test-password', name: 'test-password' },
      { inputType: 'search', id: 'test-search', name: 'test-search' },
      { inputType: 'tel', id: 'test-tel', name: 'test-tel' },
      { inputType: 'text', id: 'test-text', name: 'test-text' },
      { inputType: 'url', id: 'test-url', name: 'test-url' },
      { inputType: 'hidden', id: 'test-hidden', name: 'test-hidden' }
    ];

    for (let input of textualInputs) {
      const match: VNode = matchFormControlComponent(input);
      expect(match.vtag).toEqual('mca-form-text-control');
    }
  });
})
