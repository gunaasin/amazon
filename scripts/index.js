import './stylescripts/navbar.js';
import './stylescripts/fotter.js';
import './stylescripts/backtotop.js';


// adv index to product page
document.querySelectorAll(".adv-img").forEach((element)=>{
    const productKeyword = element.getAttribute("data-product-keyword");

    element.addEventListener("click",()=>{
        window.location.href = `amazon.html?d=${encodeURIComponent(btoa(JSON.stringify(productKeyword)))}`;
    });

})
