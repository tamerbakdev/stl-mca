import { Component } from '@stencil/core';
import { McaAppHeaderLink } from './common/mca-header';

@Component({
  tag: 'mca-app',
  styleUrl: 'mca-app.scss'
})
export class McaAppComponent {
  render() {
    const brandTitle = 'MicroAdmin';
    const brandLogo = '/assets/profit.png';
    const links: Array<McaAppHeaderLink> = [
      { label: 'Data', url: '/data' },
      { label: 'Editor', url: '/editor' }
    ];
    const appHeaderProps = { brandTitle, brandLogo, links };

    return <div class="container">
      <mca-app-header { ...appHeaderProps }></mca-app-header>
      <stencil-router>
        <stencil-route url="/" component="mca-home" exact={ true } />
        <stencil-route url="/data" component="mca-data" />
        <stencil-route url="/editor" component="mca-editor" />
      </stencil-router>
      <mca-loader></mca-loader>
    </div>
  }
}
