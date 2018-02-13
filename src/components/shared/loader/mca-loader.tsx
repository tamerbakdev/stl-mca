import { Component, State, Method } from '@stencil/core';

@Component({
  tag: 'mca-loader',
  styleUrl: 'mca-loader.scss'
})
export class McaLoaderComponent {
  @State()
  public isPresent = false;

  @Method()
  public showLoader() {
    this.isPresent = true;
  }

  @Method()
  public hideLoader() {
    this.isPresent = false;
  }

  render() {
    const attrs = {
      class: `mca-loader ${ this.isPresent ? 'present' : '' }`
    }

    return (
      <div { ...attrs }>
        <div class="mca-loader-backdrop"></div>
        <div class="mca-loader-wrapper">
          <div class="mca-folding-cube">
            <div class="mca-cube1 mca-cube"></div>
            <div class="mca-cube2 mca-cube"></div>
            <div class="mca-cube4 mca-cube"></div>
            <div class="mca-cube3 mca-cube"></div>
          </div>
          <h1 class="h4 text-center mca-loader-message">Loading</h1>
        </div>
      </div>
    )
  }
}
