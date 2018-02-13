import { Component, Prop } from '@stencil/core';

export interface McaAppHeaderLink {
  label: string;
  url: string;
}

@Component({
  tag: 'mca-app-header'
})
export class McaAppHeaderComponent {
  @Prop() brandLogo: string;
  @Prop() brandTitle: string;
  @Prop() links: Array<McaAppHeaderLink>;

  renderNav() {
    return (this.links || []).map(link => {
      return <li class="nav-item">
        <stencil-route-link
          url={ link.url }
          class="nav-link"
          activeClass="active">
          { link.label }
        </stencil-route-link>
      </li>
    });
  }

  render() {
    return <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="navbar-brand">
        <img src={ this.brandLogo } alt={ this.brandTitle } width="32" />
      </div>
      <a class="navbar-brand" href="/">{ this.brandTitle }</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse d-flex justify-content-end" id="navbarNav">
        <ul class="navbar-nav nav-pills">
          { this.renderNav() }
        </ul>
      </div>
    </nav>
  }
}
