import { validateEmail } from './validation.js';
import { errorMessages } from './message.js';
import { showError, clearError } from './ui.js';
import { API_END_POINT } from '../../data/api.js';



document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById("login-form");
    const emailInput = document.getElementById('email');
    const submit = document.getElementById("submit");
    const message = document.getElementById("message");

    submit.addEventListener('click', (e) => {
        console.log("clicked")
        e.preventDefault();
        let isValid = true;

        clearError('email');
        if (!emailInput.value) {
            showError('email', errorMessages.emailRequired);
            isValid = false;
        } else if (emailInput.value.includes('@') && !validateEmail(emailInput.value)) {
            showError('email', errorMessages.emailInvalid);
            isValid = false;
        }

        if (isValid) {

            submit.disabled = true;
            submit.querySelector('.button-text').style.display = 'none';
            submit.querySelector('.spinner').style.display = 'inline-block';

            const email = emailInput.value;
            const password = document.getElementById("password").value;
            const userData = {
                mailId: email,
                password: password
            }


            const user = async (userData) => {
                try {
                    const response = await fetch(`${API_END_POINT}api/auth/signIn`, {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(userData),
                        credentials: 'include' 
                    });

                    if (!response.ok) {

                        showError('email', errorMessages.emailInvalid); 
                        showError('password', errorMessages.passwordInvalid);
                        return;

                    } else if (response.status === 202) {
                        console.log("Login successful");
                        form.reset();
                    } else {
                        console.warn(`Unexpected status code: ${response.status}`);
                    }
    
                    if(localStorage.getItem("datacart")){
                        localStorage.removeItem("datacart")
                    }

                    localStorage.setItem("datacart",JSON.stringify(await response.json()));
                    window.location.href='/amazonUser.html';

                } catch (error) {
                    if(error.message.includes("Failed to fetch") || error.message.includes("NetworkError")){
                        window.location.href='/amazon.html';
                    }else{
                        location.reload();
                    }
                    console.error('Error during signin:', error);
                    message.innerText = "An error occurred during login."; 
                } finally {
                    submit.disabled = false;
                    submit.querySelector('.button-text').style.display = 'inline-block';
                    submit.querySelector('.spinner').style.display = 'none';
                }
            };

            

            user(userData);


        }
    });

    submit.addEventListener('input', () => {
        clearError('email');
    });
});


