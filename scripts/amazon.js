import { loadedCart ,addProductInCart } from "../data/cart.js";
import { products, loadProductFromBackend, loadProductBasedOnSearch } from "../data/products.js";
import { loadFilterFunction } from "./stylescripts/productfilter.js";
import './stylescripts/fotter.js';
import './stylescripts/backtotop.js';

loadProductFromBackend().then(() => {
  products.length === 0 ? loadProductNotFound() : loadTheProduct();
  loadFilterFunction();
});



const searchBarData = document.getElementById("search-bar");
const searchBtn = document.getElementById("search-btn");
document.addEventListener("DOMContentLoaded", () => {
  searchBarData.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && searchBarData.value!=="" ) {
      let keyword = searchBarData.value;
      console.log(keyword)
      products.length = 0;
      someData.categories.length = 0;
      loadProductBasedOnSearch(keyword).then(() => {
        products.length === 0 ? loadProductNotFound() : loadTheProduct();
        loadFilterFunction();
      });
      searchBarData.value = "";
    }

    searchBtn.addEventListener("click", () => {
      let keyword = searchBarData.value;
      products.length = 0;
      someData.categories.length = 0;
      if(keyword){
        loadProductBasedOnSearch(keyword).then(() => {
          products.length === 0 ? loadProductNotFound() : loadTheProduct();
          loadFilterFunction();
        });
      }
      searchBarData.value = "";
    });
  })
});




// Check if the 'ds' parameter exists in the URL
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);

  if (params.has("ds")) {
    const keyword = JSON.parse(atob(decodeURIComponent(params.get("ds")))); // Get the value of 'ds' // decode the value based on atob Base64
    someData.categories.length = 0;
    products.length=0;
    console.log(keyword);
    loadProductBasedOnSearch(keyword).then(() => {
      products.length === 0 ? loadProductNotFound() : loadTheProduct();
      loadFilterFunction();
    });
  }
});



// lode the data for filter page categories info
export const someData = {
  categories: [],
};



export function loadTheProduct() {
  const productNotFound = document.querySelector(".product-not-found");

  if (productNotFound.innerHTML.trim() !== "") {
    productNotFound.innerHTML = "";
  }

  let productHTML = "";
  products.forEach((products) => {

    someData.categories.push(products.category.categoryName);
    productHTML += `
        <div class="product-container">
         <a href="product?d=${encodeURIComponent(btoa(JSON.stringify(products)))}"  target="_blank" class="callable-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${products.image}">
          </div>

          <div class="product-name limit-text-to-2-lines"> ${products.name}</div>

          
           <div class="product-rating-container">
                    <div class="stars">★★★★☆</div>
                    <p class="product-rating-count link-primary" >${products.rating.count}</p>
            </div>

          <div class="product-price"> 
            
            <span class="currency">₹</span>
            ${products.price}
            <p class="discount">MRP: <span>₹ ${(products.price * 32 / 100) + products.price}</span></p>
          </div>
          </a>

          <div class="product-quantity-container">
            <select id ="options">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
         
          ${products.category.categoryName === 'clothing' ?
        `<a href="images/clothing-size-chart.png" target="_blank" class="size-chart">size chart</a>` : ``}
          
          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added to cart
          </div>

           ${products.price > 1000 ? ` <div class="prime"> </div>` : ""}
           ${products.price >= 3000 ? ` <div class="deal">   <p>Today Deal</p>  </div> ` : ""}

          <button class="add-to-cart-button button-primary add-to-cart" data-product-id="${products.id}">
            Add to Cart
          </button>
        </div>
      `
  });

 


  // load the html in a page
  const productContainer = document.querySelector(".js-product-container");
  productContainer.innerHTML = productHTML;

  // seclect the quantity in dropdown
  const selectQuatity = document.querySelectorAll("#options");
  let selectedValue = 1;
  selectQuatity.forEach((select) => {
    select.addEventListener("change", () => {
      selectedValue = parseInt(select.value);
    });
  });


  // add to cart array section
  function addToCartFunction(productId) {
    let productIsThere;

    // after click the add to cart the select section change to 1
    selectQuatity.forEach((select) => {
      select.value = 1;
    })

    loadedCart.forEach((item) => {
      
      if (item.productResponseForCartDTO.id === productId) {
        productIsThere = item;
      }
    })

    if (productIsThere) {
      if (selectedValue > 1) {
        productIsThere.quantity += selectedValue;
      } else {
        productIsThere.quantity += 1;
      }
    } else {
      const Request = {
        productId: productId,
        quantity: selectedValue
      }
      addProductInCart(Request);
    }
  }

  /* add to cart section */
  const addToCart = document.querySelectorAll(".add-to-cart");
  addToCart.forEach((button) => {
    button.addEventListener("click", () => {
      button.innerHTML = '<img src="images/icons/checkmark.png" class="tick-img">Added to cart';
      setTimeout(() => {
        button.innerHTML = "Add to Cart";
      }, 4000);

      const productId = button.getAttribute("data-product-id");
      addToCartFunction(productId);
    });
  });

}


// load product not found


export function loadProductNotFound() {
  const productContainer = document.querySelector(".js-product-container");
  if (productContainer) {
    if (productContainer.innerHTML.trim() !== "") {
      productContainer.innerHTML = "";
    }
  }
  const productNotFound = document.querySelector(".product-not-found");

  productNotFound.innerHTML = "";
  productNotFound.innerHTML = `
      <main class="not-found-container">
      <div class="error-box">
          <img src="./images/error.png" alt="404">
          <h2 class="error-subtitle">No such product exists</h2>
          <p class="error-message">We couldn't find the product you're looking for. It might have been removed or is currently unavailable.</p>
      </div>
      
      <div class="links">
          <a href="/" class="link">Back to Home Page</a>
          <a href="https://gunaportfoliogn.vercel.app/" class="link" target="_blank">Contact</a>
      </div>
      </main>
  `

}





