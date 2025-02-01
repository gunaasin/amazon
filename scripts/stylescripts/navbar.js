import { getToken } from "../checkout.js";
import { getEmailFromJWT } from "../util/util.js";
import { API_END_POINT } from "../../data/api.js";

const navbar = document.getElementById("amazon-nav");

// update the delivery 
export let navInfo = {
    address : null,
    name : null,
    cartCount:null
};

const token = getToken().token;
const email = getEmailFromJWT(token);

const localInfo = {
    token: token,
    email: email
}
export const loadNav = async (localInfo) => {
    try {
        const response = await fetch(`${API_END_POINT}api/information`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(localInfo),
        });

        if (!response.ok) {
            if (response.status === 403) {
                console.warn("Access forbidden. Please check your token or permissions."); 
              } 
        }
        navInfo = await response.json(); 
       
    } catch (error) {
        console.error("Error during API call:", error);
    }finally{
        loadNavBar(navInfo);
    }
};

loadNav(localInfo);
loadNavBar(navInfo);


function loadNavBar(navInfo){
    const {address , name , cartCount} = navInfo ;
    navbar.innerHTML = `
    <div class="amazon-header-left-section">
        <a href="/" class="header-link">
            <img class="amazon-logo" src="images/amazon-logo-white.png">
            <img class="amazon-mobile-logo" src="images/amazon-mobile-logo-white.png">
            <p class="nav-in-text">.in</p>
        </a>
    </div>

    <button class="amazon-header-left-second" id="nav-address">
        <p class="delivery-location">
            ${name===null ? " update address" : `Deliver to ${name}` }
        </p>
        <h3 class="update-location"><i class="fas fa-map-marker-alt"></i> &nbsp; ${address === null ? "Update location" : address}</h3>
    </button>

    <div class="amazon-header-middle-section">
        <select id="options" class="landing-search-options">
            <option value="1">All</option>
            <option value="2">Alexa Skills</option>
            <option value="3">Amazon Devices</option>
            <option value="4">Amazon Fashion</option>
            <option value="5">Amazon Pharmacy</option>
            <option value="6">Appliances</option>
            <option value="7">Books</option>
            <option value="8">Clothing & Accessories</option>
            <option value="9">Electronics</option>
            <option value="10">Home & Kitchen</option>
            <option value="11">Kindle Store</option>
            <option value="12">Gift Cards</option>
            <option value="13">Music</option>
            <option value="14">Mobile</option>
            <option value="15">Sports, Fitness & Outdoors</option>
        </select>
        <input class="search-bar" id="search-bar" type="text" placeholder="Search Amazon.in">

        <button class="search-button" id="search-btn" >
            <img class="search-icon" src="images/icons/search-icon.png">
        </button>
    </div>

    <a href="amazonUser" class="amazon-header-right-second">
        <p class="sign-in-nav"> Hello, ${name===null ? " Sign in" : name } </p>
        <h3 class="account-list-nav"> Account & list</h3>
    </a>

    <div class="amazon-header-right-section">
        <a class="orders-link header-link" href="orders">
            <h2 class="orders-text"><span>Returns <br></span> & Orders</h2>
        </a>

        <a class="cart-link header-link" href="checkout">
            <img class="cart-icon" src="images/icons/cart-icon.png">

            <div class="cart-quantity">${cartCount=== null ? "0" : cartCount}</div>
            <div class="cart-text">Cart</div>
        </a>
    </div>
`;

    const mobileNav = document.getElementById("amazon-nav-mobile");
    mobileNav.innerHTML = `
    <button class="amazon-header-nav">
        <h3 class="update-location-nav"><i class="fas fa-map-marker-alt"></i> &nbsp;${address === null ? "Update location" : address}</h3>
        <p class="delivery-location-nav">
            ${name===null ? " update address" : `Deliver to ${name}` }
        </p>
    </button>
    <div class="mobile-nav-element">
            <!-- menu -->
            <label class="hamburger">
                <input type="checkbox" id="toggole-btn">
                <svg viewBox="0 0 32 32">
                    <path class="line line-top-bottom"
                        d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22">
                    </path>
                    <path class="line" d="M7 16 27 16"></path>
                </svg>
            </label>
            <a href="amazonUser"><i class="fa-regular fa-user"></i></a>
    </div>

     <div class="side-nav">
            <div class="side-nav-links">
                <a href="/" class="">Amazon Home</a>
                <a href="/signin" class="">Sign in </a>
                <a href="/Cart" class="">Cart</a>
                <a href="/address" class="">Address</a>
                <a href="/userInfo" class="">Account</a>
            </div>
     </div>
`


const toggoleBtn = document.getElementById('toggole-btn');
const sideNav = document.querySelector('.side-nav');
let sideNavVisible = false;  

toggoleBtn.addEventListener('click', function () {
    if (toggoleBtn.checked) {  
        sideNav.style.right = '0';
        sideNavVisible = true;
    } else {
        sideNav.style.right = '-500px';
        sideNavVisible = false;
    }
});

// Close when clicking outside
document.addEventListener('click', function (event) {
    const isClickInside = sideNav.contains(event.target) || toggoleBtn.contains(event.target);
    if (!isClickInside && sideNavVisible) {
        toggoleBtn.checked = false;  // Uncheck the checkbox
        sideNav.style.right = '-500px';
        sideNavVisible = false;
    }
});



const searchBarData = document.getElementById("search-bar");
    const searchBtn = document.getElementById("search-btn");

    // document.addEventListener("DOMContentLoaded", () => {
        searchBarData.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
         
                let keyword = searchBarData.value.trim();
                window.location.href = `amazon?ds=${encodeURIComponent(btoa(JSON.stringify(keyword)))}`;
            }
        });

        searchBtn.addEventListener("click", () => {
            let keyword = searchBarData.value.trim();
            window.location.href = `amazon?ds=${encodeURIComponent(btoa(JSON.stringify(keyword)))}`;
            
        })

        document.getElementById("nav-address").addEventListener("click",()=>{
            window.location.href="/address";
        })

        document.querySelector(".amazon-header-nav").addEventListener("click",()=>{
            window.location.href="/address";
        })


    // });

}


  