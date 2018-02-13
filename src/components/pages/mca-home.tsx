import { Component } from '@stencil/core';

@Component({
  tag: 'mca-home'
})
export class McaHomePage {
  render() {
    return <div>
      <h1 class="text-center display-4">Welcome to <span class="text-danger">MicroAdmin</span> app!</h1>
      <div class="text-center">
        <img
          src="/assets/profit.png"
          alt="App icon"
          width="256"/>
      </div>
    </div>
  }
}
