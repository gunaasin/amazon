
import { resumeCheckOutRender } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { loadCartFromBackend, loadedCart } from '../data/cart.js';
import './stylescripts/fotter.js';
import './stylescripts/backtotop.js';


export function getToken() {
  try {
    const storedToken = localStorage.getItem('datacart');
    return storedToken === null ? "" : JSON.parse(storedToken); // window.location.href = "/signin.html"
  } catch (error) {
    console.error("Failed to parse token from localStorage:", error);
    return null;
  }
}




export async function checkoutProcess() {
  try {
    const loadedCart = await loadCartFromBackend(getToken().token)
    resumeCheckOutRender(loadedCart);
    renderPaymentSummary(loadedCart);
  } catch (error) {
    console.error("Something is wrong during the checkout process!", error);
  }
}
checkoutProcess();



