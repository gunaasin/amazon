import "./stylescripts/navbar.js";
import "./stylescripts/fotter.js";
import "./stylescripts/backtotop.js"

// Function to handle form visibility
function toggleForm(formId, show) {
    const form = document.getElementById(formId);
    if (form) {
      form.style.display = show ? 'block' : 'none';
    }
  }
  
  // Function to safely get section title
  function getSectionTitle(element) {
    const header = element.closest('.section-header');
    if (header) {
      const h2 = header.querySelector('h2');
      return h2 ? h2.textContent : 'section';
    }
    return 'section';
  }
  
  // Function to update field value and UI
  function updateFieldValue(field, value) {
    const valueSpan = document.getElementById(`${field}Value`);
    const description = document.getElementById(`${field}Description`);
    const button = document.querySelector(`[data-field="${field}"]`);
    
    if (field === 'email') {
      if (value && value.trim() !== '') {
        // Show email value and hide description
        if (valueSpan) {
          valueSpan.textContent = value;
          valueSpan.style.display = 'inline';
        }
        if (description) {
          description.style.display = 'none';
        }
        if (button) {
          button.textContent = 'Edit';
          button.className = 'edit-btn';
        }
      } else {
        // Show description and hide email value
        if (valueSpan) {
          valueSpan.style.display = 'none';
        }
        if (description) {
          description.style.display = 'block';
        }
        if (button) {
          button.textContent = 'Add';
          button.className = 'add-btn';
        }
      }
    } else if (valueSpan) {
      // For other fields, simply update the value
      valueSpan.textContent = value;
    }
  }
  
  // Function to validate input
  function validateInput(field, value) {
    if (!value || value.trim() === '') {
      return false;
    }
    
    switch (field) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      case 'phone':
        const phoneRegex = /^\+\d{1,}[\d\s-]{7,}$/;
        return phoneRegex.test(value);
      case 'password':
        return value.length >= 6;
      default:
        return value.trim().length > 0;
    }
  }
  
  // Add click event listeners to all buttons
  document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', (e) => {
      const action = e.target.textContent;
      const section = getSectionTitle(e.target);
      const field = e.target.dataset.field;
      
      if (e.target.classList.contains('edit-btn') || e.target.classList.contains('add-btn')) {
        // Show the edit form and populate current value if it exists
        toggleForm(`${field}Form`, true);
        const input = document.getElementById(`${field}Input`);
        const valueSpan = document.getElementById(`${field}Value`);
        if (input && valueSpan && valueSpan.style.display !== 'none') {
          input.value = valueSpan.textContent;
        }
      } else if (e.target.classList.contains('cancel-btn')) {
        // Hide the form when cancel is clicked
        const form = e.target.closest('.edit-form');
        form.style.display = 'none';
      } else if (e.target.classList.contains('save-btn')) {
        // Handle save functionality
        const form = e.target.closest('.edit-form');
        const inputs = form.querySelectorAll('input');
        const field = e.target.dataset.field;
        
        // For password change, validate all three fields
        if (field === 'password') {
          const [currentPassword, newPassword, confirmPassword] = Array.from(inputs).map(input => input.value);
          
          if (newPassword !== confirmPassword) {
            alert('New passwords do not match');
            return;
          }
          
          if (!validateInput('password', newPassword)) {
            alert('Password must be at least 6 characters long');
            return;
          }
          
          updateFieldValue('password', '••••••••');
        } else {
          // For other fields, validate and update the single input
          const input = inputs[0];
          if (!validateInput(field, input.value)) {
            alert(`Please enter a valid ${field}`);
            return;
          }
          
          updateFieldValue(field, input.value);
        }
        
        form.style.display = 'none';
        alert(`Changes saved for ${section}`);
      } else {
        // For other buttons (setup, enable, start)
        alert(`${action} clicked for ${section}`);
      }
    });
  });
  
  // Add hover effect to sections
  document.querySelectorAll('.security-section').forEach(section => {
    section.addEventListener('mouseenter', () => {
      section.style.backgroundColor = '#f7fafa';
    });
    
    section.addEventListener('mouseleave', () => {
      section.style.backgroundColor = 'transparent';
    });
  });