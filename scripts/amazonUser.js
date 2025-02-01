import "./stylescripts/navbar.js";
import "./stylescripts/fotter.js";
import "./stylescripts/backtotop.js";
import { API_END_POINT } from "../data/api.js";

const accountOptions = [
    {
        image: "https://pixcap.com/cdn/library/templates/055d029c-03c8-4ca5-9efa-57299c1148ad/thumbnail/937c83d9-0c59-4236-ac7d-d97a61bcd0c8_transparent_null_400.webp",
        title: "Your Orders",
        description: "Track, return, or buy things again"
    },
    {
        image: "https://pixcap.com/cdn/library/template/1717768140946/thumbnail/Locked_3D_Icon_Model_For_UI_transparent_400_emp.webp",
        title: "Login & security",
        description: "Edit login, name, and mobile number"
    },
    {
        image: "https://cdn-icons-png.freepik.com/256/5791/5791647.png?uid=R155768109&ga=GA1.1.164723959.1709136868",
        title: "Logout",
        description: "Logout account"
    },
    {
        image: "https://pixcap.com/cdn/library/template/1727207939385/thumbnail/Package_Location_3D_Icon_transparent_emp_400.webp",
        title: "Your Addresses",
        description: "Edit addresses for orders and gifts"
    },
    {
        image: "https://m.media-amazon.com/images/G/31/AmazonBusiness/YAPATF/amazon_business_yap_atf._CB588250268_.jpg",
        title: "Your business account",
        description: "Sign up for free to save up to 28% with GST invoice and bulk discounts and purchase on credit."
    },
    {
        image: "https://pixcap.com/cdn/library/template/1718302332148/thumbnail/Amazon_Pay_3D_Icon_Payment_transparent_800_emp.webp",
        title: "Payment options",
        description: "Edit or add payment methods"
    },
    {
        image: "https://pixcap.com/cdn/library/template/1729871678150/thumbnail/Complain_To_Customer_Service_3D_Icon_transparent_emp_400.webp",
        title: "Contact Us",
        description: "Contact our customer service via phone or chat"
    }
];

// Fetch the token from localStorage
function getToken() {
    try {
        const storedToken = localStorage.getItem('datacart');
        return storedToken ? JSON.parse(storedToken) : null;
    } catch (error) {
        console.error("Failed to parse token from localStorage:", error);
        return null;
    }
}

// Logout function
async function logout(token) {
    if (!token || !token.token) {
        // window.location.href="/signin";
        console.error("Invalid or missing token. Cannot logout.");
        return;
    }

    try {
        const response = await fetch(`${API_END_POINT}api/auth/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token.token}`
            },
            body: JSON.stringify(token)
        });

        if (!response.ok) {
            console.error("Logout failed:", response.status, response.statusText);
            return;
        }

        console.log("Logout successful:", response);
        window.location.href = "/signin.html";
    } catch (error) {
        console.error("Error during logout:", error);
    }
}


async function getAccess(token) {
    if (!token || !token.token) {
        window.location.href="/signin";
        console.error("Invalid or missing token. Cannot logout.");
        return;
    }

    try {
        const response = await fetch(`${API_END_POINT}api/auth/getKey`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token.token}`
            },
            body: JSON.stringify(token)
        });

        if (!response.ok) {
            window.location.href = "/signin.html";
            return;
        }
    } catch (error) {
        console.error("Error during logout:", error);
        window.location.href = "/signin.html";
    }


    createAccountCards();
}



// Create account cards dynamically
function createAccountCards() {
    const container = document.getElementById("accountCards");
    const token = getToken();
    
    accountOptions.forEach((option) => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <div class="card-box" id="card-box">
                <div class="img-Container">
                    <img src="${option.image}" alt="${option.title}">
                </div>
                <div>
                    <h2>${option.title}</h2>
                    <p>${option.description}</p>
                </div>
            </div>     
        `;

        card.addEventListener("click", () => {
            // console.log(`Navigating to: ${option.title}`);
            switch (option.title) {
                case "Your Orders":
                    window.location.href = "orders";
                    break;
                case "Your Addresses":
                    window.location.href = "address";
                    break;
                case "Logout":
                    logout(token);
                    break;
                case "Contact Us":
                    window.location.href = "https://gunaportfoliogn.vercel.app/";
                    break;
                case "Login & security":
                    window.location.href = "userInfo";
                    break;
                default:
                    console.warn("Unknown action for:", option.title);
            }
        });

        container.appendChild(card);
    });
}


// Initialize account cards
getAccess(getToken());



