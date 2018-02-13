import {
  Component,
  Prop,
  Event,
  State,
  Watch,
  Listen,
  EventEmitter
} from '@stencil/core';

import { DataTableState } from './mca-data-table';
import { isNumber, isObject, isEmptyArray } from '../../mca-data-utils';

const DATA_TABLE_DEFAULT: DataTableState = {
  header: [],
  body: [],
  pagesCount: 1,
  currentPage: 1
};

@Component({
  tag: 'mca-data-table-view'
})
export class McaDataTableView {
  @State()
  private data: DataTableState = { ...DATA_TABLE_DEFAULT };

  @Prop()
  private dataParams: DataTableState;

  @Watch('dataParams')
  private handleDataParams(newValue: DataTableState, oldValue: DataTableState) {
    this.data = isObject(newValue) ? newValue : { ...DATA_TABLE_DEFAULT };
  }

  @Event()
  private requestPagination: EventEmitter<number>;

  @Listen('pageChanges')
  private handlePageChange(event) {
    this.requestPagination.emit(event.detail);
  }

  private renderRows() {
    if (isEmptyArray(this.data.body)) {
      return [];
    }

    const currentTableBodyPage = this.data.body[this.data.currentPage - 1];
    return currentTableBodyPage.map(row => <tr>
      { row.map(col => <td>{ col }</td>) }
    </tr>);
  }

  private renderHeaderRow() {
    return this.data.header.map(col => (
      <th data-mca-header-id={ col.id }>{ col.label }</th>
    ));
  }

  private renderPagination() {
    if (this.data.body.length > 0) {
      const currentPage = isNumber(this.data.currentPage) && this.data.currentPage > 0
        ? this.data.currentPage
        : 1;
      const pagesCount = isNumber(this.data.pagesCount) && this.data.pagesCount > 0
        ? this.data.pagesCount
        : 1;
      const tablePagerProps = { currentPage, pagesCount }

      return <mca-data-table-pager { ...tablePagerProps } />;
    }
  }

  public render() {
    return [
      <table class="table table-bordered">
        <thead>
          <tr>{ this.renderHeaderRow() }</tr>
        </thead>
        <tbody>
          { this.renderRows() }
        </tbody>
      </table>,
      this.renderPagination()
    ];
  }
}
