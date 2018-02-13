import { Component } from '@stencil/core';

@Component({
  tag: 'mca-data'
})
export class McaDataPage {
  public dataUrl: string;

  constructor() {
    this.dataUrl = 'https://my.api.mockaroo.com/session_entries.json?key=1d4d6f30';
  }

  render() {
    return [
      <h1 class="m-4">Data Page</h1>,
      <mca-data-table dataUrl={this.dataUrl} />
    ]
  }
}
