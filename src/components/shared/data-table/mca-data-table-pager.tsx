import {
  Component,
  EventEmitter,
  Event,
  Prop,
  State,
  Watch
} from '@stencil/core';
import { isNumber } from '../../mca-data-utils';


@Component({
  tag: 'mca-data-table-pager'
})
/**
 * Pagination constraints:
 * - -1 to go back
 * - 0 to go forward
 * - 1..n go to a page
 */
export class McaDataTablePage {
  @Prop()
  private pagesCount: number;

  @Prop()
  private currentPage: number;

  @Watch('currentPage')
  private handleCurrentPageChange(page) {
    if (!isNumber(page)) {
      throw new Error('Invalid page number');
    }

    if (page < 1) {
      throw new Error('Invalid page number: must be more than 0');
    }

    this._currentPage = page;
  }

  @Event()
  /**
   * @event pageChanges - event for <mca-data-table-view /> component
   * */
  private pageChanges: EventEmitter<number>;

  @State()
  private _currentPage = 1;

  handlePagerItemClick(id) {
    this.pageChanges.emit(id);
  }

  renderPagerControlsItem(item) {
    const isDisabled = (paginationItem) => {
      switch (paginationItem.id) {
        case -1: return this._currentPage < 2
        case 0: return this._currentPage === this.pagesCount
      }
    }

    const handleClick = (paginationItem) => {
      if (isDisabled(paginationItem)) {
        return;
      }

      const nextPage = paginationItem.id === -1
        ? (this._currentPage - 1)
        : (this._currentPage + 1);

      this.handlePagerItemClick(nextPage);
    }

    const isDisabledState = isDisabled(item);
    const isDisabledButton = isDisabledState ? { disabled: true } : {};
    const pageItemClass = `page-item ${ isDisabledState && 'disabled' }`;

    return (
      <li
        onClick={ () => handleClick(item) }
        class={ pageItemClass }>
        <button type="button" class="page-link" { ...isDisabledButton }>
          { item.label }
        </button>
      </li>
    )
  }

  renderPagerItem(item) {
    const pageActive = this._currentPage === item.id ? 'active' : '';
    const pageClassModifier = 'page-item ' + pageActive;

    return (
      <li class={ pageClassModifier }>
        <span
          onClick={ () => this.handlePagerItemClick(item.id) }
          class="page-link">
          { item.label }
        </span>
      </li>
    )
  }

  renderPagerItems() {
    return Array
      .from(new Array(this.pagesCount), (_, i) => ({ id: i + 1, label: i + 1 }))
      .map(item => this.renderPagerItem(item));
  }

  render() {
    const prevItem = { id: -1, label: 'Previous' };
    const nextItem = { id: 0, label: 'Next' };

    return (
      <div class="mca-pagination-wrapper d-flex justify-content-center">
        <ul class="pagination">
          { this.renderPagerControlsItem(prevItem) }
          { this.renderPagerItems() }
          { this.renderPagerControlsItem(nextItem) }
        </ul>
      </div>
    );
  }
}
