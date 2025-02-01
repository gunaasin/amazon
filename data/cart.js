import { API_END_POINT } from "./api.js";
import { getToken } from "../scripts/checkout.js";
import { resumeCheckOutRender } from "../scripts/checkout/orderSummary.js";
import { renderPaymentSummary } from "../scripts/checkout/paymentSummary.js";
import { loadNav } from "../scripts/stylescripts/navbar.js";
import { getEmailFromJWT } from "../scripts/util/util.js"


export let loadedCart = [];

export async function loadCartFromBackend(token) {
  const email = getEmailFromJWT(token)
  const tokenObject = {
    token: token,
    email: email,
  };

  try {
    const response = await fetch(`${API_END_POINT}api/cart/product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(tokenObject),
    });
    const curerentWindow = window.location.href;

    if (!response.ok && curerentWindow.match("/checkout" )) {
      console.error("Failed to fetch cart products. Redirecting to signin.");
      window.location.href = "/signin.html";
    
      return;
    }

     return  await response.json();

  } catch (error) {
    console.error("Error during fetching cart products:", error);
  }
}


export let cart = JSON.parse(localStorage.getItem("cart"));

if (!cart) {
  cart = [];
}

function setDataIntoLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}



// update the delivery option
export function addProductInCart(request) {
  const token = getToken().token;
  const email = getEmailFromJWT(token)
  console.log(email)
  const productData = {
    productId: request.productId,
    quantity: request.quantity,
    token: token,
    email: email
  }

  const localInfo ={
    token: token,
    email: email
  }

  const postProduct = async (productData) => {
    try {
      const response = await fetch(`${API_END_POINT}api/cart/add`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData)
      });

      if (!response.ok) {
        window.location.href = "/signin.html";
        return new Error(`HTTP error :( ${response.status}`)
      }
      // updateCartCount();
      loadNav(localInfo);
      console.log(' successfully');
    } catch (error) {
      console.error("error", error);
    }
  }
  postProduct(productData);
}


// remove the product
export function removeProductFromCart(id , loadedCart) {
  const token = getToken().token;
  const email = getEmailFromJWT(token)
  const productData = {
    productId: id,
    token: token,
    email: email
  }

  const removeoduct = async (productData) => {
    try {
      const endPoint = await fetch(`${API_END_POINT}api/cart/remove`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData)
      });

      if (!endPoint.ok) {

        window.location.href = "/signin.html";
        setDataIntoLocalStorage();
        return new Error(`HTTP error :( ${endPoint.status}`)
      }
      // updateCartCount();
      console.log(' successfully removed');
      renderPaymentSummary(loadedCart);
      window.location.href = "/checkout.html"
    } catch (error) {
      console.error("error", error);
    }
  }
  removeoduct(productData);
}


// update the delivery option
export function updateDeliveryOption(cartItemId, deliveryOptionId , loadedCart) {

  const token = getToken().token;
  const email = getEmailFromJWT(token)
  const productData = {
    cartItemId: cartItemId,
    deliveryOptionId: deliveryOptionId,
    token: token,
    email: email
  }

  const postProduct = async (productData) => {
    try {
      const response = await fetch(`${API_END_POINT}api/cart/update`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData)
      });

      if (!response.ok) {
        window.location.href = "/signin.html";
        return new Error(`HTTP error :( ${response.status}`)
      }
      
        loadedCart.length = 0;
        loadedCart = await response.json();
         renderPaymentSummary(loadedCart);
         resumeCheckOutRender(loadedCart);
        return;  
      
    } catch (error) {
      console.error("error", error);
    }
    finally{
      
    }
  }
  postProduct(productData)

}