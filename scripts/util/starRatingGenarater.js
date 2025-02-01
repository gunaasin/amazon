
export default function getStarRating(rating) {

    

    if(rating === 0) return `<span class="stars">☆☆☆☆☆</span>`;
    else if( rating <=1 && rating >= 0 ) return `<span class="stars">★☆☆☆☆</span>`;
    else if( rating <=2 && rating >= 1 ) return `<span class="stars">★★☆☆☆</span>`;
    else if( rating <=3 && rating >= 2 ) return `<span class="stars">★★★☆☆</span>`;
    else if( rating <=4 && rating >= 3 ) return `<span class="stars">★★★★☆</span>`;
    else if( rating <=999 && rating >= 4 ) return `<span class="stars">★★★★★</span>`;
}