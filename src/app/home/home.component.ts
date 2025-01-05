import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { HostListener } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [NgFor, NgIf, CurrencyPipe],
})
export class HomeComponent implements OnInit {
  products: any[] = [];
  currentPage = 1;
  isLoading = false;
  hasMoreProducts = true;
  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    if (this.isLoading || !this.hasMoreProducts) return; // Prevent loading if already loading or no more products

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

  @HostListener('window:scroll', [])
  onScroll() {
    const scrollPosition = window.innerHeight + window.scrollY;
    const bottom = document.documentElement.offsetHeight;

    // Only trigger the load if the user scrolls to the bottom (with a small threshold)
    if (
      scrollPosition >= bottom - 100 &&
      !this.isLoading &&
      this.hasMoreProducts
    ) {
      this.loadProducts();
    }
  }
}
