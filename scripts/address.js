import "./stylescripts/navbar.js";
import "./stylescripts/fotter.js";
import "./stylescripts/backtotop.js";
import { getToken } from "./checkout.js";
import { getEmailFromJWT } from "./util/util.js";
import { API_END_POINT } from "../data/api.js";

let getAddress = [];

// DOM Elements
const addAddressCard = document.getElementById("addAddressCard");
const addressModal = document.getElementById("addressModal");
const closeBtn = document.querySelector(".close");
const addressForm = document.getElementById("addressForm");
const addressList = document.getElementById("addressList");
const typeButtons = document.querySelectorAll(".type-btn");
const modalTitle = document.querySelector(".modal-content h2");
const submitBtn = document.querySelector(".submit-btn");

// Load addresses on page load
function loadAddress() {
  const token = getToken().token;
  const email = getEmailFromJWT(token);

  const getAddressInfo = async () => {
    try {
      const response = await fetch(
        `${API_END_POINT}api/address/get?token=${token}&email=${email}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
          window.location.href="/signin.html";
        throw new Error(`HTTP error: ${response.status}`);
      }

      const res = await response.json();
      return res;
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  getAddressInfo().then((response) => {
    if (response) {
      getAddress = response;
      if(getAddress.name!==null) {
        addAddressCard.style.display = "none";
       }
      renderAddresses();
    }

  });
}

// Add a new address or update an existing address
addressForm.addEventListener("submit", (e) => {
  e.preventDefault();
  

  const token = getToken().token;
  const email = getEmailFromJWT(token);

  const addressData = {
    token: token,
    email: email,
    name: document.getElementById("fullName").value,
    mobile: document.getElementById("mobile").value,
    pinCode: parseInt(document.getElementById("pincode").value),
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    state: document.getElementById("state").value,
    type: document.querySelector(".type-btn.active").dataset.type,
  };

  const postAddress = async (addressData) => {
    try {

      const response = await fetch(`${API_END_POINT}api/address/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(addressData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const res = await response.json();
      renderAddresses();
      return res;
    } catch (error) {
      console.error("Error saving address:", error);
    }
  };

  postAddress(addressData).then((response) => {

    addressModal.style.display = "none";
    loadAddress()
    renderAddresses();
    // window.location.href="/address";
    addressForm.reset();
  });
});

// Delete an address
async function deleteAddress(id) {
  try {
    const token = getToken().token;

    const response = await fetch(
      `http://localhost:8080/api/address/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    getAddress = getAddress.filter((addr) => addr.id !== id);
    renderAddresses();
  } catch (error) {
    console.error("Error deleting address:", error);
  }
}

// Render addresses
function renderAddresses() {
    const addr = getAddress;
    addressList.innerHTML = "";
    if(addr.name!==null && addr.name!==undefined){

        const addressCard = document.createElement("div");
        addressCard.className = "address-card";
    
        addressCard.innerHTML = `
          <span class="address-type">${addr.type}</span>
          <h3>${addr.name}</h3>
          <p>${addr.address}</p>
          <p>${addr.city}, ${addr.state} ${addr.pinCode}</p>
          <p>Mobile: ${addr.mobile}</p>
          <div class="card-actions">
            <button class="edit-btn" onclick="editAddress()">Edit</button>
            <button class="delete-btn" onclick="deleteAddress(${addr.id})">Delete</button>
          </div>
        `;
    
        addressList.appendChild(addressCard);
    }
}
function editAddress(){
    showModal(getAddress);
}


// Show modal for adding or editing an address
function showModal(address) {
  addressModal.style.display = "block";

  if (address) {
    modalTitle.textContent = "Edit address";
    submitBtn.textContent = "Update address";

    document.getElementById("fullName").value = address.name;
    document.getElementById("mobile").value = address.mobile;
    document.getElementById("pincode").value = address.pinCode;
    document.getElementById("address").value = address.address;
    document.getElementById("city").value = address.city;
    document.getElementById("state").value = address.state;

    typeButtons.forEach((btn) => {
      if (btn.dataset.type === address.type) {
        btn.classList.add("active");
      }
    });
  }
}

// Event Listeners
addAddressCard.addEventListener("click", () => showModal());
closeBtn.addEventListener("click", () => (addressModal.style.display = "none"));
window.addEventListener("click", (e) => {
  if (e.target === addressModal) {
    addressModal.style.display = "none";
  }
});
typeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    typeButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
  });
});

// Initial load
loadAddress();
renderAddresses();

// Expose functions globally
window.editAddress = editAddress;
window.deleteAddress = deleteAddress;
