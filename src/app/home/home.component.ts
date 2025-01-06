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

  ngOnInit() {
    this.loadProducts('initial');
  }

  loadProducts(isOnInit?: string) {
    if (this.isLoading || !this.hasMoreProducts) return; // Prevent loading if already loading or no more products

    this.isLoading = true;
    axios
      .get(
        `https://fakestoreapi.com/products?page=${this.currentPage}&limit=10`
      )
      .then((response) => {
        if (response.data.length > 0) {
          this.products.push(...response.data);
          if (isOnInit) this.filteredProducts = [...this.products];
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

  @HostListener('window:scroll', [])
  onScroll() {
    const currentScrollPosition = window.scrollY;
    const scrollPosition = window.innerHeight + currentScrollPosition;
    const bottom = document.documentElement.offsetHeight;

    // Prevent requests if scrolling upwards
    if (currentScrollPosition < this.previousScrollPosition) {
      this.previousScrollPosition = currentScrollPosition;
      return;
    }

    // Only trigger the load if the user scrolls to the bottom (with a small threshold)
    if (
      scrollPosition >= bottom - 100 &&
      !this.isLoading &&
      this.hasMoreProducts
    ) {
      this.loadProducts();
    }

    // Update the previous scroll position
    this.previousScrollPosition = currentScrollPosition;
  }

  onSearchTermChange(searchTerm: string) {
    this.filteredProducts = this.products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}
