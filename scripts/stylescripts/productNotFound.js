export function loadProductNotFound() {
    const main = document.querySelector(".main");
    main.innerHTML = "";

    main.innerHTML = `
        <main class="container">
        <div class="error-box">
            <img src="./images/error.png" alt="404">
            <h2 class="error-subtitle">No such product exists</h2>
            <p class="error-message">We couldn't find the product you're looking for. It might have been removed or is currently unavailable.</p>
        </div>
        
        <div class="links">
            <a href="/" class="link">Back to Home Page</a>
            <a href="https://gunaportfoliogn.vercel.app/" class="link" target="_blank">Contact</a>
        </div>
        </main>
    `

    // Wait for the DOM to be ready
    document.addEventListener('DOMContentLoaded', () => {
        const searchInput = document.querySelector('.search-input');
        const searchButton = document.querySelector('.search-button');

        function handleSearch() {
            if (searchInput.value.trim()) {
                window.location.href = `/search?q=${encodeURIComponent(searchInput.value.trim())}`;
            }
        }

        // Add click event listener to search button
        searchButton.addEventListener('click', handleSearch);

        // Add event listener for Enter key in search input
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
    });
}