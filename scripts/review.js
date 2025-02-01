import { navInfo } from "./stylescripts/navbar.js";
import { API_END_POINT } from "../data/api.js";
import { product } from "./main-product.js";
import { getToken } from "./checkout.js";
import { getEmailFromJWT } from "./util/util.js";


const reviewsHtml = document.querySelector(".reviews-container");


 reviewsHtml.innerHTML =`
            <div class="reviews-summary">
                <h2>Customer Reviews</h2>
                <div class="rating-overview">
                    <div class="average-rating">
                        <div class="stars"></div>
                        <span class="rating-text">4.5 out of 5</span>
                    </div>
                    <span class="total-ratings">global ratings</span>
                </div>
               
                <div class="rating-bars">
                    <div class="rating-bar">
                        <span class="star-label">5 star</span>
                        <div class="bar-container">
                            <div class="bar" style="width: 75%"></div>
                        </div>
                        <span class="percentage">75%</span>
                    </div>
                    <div class="rating-bar">
                        <span class="star-label">4 star</span>
                        <div class="bar-container">
                            <div class="bar" style="width: 15%"></div>
                        </div>
                        <span class="percentage">15%</span>
                    </div>
                    <div class="rating-bar">
                        <span class="star-label">3 star</span>
                        <div class="bar-container">
                            <div class="bar" style="width: 5%"></div>
                        </div>
                        <span class="percentage">5%</span>
                    </div>
                    <div class="rating-bar">
                        <span class="star-label">2 star</span>
                        <div class="bar-container">
                            <div class="bar" style="width: 3%"></div>
                        </div>
                        <span class="percentage">3%</span>
                    </div>
                    <div class="rating-bar">
                        <span class="star-label">1 star</span>
                        <div class="bar-container">
                            <div class="bar" style="width: 2%"></div>
                        </div>
                        <span class="percentage">2%</span>
                    </div>
                </div>

                <div class="peoduct-review-customer">
                    <h2> Review this product</h2>
                    <p>Share your thoughts with other customers</p>

                    <button class="write-review-button"  id="write-review-button" onclick="openReviewModal()">Write a product review</button>
                </div>
            </div>
    
            <!-- Modal for Write Review -->
            <div id="review-modal" class="modal">
                <div class="modal-content">
                    <span class="close"  id="close">&times;</span>
                    <div class="write-review">
                        <h3>Write a product review</h3>
                        <form id="review-form">
                            <div class="rating-input">
                                <label>Overall rating</label>
                                <div class="star-rating">
                                    <span class="star" data-rating="1">★</span>
                                    <span class="star" data-rating="2">★</span>
                                    <span class="star" data-rating="3">★</span>
                                    <span class="star" data-rating="4">★</span>
                                    <span class="star" data-rating="5">★</span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="review-title">Add a headline</label>
                                <input type="text" id="review-title" required>
                            </div>
                            <div class="form-group">
                                <label for="review-content">Write your review</label>
                                <textarea id="review-content" required></textarea>
                            </div>
                            <button type="submit" class="submit-review">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
    
            <div class="reviews-list" id="reviews-list">
                <!-- Reviews will be dynamically inserted here -->
            </div>
            `


// Modal functions
const writeReviewButton = document.getElementById("write-review-button");
writeReviewButton.addEventListener("click",()=> {
    document.getElementById('review-modal').style.display = 'block';
    document.body.style.overflow = 'hidden';
});

document.getElementById("close").addEventListener("click",closeReviewModal)

function closeReviewModal(){
    document.getElementById('review-modal').style.display = 'none';
    document.body.style.overflow = 'auto'; 
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('review-modal');
    if (event.target === modal) {
        closeReviewModal();
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    initializeStarRating();
    renderReviews();
    setupReviewForm();
});

// Star rating functionality
function initializeStarRating() {
    const stars = document.querySelectorAll('.star-rating .star');
    let selectedRating = 0;

    stars.forEach(star => {
        star.addEventListener('mouseover', () => {
            const rating = parseInt(star.dataset.rating);
            highlightStars(rating);
        });

        star.addEventListener('click', () => {
            selectedRating = parseInt(star.dataset.rating);
            highlightStars(selectedRating);
        });
    });

    document.querySelector('.star-rating').addEventListener('mouseleave', () => {
        highlightStars(selectedRating);
    });
}

function highlightStars(rating) {
    const stars = document.querySelectorAll('.star-rating .star');
    stars.forEach(star => {
        const starRating = parseInt(star.dataset.rating);
        star.classList.toggle('active', starRating <= rating);
    });
}


// Render reviews''
function renderReviews() {
    const reviewsList = document.getElementById('reviews-list');
    const review = product.reviews;
    reviewsList.innerHTML = review.map(review => `
        <div class="review">
            <div class="review-header">
                <div class="reviewer-avatar">
                    ${review.name.charAt(0)}
                </div>
                <span class="reviewer-name">${review.name}</span>
            </div>
            <div class="review-rating">
                ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}
            </div>
            <div class="review-title">${review.title}</div>
            <div class="review-date">Reviewed on ${review.date}</div>
            ${review.verified ? '<div class="verified-purchase">Verified Purchase</div>' : ''}
            <div class="review-content">${review.content}</div>
            <div class="review-helpful">
                ${review.helpful} people found this helpful
                <button class="helpful-button" onclick="markHelpful(${review.id})">Helpful</button>
            </div>
        </div>
    `).join('');
}


function setupReviewForm() {
    const form = document.getElementById('review-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const title = document.getElementById('review-title').value;
        const content = document.getElementById('review-content').value;
        const rating = document.querySelectorAll('.star-rating .star.active').length;
        const name = navInfo.name;
        const token = getToken().token;
        const email = getEmailFromJWT(token);
        
        const newReview = {

            token: token,
            email: email,
            id: product.id,
            name: name,
            rating,
            title,
            content,
            date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
            helpful: 0,
            verified: false
        };

         const updateReview = async (newReview) => {
            try {
                const response = await fetch(`${API_END_POINT}api/write/review`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify(newReview),
                });
        
                if (!response.ok) {
                    if (response.status === 403) {
                        window.location.href="/signin";
                        console.warn("Access forbidden. Please check your token or permissions."); 
                      } 
                }
               
            } catch (error) {
                console.error("Error during API call:", error);
            }finally{
                
            }
        };

        updateReview(newReview);
        
        renderReviews();
        form.reset();
        highlightStars(0);
        closeReviewModal();
    });
}

// Mark review as helpful
function markHelpful(reviewId) {
    const review = reviews.find(r => r.id === reviewId);
    if (review) {
        review.helpful++;
        renderReviews();
    }
}