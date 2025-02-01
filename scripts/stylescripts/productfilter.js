import { someData } from "../amazon.js";

document.addEventListener("DOMContentLoaded", () => {
  loadFilterFunction();
})


export function loadFilterFunction(){
  
    const filterSectionHtml = `
      <div class="review">
        <h2 class="category">Category</h2>
        <p class="categorys">${someData.categories[0] ? someData.categories[0].toUpperCase() : '' }</p>
        <h3 class="customer-reviews">Customer Reviews</h3>
        <p><img src="images/ratings/rating-45.png" alt=""> & Up</p>
      </div>
      <div class="price-filter">
        <label>Price</label>
        <div class="price-display">
          <span id="minPriceDisplay">₹500</span> -
          <span id="maxPriceDisplay">₹92,300</span>
        </div>
  
        <!-- Range sliders -->
  
        <div class="slider-container">
          <input type="range" id="minPrice" min="0" max="100000" value="100" step="100">
          <input type="range" id="maxPrice" min="0" max="100000" value="392300" step="100">
          <button id="goButton">Go</button>
        </div>
  
        <!-- Go button -->
  
        <a href="#" id="resetButton">Reset price range</a>
      </div>
  
      <div class="discount-deals-list">
        <ul>
          <h3>Deals & Discounts</h3>
          <li>All Discounts</li>
          <li>Today's Deals</li>
        </ul>
      </div>
  
      <div class="deleiveryoptions">
        <h3>Pay On Delivery</h3>
        <input type="checkbox" name="Eligible" id="">
        <label for="Eligible">Eligible for Pay On Delivery</label>
      </div>
  
      <div class="discount-list">
        <ul>
          <h3>Discount</h3>
          <li>10% Off or more</li>
          <li>25% Off or more</li>
          <li>35% Off or more</li>
          <li>50% Off or more</li>
          <li>60% Off or more</li>
          <li>70% Off or more</li>
        </ul>
      </div>`;
  
    // Inject HTML into the filter section
    document.querySelector(".filter-section").innerHTML = filterSectionHtml;
  
    const minPrice = document.getElementById("minPrice");
    const maxPrice = document.getElementById("maxPrice");
    const minPriceDisplay = document.getElementById("minPriceDisplay");
    const maxPriceDisplay = document.getElementById("maxPriceDisplay");
    const resetButton = document.getElementById("resetButton");

    minPrice.addEventListener("input", updatePrices);
    maxPrice.addEventListener("input", updatePrices);
  
    function updatePrices() {
      let min = parseInt(minPrice.value);
      let max = parseInt(maxPrice.value);
  
      if (min > max) {
    
        let temp = min;
        min = max;
        max = temp;
      }
  
      minPriceDisplay.textContent = `₹${min.toLocaleString()}`;
      maxPriceDisplay.textContent = `₹${max.toLocaleString()}`;
    }
  
    resetButton.addEventListener("click", (e) => {
      e.preventDefault();
      minPrice.value = 100;
      maxPrice.value = 92300;
      updatePrices();
    });
  
    // Initialize prices
    updatePrices();
  };
  