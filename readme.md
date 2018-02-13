# Stencil App Starter

Stencil is a compiler for building fast web apps using Web Components.

Stencil combines the best concepts of the most popular frontend frameworks into a compile-time rather than run-time tool.  Stencil takes TypeScript, JSX, a tiny virtual DOM layer, efficient one-way data binding, an asynchronous rendering pipeline (similar to React Fiber), and lazy-loading out of the box, and generates 100% standards-based Web Components that run in any browser supporting the Custom Elements v1 spec.

Stencil components are just Web Components, so they work in any major framework or with no framework at all. In many cases, Stencil can be used as a drop in replacement for traditional frontend frameworks given the capabilities now available in the browser, though using it as such is certainly not required.

Stencil also enables a number of key capabilities on top of Web Components, in particular Server Side Rendering (SSR) without the need to run a headless browser, pre-rendering, and objects-as-properties (instead of just strings).

## Getting Started

To start a new project using Stencil, clone this repo to a new directory:

```bash
git clone https://github.com/ionic-team/stencil-starter.git my-app
cd my-app
git remote rm origin
```

and run:

```bash
npm install
npm start
```

To view the build, start an HTTP server inside of the `/www` directory.

To watch for file changes during development, run:

```bash
npm run dev
```

To build the app for production, run:

```bash
npm run build
```

To run the unit tests once, run:

```
npm test
```

To run the unit tests and watch for file changes during development, run:

```
npm run test.watch
```

The idea is that we will generate a components from a json stream that we get from a REST callout
the component should have the possibility to be updated if data is updated or the model is updated
imagine a table with 10 lines and 3 columns
then if user clicked on next button to show the next 10 lines
the render must change
or if the model change, for an example, we add a new column, so the render must also change
do you see what I mean
we will start by testing a view list component and a form component + a menu + toolbar components
> you mean we will have sort of realtime database(like firebase)?
yes but it will not be firebase unfortunately :smile:
We are building this backend
So with this system,
we can modify the model of DB
and generate automatically the interface
the first step will be generating those components separately
the next step will be adding a template logic system
so user can give a template and our components will be inserted into it (because of the power of web components agnostic logic)
so we can handle a reactjs, ionic, angular, meteor vueJs or any frontend framework
think also about css, every component should have its inner css and outer css (its style in parent container for example)