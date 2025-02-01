import { API_END_POINT } from "../data/api.js";
import "./stylescripts/fotter.js";
import "./stylescripts/backtotop.js"
import { getEmailFromJWT } from "./util/util.js";

document.querySelector('.app').innerHTML = `
  <div class="header">
    <img src="./images/amazon-logo-white.png" alt="">
    <h1>Seller Central</h1>
  </div>
  <div class="product-form">
    <h2 class="form-header">Add New Product</h2>
    <form id="productForm">
    <div class="form-group">
        <label for="category">Product Category<span class="required">*</span></label>
        <select id="category" required>
          <option value="">Choose a category</option>
          <option value="electronics">Electronics</option>
          <option value="headphones">Headphones</option>
          <option value="Appliances">Appliances</option>
          <option value="Laptop">Laptop</option>
          <option value="Smartphones">Smartphones</option>
          <option value="home essentials">Home Essentials</option>
          <option value="clothing">Clothing</option>
          <option value="fashion , jewels">fashion & jewels</option>
          <option value="books">Books</option>
          <option value="Bags , wallets">Bags & wallets</option>
          <option value="home">Home & Kitchen</option>
          <option value="Sports , shoes">Sports & shoes</option>
          <option value="toys">Toys & Games</option>
        </select>
      </div>

      <div class="form-group">
        <label for="brandName">Brand Name<span class="required">*</span></label>
        <input type="text" id="brandName" required placeholder="Enter product Brand name">
        <span class="help-text">Maximum 200 characters</span>
      </div>

      <div class="form-group">
        <label for="name">Product Name<span class="required">*</span></label>
        <input type="text" id="name" required placeholder="Enter product name">
        <span class="help-text">Maximum 200 characters</span>
      </div>
      
      <div class="form-group">
        <label for="description">Product Description<span class="required">*</span></label>
        <textarea id="description" rows="4" required placeholder="Describe your product"></textarea>
        <span class="help-text">Include key features and benefits</span>
      </div>
      
      <div class="form-group">
        <label for="image">Product Image URL<span class="required">*</span></label>
        <input type="url" id="image" required placeholder="https://example.com/image.jpg">
        <span class="help-text">Direct link to product image</span>
      </div>
      
      <div class="form-group">
        <label for="price">Price<span class="required">*</span></label>
        <input type="number" id="price" step="0.01" required placeholder="1500">
      </div>
      
      <div class="form-group">
        <label for="keywords">Search Terms<span class="required">*</span></label>
        <input type="text" id="keywords" placeholder="Enter keywords, separated by commas">
        <span class="help-text">Help buyers find your product</span>
      </div>
      
      
      
      <div class="form-group">
        <label for="rating">Initial Rating<span class="required">*</span></label>
        <div class="rating-group">
          <input type="number" id="rating" min="1" max="5" step="0.1" class="rating-input" required>
         <div class="rating">
            <span class="stars">★★★★☆</span>       
        </div>
        </div>
        <span class="help-text">Rating 1 to 5</span>
      </div>
      
      <button type="submit" class="submit-btn">Add Product</button>
    </form>
  </div>
`


function getToken() {
  try {
    const storedToken = localStorage.getItem('datacart');
    return storedToken === null ? "": JSON.parse(storedToken); ///window.location.href = "/signin" 
  } catch (error) {
    console.error("Failed to parse token from localStorage:", error);
    return null;
  }
}

// Form submission handling
const form = document.getElementById('productForm');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const token = getToken().token;
  const email = getEmailFromJWT(token);
  const productData = {
    token:token,
    email:email,
    name: document.getElementById('name').value,
    description: document.getElementById('description').value,
    image: document.getElementById('image').value,
    price: parseInt(document.getElementById('price').value),
    keywords: document.getElementById('keywords').value, //.split(',').map(k => k.trim()),
    category: {
      categoryName: document.getElementById('category').value,
      brand: document.getElementById('brandName').value
    },
    rating: {
      stars: parseFloat(document.getElementById('rating').value)
    }
  };

  const postProduct = async (productData) => {
    try {
      const response = await fetch(`${API_END_POINT}api/admin`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
           Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData)
      });

      if (!response.ok) {
        return new Error(`HTTP error :( ${response.status}`)
      }
      const data = await response.json();
      // console.log('Product saved successfully:', data);
      alert('Product added successfully!');
    } catch (error) {
      alert("This page not for all, seller only can access")
      window.location.href="/";
      // console.error("error", error);
    }
  }
  postProduct(productData);
  
  // form.reset();
});