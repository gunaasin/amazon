import './stylescripts/fotter.js';
import { API_END_POINT } from '../data/api.js';
import './stylescripts/backtotop.js';
import './stylescripts/navbar.js';

function getToken() {
    try {
        const storedToken = localStorage.getItem('datacart');
        return storedToken ? JSON.parse(storedToken) : null;
    } catch (error) {
        return null;
    }
}

async function fetchData(paramValue) {

    const token = getToken().token;
    try {
        const url = `${API_END_POINT}api/get/orders?param=${paramValue}`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });

        if (!response.ok) {
            window.location.href="/signin.html";
        }

        const data = await response.json();
    } catch (error) {
        
    }
}

fetchData("exampleValue");


const orderHtml = `
<div class="order-container">
    <div class="order-header">
    <div class="order-header-left-section">
        <div class="order-date">
        <div class="order-header-label">Order Placed:</div>
        </div>
        <div class="order-total">
        </div>
    </div>

    <div class="order-header-right-section">
        <div class="order-header-label">Order ID:</div>
        <div>b6b6c212-d30e-4d4a-805d-90b52ce6b37d</div>
    </div>
    </div>
    <div class="order-details-grid">
    <div class="product-image-container">
        <img src="https://pixcap.com/cdn/library/templates/055d029c-03c8-4ca5-9efa-57299c1148ad/thumbnail/937c83d9-0c59-4236-ac7d-d97a61bcd0c8_transparent_null_400.webp">
    </div>

    <div class="product-details">
        <div class="product-name">
   
        </div>
        <div class="product-delivery-date">
        Arriving on: Monday 10 Pm
        </div>
        <div class="product-quantity">
        Quantity: 2
        </div>
        <button class="buy-again-button button-primary">
        <img class="buy-again-icon" src="images/icons/buy-again.png">
        <span class="buy-again-message">Buy it again</span>
        </button>
    </div>

    <div class="product-actions">
        <a href="tracking">
        <button class="track-package-button button-secondary">
            Track package
        </button>
        </a>
    </div>
    </div>

</div>`
const orderContiner = document.querySelector(".orders-grid").innerHTML=orderHtml;