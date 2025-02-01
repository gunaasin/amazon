const fotter = document.getElementById("fotter");

fotter.innerHTML = `
 <div class="backtotop" id="backToBottom">
        Back To Top</div>
        <div class="amazon-links">
            <ul class="list-one list">
                <h2>Get to Know Us</h2>
                <li class="call">About Amazon</li>
                <li>Careers</li>
                <li>Press Releases</li>
                <li>Amazon Science</li>
            </ul>
            <ul class="list-two list">
                <h2>Connect with Us</h2>
                <li>Facebook</li>
                <li class="call">Instagram</li>
                <li>Twitter</li>
            </ul>
            <ul class="list-three list">
                <h2>Make Money with Us</h2>
                
                <li>Sell under Amazon Accelerator</li>
                <li class="sellOnAmazon">Sell on Amazon</li>
                <li>Protect and Build Your Brand</li>
                <li>Supply to Amazon</li>
                <li>Become an Affiliate</li>
                <li>Fulfilment by Amazon</li>
                <li>Amazon Pay on Merchants</li>
                <li>Advertise Your Products</li>
            </ul>
            <ul class="list-foure list">
                <h2>Let Us Help You </h2>
                <li>Your Account</li>
                <li>Returns Centre</li>
                <li>Recalls and Product Safety Alerts</li>
                <li>Supply to Amazon</li>
                <li>Amazon App Download</li>
                <li>100% Purchase Protection</li>
                <li class="call">Help</li>
            </ul>
        </div>
        <div class="amazon-end">
            <img src="images/amazon-logo-white.png " class="log" alt="">
            <div class="india"><img src="images/icons/india.png" alt=""> India</div>
        </div>
        <div class="end">
            <p>Conditions of Use & Sale
                Privacy Notice
                Interest-Based Ads</p>
               <p>© 2024, Amazon.clone</p>
</div>`


document.querySelector(".sellOnAmazon").addEventListener("click" , ()=>{
    window.location.href="/amazonseller.html";
})

document.querySelectorAll(".call").forEach((item)=>{
    item.addEventListener("click" , ()=>{
        window.location.href="https://gunaportfoliogn.vercel.app/";
    })
})