import "./stylescripts/navbar.js";
import "./stylescripts/fotter.js";
import "./stylescripts/backtotop.js";
import { loadedCart } from "../data/cart.js";
import "./relatedProductItem.js";
import { addProductInCart } from "../data/cart.js";
import getStarRating from "./util/starRatingGenarater.js";
import "./review.js";


const params = new URLSearchParams(window.location.search);
export const product = JSON.parse(atob(decodeURIComponent(params.get("d"))));


document.querySelector(".product-grid")
    .innerHTML = `
            <!-- Product Images -->
            <div class="product-images">
                <div class="thumbnail-list">
                    <img src="${product.image}" alt="Product thumbnail 1" class="thumbnail active" data-color="color1"> 
                    <img src="${product.image}" alt="Product thumbnail 2" class="thumbnail " data-color="color2">
                    <img src="${product.image}" alt="Product thumbnail 3" class="thumbnail " data-color="color3">
                </div>
                <div class="main-image">
                    <i class="fa-solid fa-arrow-up-from-bracket" id="share-product"></i>
                    <img src="${product.image}" alt="Main product image" class="product_img">
                </div>
            </div>

            <!-- Product Information -->
            <div class="product-info">
                <h1>${product.name}</h1>
                <div class="brand">by ${product.category.brand}</div>
                
                <div class="rating">
                    ${getStarRating(product.rating.stars)}
                    <a href="#reviews">${product.rating.count} ratings</a>
                </div>
                <div class="price-block">
                       ${product.price > 1000 ? ` <div class="deal"> <p>Today Deal</p> </div>` : ""}
                    <div class="price">
                      <p class="discount">MRP: <span>₹ ${(product.price * 32 / 100) + product.price}</span></p>
                        <span class="currency">₹</span>
                        <span class="amount">${product.price}</span>
                        <span class="cents">.00</span>
                      
                    </div>
                    
                    <div class="shipping">FREE Returns</div>
                    ${product.price > 3000 ? ` <div class="prime"></div>` : ""}
                </div>

                 <!-- Service Features -->
                 <div class="features-grid">
                    <div class="feature-item">
                        <img src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-returns._CB484059092_.png" alt="7 days replacement">
                        <span>7 days Replacement</span>
                    </div>
                    <div class="feature-item">
                        <img src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-amazon-delivered._CB485933725_.png" alt="Free Delivery">
                        <span>Free Delivery</span>
                    </div>
                    <div class="feature-item">
                        <img src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-warranty._CB485935626_.png" alt="Warranty">
                        <span>1 Year Warranty</span>
                    </div>
                    <div class="feature-item">
                        <img src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-cod._CB485937110_.png" alt="Pay on Delivery">
                        <span>Cash on Delivery</span>
                    </div>
                    <div class="feature-item">
                        <img src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-top-brand._CB617044271_.png" alt="Top Brand">
                        <span>Top Brand</span>
                    </div>
                    <div class="feature-item">
                        <img src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-amazon-delivered._CB485933725_.png" alt="Amazon Delivered">
                        <span>Amazon Delivered</span>
                    </div>
                    <div class="feature-item">
                        <img src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/trust_icon_free_shipping_81px._CB630870460_.png" alt="Secure transaction">
                        <span>Secure transaction</span>
                    </div>
                </div>

                <div class="about">
                    <h2>About this item</h2>
                    <ul>
                        <li>${product.description}</li>
                        <li>Adaptive Transparency lets outside sounds in while reducing loud environmental noise</li>
                        <li>Personalized Spatial Audio with dynamic head tracking</li>
                        <li>Multiple ear tips for a customizable fit</li>
                    </ul>
                </div>
            </div>

            <!-- Buy Box -->
            <div class="buy-box">
                <div class="price">
                
                    <span class="currency">₹</span>
                    <span class="amount">${product.price}</span>
                    <span class="cents">.00</span>
                      <p class="discount">MRP: <span>₹ ${(product.price * 32 / 100) + product.price}</span></p>
                </div>
                
                <div class="delivery">
                    <span class="free">FREE scheduled delivery as soon as Friday, </span>
                    <span class="date">Order within 10 hrs 24 mins.</span>
                    <span class="date"></span>
                    <a href="#" class="location">
                        <i class="fas fa-map-marker-alt"></i> &nbsp; Delivering to Bengaluru 562129
                        Update location</a>
                </div>
    

                <div class="stock">In Stock</div>

                <div class="secure">
                    <img src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/trust_icon_free_shipping_81px._CB630870460_.png" alt="Secure">
                    Secure transaction
                </div> 

                <div class="quantity">
                    <select id ="options">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </div>

                <button class="add-to-cart" data-product-id="${product.id}">Add to Cart</button>
                <button class="buy-now" id="buy-now">Buy Now</button>

            </div>
 `;

const selectQuatity = document.querySelectorAll("#options");
let selectedValue = 1;
selectQuatity.forEach((select) => {
    select.addEventListener("change", () => {
        selectedValue = parseInt(select.value);
    });
});

document.getElementById('share-product').addEventListener('click', () => {

})



// add to cart array section
function addToCartFunction(productId) {
    let productIsThere;

    // after click the add to cart the select section change to 1
    selectQuatity.forEach((select) => {
        select.value = 1;
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
        button.innerHTML = 'Added to cart';

        const productId = button.getAttribute("data-product-id");
        console.log(productId)
        addToCartFunction(productId);

    });
});


// redairect to buying section

document.querySelector(".buy-now").addEventListener("click", () => {
    let dummy = product.quantity
    if (dummy) {
        if (selectedValue > 1) {
            dummy.quantity += selectedValue;
        } else {
            dummy.quantity += 1;
        }
    } else {
        const Request = {
            amount: product.price,
            quantity: selectedValue
        }
        
            window.location.href= `/payment.html?checkout=${encodeURIComponent(btoa(JSON.stringify(Request)))}`;
        
        
    }
    
})



document.addEventListener("DOMContentLoaded", () => {
    const thumbnails = document.querySelectorAll(".thumbnail");
    const mainImage = document.querySelector(".product_img");


    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener("mouseover", () => {
            const color = thumbnail.getAttribute("data-color");
            if (color === "color1") {
                mainImage.classList.add("color1");
                mainImage.classList.remove("color2");
                mainImage.classList.remove("color3");

            } else if (color === "color2") {
                mainImage.classList.add("color2");
                mainImage.classList.remove("color1");
                mainImage.classList.remove("color3");
            } else {
                mainImage.classList.add("color3");
                mainImage.classList.remove("color2");
                mainImage.classList.remove("color1");
            }
            thumbnails.forEach(thumb => thumb.classList.remove("active"));
            thumbnail.classList.add("active");
        });
    });
});


