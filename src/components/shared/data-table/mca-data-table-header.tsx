import { Component, Prop } from '@stencil/core';
import { DataTableHeaderCol } from './mca-data-table';


@Component({
  tag: 'mca-data-table-header'
})
export class McaDataTableHeader {
  @Prop()
  headerRow: Array<DataTableHeaderCol> = [];

  render() {
    return <tr>
      { this.headerRow.map(col => (
        <th data-mca-header-id={ col.id }>{ col.label }</th>
      )) }
    </tr>
  }
}
