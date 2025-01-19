import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
    selector: 'pager',
    templateUrl: './pager.component.html',
    styleUrl: './pager.component.scss',
    standalone: true,
    imports: [NgFor]
})
export class PagerComponent {

  @Input() totalItems: number = 1;
  @Input() itemsPerPage: number = 10;
  @Output() pageChanged = new EventEmitter<number>();

  currentPage: number = 1;

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.pageChanged.emit(this.currentPage);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.pageChanged.emit(this.currentPage);
    }
  }

  setPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.pageChanged.emit(this.currentPage);
    }
  }
}