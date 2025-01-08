import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { HostListener } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { CurrencyPipe } from '@angular/common';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [NgFor, NgIf, CurrencyPipe, SearchComponent],
})
export class HomeComponent implements OnInit {
  products: any[] = [];
  currentPage = 1;
  isLoading = false;
  hasMoreProducts = true; // To check if there are more products to load
  previousScrollPosition = 0; // Store the last scroll position
  filteredProducts: any[] = [];
  filterInputValue: string = '';
  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.isLoading = true;
    axios
      .get(
        `https://fakestoreapi.com/products?page=${this.currentPage}&limit=10`
      )
      .then((response) => {
        if (response.data.length > 0) {
          this.products.push(...response.data);
          this.currentPage++;
        } else {
          this.hasMoreProducts = false; // No more products to load
        }
        this.isLoading = false;
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        this.isLoading = false;
      });
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (this.isLoading || !this.hasMoreProducts) return; // Prevent loading if already loading or no more products


    let pos =
      (document.documentElement.scrollTop || document.body.scrollTop) +
      document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    // pos/max will give you the distance between scroll bottom and and bottom of screen in percentage.

    if (pos >= max - 300) {
      this.loadProducts();
    }
  }
  onSearchTermChange(searchTerm: string) {
    this.filterInputValue = searchTerm.trim(); // Update the filter input value
    if (this.filterInputValue) {
      this.filteredProducts = this.products.filter((product) =>
        product.title
          .toLowerCase()
          .includes(this.filterInputValue.toLowerCase())
      );
    } else {
      this.filteredProducts = this.products; // Show all products if no filter
    }
  }
}
