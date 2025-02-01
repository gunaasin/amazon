import getStarRating from "./util/starRatingGenarater.js";
import { API_END_POINT } from "../data/api.js";
import { pageNotFont404 } from "../scripts/stylescripts/pageNotFound.js";

const params = new URLSearchParams(window.location.search);
const product = JSON.parse(atob(decodeURIComponent(params.get("d"))));
const amazonBody = document.querySelector(".amazon-body");
const relatedProductkeyword = product.category.categoryName + ", " + product.category.brand;
let relatedProducts = [];

function loadRelatedProduct() {
    const promise = fetch(`${API_END_POINT}api/products/relatedProduct?keyword=${relatedProductkeyword}`,
        {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
        }
    ).then((response) => {
        return response.json();
    }).then((productData) => {
        relatedProducts = productData.map((item) => { return item; });
    }).catch((error) => {
        amazonBody.innerHTML = "";
        amazonBody.innerHTML = pageNotFont404;
        console.error("some thing is wrong please try again later :(");
        console.error(error);
    });
    return promise;
}

loadRelatedProduct().then(() => {
    loadTheRelatedProduct();
})


function loadTheRelatedProduct() {
    let relatedProductHTML = "";
    relatedProducts.forEach((item) => {
        relatedProductHTML += `
        <a href="/product?d=${encodeURIComponent(btoa(JSON.stringify(item)))}"  target="_blank"" class="product-card">
            <img src="${item.image}" alt="Related Product 1">
            <h3>${item.name}</h3>
            <div class="price">₹ ${item.price}</div>
            <div class="rating">
               
                ${getStarRating(item.rating.stars)}
                ${item.rating.count}
            </div>
            <div class="prime">prime</div>
        </a>`
    });

    const relatedProductGrid = document.querySelector(".products-grid");
    relatedProductGrid.innerHTML = relatedProductHTML;
}



