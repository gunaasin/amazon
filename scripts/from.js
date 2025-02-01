
 document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('addressForm');
    const typeButtons = document.querySelectorAll('.type-btn');
    
    // Handle address type selection
    typeButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            typeButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
        });
    });

    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Collect form data
        const formData = {
            fullName: document.getElementById('fullName').value,
            mobile: document.getElementById('mobile').value,
            pincode: document.getElementById('pincode').value,
            address: document.getElementById('address').value,
            area: document.getElementById('area').value,
            landmark: document.getElementById('landmark').value,
            city: document.getElementById('city').value,
            state: document.getElementById('state').value,
            addressType: document.querySelector('.type-btn.active').dataset.type
        };

        // Validate mobile number
        if (!/^\d{10}$/.test(formData.mobile)) {
            alert('Please enter a valid 10-digit mobile number');
            return;
        }

        // Validate pincode
        if (!/^\d{6}$/.test(formData.pincode)) {
            alert('Please enter a valid 6-digit pincode');
            return;
        }

        // Here you would typically send the data to your server
        console.log('Form submitted with data:', formData);
        
        // Show success message
        alert('Address added successfully!');
        
        // Optionally redirect back to checkout page
        // window.location.href = '/checkout';
    });

    // Auto-fill city and state based on pincode
    const pincodeInput = document.getElementById('pincode');
    pincodeInput.addEventListener('change', function() {
        if (this.value.length === 6) {
            // This is where you would typically make an API call to get city/state
            // For demo purposes, we'll just simulate it
            setTimeout(() => {
                if (this.value === '560029') {
                    document.getElementById('city').value = 'Bengaluru';
                    document.getElementById('state').value = 'KA';
                }
            }, 500);
        }
    });
});