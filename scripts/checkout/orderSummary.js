import { cart, updateDeliveryOption, loadedCart,removeProductFromCart } from "../../data/cart.js";
import { deliveryOptions, getDeleiveryOption ,getDeliveryDate } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";


export function resumeCheckOutRender(loadedCart) {
  const orders = document.querySelector(".order-summary");

  let ordersHTML = "";

  if (loadedCart.length == 0) {
    ordersHTML += `<div class="cart-item-container>
        empty Cart
      </div> `
  } else {
    loadedCart.forEach((cartItem) => {
      const product = cartItem.productResponseForCartDTO;
      const deliveryOptionId = cartItem.deliveryOptionId;
      const deliveryOption = getDeleiveryOption(deliveryOptionId);
      const today = dayjs();
      const deleveryDate = today.add(deliveryOptionId, 'days');
      const dateString = deleveryDate.format('dddd, MMMM D');

      ordersHTML += `
          <div class="cart-item-container js-cart-item-container-${product.id}">
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>
            <div class="cart-item-details-grid">
              <img class="product-image" src="${product.image}">
              <div class="cart-item-details">
                <div class="product-name">
                  ${product.name}
                </div>
                <div class="product-price">₹ 
                   ${product.price}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Share
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-product" data-producdId="${product.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deleveryOptionHTML(product.id, cartItem)}
              </div>

            </div>
          </div>`

    })
  };



  /// genarate the deleivery-Options html 
  function deleveryOptionHTML(id, cartItem) {

    let optionsHtml = "";
    deliveryOptions.forEach((options) => {
      const today = dayjs();
      const deleveryDate = today.add(options.dDate, 'days');
      const dateString = deleveryDate.format('dddd, MMMM D');
      const shipingFees = options.dCharge === 0 ? "FREE" : `₹ ${options.dCharge}`;
      const ischecked = options.dID === cartItem.deliveryOptionId;
      optionsHtml += ` 
                        <div class="delivery-option js-delivery-option" 
                            data-productId="${cartItem.id}"
                            data-deliveryOption-Id="${options.dID}">

                            <input type="radio"
                            ${ischecked ? 'checked' : ''}
                            class="delivery-option-input "
                            name="delivery-option-${id}">
            
                            <div>
                                <div class="delivery-option-date">
                                    ${dateString}
                                </div>
                                <div class="delivery-option-price">
                                    ${shipingFees} - Shipping
                                </div>
                            </div>
                        </div>
                    `
    });

    return optionsHtml;
  }

  orders.innerHTML = ordersHTML;

  document.querySelectorAll(".js-delete-product")
    .forEach((link) => {
      link.addEventListener("click", () => {
        const delProId = link.getAttribute("data-producdId");
         removeProductFromCart(delProId , loadedCart);
         renderPaymentSummary(loadedCart);
         const removeDom = document.querySelector(`.js-cart-item-container-${delProId}`);
         removeDom.remove();


      });
    });

  document.querySelectorAll(".js-delivery-option")
    .forEach((element) => {
      element.addEventListener("click", () => {
        updateDeliveryOption(element.getAttribute("data-productId"), element.getAttribute("data-deliveryOption-Id") , loadedCart);
        resumeCheckOutRender(loadedCart);
        
      });
    });

}
