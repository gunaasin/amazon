import { getEmailFromJWT } from "./util/util.js";
import { API_END_POINT } from "../data/api.js";

function getToken() {
  try {
    const storedToken = localStorage.getItem('datacart');
    return storedToken ? JSON.parse(storedToken) : null;
  } catch (error) {
    console.error("Failed to parse token from localStorage:", error);
    return null;
  }
}

const params = new URLSearchParams(window.location.search);

 const {amount ,quantity} =JSON.parse(atob(decodeURIComponent(params.get("checkout"))));
const storedData = getToken();
if (!storedData) {
  console.error("Token not found, redirecting to sign-in.");
  window.location.href = "/signin";
} else {
  const token = storedData.token;
  const email = getEmailFromJWT(token);
console.log(amount);
  const productData = {
    token: token,
    email: email,
    amount: amount ,
    quantity: quantity,
    name: "laptop",
    currency: "INR"
  };

  const postPayment = async (productData) => {
    try {
      const response = await fetch(`${API_END_POINT}api/payment/request`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData)
      });

      if (!response.ok) {
        console.log("nothing")
        throw new Error(`HTTP error :( ${response.status}`);
      }
      
      const data = await response.json();
      window.location.href = data.sessionUrl;
    } catch (error) {
      window.location.href = "/signin";
      console.error("Payment error:", error);
    }
  };

  postPayment(productData);
}

  const removeCartAfterPayment = async (productData) => {

    const information = {
      token:productData.token,
      email:productData.email
    }
    try {
      const response = await fetch(`${API_END_POINT}api/payment/request`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${information.token}`,
        },
        body: JSON.stringify(information)
      });

      if (!response.ok) {
        window.location.href = "/signin";
        throw new Error(`HTTP error :( ${response.status}`);
      }

      const data = await response.json();
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  // removeCartAfterPayment(productData);

