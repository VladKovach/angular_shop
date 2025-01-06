import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  template: `
    <div class="search-container">
      <input
        type="text"
        class="search-input"
        [placeholder]="placeholder"
        (input)="onSearch($event)"
      />
    </div>
  `,
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  @Input() placeholder: string = 'Search for products...'; // Default value
  @Output() searchTerm = new EventEmitter<string>();

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm.emit(value); // Emit the search term to parent
  }
}
