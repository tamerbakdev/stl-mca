import {
  Component,
  ComponentDidLoad,
  Prop,
  State,
  Listen
} from '@stencil/core';

import { snakeToTitleCase } from '../../mca-data-utils';
import { McaLoaderComponent } from '../loader/mca-loader';

export interface DataTableHeaderCol {
  id: string;
  label: string;
}

export type DataTableCol = any;
export interface DataTableRow<T> extends Array<T> { }
export type DataTableHeaderRow = DataTableRow<DataTableHeaderCol>;
export type DataTableBodyRow = DataTableRow<DataTableCol>;
export type DataTablePage = Array<DataTableBodyRow>;

export interface DataTableState {
  header: DataTableHeaderRow;
  body: Array<DataTablePage>;
  pagesCount: number;
  currentPage?: number;
}

@Component({
  tag: 'mca-data-table'
})
export class McaDataTable implements ComponentDidLoad {
  @Prop() dataUrl: string;

  @State()
  private data: DataTableState;

  @Listen('requestPagination')
  public handlePaginationReqest({ detail }) {
    const requestedPage: number = detail;

    if ((requestedPage - 1) in this.data.body) {
      this.data = {
        ...this.data,
        currentPage: requestedPage
      }
    } else {
      this.getData()
        .then(data => this.processTableData(data))
        .then(data => this.data = {
          ...this.data,
          body: [ ...this.data.body, data ],
          currentPage: requestedPage
        });
    }
  }

  private readonly loader: McaLoaderComponent = document.querySelector('mca-loader');

  private getData() {
    this.loader.showLoader();

    return fetch(this.dataUrl)
      .then(res => {
        this.loader.hideLoader();
        return res.json();
      })
  }

  private processTableHeader(data: object): DataTableHeaderRow {
    return Object
      .keys(data)
      .map(key => ({ label: snakeToTitleCase(key), id: key }))
  }

  private processTableData(data: any): DataTablePage {
    return data.map(item => Object
      .keys(item)
      .reduce((row, key) => [ ...row, item[key] ], []));
  }

  componentDidLoad() {
    this.getData()
      .then((data): DataTableState => {
        return {
          header: this.processTableHeader(data[0]),
          body: [ this.processTableData(data) ],
          pagesCount: 5,
          currentPage: 1
        }
      })
      .then(data => this.data = data);
  }

  render() {
    return (
      <mca-data-table-view dataParams={ this.data }></mca-data-table-view>
    );
  }
}
