exports.config = {
  bundles: [
    { components: ['mca-app', 'mca-app-header', 'mca-home', 'mca-data', 'mca-loader', 'mca-editor'] },
    { components: ['mca-form-container', 'mca-form-text-control'] },
    { components: ['mca-data-table', 'mca-data-table-view', 'mca-data-table-header', 'mca-data-table-filter', 'mca-data-table-pager'] }
  ],
  collections: [
    { name: '@stencil/router' }
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**',
  port: 3000
};
